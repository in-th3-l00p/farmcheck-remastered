import React, {useContext, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import QueryHandler from "../../components/QueryHandler";
import useQuery from "../../hooks/useQuery";
import {FarmRole, FarmUser} from "../../utils/types";
import api from "../../api/api";
import {addFarmUser, deleteFarmUser, getFarmUsers, updateUserRole} from "../../api/farm";
import {PAGE_SIZE} from "../../utils/contants";
import AuthContext from "../../context/AuthContext";
import {getUser} from "../../api/user";

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
    const [showRemoveModal, setShowRemoveModal] = useState<boolean>(false);
    const [showAddModal, setShowAddModal] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");

    return (
        <>
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header>Add user</Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
                            onChange={(e) => setUsername(e.target.value)} 
                            value={username} 
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => {
                        getUser(username)
                            .then(user => {
                                // @ts-ignore
                                addFarmUser(params.id, user.id);
                            })
                            .then(() => window.location.reload());
                    }}>Add</Button>
                    <Button variant="danger" onClick={() => {
                        setUsername("");
                        setShowAddModal(false);
                    }}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showRemoveModal} onHide={() => setShowRemoveModal(false)}>
                <Modal.Header>Are you sure you want to delete this user?</Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => { 
                        // @ts-ignore
                        deleteFarmUser(params.id, users[selectedUserIndex].id) 
                            .then(() => window.location.reload())
                    }}>
                        Delete
                    </Button>
                    <Button onClick={() => setShowRemoveModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
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
                <Button onClick={() => setShowAddModal(true)}>+</Button>

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
                                    <Button 
                                        variant="danger"
                                        onClick={() => {
                                            setSelectedUserIndex(index);
                                            setShowRemoveModal(true);
                                        }}
                                    >
                                        Remove
                                    </Button>
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