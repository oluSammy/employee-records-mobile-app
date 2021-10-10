import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthCOntext = createContext({});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [error, setError] = useState(null);

  const signInFn = async (email, password) => {
    try {
      setIsLoginIn(true);
      setError(null);
      const { data } = await axios.post(
        "https://powerful-stream-15446.herokuapp.com/api/admin/login",
        {
          email,
          password,
        }
      );
      setUser(data.success.token);
      setIsLoginIn(false);
    } catch (e) {
      setIsLoginIn(false);
      setError(e.response);
    }
  };

  return (
    <AuthCOntext.Provider value={{ user, isLoginIn, signInFn, error, setUser }}>
      {props.children}
    </AuthCOntext.Provider>
  );
};

export default AuthProvider;
