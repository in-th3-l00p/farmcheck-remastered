import React, {useEffect, useState} from "react";
import useQuery from "../../hooks/useQuery";
import {useNavigate, useParams} from "react-router-dom";
import QueryHandler from "../../components/QueryHandler";
import {Alert, Button, Container, Form} from "react-bootstrap";
import {getFarmRole, getFarmUsers} from "../../api/farm";
import {FarmRole, FarmUser, Task} from "../../utils/types";
import {PAGE_SIZE} from "../../utils/contants";
import api from "../../api/api";
import {createTask, getFarmTasks} from "../../api/task";

interface CreateTaskProps {
    farmId: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    userCount: number;
    users: FarmUser[];
}

const CreateTask: React.FC<CreateTaskProps> = ({ farmId, page, setPage, userCount, users }) => {
    const [checked, setChecked] = useState<boolean[]>(Array(userCount).map(() => false));
    const [error, setError] = useState<Error>();

    return (
        <Container className={"mb-3"}>
            <h2>Create a task</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                const data = e.target as typeof e.target & {
                    name: { value: string };
                    description: { value: string };
                    deadline: { value: string };
                    important: { checked: boolean };
                };
                const userIds: number[] = checked
                    .map((checked, index) => {
                        if (checked) 
                            return users[index].id;
                        return -1;
                    })
                    .filter(id => id !== -1);
                new Date(data.deadline.value);
                createTask(farmId, {
                    name: data.name.value,
                    description: data.description.value,
                    deadline: data.deadline.value,
                    important: data.important.checked,
                    userIds
                })
                    .then(() => window.location.reload())
                    .catch(setError)
            }}>
                {error && (
                    <Alert 
                        variant="danger" 
                        onClose={() => setError(undefined)} 
                        dismissible
                    >
                        {error.message}
                    </Alert>
                )}
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control name="name" type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" name="description" type="text" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control name="deadline" type="datetime-local" />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Important</Form.Label>
                    <Form.Check name="important" />
                </Form.Group>
                <div>
                    <p>Users:</p>
                    {users.map((user, index) => (
                        <Form.Check
                            key={user.id}
                            label={user.username}
                            checked={checked[index]}
                            onChange={(e) => {
                                let newChecked = [...checked];
                                newChecked[index] = e.target.checked;
                                setChecked(newChecked);
                            }}
                        />
                    ))}
                    {Array.from(Array(Math.ceil(userCount / PAGE_SIZE)).keys()).map(i => (
                        <Button 
                            key={i}
                            disabled={i === page}
                            onClick={() => setPage(i)}
                        >
                            {i + 1}
                        </Button>
                    ))}
                </div>
                <Button type="submit" className="mx-auto">Create</Button>
            </form>
        </Container>
    );
}

interface AllTasksProps {
    farmId: number;
}

const AllTasks: React.FC<AllTasksProps> = ({ farmId }) => {
    const [page, setPage] = useState<number>(0);
    const [taskCount, setTaskCount] = useState<number>(0);
    const [tasks, setTasks] = useState<Task[]>([]);
    const query = useQuery(async () => {
        setTaskCount((await api.get("/task/count", {params: {farmId}})).data);
        setTasks(await getFarmTasks(farmId, page));
    });

    return (
        <QueryHandler query={query}>
            <h2>All tasks</h2>
            {tasks.map(task => (
                <div key={task.id}>
                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <p>Deadline: {task.deadline.toUTCString()}</p>
                    <p>Created at: {task.createdAt.toUTCString()}</p>
                    <p>{task.important}</p>
                    <Button>See users' status</Button>
                    <Button variant="danger">Delete task</Button>
                </div>
            ))}
            {Array.from(Array(Math.ceil(taskCount / PAGE_SIZE)).keys()).map(i => (
                <Button 
                    key={i}
                    disabled={i === page}
                    onClick={() => setPage(i)}
                >
                    {i + 1}
                </Button>
            ))}
        </QueryHandler>
    )
};

interface CurrentTasksProps {
    farmId: number;
}

const Tasks = () => {
    const params = useParams();
    // @ts-ignore
    const farmId: number = params.id;
    const navigate = useNavigate();

    const [userRole, setUserRole] = useState<FarmRole>("WORKER");
    const [userCount, setUserCount] = useState<number>(0);
    const [page, setPage] = useState<number>(0);
    const [users, setUsers] = useState<FarmUser[]>([]);
    const query = useQuery(async () => {
        setUserRole((await getFarmRole(farmId)).role);
        setUserCount((await api.get("/farm/users/count", {params: {farmId: params.id}})).data);
        setUsers(await getFarmUsers(farmId, page));
    });

    useEffect(() => {
        if (farmId === undefined) navigate(-1);
    }, [])

    return (
        <QueryHandler query={query}>
            <Button onClick={() => navigate(-1)}>Back</Button>
            {userRole !== "WORKER" ? (
                <>
                    <CreateTask 
                        farmId={farmId}
                        page={page} 
                        setPage={setPage} 
                        userCount={userCount} 
                        users={users} 
                    />  
                    <AllTasks farmId={farmId} />
                </>
            ): <></> }

        </QueryHandler>
    );
}

export default Tasks;