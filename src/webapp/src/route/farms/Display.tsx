import React, {useState} from "react";
import useQuery from "../../hooks/useQuery";
import {Link, useParams} from "react-router-dom";
import {Farm} from "../../utils/types";
import QueryHandler from "../../components/QueryHandler";
import {getFarm} from "../../api/farm";
import {Button, Col, Container, Row} from "react-bootstrap";

const Farm = () => {
    const params = useParams();
    const [farm, setFarm] = useState<Farm>({} as Farm);
    const query = useQuery(async () => {
        // @ts-ignore
        setFarm(await getFarm(params.id));
    });

    return (
        <QueryHandler query={query}>
            <h1>{farm.name}</h1>
            <p>{farm.description}</p>
            {farm.createdAt !== undefined && (
                <p>Created at: {farm.createdAt.getDay()}-{farm.createdAt.getMonth()}-{farm.createdAt.getFullYear()}</p>
            )}

            <Container>
                <Row>
                    <Col><Link to={`/farms/${params.id}/users`}><Button>Users</Button></Link></Col>
                    <Col><Link to=""><Button>Sensors</Button></Link></Col>
                </Row>
                <Row>
                    <Col><Link to=""><Button>Chat</Button></Link></Col>
                    <Col><Link to={`/farms/${params.id}/tasks`}><Button>Tasks</Button></Link></Col>
                </Row>
            </Container>
        </QueryHandler>
    );
}

export default Farm;