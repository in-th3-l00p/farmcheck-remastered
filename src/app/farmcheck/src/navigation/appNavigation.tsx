import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { FarmContext } from "../context/farmContext";
import Loading from "../screens/loading";
import AuthStack from "./authStack";
import TabNavigator from "./tabNavigator";

const AppNavigation = () => {
    const { isLoading: authIsLoading, userToken } = useContext(AuthContext);
    const { isLoading: farmIsLoading } = useContext(FarmContext);

    if (authIsLoading) return <Loading />;

    return (
        <NavigationContainer>
            {userToken !== null ? <TabNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
};

export default AppNavigation;
