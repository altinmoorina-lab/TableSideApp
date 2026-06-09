import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { resetPassword } from '@/services/table-side-api';

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleReset = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
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
          <Text style={styles.title}>Reset Password</Text>
        </View>

        <View style={styles.form}>
          {sent ? (
             <View style={styles.successBox}>
                <Text style={styles.successText}>If an account exists for {email}, a password reset link has been sent.</Text>
             </View>
          ) : (
            <>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#958B7F"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <Pressable style={styles.primaryButton} onPress={handleReset} disabled={loading}>
                <Text style={styles.primaryText}>{loading ? 'Sending...' : 'Send Reset Link'}</Text>
              </Pressable>
            </>
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Remember your password?</Text>
          <Link href="/login" asChild>
            <Pressable>
              <Text style={styles.footerLink}>Back to Login</Text>
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
  successBox: {
    padding: 16,
    backgroundColor: '#EBF4EC',
    borderRadius: 12,
  },
  successText: {
    color: '#19231F',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
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
