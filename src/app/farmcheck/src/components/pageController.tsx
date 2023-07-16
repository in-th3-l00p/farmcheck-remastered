import { TouchableOpacity, View } from "react-native";
import { IconButton } from "react-native-paper";
import { theme } from "../util/theme";
import Grid from "./grid";
import Text from "./text";

const PageController = ({
    max,
    page,
    setPage,
    click,
    width = 80,
}: {
    max: number;
    page: number;
    setPage: any;
    click?: any;
    width?: number;
}) => {
    let size = max + 2;
    let minSize = 2;
    if (size > 8) size = 8;
    if (max > 12) width = 90;

    return (
        <View
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
                marginTop: -10,
            }}>
            <Grid
                container
                style={{
                    width: width + "%",
                }}>
                <Grid size={minSize}>
                    <IconButton
                        icon="chevron-left"
                        iconColor={theme().colors.grey}
                        onPress={() => {
                            if (page > 0) {
                                setPage(page - 1);

                                if (click !== undefined) click();
                            }
                        }}
                    />
                </Grid>
                <Grid
                    size={size}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                    }}>
                    {Array(max + 1)
                        .fill(0)
                        .map((_, index) => (
                            <TouchableOpacity
                                activeOpacity={0.5}
                                key={index}
                                onPress={() => {
                                    setPage(index);

                                    if (click !== undefined) click();
                                }}>
                                <Text
                                    fontSize={16}
                                    color={
                                        index === page
                                            ? theme().colors.secondary
                                            : theme().colors.grey
                                    }
                                    bold>
                                    {index + 1}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </Grid>
                <Grid size={minSize}>
                    <IconButton
                        icon="chevron-right"
                        iconColor={theme().colors.grey}
                        onPress={() => {
                            if (page < max) {
                                setPage(page + 1);

                                if (click !== undefined) click();
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </View>
    );
};

export default PageController;
