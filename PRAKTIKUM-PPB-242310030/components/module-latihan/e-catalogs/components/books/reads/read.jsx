import { useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useRef, useState } from "react";
import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { ListBook } from "../../../../../constants/list_books";
import { color_list } from "../../../styles/StyleApps";
import BottomSheetModal from "../../BottomSheetModal";
import AudioControl from "./audio-control";

export default function Read() {
  const { id } = useLocalSearchParams();
  const book = ListBook.find((book) => book.id === parseInt(id));

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(-1);
  const [sentences, setSentences] = useState([]);
  const language = book?.language || "en-US";
  const scrollViewRef = useRef(null);
  const sentenceRefs = useRef([]);
  const shouldContinueRef = useRef(false);

  useEffect(() => {
    if (book?.story) {
      const sentenceArray = book.story
        .split(/(?<=[.!?])\s+/)
        .filter((s) => s.trim().length > 0);
      setSentences(sentenceArray);
      sentenceRefs.current = sentenceArray.map(() => null);
    }
  }, [book]);

  useEffect(() => {
    return () => {
      shouldContinueRef.current = false;
      Speech.stop();
    };
  }, []);

  const speakSentence = async (index) => {
    if (!shouldContinueRef.current || index >= sentences.length) {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSentenceIndex(-1);
      shouldContinueRef.current = false;
      return;
    }

    setCurrentSentenceIndex(index);

    // Auto scroll to current sentence
    if (sentenceRefs.current[index]) {
      sentenceRefs.current[index].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y: y - 100, animated: true });
        },
        () => {},
      );
    }

    Speech.speak(sentences[index], {
      language: language,
      pitch: 1.0,
      rate: 0.9,
      onDone: () => {
        if (shouldContinueRef.current) {
          speakSentence(index + 1);
        } else {
          setIsSpeaking(false);
          setIsPaused(false);
          setCurrentSentenceIndex(-1);
        }
      },
      onStopped: () => {
        shouldContinueRef.current = false;
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentSentenceIndex(-1);
      },
      onError: (error) => {
        console.error("Speech error:", error);
        shouldContinueRef.current = false;
        setIsSpeaking(false);
        setIsPaused(false);
        setCurrentSentenceIndex(-1);
      },
    });
  };

  const handleSpeak = async () => {
    if (isSpeaking && !isPaused) {
      Speech.pause();
      setIsPaused(true);
    } else if (isPaused) {
      Speech.resume();
      setIsPaused(false);
    } else {
      shouldContinueRef.current = true;
      setIsSpeaking(true);
      setIsPaused(false);
      speakSentence(0);
    }
  };

  const handleStop = () => {
    shouldContinueRef.current = false;
    Speech.stop();
    setIsSpeaking(false);
    setIsPaused(false);
    setCurrentSentenceIndex(-1);
  };

  const renderHighlightedText = () => {
    return sentences.map((sentence, index) => {
      const isCurrentSentence = index === currentSentenceIndex;
      const isReadSentence = index < currentSentenceIndex;

      return (
        <Text
          key={index}
          ref={(ref) => (sentenceRefs.current[index] = ref)}
          style={[
            styles.sentenceText,
            isCurrentSentence && styles.currentSentence,
            isReadSentence && styles.readSentence,
          ]}
        >
          {sentence}{" "}
        </Text>
      );
    });
  };

  // Calculate progress percentage
  const progressPercentage =
    sentences.length > 0
      ? ((currentSentenceIndex + 1) / sentences.length) * 100
      : 0;

  return (
    <BottomSheetModal>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.bookTitle}>{book?.title}</Text>
          <Text style={styles.author}>by {book?.author}</Text>

          <View style={styles.storyContainer}>
            {sentences.length > 0 ? renderHighlightedText() : null}
          </View>
        </ScrollView>

        <AudioControl
          isSpeaking={isSpeaking}
          isPaused={isPaused}
          currentSentenceIndex={currentSentenceIndex}
          totalSentences={sentences.length}
          onPlayPause={handleSpeak}
          onStop={handleStop}
        />
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color_list.white,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: color_list.white,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: color_list.green,
    textAlign: "center",
    marginHorizontal: 10,
  },
  story_container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 40 : 0,
  },
  bookTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: color_list.green,
    marginBottom: 8,
    textAlign: "center",
  },
  author: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
    fontStyle: "italic",
  },
  storyContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sentenceText: {
    fontSize: 16,
    lineHeight: 28,
    color: "#333",
    textAlign: "justify",
  },
  currentSentence: {
    backgroundColor: color_list.green,
    color: color_list.white,
    fontWeight: "bold",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
  },
  readSentence: {
    color: color_list.green,
    opacity: 0.7,
  },
});
