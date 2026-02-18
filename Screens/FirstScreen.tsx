import { StyleSheet, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppButton from "../Components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../Navigation/types";
import { useTheme } from "../Theme/ThemeContext";

type FirstScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const FirstScreen = () => {
  const navigation = useNavigation<FirstScreenNavigationProp>();
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.container]}>
      <ImageBackground
        source={require("../assets/images/PhonkBox Page.png")}
        style={styles.container}
        resizeMode="cover"
      >
        <AppButton
          title="Get Started"
          onPress={() => navigation.navigate("SecondScreen")}
          style={styles.btn}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default FirstScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  btn: {
    marginBottom: 50,
  }
});
