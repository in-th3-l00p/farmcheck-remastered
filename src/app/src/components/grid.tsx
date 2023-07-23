import { View } from "react-native";

const Grid = ({
    children,
    size,
    style,
    container,
}: {
    children: any;
    size?: number;
    style?: any;
    container?: boolean;
}) => {
    if (size === undefined) size = 12;
    if (size < 1) size = 1;
    else if (size > 12) size = 12;

    if (container) {
        return (
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    width: "100%",

                    alignItems: "center",
                    justifyContent: "center",

                    position: "relative",

                    ...style,
                }}>
                {children}
            </View>
        );
    }

    return (
        <View style={{ width: `${size * 8.33}%`, ...style }}>{children}</View>
    );
};

export default Grid;
