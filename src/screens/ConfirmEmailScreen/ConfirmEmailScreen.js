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

const ConfirmEmailScreen = () => {
  const { control, handleSubmit } = useForm();

  const navigation = useNavigation();

  const onConfirmPressed = () => {
    navigation.navigate("Home");
  };

  const onReSendPressed = () => {
    console.warn("Resend Code ");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        <Text style={styles.title}>Conform Your Email</Text>

        <CustomInput
          name=" code"
          placeholder="Enter Your Confirmation Code"
          control={control}
          rules={{
            required: "Confirmation Code is requirde",
          }}
        />

        <CustomButtom text="Confirm" onPress={handleSubmit(onConfirmPressed)} />

        <CustomButtom
          text=" ReSend "
          onPress={onReSendPressed}
          type="SECONDARY"
        />

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

export default ConfirmEmailScreen;
