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
import Loader from "../../components/Loader";

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

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
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

  const myImage = (img) => {
    setImage(img);
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
        {loading ? <Loader start={loading} /> : null}
        <Text style={styles.title}>Update your profile</Text>
        <ProfileImageScreen setImage={(link) => myImage(link)} />
        <CustomInput
          name="name"
          placeholder="Name"
          onBlur={() => onSubmitName()}
          error={nameError}
          value={name}
          onChangeText={(txt) => setName(txt)}
        />

        <CustomInput
          name="email"
          placeholder="Email"
          onBlur={() => onSubmitEmail()}
          error={emailError}
          value={email}
          onChangeText={(txt) => setEmail(txt)}
        />

        <CustomInput
          name="password"
          placeholder="Password"
          error=""
          onChangeText={(txt) => setPassword(txt)}
          secureTextEntry
        />

        <CustomInput
          name="Age"
          placeholder="Age"
          error=""
          value={age}
          onChangeText={(txt) => setAge(txt)}
        />
        <CustomInput
          name="Height"
          placeholder="Height"
          error=""
          value={height}
          onChangeText={(txt) => setHeight(txt)}
        />
        <CustomInput
          name="Address"
          placeholder="Address"
          error=""
          value={address}
          onChangeText={(txt) => setAddress(txt)}
        />

        <CustomButtom
          text="Update"
          onPress={onUpdatePressed}
          disabled={email == "" || name == "" ? true : false}
          bgColor={
            email == "" || name == "" ? "gray" : "rgba(255, 147, 0, 255)"
          }
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
