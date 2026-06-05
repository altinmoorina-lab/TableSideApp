import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🍽️</Text>

        <Text style={styles.title}>TableSide</Text>

        <Text style={styles.subtitle}>
          Find and reserve the perfect table in seconds.
        </Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 50,
  },

  hero: {
    alignItems: 'center',
    marginTop: 80,
  },

  logo: {
    fontSize: 80,
    marginBottom: 15,
  },

  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#222',
  },

  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 28,
    paddingHorizontal: 10,
  },

  buttons: {
    marginBottom: 50,
  },

  loginButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 18,
    borderRadius: 16,
    marginBottom: 15,
  },

  loginText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  registerButton: {
    borderWidth: 2,
    borderColor: '#FF6B35',
    paddingVertical: 18,
    borderRadius: 16,
  },

  registerText: {
    color: '#FF6B35',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});