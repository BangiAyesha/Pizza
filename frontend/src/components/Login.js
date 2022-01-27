import React, { useState } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import Mainnavbar from "./Mainnavbar";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../config/Myservice";

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const handler = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });
    };
    console.log(data);

    const loginUser = (event) => {
        event.preventDefault();
        userLogin(data).then((res) => {
            if (res.data.flag === 1) {
                localStorage.setItem("_token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                alert(res.data.message);
                navigate("/menu");
            } else if (res.data.flag === 0) {
                alert(res.data.message);
            } else if (res.data.err === 0) {
                alert(res.data.message);
            }
        });
    };

    return (
        <div>
            <Mainnavbar />
            <br />
            <Container
                style={{
                    backgroundColor: "lightgray",
                    padding: "2rem",
                    border: "1px solid black",
                }}
            >
                <h2 className="text-center">Login Here</h2>
                <br />
                <Row>
                    <Col className="text-center">
                        <Image src="./Images/login.png" height="250px" />
                    </Col>
                    <Col>
                        <Form
                            onSubmit={(e) => loginUser(e)}
                            style={{
                                border: "1px solid black",
                                padding: "1rem",
                            }}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    style={{ border: "1px solid black" }}
                                    onChange={(e) => handler(e)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    style={{ border: "1px solid black" }}
                                    onChange={(e) => handler(e)}
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
