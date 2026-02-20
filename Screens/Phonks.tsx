import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import data from "../Data/Data";
import { useTheme } from "../Theme/ThemeContext";
import SearchBar from "../Components/SearchBar";

const Phonks = () => {
  const { theme, themeType } = useTheme();
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Load and play the audio
  async function playSound(audioSource: any) {
    // Stop any currently playing sound
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
    }

    const { sound: newSound } = await Audio.Sound.createAsync(audioSource);
    setSound(newSound);
    await newSound.playAsync();
    setIsPlaying(true);
  }

  // Pause the audio
  async function pauseSound() {
    if (sound && isPlaying) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  // Stop and unload the audio
  async function stopSound() {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
    }
  }

  return (
    <>
      <SearchBar />
      <SafeAreaView
        style={{ backgroundColor: theme.colors.background, flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ backgroundColor: theme.colors.background }}
        >
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.itemContainer,
                  {
                    backgroundColor: theme.colors.card,
                    borderColor: theme.colors.border,
                  },
                ]}
                onPress={() => {
                  setSelectedItem(item);
                  playSound(item.audio);
                }}
              >
                <Image source={item.phonkImg} style={styles.itemImg} />
                <Text style={[styles.itemText, { color: theme.colors.text }]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
        <Modal
          visible={selectedItem !== null}
          animationType="slide"
          onRequestClose={() => {
            stopSound();
            setSelectedItem(null);
          }}
        >
          <SafeAreaView
            style={[
              styles.modalContainer,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <Image source={selectedItem?.phonkImg} style={styles.modalImg} />
            <Text style={[styles.modalText, { color: theme.colors.text }]}>
              {selectedItem?.name}
            </Text>
            <TouchableOpacity
              style={[
                styles.closeButton,
                { backgroundColor: theme.colors.primary },
              ]}
              onPress={() => {
                stopSound();
                setSelectedItem(null);
              }}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </Modal>

        <StatusBar style={themeType === "dark" ? "light" : "dark"} />
      </SafeAreaView>
    </>
  );
};

export default Phonks;

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    marginLeft: 20,
    fontSize: 18,
  },
  itemImg: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "80%",
  },
  modalImg: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
