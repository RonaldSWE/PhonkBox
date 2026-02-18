import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Fontisto from "@expo/vector-icons/Fontisto";

import Phonks from "../Screens/Phonks";
import ContactUs from "../Screens/ContactUs";
import Settings from "../Screens/Settings";
import FirstScreen from "../Screens/FirstScreen";
import SecondScreen from "../Screens/SecondScreen";
import { RootStackParamList } from "./types";
import { useTheme } from "../Theme/ThemeContext";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const TabNav = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.card,
          borderTopColor: theme.colors.border,
          borderTopWidth: 1,
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.text,
        headerStyle: {
          backgroundColor: theme.colors.card,
          borderBottomColor: theme.colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: "bold",
        },
      }}
    >
      <Tab.Screen
        name="Phonks"
        component={Phonks}
        options={{
          tabBarIcon: ({ color }) => (
            <Fontisto name="applemusic" size={24} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Contact Us"
        component={ContactUs}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="support-agent" size={32} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const StackNav: React.FC = () => {
  const { theme } = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        headerTitleStyle: {
          color: theme.colors.text,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SecondScreen"
        component={SecondScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Phonks" component={Phonks} />
      <Stack.Screen
        name="Home"
        component={TabNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
