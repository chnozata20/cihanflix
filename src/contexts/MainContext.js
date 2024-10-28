import React, { useState, useEffect } from "react";

import en from "../locales/en.json";
import tr from "../locales/tr.json";

export const MainContext = React.createContext();

const MainContextProvider = (props) => {
  const [local, setLocal] = useState("english");
  const [langFile, setLangFile] = useState(local === "english" ? en : tr);
  const [alertList, setAlertList] = useState([]);
  const [tempArr, setTempArr] = useState([...alertList]);
  const [profileComp, setProfileComp] = useState(false);
  const [sideBar, setSideBar] = useState(true);
  const [activePage, setActivePage] = useState("dashboard-side");



  useEffect(() => {
    setLangFile(local === "english" ? en : tr);
  }, [local]);

  useEffect(() => {
    setTempArr(alertList);
  }, [alertList]);


  function AddAlert(status, text) {
    let temp = [...alertList];
    temp.push({ status: status, text: text })
    setAlertList([...temp])
  }
  function AddMultiAlert(alerts) {
    let temp = [...alertList];
    for (let i = 0; i < alerts.length; i++) {
      temp.push(alerts[i])
    }
    setAlertList([...temp])
  }


  return (
    <MainContext.Provider value={{
      langFile,
      setLocal,
      local,
      alertList,
      setAlertList,
      tempArr,
      setTempArr,
      profileComp,
      setProfileComp,
      sideBar,
      setSideBar,
      activePage,
      setActivePage,
      AddAlert,
      AddMultiAlert
    }}>
      {props.children}
    </MainContext.Provider>
  );
}

export default MainContextProvider;