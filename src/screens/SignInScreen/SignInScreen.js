import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { API } from "../../utils/helper";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState("");

  const { height } = useWindowDimensions();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);

  const onSignInPressed = (data) => {
    // Validate user
    console.log(data);

    navigation.navigate("Home");
  };

  const onforgetPasswordPressed = () => {
    navigation.navigate("ForgetPassword");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignUp");
  };
  const storeToken = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("userData", jsonValue);
    } catch (e) {
      // saving error
    }
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        <Image
          source={require("../../images/logo.jpg")}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          name="email"
          placeholder="email"
          control={control}
          onChangeText={(txt) => setEmail(txt)}
          rules={{ required: "username is required" }}
        />
        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          secureTextEntry
          onChangeText={(txt) => setPassword(txt)}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password should be minimum 6 character long ",
            },
          }}
        />

        <CustomButtom text="LogIn" onPress={() => doSignIn()} />
        <CustomButtom
          text="Forget Password"
          onPress={onforgetPasswordPressed}
          type="TERTIARY"
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
