import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import ProfileImageScreen from "../ProfileImageScreen/ProfileImageScreen";

import { API, getHeaders, PHOTO_BASE_URL } from "../../utils/helper";

const UpdateProfile = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [height, setHeight] = useState("");
  const [myData, setMydata] = useState("");
  const [userData, setUserData] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);
  // useEffect(() => {
  //   setName(userData.user?.name || "");
  //   setEmail(userData.user?.email || "aa");
  //   setAge(userData.user?.age || "");
  //   setAddress(userData.user?.address || "");
  //   setHeight(userData.user?.height || "");
  // }, [userData]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        setUserData(JSON.parse(value));
        let _value = JSON.parse(value);
        console.log("bjhsabcdhjsbchjsdbvcdhjsbvchdsbhjds", value);
        setName(_value?.user?.name || "");
        setEmail(_value.user.email || "");
        setAge(_value.user.age || "");
        setAddress(_value.user.address || "");
        setHeight(_value.user.height || "");
      }
    } catch (e) {
      // error reading value
    }
  };

  const Email_REGEX =
    /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  const { control, handleSubmit, watch } = useForm();

  const pwd = watch("password");

  const onUpdatePressed = () => {
    Alert.alert("Update Profile", "Do you want to update your Profile", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => updateProfile() },
    ]);
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
  const myImage = (img) => {
    setImage(img);
    console.log("immm", img);
  };
  const updateProfile = async () => {
    let _data = {
      name,
      age,
      height,
      profile: image,
      address,
      email,
      password,
    };
    console.log("hhhhhhhhvhggfcfg", _data);

    const header = await getHeaders(userData.token);
    try {
      if (true) {
        setLoading(true);
        await axios
          .get(`${API}/update`, _data, header)
          .then((response) => {
            if (response) {
              console.log("uuuuuuuuppp", JSON.stringify(response));
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
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.mainContaner}>
        <Text style={styles.title}>Update your profile</Text>
        <ProfileImageScreen setImage={(link) => myImage(link)} />
        <CustomInput
          name="name"
          placeholder="Name"
          control={control}
          inputValue={name}
          value={name}
        />

        <CustomInput
          name="email"
          placeholder="Email"
          control={control}
          inputValue={email}
          onChangeText={(txt) => setEmail(txt)}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          control={control}
          inputValue={password}
          onChangeText={(txt) => setPassword(txt)}
          secureTextEntry
        />

        <CustomInput
          name="Age"
          placeholder="Age"
          control={control}
          inputValue={age}
          onChangeText={(txt) => setAge(txt)}
        />
        <CustomInput
          name="Height"
          placeholder="Height"
          control={control}
          inputValue={height}
          onChangeText={(txt) => setHeight(txt)}
        />
        <CustomInput
          name="Address"
          placeholder="Address"
          control={control}
          inputValue={address}
          onChangeText={(txt) => setAddress(txt)}
        />

        <CustomButtom text="Update" onPress={handleSubmit(onUpdatePressed)} />

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
