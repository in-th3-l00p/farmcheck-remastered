import { createContext, useState } from "react";
import api from "../util/api";
import {
    GetFarmTasksCountURL,
    GetFarmTasksURL,
    PostTaskURL,
} from "../util/links";

export const TaskContext = createContext<any>(null);

export const TaskProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState(false);

    const create = (
        name: string,
        description: string,
        deadline: string,
        important: boolean,
        token: string,
        farmId: string
    ) => {
        return new Promise((resolve, reject) => {
            api.post(
                PostTaskURL,
                {
                    name: name,
                    description: description,
                    deadline: deadline,
                    important: important,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        farmId: farmId,
                    },
                }
            )
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getAllFromFarm = (token: string, farmId: number, page: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetFarmTasksURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    farmId: farmId,
                    page: page,
                    pageSize: 5,
                },
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    const getCountFromFarm = (token: string, farmId: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetFarmTasksCountURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    farmId: farmId,
                },
            })
                .then((response) => {
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };

    return (
        <TaskContext.Provider
            value={{ create, getAllFromFarm, getCountFromFarm, isLoading }}>
            {children}
        </TaskContext.Provider>
    );
};
