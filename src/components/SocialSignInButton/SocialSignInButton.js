import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomButtom from '../customButton/CustomButtom'

const SocialSignInButton = () => {

    const onSignInwithfacebook = () => {
        console.warn("SignIn with facebook");
      };
    
      const onSignInwithgoogle = () => {
        console.warn("SignIn with Google ");
      };
  return (
    <>
     <CustomButtom
          text="SignIn with Facecook"
          onPress={onSignInwithfacebook}
          bgColor="#E7EAF4"
          fgColor="#4765A9"
        />
        <CustomButtom
          text="SignIn with Google"
          onPress={onSignInwithgoogle}
          bgColor="#FAE9FA"
          fgColor="#DD4D44"
        />
      
    </>
  )
}

export default SocialSignInButton

const styles = StyleSheet.create({})