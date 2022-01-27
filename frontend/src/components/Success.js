import React from "react";
import { useNavigate } from "react-router";
import { Alert, Button, Container } from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";

export default function Success() {
    const navigate = useNavigate();
    return (
        <div>
            <HomeNavbar />
            <br />
            <Container style={{ backgroundColor: "lightgray" }}>
                <h1>Order has been placed successfully</h1>
                <Alert variant="success">
                    <Alert.Heading>
                        You will receive notification by email.
                    </Alert.Heading>
                </Alert>
                <Button onClick={() => navigate("/menu")}>
                    Go and Order some more
                </Button>
            </Container>
        </div>
    );
}
