import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
  Image,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import ProfileImageScreen from "../ProfileImageScreen/ProfileImageScreen";
import { API } from "../../utils/helper";
import Loader from "../../components/Loader";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");
  const { height } = useWindowDimensions();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordErrorr] = useState("");
  const [confirmPasswordError, setConfirmPasswordErrorr] = useState("");

  const onSignUpPressed = () => {
    navigation.navigate("SignIn");
  };

  const doSignup = async () => {
    try {
      if (true) {
        setLoading(true);
        await axios
          .post(`${API}/register`, {
            email: email,
            password: password,
            name: name,
          })
          .then((response) => {
            if (response.data) {
              storeToken(response.data?.data);
              setLoading(false);
            } else {
              setLoading(false);
              console.log("No signup");
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
  const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const onSubmitName = () => {
    if (name == "") {
      setNameError("Please fill Name");
    } else setNameError("");
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
  const onSubmitConfirmPassword = () => {
    if (password != confirmPassword || confirmPassword == "") {
      setConfirmPasswordErrorr("Confirm password does not match");
    } else setConfirmPasswordErrorr("");
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
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          name="username"
          placeholder="username"
          onChangeText={(txt) => setName(txt)}
          onBlur={() => onSubmitName()}
          error={nameError}
          value={name}
        />

        <CustomInput
          name="email"
          placeholder="Email"
          onChangeText={(txt) => setEmail(txt)}
          onBlur={() => onSubmitEmail()}
          error={emailError}
          value={email}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          secureTextEntry
          onChangeText={(txt) => setPassword(txt)}
          onBlur={() => onSubmitPassword()}
          error={passwordError}
          value={password}
        />

        <CustomInput
          name="confirmpassword"
          placeholder="Confirm Password"
          secureTextEntry
          onChangeText={(txt) => setConfirmPassword(txt)}
          onBlur={() => onSubmitConfirmPassword()}
          error={confirmPasswordError}
          value={confirmPassword}
        />

        <CustomButtom
          text="Register"
          onPress={() => doSignup()}
          disabled={
            email == "" || password == "" || confirmPassword == "" || name == ""
              ? true
              : false
          }
          bgColor={
            email == "" || password == "" || confirmPassword == "" || name == ""
              ? "gray"
              : "rgba(255, 147, 0, 255)"
          }
        />

        <Text style={styles.text}>
          By registring, You confirm that you can accept our{" "}
          <Text style={styles.link}> Terms and Use</Text> and
          <Text style={styles.link}> Privacy Policy</Text>{" "}
        </Text>

        <CustomButtom
          text=" Have an account? Sign In"
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#051C60",
    marginTop: 30,
  },
  text: {
    color: "gray",
    marginVertical: 10,
  },
  link: {
    color: "#FDB075",
  },
  logo: {
    width: "70%",
    height: 100,
    maxWidth: 300,
    maxHeight: 200,
  },
});

export default SignUpScreen;
