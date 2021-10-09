import React, { useContext } from "react";
import AccountNavigator from "./AccountNavigatior";
import AppNavigator from "./AppNavigator";
import { AuthCOntext } from "../services/auth/auth.service";

const Navigation = () => {
  const { user } = useContext(AuthCOntext);

  return (
    <React.Fragment>
      {user ? <AppNavigator /> : <AccountNavigator />}
    </React.Fragment>
  );
};

export default Navigation;
