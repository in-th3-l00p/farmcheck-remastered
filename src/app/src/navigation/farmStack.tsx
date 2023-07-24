import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "../screens/chat";
import FarmWindow from "../screens/farmWindow";
import Farms from "../screens/farms";
import Sensors from "../screens/sensors";
import Settings from "../screens/settings";
import Tasks from "../screens/tasks";

const Stack = createNativeStackNavigator();

const FarmStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="List" component={Farms} />
            <Stack.Screen name="Window" component={FarmWindow} />
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Sensors" component={Sensors} />
            <Stack.Screen name="Tasks" component={Tasks} />
            <Stack.Screen name="Settings" component={Settings} />
        </Stack.Navigator>
    );
};

export default FarmStack;
