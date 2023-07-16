import { useContext, useState } from "react";
import {
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import IconInput from "../components/iconInput";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { ActiveOpacity } from "../util/constants";
import { theme } from "../util/theme";

const Login = ({ navigation }: { navigation: any }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [showError, setShowError] = useState(false);

    const { login } = useContext(AuthContext);

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme().colors.background },
            ]}>
            <KeyboardAvoidingView behavior="height">
                <View
                    style={{
                        width: 240,
                    }}>
                    {showError && error && <ErrorText text={error} />}
                    {showError && error && <View style={{ marginBottom: 5 }} />}
                </View>

                <IconInput
                    icon="account"
                    placeholder="Username"
                    value={username}
                    onChange={setUsername}
                    errorEmpty={showError && !username}
                />
                <IconInput
                    icon="lock"
                    placeholder="Password"
                    value={password}
                    onChange={setPassword}
                    style={{ marginTop: 10 }}
                    hidden={true}
                    errorEmpty={showError && !password}
                />

                <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.textContainer}>
                    <Text
                        style={{
                            color: theme().colors.dark,
                            marginVertical: 2,
                        }}>
                        Don't remember your password?
                    </Text>
                </TouchableOpacity>

                <Button
                    bgcolor={theme().colors.primary}
                    color={theme().colors.light}
                    text="Log in"
                    onPress={() => {
                        if (!username || !password) setShowError(true);
                        else
                            login(username, password).catch((err: any) => {
                                setShowError(true);
                                if (
                                    err.message ===
                                    "Request failed with status code 400"
                                )
                                    setError("Invalid email or password");
                                else if (
                                    err.message ===
                                    "Request failed with status code 403"
                                )
                                    setError("Account not activated");
                                else setError(err.message);
                            });
                    }}
                />

                <View style={styles.textContainer}>
                    <Text style={{ color: theme().colors.dark }}>
                        Don't have an account?
                    </Text>
                    <TouchableOpacity
                        activeOpacity={ActiveOpacity}
                        onPress={() => {
                            navigation.navigate("Register");
                            setShowError(false);
                            setError("");
                            setUsername("");
                            setPassword("");
                        }}>
                        <Text
                            bold={true}
                            color={theme().colors.secondary}
                            style={{
                                marginLeft: 5,
                            }}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    textContainer: {
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
});

export default Login;
