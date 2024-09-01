// screens/LoginScreen.js

import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Colors from '../utils/Colors';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} placeholderTextColor="#999" />
      <Pressable style={styles.loginButton} onPress={() => navigation.replace('HomeScreen')}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.WhiteBlue100,
    padding: 20,
  },
  title: {
    fontFamily: 'Manrope_700Bold',
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: Colors.White700,
    borderRadius: 5,
    fontFamily: 'Manrope_400Regular',
    color: 'black',
    fontSize: 16,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: 'black',
    marginTop: 20,
  },
  loginButtonText: {
    color: Colors.White700,
    fontFamily: 'Manrope_700Bold',
    fontSize: 16,
  },
  signupText: {
    marginTop: 20,
    color: 'black',
    fontFamily: 'Manrope_400Regular',
    fontSize: 14,
  },
});

export default LoginScreen;
