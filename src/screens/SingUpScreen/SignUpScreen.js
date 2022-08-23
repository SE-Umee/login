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

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");
  const { height } = useWindowDimensions();
  const Email_REGEX =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  const { control, handleSubmit, watch } = useForm();

  const pwd = watch("password");

  const onUpdatePressed = () => {
    navigation.navigate("UpdateProfile");
  };

  const onSignUpPressed = () => {
    navigation.navigate("SignIn");
  };
  const onTermofUsePressed = () => {
    console.warn("onTermofUsePressed");
  };
  const onPrivacyPressed = () => {
    console.warn("Privacy pressed");
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
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        {/* <ProfileImageScreen /> */}
        <Image
          source={require("../../images/logo.jpg")}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          name="username"
          placeholder="username"
          control={control}
          onChangeText={(txt) => setName(txt)}
          rules={{
            required: "UserName is required",
            minLength: {
              value: 3,
              message: "User Name must be at least  3 Characters",
            },
            maxLength: {
              value: 24,
              message: "User Name should be maximum 24 Characters",
            },
          }}
        />

        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          onChangeText={(txt) => setEmail(txt)}
          rules={{
            required: "Email is required",
            pattern: { value: Email_REGEX, message: "Invalid Email" },
          }}
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

        <CustomInput
          name="confirmpassword"
          placeholder="Confirm Password"
          control={control}
          secureTextEntry
          onChangeText={(txt) => setConfirmPassword(txt)}
          rules={{
            required: "Confirm Password is required",
            validate: (value) => value == pwd || "Password do not match",
          }}
        />

        <CustomButtom
          text="Register"
          // onPress={handleSubmit(onRegisterPressed)}
          onPress={() => doSignup()}
        />

        <CustomButtom
          text="UpdateProfile"
          onPress={onUpdatePressed}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
        />

        <Text style={styles.text}>
          By registring, You confirm that you can accept our{" "}
          <Text style={styles.link} onPress={onTermofUsePressed}>
            {" "}
            Terms and Use
          </Text>{" "}
          and
          <Text style={styles.link} onPress={onPrivacyPressed}>
            {" "}
            Privacy Policy
          </Text>{" "}
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
