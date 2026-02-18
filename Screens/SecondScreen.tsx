import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { useTheme } from "../Theme/ThemeContext";

type SecondScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const SecondScreen = () => {
  const navigation = useNavigation<SecondScreenNavigationProp>();
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ImageBackground
        source={require("../assets/images/2nd Page.png")}
        style={styles.container}
        resizeMode="cover"
      >
        <AppButton
          title="Continue"
          onPress={() => navigation.navigate("Home")}
          style={styles.btn}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default SecondScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  btn: {
    marginBottom: 50,
  },
});
