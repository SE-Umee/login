import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";

const CustomInPut = ({
  control,
  rules = {},
  name,
  placeholder,
  secureTextEntry,
  onChangeText,
  inputValue,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View
            style={[
              styles.container,
              { borderColor: error ? "red" : "#e8e8e8" },
            ]}
          >
            <TextInput
              styles={styles.inputtext}
              placeholder={placeholder}
              value={inputValue}
              onChangeText={(txt) => onChangeText(txt)}
              onBlur={onBlur}
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
            />
          </View>
          {error && (
            <Text style={{ color: "red", alignSelf: "stretch" }}>
              {error.message || "Error"}
            </Text>
          )}
        </>
      )}
    />
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
