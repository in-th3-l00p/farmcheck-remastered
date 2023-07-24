import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import api from "../api/api";

const Login = () => {
    const [error, setError] = useState<Error>();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const data = e.target as typeof e.target & {
                username: { value: string };
                password: { value: string };
            };

            api.post("/auth/login", {
                username: data.username.value, 
                password: data.password.value})
                .then(resp => {
                    localStorage.setItem("token", resp.data);
                    window.location.href = "/";
                })
                .catch(() => setError(new Error("Invalid username or password.")));

        }}>
            {error && <Alert variant="danger">{error.message}</Alert>}
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" />
            </Form.Group>
            <Button type="submit" className="mx-auto">Login</Button>
        </form>
    );
}

export default Login;