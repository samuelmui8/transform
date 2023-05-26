import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  let name;
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    name = user.displayName;
    // console.log("name: " + name)
  } else {
    name = null;
  }

  const handleLogout = () => {
    signOut(auth).then(() => {
      alert("Signed out.")
      navigation.navigate("Login");
    }).catch(error => alert(error.message));
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Home Page
        </Text>
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ccc',
            borderBottomWidth: 1,
            paddingBottom: 8,
            marginBottom: 25,
          }}>
          <Text>Welcome, {name} </Text>
        </View>


        <TouchableOpacity
          onPress={handleLogout}
          style={{ backgroundColor: '#6699CC', padding: 20, borderRadius: 10, marginBottom: 30 }}>
          <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 16, color: '#fff' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default HomeScreen