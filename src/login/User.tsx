import React, { useState, useEffect } from "react";
import axios from "axios";

interface userObj {
  age_range: string;
  email: string;
  isNewMember: boolean;
  jwtToken: string;
  name: string;
  sex: string;
}

interface userState {
  userobj: userObj;
  setUser: React.Dispatch<
    React.SetStateAction<{
      age_range: string;
      email: string;
      isNewMember: boolean;
      jwtToken: string;
      name: string;
      sex: string;
    }>
  >;
}

const [userState, setUserState] = useState<userState | undefined>();

export function User(user: userObj) {
  //   const [userState, setUserState] = useState<userState | undefined>();

  //   useEffect(() => {
  //     (async () => {
  //       await setUserState(user);
  //     })();
  //     return () => {
  //       console.log();
  //     };
  //   });

  return <div className="User-Top-Container">user</div>;
}
export default User;
