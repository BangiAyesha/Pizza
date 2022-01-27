import React from "react";
import { Row, Col, Image, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Mainnavbar() {
    const navigate = useNavigate();
    return (
        <div>
            <Container
                style={{
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                }}
            >
                <Row>
                    <Col>
                        <Image
                            src="./Images/navbar.webp"
                            roundedCircle
                            height="120px"
                        />
                    </Col>
                    <Col></Col>
                    <Col style={{ justifyContent: "right" }}>
                        <br />
                        <Button
                            variant="outline-dark"
                            style={{ margin: "1rem" }}
                            onClick={() => navigate("/")}
                        >
                            Home
                        </Button>
                        <Button
                            variant="outline-dark"
                            style={{ margin: "1rem" }}
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                        <Button
                            variant="outline-dark"
                            style={{ margin: "1rem" }}
                            onClick={() => navigate("/register")}
                        >
                            Register
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
