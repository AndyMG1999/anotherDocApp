export type userInfoDto = {
    userId:string,
    userName:string,
    email:string,
    phoneNumber:string,
    profileImage:any,
    emailConfirmed:boolean,
}

export const registerUser = async (username:string,email:string,password:string) => {
    const response = await fetch("http://localhost:5295/api/user/register",{
        method: "POST",
        headers:{ 'Content-Type': 'application/json', },
        body: JSON.stringify({
            userName: username,
            email: email,
            password: password,
        })
    });
    return response.ok;
}

export const loginUser = async (email:string,password:string) => {
    const response = await fetch("http://localhost:5295/api/user/login",{
        method: "POST",
        headers:{ 'Content-Type': 'application/json', },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });
    if (!response.ok) throw Error("Error Logging in User");
    const userData:userInfoDto = await response.json();
    return userData;
}

export const getUserInfo = async () => {
    try{
        const response = await fetch("http://localhost:5295/api/user/getUserInfo",{credentials: "include"});
        if(!response.ok) return null;
        const userInfo:userInfoDto = await response.json();
        console.log("UserInfo:",userInfo);
        return userInfo;
    }
    catch (error){
        console.log("No Account Logged In");
    }
}