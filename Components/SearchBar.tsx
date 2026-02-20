import { StyleSheet, Text, View, TextInput, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import data from "../Data/Data";

// SearchBar Component: Allows users to search for phonk songs in the app
const SearchBar = () => {
  // State to store the current search query
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // State to store filtered search results
  const [searchResults, setSearchResults] = useState<typeof data | null>(null);
  
  // State to track if a search returned no results
  const [notFound, setNotFound] = useState<boolean>(false);

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

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {/* Search input field */}
        <TextInput
          placeholder="Search song"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {/* Show "404, phonk not found" message when no results are found */}
        {notFound && (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>404, Phonk Not Found</Text>
          </View>
        )}

        {/* Display search results as a scrollable list */}
        {searchResults && searchResults.length > 0 && (
          <ScrollView style={styles.resultsContainer}>
            {searchResults.map((song) => (
              <View key={song.id} style={styles.resultItem}>
                {/* Display song album cover image */}
                <Image
                  source={song.phonkImg}
                  style={styles.songImage}
                  resizeMode="cover"
                />
                {/* Display song name */}
                <Text style={styles.songName}>{song.name}</Text>
              </View>
            ))}
          </ScrollView>
        )}
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
    borderColor: "#ccc",
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
    color: "#ff6b6b",
  },
  resultsContainer: {
    maxHeight: 400,
  },
  resultItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
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
});
