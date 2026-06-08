import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useTableSide } from '@/context/table-side-context';

export default function RegisterScreen() {
  const router = useRouter();
  const { signUp } = useTableSide();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    await signUp(name || 'Altin Morina', email || 'altin@example.com', password || 'password123');
    setLoading(false);
    router.replace('/');
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.content}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>TableSide</Text>
          <Text style={styles.title}>Create account</Text>
        </View>

        <View style={styles.form}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            placeholderTextColor="#958B7F"
            style={styles.input}
          />
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#958B7F"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            placeholderTextColor="#958B7F"
            secureTextEntry
            style={styles.input}
          />
          <Pressable style={styles.primaryButton} onPress={handleRegister} disabled={loading}>
            <Text style={styles.primaryText}>{loading ? 'Creating...' : 'Join TableSide'}</Text>
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already joined?</Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text style={styles.footerLink}>Sign in</Text>
            </Pressable>
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F2EA',
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    paddingBottom: 36,
    gap: 22,
  },
  header: {
    gap: 8,
  },
  logo: {
    color: '#8D5A12',
    fontSize: 13,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  title: {
    color: '#171A17',
    fontSize: 32,
    fontWeight: '900',
  },
  form: {
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    padding: 18,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFE6DA',
  },
  input: {
    borderRadius: 17,
    backgroundColor: '#F7F2EA',
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: '#171A17',
    fontSize: 16,
    fontWeight: '700',
  },
  primaryButton: {
    borderRadius: 17,
    backgroundColor: '#19231F',
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  primaryText: {
    color: '#FFF8EA',
    fontSize: 15,
    fontWeight: '900',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 7,
  },
  footerText: {
    color: '#777166',
    fontSize: 15,
    fontWeight: '700',
  },
  footerLink: {
    color: '#8D5A12',
    fontSize: 15,
    fontWeight: '900',
  },
});
