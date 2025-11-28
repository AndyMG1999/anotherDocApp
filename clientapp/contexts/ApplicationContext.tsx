import { createContext, useState } from "react";

interface ApplicationContextType {
  userInfo: any;
  setUserInfo: (value: any) => void;
}
export const AppContext = createContext<ApplicationContextType>({
    userInfo: null,
    setUserInfo: ()=>{},
});

type Prop = {
    children:React.ReactNode
}
const ApplicationContext = (prop:Prop) => {
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

export default ApplicationContext;