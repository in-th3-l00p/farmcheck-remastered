import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { artichokes } from "../../assets/wiki/pages/artichokes";
import { arugula } from "../../assets/wiki/pages/arugula";
import { asparagus } from "../../assets/wiki/pages/asparagus";
import { barley } from "../../assets/wiki/pages/barley";
import { beets } from "../../assets/wiki/pages/beets";
import { bell_pepper } from "../../assets/wiki/pages/bell_pepper";
import { broccoli } from "../../assets/wiki/pages/broccoli";
import { brussels_sprouts } from "../../assets/wiki/pages/brussels_sprouts";
import { cabbage } from "../../assets/wiki/pages/cabbage";
import { canola } from "../../assets/wiki/pages/canola";
import { carrot } from "../../assets/wiki/pages/carrot";
import { cauliflower } from "../../assets/wiki/pages/cauliflower";
import { celery } from "../../assets/wiki/pages/celery";
import { corn } from "../../assets/wiki/pages/corn";
import { cucumber } from "../../assets/wiki/pages/cucumber";
import { edamame } from "../../assets/wiki/pages/edamame";
import { eggplant } from "../../assets/wiki/pages/eggplant";
import { garlic } from "../../assets/wiki/pages/garlic";
import { green_beans } from "../../assets/wiki/pages/green_beans";
import { horseradish } from "../../assets/wiki/pages/horseradish";
import { jalapeno_pepper } from "../../assets/wiki/pages/jalapeno_pepper";
import { kale } from "../../assets/wiki/pages/kale";
import { kohlrabi } from "../../assets/wiki/pages/kohlrabi";
import { lettuce } from "../../assets/wiki/pages/lettuce";
import { okra } from "../../assets/wiki/pages/okra";
import { parsnip } from "../../assets/wiki/pages/parsnip";
import { peas } from "../../assets/wiki/pages/peas";
import { potato } from "../../assets/wiki/pages/potato";
import { pumpkin } from "../../assets/wiki/pages/pumpkin";
import { radish } from "../../assets/wiki/pages/radish";
import { rhubarb } from "../../assets/wiki/pages/rhubarb";
import { rutabaga } from "../../assets/wiki/pages/rutabaga";
import { spinach } from "../../assets/wiki/pages/spinach";
import { sweet_potato } from "../../assets/wiki/pages/sweet_potato";
import { swiss_chard } from "../../assets/wiki/pages/swiss_chard";
import { tomato } from "../../assets/wiki/pages/tomato";
import { turnip } from "../../assets/wiki/pages/turnip";
import { wheat } from "../../assets/wiki/pages/wheat";
import { winter_squash } from "../../assets/wiki/pages/winter_squash";
import { zucchini } from "../../assets/wiki/pages/zucchini";

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
    const [data, setData] = useState<Object[]>([]);
    const [hearts, setHearts] = useState<boolean[]>([]);

    useEffect(() => {
        const load = async () => {
            const newData = [
                {
                    name: "artichokes",
                    image: require("../../assets/wiki/images/artichokes2.png"),
                    file: artichokes,
                },
                {
                    name: "arugula",
                    image: require("../../assets/wiki/images/arugula2.png"),
                    file: arugula,
                },
                {
                    name: "asparagus",
                    image: require("../../assets/wiki/images/asparagus2.png"),
                    file: asparagus,
                },
                {
                    name: "barley",
                    image: require("../../assets/wiki/images/barley2.png"),
                    file: barley,
                },
                {
                    name: "beets",
                    image: require("../../assets/wiki/images/beets2.png"),
                    file: beets,
                },
                {
                    name: "bell_pepper",
                    image: require("../../assets/wiki/images/bell_pepper2.png"),
                    file: bell_pepper,
                },
                {
                    name: "broccoli",
                    image: require("../../assets/wiki/images/broccoli2.png"),
                    file: broccoli,
                },
                {
                    name: "brussels_sprouts",
                    image: require("../../assets/wiki/images/brussels_sprouts2.png"),
                    file: brussels_sprouts,
                },
                {
                    name: "cabbage",
                    image: require("../../assets/wiki/images/cabbage2.png"),
                    file: cabbage,
                },
                {
                    name: "canola",
                    image: require("../../assets/wiki/images/canola2.png"),
                    file: canola,
                },
                {
                    name: "carrot",
                    image: require("../../assets/wiki/images/carrot2.png"),
                    file: carrot,
                },
                {
                    name: "cauliflower",
                    image: require("../../assets/wiki/images/cauliflower2.png"),
                    file: cauliflower,
                },
                {
                    name: "celery",
                    image: require("../../assets/wiki/images/celery2.png"),
                    file: celery,
                },
                {
                    name: "corn",
                    image: require("../../assets/wiki/images/corn2.png"),
                    file: corn,
                },
                {
                    name: "cucumber",
                    image: require("../../assets/wiki/images/cucumber2.png"),
                    file: cucumber,
                },
                {
                    name: "edamame",
                    image: require("../../assets/wiki/images/edamame2.png"),
                    file: edamame,
                },
                {
                    name: "eggplant",
                    image: require("../../assets/wiki/images/eggplant2.png"),
                    file: eggplant,
                },
                {
                    name: "garlic",
                    image: require("../../assets/wiki/images/garlic2.png"),
                    file: garlic,
                },
                {
                    name: "green_beans",
                    image: require("../../assets/wiki/images/green_beans2.png"),
                    file: green_beans,
                },
                {
                    name: "horseradish",
                    image: require("../../assets/wiki/images/horseradish2.png"),
                    file: horseradish,
                },
                {
                    name: "jalapeno_pepper",
                    image: require("../../assets/wiki/images/jalapeno_pepper2.png"),
                    file: jalapeno_pepper,
                },
                {
                    name: "kale",
                    image: require("../../assets/wiki/images/kale2.png"),
                    file: kale,
                },
                {
                    name: "kohlrabi",
                    image: require("../../assets/wiki/images/kohlrabi2.png"),
                    file: kohlrabi,
                },
                {
                    name: "lettuce",
                    image: require("../../assets/wiki/images/lettuce2.png"),
                    file: lettuce,
                },
                {
                    name: "okra",
                    image: require("../../assets/wiki/images/okra2.png"),
                    file: okra,
                },
                {
                    name: "parsnip",
                    image: require("../../assets/wiki/images/parsnip2.png"),
                    file: parsnip,
                },
                {
                    name: "peas",
                    image: require("../../assets/wiki/images/peas2.png"),
                    file: peas,
                },
                {
                    name: "potato",
                    image: require("../../assets/wiki/images/potato2.png"),
                    file: potato,
                },
                {
                    name: "pumpkin",
                    image: require("../../assets/wiki/images/pumpkin2.png"),
                    file: pumpkin,
                },
                {
                    name: "radish",
                    image: require("../../assets/wiki/images/radish2.png"),
                    file: radish,
                },
                {
                    name: "rhubarb",
                    image: require("../../assets/wiki/images/rhubarb2.png"),
                    file: rhubarb,
                },
                {
                    name: "rutabaga",
                    image: require("../../assets/wiki/images/rutabaga2.png"),
                    file: rutabaga,
                },
                {
                    name: "spinach",
                    image: require("../../assets/wiki/images/spinach2.png"),
                    file: spinach,
                },
                {
                    name: "sweet_potato",
                    image: require("../../assets/wiki/images/sweet_potato2.png"),
                    file: sweet_potato,
                },
                {
                    name: "swiss_chard",
                    image: require("../../assets/wiki/images/swiss_chard2.png"),
                    file: swiss_chard,
                },
                {
                    name: "tomato",
                    image: require("../../assets/wiki/images/tomato2.png"),
                    file: tomato,
                },
                {
                    name: "turnip",
                    image: require("../../assets/wiki/images/turnip2.png"),
                    file: turnip,
                },
                {
                    name: "wheat",
                    image: require("../../assets/wiki/images/wheat2.png"),
                    file: wheat,
                },
                {
                    name: "winter_squash",
                    image: require("../../assets/wiki/images/winter_squash2.png"),
                    file: winter_squash,
                },
                {
                    name: "zucchini",
                    image: require("../../assets/wiki/images/zucchini2.png"),
                    file: zucchini,
                },
            ];

            setData(newData);

            let heartsList = await AsyncStorage.getItem("hearts");
            if (heartsList !== null) {
                const newList = JSON.parse(heartsList);
                if (heartsList !== null) {
                    const updatedData = newData.map(
                        (item: any, index: number) => {
                            const heart = newList[index];
                            return { ...item, heart };
                        }
                    );

                    setData(updatedData);
                }
            }
        };

        load();
    }, []);

    return data;
};

export const saveData = (data: any) => {
    const hearts = data.map((item: any) => item.heart);
    AsyncStorage.setItem("hearts", JSON.stringify(hearts));
};
