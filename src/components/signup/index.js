import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
import {db,auth} from '../../database/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Signup({}){

  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isValid, setIsValid] = useState(false);

  const validateForm = () => {
    let valid = true;
    setIsModalVisible(false);
    setModalMessage('');

    if (!email) {
      setModalMessage('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setModalMessage('Please enter a valid email');
      valid = false;
    }

    if (!password) {
      setModalMessage('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setModalMessage('Password must be at least 6 characters');
      valid = false;
    }

    if (!username) {
      setModalMessage('Username is required');
      valid = false;
    }

    if (!valid) {
      setIsValid(false);
      setIsModalVisible(true);
    }

    return valid;
  };
  const handleSignup = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      setLoading(true)

      await setDoc(doc(db, 'users', userId), {
        email,
        username,
        createdAt: serverTimestamp(),
      });

      setEmail('');
      setPassword('');
      setUsername('');
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Signup error:", error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <ImageBackground source={require('../../../assets/Pets-bg.jpg')} style={styles.container}>
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#2856ad" />
            <Text style={styles.loadingText}>Please wait. Registering your account.....</Text>
          </View>
        )}
        <View style={styles.signupView}>
          <Text style={styles.header}>Sign up</Text>
          <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
          />

          <TouchableOpacity
            style={[styles.signbutton, { opacity: loading || !email || !password || !username ? 0.5 : 1 }]}
            onPress={handleSignup}
            disabled={loading || !email || !password || !username}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.subheader}>Already have an account? </Text>
            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => setIsModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Error</Text>
              <Text style={styles.modalText}>{modalMessage}</Text>
              <TouchableOpacity style={styles.button} onPress={() => setIsModalVisible(false)}>
                <Text style={styles.buttonText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
    </ImageBackground>
  );
};

