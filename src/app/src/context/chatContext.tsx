import { createContext, useState } from "react";
import api from "../util/api";
import { GetChatCountURL, GetChatURL, PostChatURL } from "../util/links";

export const ChatContext = createContext<any>(null);

export const ChatProvider = ({ children }: { children: any }) => {
    const [isLoading, setIsLoading] = useState(false);

    const create = (
        name: string,
        description: string,
        token: string,
        farmId: string
    ) => {
        return new Promise((resolve, reject) => {
            api.post(
                PostChatURL,
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
            api.get(GetChatURL + farmId, {
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
            api.get(GetChatCountURL + farmId + "/count", {
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

    const deleteChat = (token: string, chatId: number) => {
        console.log(PostChatURL + "/" + chatId);
        return new Promise((resolve, reject) => {
            api.delete(PostChatURL + "/" + chatId, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
        <ChatContext.Provider
            value={{ create, getAll, getCount, deleteChat, isLoading }}>
            {children}
        </ChatContext.Provider>
    );
};
