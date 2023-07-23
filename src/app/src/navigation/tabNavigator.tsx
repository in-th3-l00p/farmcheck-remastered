import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Wiki from "../screens/wiki";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";
import FarmStack from "./farmStack";

const Tab = createBottomTabNavigator();

const TabBarButton = ({
    children,
    onPress,
}: {
    children: any;
    onPress: () => void;
}) => {
    return (
        <TouchableOpacity
            activeOpacity={ActiveOpacity}
            onPress={onPress}
            style={{
                ...styles.buttonContainer,
                ...styles.shadow,
                shadowColor: theme().colors.grey,
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
            }}>
            <View
                style={{
                    ...styles.button,
                    backgroundColor: theme().colors.primary,
                }}>
                {children}
            </View>
        </TouchableOpacity>
    );
};

const TabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    ...styles.tabBar,
                    ...styles.shadow,
                    shadowColor: theme().colors.grey,
                },
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <FAIcon
                                name="home"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                // style={{ marginLeft: 5 }}
                                size={24}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Farms"
                component={FarmStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <FAIcon
                                name="tractor"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={21}
                            />
                        </View>
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Tasks"
                component={Tasks}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="calendar-check"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={26}
                            />
                        </View>
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Wiki"
                component={Wiki}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="web"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={28}
                            />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View style={styles.icon}>
                            <MCIcon
                                name="account"
                                color={
                                    focused
                                        ? theme().colors.primary
                                        : theme().colors.grey
                                }
                                size={29}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        elevation: 5,
    },
    tabBar: {
        position: "absolute",
        bottom: 20,
        left: 15,
        right: 15,
        elevation: 0,
        backgroundColor: "#f2f2f2",
        borderRadius: 30,
        height: 60,
        paddingHorizontal: 10,
    },
    icon: {
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        top: -15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30,
        marginHorizontal: 10,
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default TabNavigator;
