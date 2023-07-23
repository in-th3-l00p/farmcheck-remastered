import axios from "axios";
import { createContext, useState } from "react";
import {
    GetFarmUsersURL,
    GetFarmsCountURL,
    GetFarmsURL,
    PostFarmURL,
    PutUserRoleURL,
} from "../util/links";

export const FarmContext = createContext<any>(null);

export const FarmProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState(false);

    const create = (name: string, description: string, token: string) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);

            axios
                .post(
                    PostFarmURL,
                    {
                        name: name,
                        description: description,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    resolve(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    setIsLoading(false);
                });
        });
    };

    const getAll = (token: string, page: number) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);

            axios
                .get(GetFarmsURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: page,
                    },
                })
                .then((response) => {
                    resolve(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    setIsLoading(false);
                });
        });
    };

    const getUsers = (token: string, farmId: number) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);

            axios
                .get(GetFarmUsersURL, {
                    params: {
                        farmId: farmId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    resolve(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    setIsLoading(false);
                });
        });
    };

    const getCount = (token: string) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);

            axios
                .get(GetFarmsCountURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    resolve(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    setIsLoading(false);
                });
        });
    };

    const updateRole = (
        token: string,
        farmId: number,
        userId: number,
        role: string
    ) => {
        return new Promise((resolve, reject) => {
            setIsLoading(true);

            axios
                .put(PutUserRoleURL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        farmId: farmId,
                        userId: userId,
                        userRole: role,
                    },
                })
                .then((response) => {
                    resolve(response.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    reject(error);
                    setIsLoading(false);
                });
        });
    };

    return (
        <FarmContext.Provider
            value={{
                create,
                getAll,
                getUsers,
                getCount,
                updateRole,
                isLoading,
            }}>
            {children}
        </FarmContext.Provider>
    );
};
