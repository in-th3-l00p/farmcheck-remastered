import { createContext, useState } from "react";
import api from "../util/api";
import {
    GetFarmSensorsCountURL,
    GetFarmSensorsURL,
    GetSensorDataURL,
    PostSensorURL,
} from "../util/links";

export const SensorContext = createContext<any>(null);

export const SensorProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState(false);

    const create = (
        name: string,
        description: string,
        token: string,
        farmId: string
    ) => {
        return new Promise((resolve, reject) => {
            api.post(
                PostSensorURL,
                {
                    name: name,
                    description: description,
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

    const getAll = (token: string, farmId: number, page: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetFarmSensorsURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    farmId: farmId,
                    page: page,
                    pageSize: 6,
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

    const getCount = (token: string, farmId: number) => {
        return new Promise((resolve, reject) => {
            api.get(GetFarmSensorsCountURL, {
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

    const getData = (sensorId: string, token: string) => {
        return new Promise((resolve, reject) => {
            api.get(GetSensorDataURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    sensorId: sensorId,
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

    const deleteSensor = (token: string, sensorId: string) => {
        return new Promise((resolve, reject) => {
            api.delete(PostSensorURL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    sensorId: sensorId,
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
        <SensorContext.Provider
            value={{
                create,
                getAll,
                getCount,
                getData,
                deleteSensor,
                isLoading,
            }}>
            {children}
        </SensorContext.Provider>
    );
};
