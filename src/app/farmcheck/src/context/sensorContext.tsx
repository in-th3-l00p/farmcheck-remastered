import { createContext, useState } from "react";

export const SensorContext = createContext<any>(null);

export const SensorProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState(false);

    const create = (name: string, description: string, token: string) => {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    };

    const getAll = (token: string, farmId: number, page: number) => {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    };

    const getCount = (token: string, farmId: number) => {
        return new Promise((resolve, reject) => {
            resolve(0);
        });
    };

    return (
        <SensorContext.Provider value={{ create, getAll, getCount, isLoading }}>
            {children}
        </SensorContext.Provider>
    );
};
