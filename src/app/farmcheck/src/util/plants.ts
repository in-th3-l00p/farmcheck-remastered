import { useEffect, useState } from "react";

export const plants = [
    "artichokes",
    "arugula",
    "asparagus",
    "barley",
    "beets",
    "bell_pepper",
    "broccoli",
    "brussels_sprouts",
    "cabbage",
    "canola",
    "carrot",
    "cauliflower",
    "celery",
    "corn",
    "cucumber",
    "edamame",
    "eggplant",
    "garlic",
    "green_beans",
    "horseradish",
    "jalapeno_pepper",
    "kale",
    "kohlrabi",
    "lettuce",
    "okra",
    "parsnip",
    "peas",
    "potato",
    "pumpkin",
    "radish",
    "rhubarb",
    "rutabaga",
    "spinach",
    "sweet_potato",
    "swiss_chard",
    "tomato",
    "turnip",
    "wheat",
    "winter_squash",
    "zucchini",
];

export const loadData = () => {
    const [data, setData] = useState<any>([]);

    useEffect(() => {
        const load = async () => {
            const newData = [
                {
                    name: "artichokes",
                    image: require("../../assets/wiki/images/artichokes2.png"),
                    file: "../../assets/wiki/pages/artichokes.md",
                },
                {
                    name: "arugula",
                    image: require("../../assets/wiki/images/arugula2.png"),
                    file: "../../assets/wiki/pages/arugula.md",
                },
                {
                    name: "asparagus",
                    image: require("../../assets/wiki/images/asparagus2.png"),
                    file: "../../assets/wiki/pages/asparagus.md",
                },
                {
                    name: "barley",
                    image: require("../../assets/wiki/images/barley2.png"),
                    file: "../../assets/wiki/pages/barley.md",
                },
                {
                    name: "beets",
                    image: require("../../assets/wiki/images/beets2.png"),
                    file: "../../assets/wiki/pages/beets.md",
                },
                {
                    name: "bell_pepper",
                    image: require("../../assets/wiki/images/bell_pepper2.png"),
                    file: "../../assets/wiki/pages/bell_pepper.md",
                },
                {
                    name: "broccoli",
                    image: require("../../assets/wiki/images/broccoli2.png"),
                    file: "../../assets/wiki/pages/broccoli.md",
                },
                {
                    name: "brussels_sprouts",
                    image: require("../../assets/wiki/images/brussels_sprouts2.png"),
                    file: "../../assets/wiki/pages/brussels_sprouts.md",
                },
                {
                    name: "cabbage",
                    image: require("../../assets/wiki/images/cabbage2.png"),
                    file: "../../assets/wiki/pages/cabbage.md",
                },
                {
                    name: "canola",
                    image: require("../../assets/wiki/images/canola2.png"),
                    file: "../../assets/wiki/pages/canola.md",
                },
                {
                    name: "carrot",
                    image: require("../../assets/wiki/images/carrot2.png"),
                    file: "../../assets/wiki/pages/carrot.md",
                },
                {
                    name: "cauliflower",
                    image: require("../../assets/wiki/images/cauliflower2.png"),
                    file: "../../assets/wiki/pages/cauliflower.md",
                },
                {
                    name: "celery",
                    image: require("../../assets/wiki/images/celery2.png"),
                    file: "../../assets/wiki/pages/celery.md",
                },
                {
                    name: "corn",
                    image: require("../../assets/wiki/images/corn2.png"),
                    file: "../../assets/wiki/pages/corn.md",
                },
                {
                    name: "cucumber",
                    image: require("../../assets/wiki/images/cucumber2.png"),
                    file: "../../assets/wiki/pages/cucumber.md",
                },
                {
                    name: "edamame",
                    image: require("../../assets/wiki/images/edamame2.png"),
                    file: "../../assets/wiki/pages/edamame.md",
                },
                {
                    name: "eggplant",
                    image: require("../../assets/wiki/images/eggplant2.png"),
                    file: "../../assets/wiki/pages/eggplant.md",
                },
                {
                    name: "garlic",
                    image: require("../../assets/wiki/images/garlic2.png"),
                    file: "../../assets/wiki/pages/garlic.md",
                },
                {
                    name: "green_beans",
                    image: require("../../assets/wiki/images/green_beans2.png"),
                    file: "../../assets/wiki/pages/green_beans.md",
                },
                {
                    name: "horseradish",
                    image: require("../../assets/wiki/images/horseradish2.png"),
                    file: "../../assets/wiki/pages/horseradish.md",
                },
                {
                    name: "jalapeno_pepper",
                    image: require("../../assets/wiki/images/jalapeno_pepper2.png"),
                    file: "../../assets/wiki/pages/jalapeno_pepper.md",
                },
                {
                    name: "kale",
                    image: require("../../assets/wiki/images/kale2.png"),
                    file: "../../assets/wiki/pages/kale.md",
                },
                {
                    name: "kohlrabi",
                    image: require("../../assets/wiki/images/kohlrabi2.png"),
                    file: "../../assets/wiki/pages/kohlrabi.md",
                },
                {
                    name: "lettuce",
                    image: require("../../assets/wiki/images/lettuce2.png"),
                    file: "../../assets/wiki/pages/lettuce.md",
                },
                {
                    name: "okra",
                    image: require("../../assets/wiki/images/okra2.png"),
                    file: "../../assets/wiki/pages/okra.md",
                },
                {
                    name: "parsnip",
                    image: require("../../assets/wiki/images/parsnip2.png"),
                    file: "../../assets/wiki/pages/parsnip.md",
                },
                {
                    name: "peas",
                    image: require("../../assets/wiki/images/peas2.png"),
                    file: "../../assets/wiki/pages/peas.md",
                },
                {
                    name: "potato",
                    image: require("../../assets/wiki/images/potato2.png"),
                    file: "../../assets/wiki/pages/potato.md",
                },
                {
                    name: "pumpkin",
                    image: require("../../assets/wiki/images/pumpkin2.png"),
                    file: "../../assets/wiki/pages/pumpkin.md",
                },
                {
                    name: "radish",
                    image: require("../../assets/wiki/images/radish2.png"),
                    file: "../../assets/wiki/pages/radish.md",
                },
                {
                    name: "rhubarb",
                    image: require("../../assets/wiki/images/rhubarb2.png"),
                    file: "../../assets/wiki/pages/rhubarb.md",
                },
                {
                    name: "rutabaga",
                    image: require("../../assets/wiki/images/rutabaga2.png"),
                    file: "../../assets/wiki/pages/rutabaga.md",
                },
                {
                    name: "spinach",
                    image: require("../../assets/wiki/images/spinach2.png"),
                    file: "../../assets/wiki/pages/spinach.md",
                },
                {
                    name: "sweet_potato",
                    image: require("../../assets/wiki/images/sweet_potato2.png"),
                    file: "../../assets/wiki/pages/sweet_potato.md",
                },
                {
                    name: "swiss_chard",
                    image: require("../../assets/wiki/images/swiss_chard2.png"),
                    file: "../../assets/wiki/pages/swiss_chard.md",
                },
                {
                    name: "tomato",
                    image: require("../../assets/wiki/images/tomato2.png"),
                    file: "../../assets/wiki/pages/tomato.md",
                },
                {
                    name: "turnip",
                    image: require("../../assets/wiki/images/turnip2.png"),
                    file: "../../assets/wiki/pages/turnip.md",
                },
                {
                    name: "wheat",
                    image: require("../../assets/wiki/images/wheat2.png"),
                    file: "../../assets/wiki/pages/wheat.md",
                },
                {
                    name: "winter_squash",
                    image: require("../../assets/wiki/images/winter_squash2.png"),
                    file: "../../assets/wiki/pages/winter_squash.md",
                },
                {
                    name: "zucchini",
                    image: require("../../assets/wiki/images/zucchini2.png"),
                    file: "../../assets/wiki/pages/zucchini.md",
                },
            ];

            setData(newData);
        };

        load();
    }, []);

    // const fillMarkdownData = async (data: any) => {
    //     const newData = [];

    //     for (let i = 0; i < data.length; i++) {
    //         const item = data[i];
    //         try {
    //             const content = await RNFS.readFile(item.file);
    //             const filledItem = { ...item, file: content };
    //             newData.push(filledItem);
    //         } catch (error) {
    //             console.error(`Error reading file ${item.file}:`, error);
    //         }
    //     }
    //     return newData;
    // };

    return data;
};
