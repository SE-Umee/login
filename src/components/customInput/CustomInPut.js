import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState, useEffect } from "react";

const CustomInPut = ({
  placeholder,
  secureTextEntry = false,
  onChangeText,
  value,
  onBlur,
  error,
}) => {
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsError(error.length > 1 ? true : false);
  }, [error]);
  return (
    <>
      <View
        style={[styles.container, { borderColor: isError ? "red" : "#e8e8e8" }]}
      >
        <TextInput
          styles={styles.inputtext}
          placeholder={placeholder}
          value={value}
          onChangeText={(txt) => onChangeText(txt)}
          onBlur={onBlur}
          secureTextEntry={secureTextEntry}
          autoCapitalize="none"
        />
      </View>
      {isError && (
        <Text style={{ color: "red", alignSelf: "stretch" }}>{error}</Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: "100%",
    height: 60,
    borderColor: "#e8e8e8",
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 15,

    paddingHorizontal: 15,
    justifyContent: "center",
  },
  inputtext: {
    fontSize: 24,
    height: 60,
    backgroundColor: "red",
  },
});

export default CustomInPut;
