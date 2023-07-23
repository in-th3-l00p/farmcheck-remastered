import { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { AuthContext } from "../context/authContext";
import { FarmContext } from "../context/farmContext";
import Button from "./button";
import Text from "./text";

interface UserProps {
    user: any;
    changable?: boolean;
    farmId: number;
}

const User = ({ user, changable, farmId }: UserProps) => {
    const { updateRole } = useContext(FarmContext);
    const { userToken } = useContext(AuthContext);
    const [role, setRole] = useState(user.role);

    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("../../assets/images/defaultAdmin.png")}
            />
            <View style={{ marginLeft: 15, justifyContent: "center" }}>
                <View style={{ display: "flex", flexDirection: "row" }}>
                    <Text bold fontSize={18}>
                        {user.username} {" -  "}
                    </Text>
                    {changable ? (
                        <Button
                            style={styles.button}
                            text={role}
                            width={80}
                            height={30}
                            onPress={() => {
                                if (role === "ADMIN") {
                                    updateRole(
                                        userToken,
                                        farmId,
                                        user.id,
                                        "WORKER"
                                    ).then(() => {
                                        setRole("WORKER");
                                    });
                                } else {
                                    updateRole(
                                        userToken,
                                        farmId,
                                        user.id,
                                        "ADMIN"
                                    ).then(() => {
                                        setRole("ADMIN");
                                    });
                                }
                            }}
                        />
                    ) : (
                        <Text fontSize={16} style={{ marginTop: 1.5 }}>
                            {user.role}
                        </Text>
                    )}
                </View>
                <Text fontSize={16}>
                    {user.firstName} {user.lastName}
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        width: 240,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
    },
    button: {
        marginTop: -2,
    },
});

export default User;
