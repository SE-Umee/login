import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  TextInput,
} from "react-native";
import React from "react";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const SignInScreen = () => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        <Image
          source={require("../../asset/images/login.jpg")}
          style={[styles.logo, { height: height * 0.3 }]}
          resizeMode="contain"
        />

        <CustomInput
          name="username"
          placeholder="UserName"
          control={control}
          rules={{ required: "username is required" }}
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

        <CustomButtom text="LogIn" onPress={handleSubmit(onSignInPressed)} />
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
