import React, {useContext, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import QueryHandler from "../../components/QueryHandler";
import useQuery from "../../hooks/useQuery";
import {FarmRole, FarmUser} from "../../utils/types";
import api from "../../api/api";
import {getFarmUsers, updateUserRole} from "../../api/farm";
import {PAGE_SIZE} from "../../utils/contants";
import AuthContext from "../../context/AuthContext";

const Users = () => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const params = useParams();

    const [page, setPage] = useState<number>(0);
    const [userCount, setUserCount] = useState<number>(0);
    const [users, setUsers] = useState<FarmUser[]>([]);
    const [currentRole, setCurrentRole] = useState<FarmRole>();
    const query = useQuery(async () => {
        setUserCount((await api.get("/farm/users/count", {params: {farmId: params.id}})).data);
        // @ts-ignore
        setUsers(await getFarmUsers(params.id, page));
        setCurrentRole(users.find(user => user.id === auth.user?.id)?.role);
    });

    const [selectedUserIndex, setSelectedUserIndex] = useState<number>(-1);
    const [showRoleModal, setShowRoleModal] = useState<boolean>(false);
    const [role, setRole] = useState<FarmRole>("WORKER");

    return (
        <>
            <Modal show={showRoleModal} onHide={() => setShowRoleModal(false)}>
                <Modal.Header>Change user role</Modal.Header>
                <Modal.Body>
                    <Form.Select onChange={(event) => {
                        // @ts-ignore
                        setRole(event.target.value);
                    }}>
                        <option>WORKER</option>
                        <option>ADMIN</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { 
                        // @ts-ignore
                        updateUserRole(params.id, users[selectedUserIndex].id, role) 
                            .then(() => window.location.reload())
                    }}>
                        Save
                    </Button>
                    <Button variant="danger" onClick={() => setShowRoleModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
            <QueryHandler query={query}>
                <h1>Users</h1>
                <Button onClick={() => navigate(-1)}>Back</Button>

                <ul>
                    {users.map((user, index) => (
                        <li key={user.id}>
                            <p>{user.username}</p>
                            <p className="me-auto">{user.email}</p>
                            <p>{user.role}</p>
                            {(
                                user.id !== auth.user?.id && 
                                user.role != "OWNER" && 
                                currentRole !== "WORKER"
                            ) && (
                                <>
                                    <Button onClick={() => {
                                        setSelectedUserIndex(index);
                                        setShowRoleModal(true);
                                    }}>Change role</Button>
                                    <Button variant="danger">Remove</Button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>

                {Array.from(Array(Math.ceil(userCount / PAGE_SIZE)).keys()).map(i => (
                    <Button 
                        key={i}
                        disabled={i === page}
                        onClick={() => setPage(i)}
                    >
                        {i + 1}
                    </Button>
                ))}
            </QueryHandler>
        </>
    );
}

export default Users;