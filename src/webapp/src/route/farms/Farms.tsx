import React, {useEffect, useState} from "react";
import useQuery from "../../hooks/useQuery";
import {Farm} from "../../utils/types";
import {getFarms} from "../../api/farm";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import api from "../../api/api";
import {PAGE_SIZE} from "../../utils/contants";

const Farms = () => {
    const [page, setPage] = useState<number>(0);
    const [farmCount, setFarmCount] = useState<number>(0);
    const [farms, setFarms] = useState<Farm[]>([]);
    const [loading, error] = useQuery(async () => {
        setFarmCount((await api.get("/farm/all/count")).data);
        setFarms(await getFarms(page)); 
    });

    useEffect(() => {
        getFarms(page).then(setFarms);
    }, [page]);
 
    if (error)
        return <p>error</p>
    if (loading)
        return <p>loading...</p>
    return (
        <div>
            <Link to="/farms/create"><Button>+</Button></Link>
            <ul>
                {farms.map(farm => (
                    <li>
                        <Link to={`/farms/${farm.id}`}>
                            <div key={farm.id}>
                                <h4>{farm.name}</h4>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {Array.from(Array(Math.ceil(farmCount / PAGE_SIZE)).keys()).map(i => (
                <Button 
                    disabled={i === page}
                    onClick={() => setPage(i)}
                >
                    {i + 1}
                </Button>
            ))}
        </div>
    );
}

export default Farms;