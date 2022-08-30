import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomInput from "../../components/customInput";
import CustomButtom from "../../components/customButton/CustomButtom";
import SocialSignInButton from "../../components/SocialSignInButton";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import ProfileImageScreen from "../ProfileImageScreen/ProfileImageScreen";

import { API, getHeaders, PHOTO_BASE_URL } from "../../utils/helper";
import Loader from "../../components/Loader";

const UpdateProfile = (props) => {
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
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
        setName(_value?.user?.name || "");
        setEmail(_value.user.email || "");
        setAge(_value.user.age || "");
        setAddress(_value.user.address || "");
        setHeight(_value.user.height || "");
        setImage(`${API}/${_value.user.profile}`);
        console.log(
          ".....",
          value,
          "uuuuuRRRR",
          `${API}/${_value.user.profile}`
        );
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
          .post(`${API}/update`, _data, header)
          .then(async (response) => {
            if (response.data.status != false) {
              let _data = {
                user: {
                  name: response?.data.data?.user[0].name,
                  email: response?.data.data?.user[0].email,
                  age: response?.data.data?.user[0].age,
                  height: response?.data.data?.user[0].height,
                  address: response?.data.data?.user[0].address,
                  profile: response?.data.data?.user[0].profile,
                },
              };
              alert(response.data.message);
              setName(response?.data.data?.user[0].name || "");
              setEmail(response?.data.data?.user[0].email || "");
              setAge(response?.data.data?.user[0].age || "");
              setAddress(response?.data.data?.user[0].address || "");
              setHeight(response?.data.data?.user[0].height || "");
              setImage(`${API}/${response?.data.data?.user[0].profile}`);
              props.navigation.navigate("Home");
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
    } catch (e) {}
  };
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(JSON.stringify(_image));

    if (!_image.cancelled) {
      setImage(_image.uri);
      let imgs = "data:image/png;base64," + _image.base64;
      setImage(imgs);
    }
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 300 }}
    >
      <View style={styles.mainContaner}>
        {loading ? <Loader start={loading} /> : null}
        <Text style={styles.title}>Update your profile</Text>

        <View style={styles.container}>
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}

          <View style={styles.uploadBtnContainer}>
            <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
              <Text>{image ? "Edit" : "Upload"} Image</Text>
              <AntDesign name="camera" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
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
          disabled={
            email == "" ||
            name == "" ||
            age == "" ||
            height == "" ||
            address == ""
              ? true
              : false
          }
          bgColor={
            email == "" ||
            name == "" ||
            age == "" ||
            height == "" ||
            address == ""
              ? "gray"
              : "rgba(255, 147, 0, 255)"
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
  container: {
    elevation: 2,
    height: 200,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderRadius: 999,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UpdateProfile;
