import UserContext from './UserContext';
import React, { useState } from 'react';

const UserState = (props) => {
  const [persist, setPersist] = useState(true);
  const [auth, setAuth] = useState({});

  return (
    <UserContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
