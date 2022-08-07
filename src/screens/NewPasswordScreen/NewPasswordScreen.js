import {
  Image,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import React from "react";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";

const NewPasswordScreen = () => {
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitPressed = () => {
    navigation.navigate("Home");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        <Text style={styles.title}>Conform Your New Password</Text>

        <CustomInput
          name=" code"
          placeholder="Enter Your Confirmation Code"
          control={control}
          rules={{
            required: "Confirmation Code is requirde",
          }}
        />

        <CustomInput
          name="New-Password"
          placeholder="Enter Your New Password"
          control={control}
          secureTextEntry={false}
          rules={{
            required: "New Password is requirde",
            minLength: {
              value: 6,
              message: "Password should be minimun 6 character long ",
            },
          }}
        />

        <CustomButtom text="Submit" onPress={handleSubmit( onSubmitPressed)} />

        <CustomButtom
          text=" Back to SignIn"
          onPress={onSignInPressed}
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

export default NewPasswordScreen;
