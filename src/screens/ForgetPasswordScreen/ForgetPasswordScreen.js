import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import React from "react";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";


const ForgetPasswordScreen = () => {

  const {
    control,
    handleSubmit,
  } = useForm();

  const navigation = useNavigation();

  const onSendPressed = () => {
    navigation.navigate('NewPassword');
  };

  const onSignInPressed = () => {
    navigation.navigate('SignIn');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        <Text style={styles.title}>Reset your Password</Text>

        <CustomInput
          name="username"
          placeholder="UserName"
          control={control}
          rules={{ required: "username is requirde" }}
        />

        <CustomButtom text="Send" onPress={handleSubmit( onSendPressed) } />

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

export default ForgetPasswordScreen;
