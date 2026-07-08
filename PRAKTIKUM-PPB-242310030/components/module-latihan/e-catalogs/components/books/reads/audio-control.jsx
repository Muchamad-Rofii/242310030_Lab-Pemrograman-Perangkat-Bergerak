import { Ionicons } from "@expo/vector-icons";
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { color_list } from "../../../styles/StyleApps";

export default function AudioControl({
  isSpeaking,
  isPaused,
  currentSentenceIndex,
  totalSentences,
  onPlayPause,
  onStop,
}) {
  // Calculate progress percentage
  const progressPercentage =
    totalSentences > 0
      ? ((currentSentenceIndex + 1) / totalSentences) * 100
      : 0;

  return (
    <View style={styles.controlsContainer}>
      {/* Progress Bar */}
      {isSpeaking && (
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${progressPercentage}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentSentenceIndex + 1} / {totalSentences}
          </Text>
        </View>
      )}

      {/* Control Buttons */}
      <View style={styles.controlButtonsRow}>
        {/* Play/Pause Button */}
        <TouchableOpacity
          style={[styles.controlButton, styles.playButton]}
          onPress={onPlayPause}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isSpeaking && !isPaused ? "pause" : "play"}
            size={28}
            color={color_list.white}
          />
        </TouchableOpacity>

        {/* Stop Button */}
        {isSpeaking && (
          <TouchableOpacity
            style={[styles.controlButton, styles.stopButton]}
            onPress={onStop}
            activeOpacity={0.7}
          >
            <Ionicons name="stop" size={24} color={color_list.white} />
          </TouchableOpacity>
        )}
      </View>

      {/* Status Text */}
      <View style={styles.statusContainer}>
        <View style={styles.statusIndicator}>
          <View
            style={[
              styles.statusDot,
              isSpeaking && !isPaused && styles.statusDotActive,
            ]}
          />
          <Text style={styles.statusText}>
            {isSpeaking && !isPaused
              ? "Reading..."
              : isPaused
                ? "Paused"
                : "Ready to listen"}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  controlsContainer: {
    backgroundColor: color_list.white,
    paddingVertical: 16,
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 3,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: color_list.green,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
    fontWeight: "600",
  },
  controlButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  playButton: {
    backgroundColor: color_list.green,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  stopButton: {
    backgroundColor: color_list.orange,
  },
  statusContainer: {
    alignItems: "center",
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "gray",
  },
  statusDotActive: {
    backgroundColor: color_list.green,
  },
  statusText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
});
