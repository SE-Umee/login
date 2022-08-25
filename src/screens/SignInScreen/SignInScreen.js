import {
  Image,
  StyleSheet,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import { useNavigation } from "@react-navigation/native";
import { API } from "../../utils/helper";
import Loader from "../../components/Loader";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [passwordError, setPasswordErrorr] = useState("");

  const [loading, setLoading] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };
  const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {}
  };
  const doSignIn = async () => {
    try {
      if (true) {
        setLoading(true);
        await axios
          .post(`${API}/login`, {
            email: email,
            password: password,
          })
          .then(async (response) => {
            if (response?.data?.data) {
              await storeToken(response.data?.data);
              navigation.navigate("Home");
              setLoading(false);
            } else {
              setLoading(false);
              console.log("No signIn");
            }
          })
          .catch((error) => {
            setLoading(false);
            console.log("error", error);
          });
      }
    } catch (error) {
      console.log("error2", error);
      setLoading(false);
    }
  };
  const onSubmitEmail = () => {
    if (email == "") {
      setEmailError("Please fill email");
    } else setEmailError("");
  };
  const onSubmitPassword = () => {
    if (password == "") {
      setPasswordErrorr("Please fill email");
    } else setPasswordErrorr("");
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        {loading ? <Loader start={loading} /> : null}
        <Image
          source={require("../../images/logo.jpg")}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          name="email"
          placeholder="email"
          onBlur={() => onSubmitEmail()}
          error={emailError}
          value={email}
          onChangeText={(txt) => setEmail(txt)}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          onBlur={() => onSubmitPassword()}
          secureTextEntry={true}
          onChangeText={(txt) => setPassword(txt)}
          error={passwordError}
        />

        <CustomButtom
          text="LogIn"
          onPress={() => doSignIn()}
          disabled={email == "" || password == "" ? true : false}
          bgColor={
            email == "" || password == "" ? "gray" : "rgba(255, 147, 0, 255)"
          }
        />
        <CustomButtom
          text="Don't have an account? Create one"
          onPress={onSignUpPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContaner: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    height: 100,
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignInScreen;
