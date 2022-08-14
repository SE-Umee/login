import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React from "react";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import ProfileImageScreen from "../ProfileImageScreen/ProfileImageScreen";

const UpdateProfile = () => {
  const navigation = useNavigation();

  const Email_REGEX =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  const { control, handleSubmit, watch } = useForm();

  const pwd = watch("password");

  const onUpdatePressed = () => {
    Alert.alert(
      "Update Profile",
      "Do you want to update your Profile",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        <Text style={styles.title}>Create an account</Text>

        <ProfileImageScreen />

        <CustomInput
          name="username"
          placeholder="username"
          control={control}
          rules={{
            required: "Username is required",
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
          rules={{
            required: "Confirm Password is required",
            validate: (value) => value == pwd || "Password do not match",
          }}
        />

        <CustomButtom
          text="Update"
          onPress={handleSubmit(onUpdatePressed)}
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
});

export default UpdateProfile;
