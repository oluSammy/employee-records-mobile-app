import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthCOntext } from "../services/auth/auth.service";

const Login = () => {
  let passwordRef;
  // tobi@gmail.com
  // password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInFn, isLoginIn, error } = useContext(AuthCOntext);

  const signIn = () => {
    Keyboard.dismiss();
    signInFn(email, password);
  };

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <TouchableOpacity
        activeOpacity={1}
        onPress={Keyboard.dismiss}
        style={styles.root}
      >
        <>
          <View style={styles.imgContainer}>
            <Image
              source={{
                uri: "https://static.wikia.nocookie.net/dreamfiction/images/b/b7/E_Records_2017.png/revision/latest?cb=20181215234518",
              }}
              style={styles.logo}
            />
          </View>
          <View style={styles.loginBox}>
            <Text style={styles.title}>Login to your account</Text>
            <TextInput
              textContentType="emailAddress"
              selectionColor="#000"
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              blurOnSubmit={false}
              style={styles.input}
              placeholder="Email"
              onSubmitEditing={() => passwordRef.focus()}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              textContentType="password"
              selectionColor="#000"
              autoCapitalize="none"
              returnKeyType="done"
              blurOnSubmit={false}
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              ref={(ref) => (passwordRef = ref)}
              value={password}
              onChangeText={setPassword}
              onSubmitEditing={signIn}
            />
            <View style={styles.errorBox}>
              {error && <Text style={styles.errorText}>An Error occurred</Text>}
            </View>
            <TouchableOpacity
              style={styles.btn}
              activeOpacity={0.9}
              onPress={signIn}
            >
              {isLoginIn ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.textBtn}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  imgContainer: {
    marginTop: 70,
    alignItems: "center",
  },
  logo: {
    height: 80,
    width: 90,
  },
  title: {
    fontFamily: "Lato_700Bold",
    fontSize: 22,
    color: "#818181",
  },
  loginBox: {
    marginTop: 70,
    paddingHorizontal: "5%",
  },
  input: {
    height: 60,
    backgroundColor: "#ffffff",
    marginTop: 10,
    borderRadius: 11,
    paddingHorizontal: 20,
    fontFamily: "Lato_400Regular",
    color: "#000",
    fontSize: 18,
    marginBottom: 30,
  },
  btn: {
    backgroundColor: "#1E319D",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 40,
  },
  textBtn: {
    color: "#FFFFFF",
    fontFamily: "Lato_700Bold",
    fontSize: 20,
  },
  errorBox: {
    minHeight: 30,
  },
  errorText: {
    color: "red",
    fontSize: 15,
    fontFamily: "Lato_700Bold",
  },
});

export default Login;
