import { StyleSheet, Text, View, TextInput, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import data from "../Data/Data";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof data | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults(null);
      setNotFound(false);
      return;
    }

    const results = data.filter((song) =>
      song.name.toLowerCase().includes(query.toLowerCase())
    );

    if (results.length === 0) {
      setSearchResults(null);
      setNotFound(true);
    } else {
      setSearchResults(results);
      setNotFound(false);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TextInput
          placeholder="Search song"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {notFound && (
          <View style={styles.notFoundContainer}>
            <Text style={styles.notFoundText}>404, phonk not found</Text>
          </View>
        )}

        {searchResults && searchResults.length > 0 && (
          <ScrollView style={styles.resultsContainer}>
            {searchResults.map((song) => (
              <View key={song.id} style={styles.resultItem}>
                <Image
                  source={song.phonkImg}
                  style={styles.songImage}
                  resizeMode="cover"
                />
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
