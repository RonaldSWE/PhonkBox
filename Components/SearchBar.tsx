import { StyleSheet, Text, View, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";

const SearchBar = () => {
  return (
    <SafeAreaView>
      <TextInput placeholder="Search song" />
    </SafeAreaView>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
