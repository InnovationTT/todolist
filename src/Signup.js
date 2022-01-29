import React, { useRef, useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from './contexts/AuthContext'

function Signup(props) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if( passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
        } catch {
            setError('Failed to create account');
        }

        setLoading(false);
        
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4" class="text-primary">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label class="text-secondary">Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label class="text-secondary">Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="email">
                            <Form.Label class="text-secondary">Confirm Password</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button disabled={loading} className="w-100" type="submit">Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Log In
            </div>
        </>
    );
}

export default Signup;