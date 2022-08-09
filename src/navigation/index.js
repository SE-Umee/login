import { View, Text } from 'react-native'
import React from 'react'
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen/ConfirmEmailScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen/ForgetPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import SignInScreen from "../screens/SignInScreen/SignInScreen";
import SignUpScreen from "../screens/SingUpScreen/SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileImageScreen from '../screens/ProfileImageScreen/ProfileImageScreen';


const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="SignIn" component={SignInScreen}/>
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPasswordScreen}/>
        <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
        <Stack.Screen name='Home' component={HomeScreen}/>
        <Stack.Screen name='ProfileImage' component={ProfileImageScreen} />
      </Stack.Navigator>
     

    </NavigationContainer>
  )
}

export default Navigation