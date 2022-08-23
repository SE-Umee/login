import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import Navigation from "./src/navigation";
import HomeScreen from "./src/screens/HomeScreen";
import SplashScreen from "./src/screens/splash/SplashScreen";
import UpdateProfile from "./src/screens/UpdateProfile";

export default function App() {
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
      {/* <SplashScreen /> */}
    </SafeAreaView>
  );
  // return <Navigation />;
}
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
    padding: 20,
  },
});
