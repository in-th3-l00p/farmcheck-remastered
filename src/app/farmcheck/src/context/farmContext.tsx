import axios from "axios";
import { createContext, useState } from "react";
import { GetFarmsURL, PostFarmURL } from "../util/links";

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

    return (
        <FarmContext.Provider value={{ create, getAll, isLoading }}>
            {children}
        </FarmContext.Provider>
    );
};
