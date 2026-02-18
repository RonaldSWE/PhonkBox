import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./Navigation/Nav";
import { ThemeProvider } from "./Theme/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
