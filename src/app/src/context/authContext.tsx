import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../util/api";
import { createContext, useEffect, useState } from "react";
import { GetUserURL, PostLoginURL, PostRegisterURL } from "../util/links";

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [userToken, setUserToken] = useState<string | null>(null);
    const [userInfo, setUserInfo] = useState<any>(null);

    const login = (username: string, password: string) => {
        return new Promise((resolve, reject) => {
            // setIsLoading(true);

            api
                .post(PostLoginURL, {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    setUserToken(response.data);
                    AsyncStorage.setItem("userToken", response.data);

                    getUserInfo(response.data).catch((error) => {
                        console.log(error);
                        reject(error);
                    });

                    resolve(response.data);
                    // setIsLoading(false);
                })
                .catch((error) => {
                    // setIsLoading(false);
                    reject(error);
                });
        });
    };

    const register = (
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string
    ) => {
        return new Promise((resolve, reject) => {
            // setIsLoading(true);

            api
                .post(PostRegisterURL, {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                })
                .then((response) => {
                    resolve(response.data);
                    // setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                    console.log(error.response.data.message);
                    reject(error);
                    // setIsLoading(false);
                });
        });
    };

    const getUserInfo = (token: string) => {
        return new Promise((resolve, reject) => {
            // setIsLoading(true);

            api
                .get(GetUserURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUserInfo(response.data);
                    AsyncStorage.setItem(
                        "userInfo",
                        JSON.stringify(response.data)
                    );
                    resolve(response.data);
                    // setIsLoading(false);
                })
                .catch((error) => {
                    // setIsLoading(false);
                });
        });
    };

    const update = (
        token: string,
        username: string,
        firstName: string,
        lastName: string,
        email: string
    ) => {
        return new Promise((resolve, reject) => {
            axios
                .put(
                    GetUserURL,
                    {
                        username: username,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    setUserInfo(response.data);
                    resolve(response.data);
                    // setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    // setIsLoading(false);
                });
        });
    };

    const logout = () => {
        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem("userInfo");
        AsyncStorage.removeItem("userToken");
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setIsLoading(true);
            let userInfoRaw = await AsyncStorage.getItem("userInfo");
            const userTokenRaw = await AsyncStorage.getItem("userToken");
            userInfoRaw = JSON.parse(userInfoRaw || "{}");
            if (userInfoRaw !== null) {
                setUserInfo(userInfoRaw);
                setUserToken(userTokenRaw);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                login,
                logout,
                register,
                update,
                isLoading,
                userToken,
                userInfo,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
