import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; 
import { Text, View } from "react-native";
import { LoginPage } from "./src/screens/Login";
import { HomePage } from "./src/screens/Home/Home";
import { StackRoutesInicio } from "./src/routes";

const settingsHeader = {
  headerStyle: {
      backgroundColor: '#0C356A',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
}

const Stack = createStackNavigator()

export default function App(){
  return (
    <NavigationContainer>
      <StackRoutesInicio />
    </NavigationContainer>
  )
}
