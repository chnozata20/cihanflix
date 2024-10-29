import React from "react";

export const MainContext = React.createContext();

const MainContextProvider = (props) => {


  return (
    <MainContext.Provider value={{
    }}>
      {props.children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;