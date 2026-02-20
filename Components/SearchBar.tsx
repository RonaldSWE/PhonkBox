import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Audio } from "expo-av";
import data from "../Data/Data";
import { useTheme } from "../Theme/ThemeContext";

// SearchBar Component: Allows users to search for phonk songs in the app
const SearchBar = () => {
  // State to store the current search query
  const [searchQuery, setSearchQuery] = useState<string>("");

  // State to store filtered search results
  const [searchResults, setSearchResults] = useState<typeof data | null>(null);

  // State to track if a search returned no results
  const [notFound, setNotFound] = useState<boolean>(false);

  // State to manage audio playback
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  // State to track which song is currently selected for modal
  const [selectedSong, setSelectedSong] = useState<any>(null);

  // State to track if audio is currently playing
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // State to track if audio is loading
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get theme from ThemeContext
  const { theme } = useTheme();

  // Handle search input changes and filter songs
  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // If search bar is empty, clear all results
    if (query.trim() === "") {
      setSearchResults(null);
      setNotFound(false);
      return;
    }

    // Filter songs by matching the query with song names (case-insensitive)
    const results = data.filter((song) =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );

    // If no songs found, show "404, phonk not found" message
    if (results.length === 0) {
      setSearchResults(null);
      setNotFound(true);
    } else {
      // If songs found, display them in results
      setSearchResults(results);
      setNotFound(false);
    }
  };

  // Load and play the selected song
  const playSong = async (audioSource: any, songId: number) => {
    try {
      setIsLoading(true);

      // Stop any currently playing sound
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      // Create and play new sound
      const { sound: newSound } = await Audio.Sound.createAsync(audioSource);
      setSound(newSound);
      await newSound.playAsync();

      // Update playing state
      setIsPlaying(true);

      // Set up listener for when sound finishes playing
      newSound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
        }
      });
    } catch (error) {
      console.error("Error playing sound:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Restart the currently playing song
  const restartSong = async (audioSource: any) => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      // Create and play new sound from the beginning
      const { sound: newSound } = await Audio.Sound.createAsync(audioSource);
      setSound(newSound);
      await newSound.playAsync();
      setIsPlaying(true);
    } catch (error) {
      console.error("Error restarting song:", error);
    }
  };

  // Stop the currently playing song
  const stopSong = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
      setIsPlaying(false);
      setSelectedSong(null);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.background }}>
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        {/* Search input field */}
        <TextInput
          placeholder="Search song"
          placeholderTextColor={theme.colors.border}
          style={[
            styles.searchInput,
            {
              backgroundColor: theme.colors.card,
              borderColor: theme.colors.border,
              color: theme.colors.text,
            },
          ]}
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Show "404, phonk not found" message when no results are found */}
        {notFound && (
          <View style={styles.notFoundContainer}>
            <Text style={[styles.notFoundText, { color: theme.colors.primary }]}>
              404, Phonk Not Found
            </Text>
          </View>
        )}

        {/* Display search results as a scrollable list */}
        {searchResults && searchResults.length > 0 && (
          <ScrollView style={styles.resultsContainer}>
            {searchResults.map((song) => (
              <TouchableOpacity
                key={song.id}
                style={[
                  styles.resultItem,
                  {
                    backgroundColor: theme.colors.card,
                    borderBottomColor: theme.colors.border,
                  },
                ]}
                onPress={() => {
                  // Open modal and play song
                  setSelectedSong(song);
                  playSong(song.audio, song.id);
                }}
                disabled={isLoading}
              >
                {/* Display song album cover image */}
                <Image
                  source={song.phonkImg}
                  style={styles.songImage}
                  resizeMode="cover"
                />

                {/* Display song name */}
                <Text
                  style={[
                    styles.songName,
                    {
                      color: theme.colors.text,
                    },
                  ]}
                >
                  {song.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Modal for playing the selected song */}
        <Modal
          visible={selectedSong !== null}
          animationType="slide"
          onRequestClose={() => {
            stopSong();
          }}
        >
          <SafeAreaView
            style={[
              styles.modalContainer,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <View style={styles.modalContent}>
              <Image
                source={selectedSong?.phonkImg}
                style={styles.modalImg}
              />
              <Text style={[styles.modalText, { color: theme.colors.text }]}>
                {selectedSong?.name}
              </Text>

              {/* Play/Restart Button */}
              <TouchableOpacity
                style={[
                  styles.playButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => {
                  restartSong(selectedSong.audio);
                }}
              >
                <Text style={styles.playButtonText}>
                  {isPlaying ? "▶️ Restart" : "▶️ Play"}
                </Text>
              </TouchableOpacity>

              {/* Close Button */}
              <TouchableOpacity
                style={[
                  styles.closeButton,
                  { backgroundColor: theme.colors.primary },
                ]}
                onPress={() => {
                  stopSong();
                }}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  notFoundContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  notFoundText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  resultsContainer: {
    maxHeight: 400,
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderRadius: 8,
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  songName: {
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  playingIndicator: {
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    width: "90%",
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
  playButton: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    marginTop: 10,
  },
  playButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
