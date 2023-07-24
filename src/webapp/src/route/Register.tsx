import React from "react";
import {Button, Form} from "react-bootstrap";

const Register = () => {
    return (
        <form>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" name="username" />
            </Form.Group>
            <Form.Group>
                <Form.Label>First name</Form.Label>
                <Form.Control type="text" name="firstName" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last name</Form.Label>
                <Form.Control type="text" name="lastName" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control type="password" name="password" />
            </Form.Group>
            <Button type="submit" className="mx-auto">Register</Button>
        </form>
    );
}

export default Register;