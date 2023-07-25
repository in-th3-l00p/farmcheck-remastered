import { PaperProvider } from "react-native-paper";
import "text-encoding-polyfill";
import { AuthProvider } from "./src/context/authContext";
import { ChatProvider } from "./src/context/chatContext";
import { FarmProvider } from "./src/context/farmContext";
import { SensorProvider } from "./src/context/sensorContext";
import { TaskProvider } from "./src/context/taskContext";
import AppNavigation from "./src/navigation/appNavigation";
import { theme } from "./src/util/theme";
const App = () => {
    // const [fontLoaded, setFontLoaded] = useState(false);

    // useEffect(() => {
    //     Font.loadAsync({
    //         AnekLatinRegular: require("./assets/fonts/anekLatin/AnekLatinRegular.ttf"),
    //         AnekLatinBold: require("./assets/fonts/anekLatin/AnekLatinBold.ttf"),
    //     }).then(() => {
    //         setFontLoaded(true);
    //     });
    // }, []);

    // if (fontLoaded) return <Loading />;

    return (
        <PaperProvider theme={theme()}>
            <AuthProvider>
                <FarmProvider>
                    <SensorProvider>
                        <TaskProvider>
                            <ChatProvider>
                                <AppNavigation />
                            </ChatProvider>
                        </TaskProvider>
                    </SensorProvider>
                </FarmProvider>
            </AuthProvider>
        </PaperProvider>
    );
};

export default App;
