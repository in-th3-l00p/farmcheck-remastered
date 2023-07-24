import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {createFarm} from "../../api/farm";

const CreateFarm = () => {
    const [error, setError] = useState<Error>();

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            const data = e.target as typeof e.target & {
                name: { value: string };
                description: { value: string };
            };

            createFarm(data.name.value, data.description.value)
                .then(() => window.location.href = "/farms?created")
                .catch(setError);
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
                <Form.Control name="name" />
            </Form.Group>
            <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Label as="textarea" name="description" rows={4} />
            </Form.Group>
            <Button type="submit" className="mx-auto">Create</Button>
        </form>
    );
}

export default CreateFarm;