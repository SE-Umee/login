import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { API, getHeaders, PHOTO_BASE_URL } from "../../utils/helper";

const HomeScreen = (props) => {
  const [search, setSearch] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState("");

  useEffect(() => {
    getData();
    // fetchAllUsers();
  }, []);
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("userData");
      if (value !== null) {
        setUserData(JSON.parse(value));
        fetchAllUsers(JSON.parse(value));
        console.log("sssssasasasas", JSON.parse(value));
      }
    } catch (e) {
      // error reading value
    }
  };
  const fetchAllUsers = async (value) => {
    const header = await getHeaders(value.token);
    console.log("hhhh", header);
    try {
      if (true) {
        setLoading(true);
        await axios
          .get(`${API}/all_users`, header)
          .then((response) => {
            if (response.data) {
              console.log("homeScreen", JSON.stringify(response));
              setAllUsers(response.data.data);
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

  const fetchSearchUsers = async (text) => {
    setSearch(text);
    const header = await getHeaders(userData.token);
    if (text.length > 1) {
      try {
        setLoading(true);
        await axios
          .get(`${API}/search/${text}`, header)
          .then((response) => {
            if (response.data) {
              console.log("searched", JSON.stringify(response));
              setSearchedUsers(response.data.data);
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
      } catch (error) {
        console.log("error2", error);
        setLoading(false);
      }
    }
  };

  const SearchBar = () => {
    return (
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={(txt) => fetchSearchUsers(txt)}
        />
      </View>
    );
  };

  const Card = ({ item }) => {
    return (
      <View style={styles.card}>
        <View style={styles.textBox}>
          <Image
            source={{ uri: `${PHOTO_BASE_URL}/${item.profile}` }}
            style={styles.img}
          />
        </View>
        <View style={styles.imgBox}>
          <Text style={styles.title}>
            {"Name: "}
            <Text style={styles.name}>{item.name}</Text>
          </Text>
          <Text style={styles.title}>
            Address:<Text style={styles.name}>{item.address}</Text>
          </Text>
          <Text style={styles.title}>
            Email:<Text style={styles.name}>{item.email}</Text>
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => props.navigation.navigate("UpdateProfile")}
        >
          <Image
            source={require("../../images/profile.png")}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        </TouchableOpacity>
        <View style={styles.searchRow}>
          <View style={{ flex: 0.8 }}>
            <SearchBar />
          </View>

          <View style={{ flex: 0.2 }}>
            <TouchableOpacity style={styles.searchBtn}>
              <Image
                source={require("../../images/search.png")}
                resizeMode="contain"
                style={{ width: "60%", height: "60%", alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {search.length == 1 && (
        <Text style={{ color: "red" }}>Minimum 2 characters requried</Text>
      )}

      {/* <FlatList data={search == '' ? data : search} renderItem={renderItem} key={(index) => index} keyExtractor={(item, index) => index} extraData={(item) => '_' + item.selected} contentContainerStyle={{paddingBottom: hp('20%')}} /> */}
      {search.length > 1 && searchedUsers.length < 1 && (
        <Text>No Data Found</Text>
      )}
      <View style={{ flex: 0.8 }}>
        <FlatList
          data={search == "" ? allUsers : searchedUsers}
          renderItem={({ item }) => {
            return <Card item={item} />;
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  searchContainer: {
    paddingHorizontal: 10,
    height: 55,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    marginVertical: 8,
    fontWeight: "bold",
    color: "#c1c1c1",
  },
  name: { fontSize: 16, fontWeight: "500", color: "#000" },
  card: {
    width: "100%",
    padding: 15,
    paddingVertical: 25,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  imgBox: { flex: 0.7, paddingHorizontal: 10, justifyContent: "center" },
  img: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: "skyblue",
    alignSelf: "center",
  },
  textBox: { flex: 0.3, alignItems: "center", justifyContent: "center" },
  searchBox: {
    flex: 0.2,
    // flexDirection: "row",
    // justifyContent: "space-between",
    // alignItems: "center",
  },
  searchBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  profile: {
    backgroundColor: "skyblue",
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
    marginBottom: 15,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default HomeScreen;
