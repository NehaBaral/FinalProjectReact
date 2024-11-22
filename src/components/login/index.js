import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, Alert, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { db, auth } from '../../database/config';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function Login() {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            valid = false
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setModalMessage('Please enter a valid email');
            valid = false
        }

        if (!password) {
            setModalMessage('Password is required');
            valid = false
        } else if (password.length < 6) {
            setModalMessage('Password must be at least 6 characters');
            valid = false
        }

        if (!valid) {
            setIsValid(false);
            setIsModalVisible(true);
        }

        return valid;
    };
    const handleSignIn = async () => {
        if (!validateForm()) {
            console.log("invalidate")
            return;
        }

        setLoading(true);
        try {
            const user = await signInWithEmailAndPassword(email, password);
            if (user !== null) {
                navigation.navigate('MainTabs');
            } else {
                Alert.alert('Error', 'Failed to log in ');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to log in ');
        } finally {
            setLoading(false);
            setEmail("");
            setPassword("");
        }
    };


    return (
        <ImageBackground source={require('../../../assets/Pets-bg.jpg')} style={styles.container}>
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#2856ad" />
                    <Text style={styles.loadingText}>Please wait. Login.....</Text>
                </View>
            )}
            <View style={styles.signupView}>
                <Text style={styles.header}>Login</Text>
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
                    style={[styles.signbutton, { opacity: loading || !email || !password ? 0.5 : 1 }]}
                    onPress={handleSignIn}
                    disabled={loading || !email || !password}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <View style={styles.loginContainer}>
                    <Text style={styles.subheader}>Don't have an account? </Text>
                    <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Signup')}>
                        <Text style={styles.loginText}> Sign Up</Text>
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

