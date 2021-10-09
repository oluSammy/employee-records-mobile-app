import React, { createContext, useState } from "react";
import axios from "axios";

export const AuthCOntext = createContext({});

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoginIn, setIsLoginIn] = useState(false);
  const [error, setError] = useState(null);

  const signInFn = async () => {
    try {
      setIsLoginIn(true);
      const { data } = await axios.post(
        "https://powerful-stream-15446.herokuapp.com/api/admin/login",
        {
          email: "tobi@gmail.com",
          password: "password",
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
    <AuthCOntext.Provider value={{ user, isLoginIn, signInFn, error }}>
      {props.children}
    </AuthCOntext.Provider>
  );
};

export default AuthProvider;
