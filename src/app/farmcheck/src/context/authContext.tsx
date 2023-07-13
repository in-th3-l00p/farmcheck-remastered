import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
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

            axios
                .post(PostLoginURL, {
                    username: username,
                    password: password,
                })
                .then((response) => {
                    setUserToken(response.data);
                    AsyncStorage.setItem("userToken", response.data);

                    getUserInfo(response.data).catch((error) => {
                        console.log(error);
                        throw error;
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
        console.log(username, firstName, lastName, email, password);
        return new Promise((resolve, reject) => {
            // setIsLoading(true);

            axios
                .post(PostRegisterURL, {
                    username: username,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                })
                .then((response) => {
                    // setUserInfo(response.data);
                    // setUserToken(response.data.token);
                    // AsyncStorage.setItem("userToken", response.data.token);
                    // AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
                    resolve(response.data);
                    // setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    // setIsLoading(false);
                });
        });
    };

    const getUserInfo = (token: string) => {
        return new Promise((resolve, reject) => {
            // setIsLoading(true);

            axios
                .get(GetUserURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    setUserInfo(response.data);
                    AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
                    resolve(response.data);
                    // setIsLoading(false);
                })
                .catch((error) => {
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
            let userInfo = await AsyncStorage.getItem("userInfo");
            const userToken = await AsyncStorage.getItem("userToken");
            userInfo = JSON.parse(userInfo === null ? "{}" : userInfo);
            if (userInfo !== null) {
                setUserInfo(userInfo);
                setUserToken(userToken);
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
                isLoading,
                userToken,
                userInfo,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
