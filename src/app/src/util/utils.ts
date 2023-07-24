export const stringToHexColor = (name: string) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash;
    }

    const color = (hash & 0x00ffffff).toString(16).toUpperCase();

    const hexColor = "#" + ("00000" + color).slice(-6);

    return hexColor;
};
