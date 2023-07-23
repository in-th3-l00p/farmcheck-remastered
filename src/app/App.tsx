import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/context/authContext";
import { FarmProvider } from "./src/context/farmContext";
import { SensorProvider } from "./src/context/sensorContext";
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
                        <AppNavigation />
                    </SensorProvider>
                </FarmProvider>
            </AuthProvider>
        </PaperProvider>
    );
};

export default App;
