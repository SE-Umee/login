import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";

const CustomButtom = ({
  onPress,
  text,
  type = "PRIMARY",
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.contanier,
        styles[`contanier_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {},
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  contanier: {
    width: "100%",
    padding: 15,
    marginVertical: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  contanier_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  contanier_SECONDARY:{
    borderColor:"#3B71F3",
    borderWidth:2
  },
  contanier_TERTIARY: {},
  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_SECONDARY:{
    color:"#3B71F3"
  },
  text_TERTIARY: {
    color: "gray",
  },

});

export default CustomButtom;
