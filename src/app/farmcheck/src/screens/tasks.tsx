import { useContext } from "react";
import { View } from "react-native";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { theme } from "../util/theme";

const Tasks = () => {
    const { logout }: any = useContext(AuthContext);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <Text>Tasks Screen</Text>
        </View>
    );
};

export default Tasks;
