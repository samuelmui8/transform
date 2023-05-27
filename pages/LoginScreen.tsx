import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            // const user = userCredential.user;
            navigation.navigate('Home');
        })
        .catch(error => alert(error.message));
    }

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
            <View style={{ paddingHorizontal: 25 }}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: '500',
                        color: '#333',
                        marginBottom: 30,
                    }}>
                    Login Page
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>
                    <TextInput
                        placeholder='Email'
                        keyboardType='email-address'
                        onChangeText={text => setEmail(text)}
                        style={{
                            flex: 1,
                            paddingVertical: 0,
                            
                        }} />
                </View>
                <View
                    style={{
                        flexDirection: 'row',
                        borderBottomColor: '#ccc',
                        borderBottomWidth: 1,
                        paddingBottom: 8,
                        marginBottom: 25,
                    }}>
                    <TextInput
                        placeholder='Password'
                        onChangeText={text => setPassword(text)}
                        style={{ flex: 1, paddingVertical: 0 }}
                        secureTextEntry={true}
                    />
                    <TouchableOpacity onPress={() => { }}>
                        <Text style={{ color: "#6699CC", fontWeight: '700' }}>Forgot?</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={handleLogin}
                    style={{ backgroundColor: '#6699CC', padding: 20, borderRadius: 10, marginBottom: 30 }}>
                    <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Login</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 30 }}>
                <Text>New to the app?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={{ color: '#6699CC', fontWeight: '700' }}> Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );


};


export default LoginScreen;