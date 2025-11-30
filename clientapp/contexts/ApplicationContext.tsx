import { createContext, useState } from "react";
import { type userInfoDto } from "../services/accountServices";

interface ApplicationContextType {
  userInfo: userInfoDto | undefined;
  setUserInfo: (value: userInfoDto) => void;
}
export const AppContext = createContext<ApplicationContextType>({
    userInfo: undefined,
    setUserInfo: ()=>{},
});

type Prop = {
    children:React.ReactNode
}
export const ApplicationContextProvider = (prop:Prop) => {
    const [userInfo,setUserInfo] = useState<any>(null);
    const contextValues = {
        userInfo: userInfo,
        setUserInfo: (value:any) => setUserInfo(value)
    }
    return(
        <AppContext.Provider value={contextValues}>
            {prop.children}
        </AppContext.Provider>
    )
}