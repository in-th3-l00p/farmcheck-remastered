import React, {useEffect, useState} from "react";
import useQuery from "../../hooks/useQuery";
import {Farm} from "../../utils/types";
import {getFarms} from "../../api/farm";
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";
import api from "../../api/api";
import {FARM_PAGE_SIZE} from "../../utils/contants";
import QueryHandler from "../../components/QueryHandler";

const Farms = () => {
    const [page, setPage] = useState<number>(0);
    const [farmCount, setFarmCount] = useState<number>(0);
    const [farms, setFarms] = useState<Farm[]>([]);
    const query = useQuery(async () => {
        setFarmCount((await api.get("/farm/all/count")).data);
        setFarms(await getFarms(page)); 
    });

    useEffect(() => {
        getFarms(page).then(setFarms);
    }, [page]);
 
    return (
        <QueryHandler query={query}>
            <div>
                <Link to="/farms/create"><Button>+</Button></Link>
                <ul>
                    {farms.map(farm => (
                        <li key={farm.id}>
                            <Link to={`/farms/${farm.id}`}>
                                <div>
                                    <h4>{farm.name}</h4>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>

                {Array.from(Array(Math.ceil(farmCount / FARM_PAGE_SIZE)).keys()).map(i => (
                    <Button 
                        key={i}
                        disabled={i === page}
                        onClick={() => setPage(i)}
                    >
                        {i + 1}
                    </Button>
                ))}
            </div>
        </QueryHandler>
    );
}

export default Farms;