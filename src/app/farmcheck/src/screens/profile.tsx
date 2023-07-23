import { useContext, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import Button from "../components/button";
import ErrorText from "../components/errorText";
import IconInput from "../components/iconInput";
import Input from "../components/input";
import Text from "../components/text";
import { AuthContext } from "../context/authContext";
import { theme } from "../util/theme";
import { validateEmail } from "../util/validate";

const Profile = () => {
    const { userInfo, logout, update, userToken } = useContext(AuthContext);

    const [firstName, setFirstName] = useState(userInfo.firstName);
    const [lastName, setLastName] = useState(userInfo.lastName);
    const [username, setUsername] = useState(userInfo.username);
    const [email, setEmail] = useState(userInfo.email);
    const [showError, setShowError] = useState(false);
    const [error, setError] = useState("");
    const [emailValid, setEmailValid] = useState(true);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: theme().colors.background,
            }}>
            <Image
                source={require("../../assets/images/defaultProfile.png")}
                style={{
                    ...styles.image,
                    borderColor: theme().colors.secondary,
                }}
            />

            <View
                style={{
                    width: 240,
                }}>
                {showError && !emailValid && (
                    <ErrorText text="Email is not valid." />
                )}
                {showError && error && <ErrorText text={error} />}
                {showError && <View style={{ marginBottom: 5 }} />}
            </View>

            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}>
                <Input
                    placeholder="First name"
                    value={firstName}
                    onChange={setFirstName}
                    style={{ width: 120 }}
                    errorEmpty={showError && !firstName}
                    maxLength={20}
                />
                <Input
                    placeholder="Last name"
                    value={lastName}
                    onChange={setLastName}
                    style={{ width: 120, marginLeft: 10 }}
                    errorEmpty={showError && !lastName}
                    maxLength={20}
                />
            </View>

            <IconInput
                icon="account"
                placeholder="Username"
                value={username}
                onChange={setUsername}
                style={{ marginTop: 10 }}
                errorEmpty={showError && !username}
                maxLength={20}
            />

            <IconInput
                icon="email"
                placeholder="Email"
                value={email}
                onChange={setEmail}
                validate={validateEmail}
                onValidateChange={setEmailValid}
                style={{ marginTop: 10 }}
                errorEmpty={showError && !email}
            />

            <Button
                text="Save"
                style={{ marginTop: 20 }}
                onPress={() => {
                    setShowError(true);
                    update(userToken, username, firstName, lastName, email)
                        .then(() => {
                            logout();
                        })
                        .catch((error: any) => {
                            setError("Username or email already exists.");
                        });
                }}
            />

            <Text style={{ marginTop: 20 }}>or</Text>

            <Button
                text="Log out"
                style={{ marginTop: 20 }}
                onPress={() => {
                    logout();
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        marginBottom: 20,
    },
});

export default Profile;
