import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FarmWindow from "../screens/farmWindow";
import Farms from "../screens/farms";

const Stack = createNativeStackNavigator();

const FarmStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Farms" component={Farms} />
            <Stack.Screen name="FarmWindow" component={FarmWindow} />
        </Stack.Navigator>
    );
};

export default FarmStack;
