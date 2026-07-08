import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function BottomSheetModal({
  children,
  snapPoints = ["50%", "80%"],
}) {
  const router = useRouter();
  const bottomSheetRef = useRef(null);

  const snapPointsMemo = useMemo(() => snapPoints, [snapPoints]);

  const handleSheetChanges = useCallback(
    (index) => {
      if (index === -1) {
        router.back();
      }
    },
    [router],
  );

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        pressBehavior="close"
      />
    ),
    [],
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPointsMemo}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        handleIndicatorStyle={styles.indicator}
        backgroundStyle={styles.bottomSheetBackground}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
      >
        <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </BottomSheetScrollView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheetBackground: {
    backgroundColor: "white",
  },
  contentContainer: {
    padding: 0,
  },
  indicator: {
    backgroundColor: "#ccc",
    width: 40,
    height: 4,
  },
});
