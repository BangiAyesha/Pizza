import React, { useEffect, useState } from "react";
import { Form, Button, Container, Col, Image, Row } from "react-bootstrap";
import Mainnavbar from "./Mainnavbar";
import { getUserdetails, postUser } from "../config/Myservice";
import axios from "axios";
import { useNavigate } from "react-router";
// import { Redirect } from "react-router-dom";

const regForName = /^[a-zA-Z]{2,100}$/;
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPassword = RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s).{8,25}$/
);
const regforContact = RegExp(/^[0-9]{10}$/);

export default function Register() {
    const navigate = useNavigate();
    const [userdetails, setUserdetails] = useState([]);
    const [state, setState] = useState({
        errors: {
            name: "",
            email: "",
            password: "",
            mobile: "",
            cpassword: "",
        },
    });
    let [data, setData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    useEffect(() => {
        getUserdetails().then((res) => {
            console.log(res.data);
            setUserdetails(res.data);
        });
    }, []);
    const onChangeUser = (event) => {
        const { name, value } = event.target;
        let errors = state.errors;
        switch (name) {
            case "name":
                errors.name = regForName.test(value)
                    ? ""
                    : "Name should contain only letters and minimum length should be 2 characters";
                break;

            case "email":
                errors.email = regForEmail.test(value)
                    ? ""
                    : "Enter Valid Email";
                break;

            case "mobile":
                errors.mobile = regforContact.test(value)
                    ? ""
                    : "Enter valid contact Number";
                break;

            case "password":
                errors.password = regForPassword.test(value)
                    ? ""
                    : "Password must be between 8-25 characters and should contain atleast one lowercase letter, one uppercase letter amd one special character";
                break;

            case "cpassword":
                errors.cpassword =
                    document.getElementById("password").value === value
                        ? ""
                        : "Password and confirm password should be same";
                break;
            default:
                alert("Fill proper details");
        }
        setState({ errors, [name]: value });
        setData({ ...data, [name]: value });
    };

    const registration = (event) => {
        event.preventDefault();
        if (validate(state.errors)) {
            let demo = {
                name: data.name,
                email: data.email,
                mobile: data.mobile,
                password: data.password,
            };
            console.log(demo);
            console.log(data);
            postUser(demo).then((res) => {
                if (res.data.flag === 1) {
                    alert(res.data.message);
                    navigate("/login");
                } else if (res.data.flag === 0) {
                    alert(res.data.message);
                } else {
                    alert(res.data.message);
                }
            });
        }
    };

    const validate = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            (val) => val.length > 0 && (valid = false)
        );
        return valid;
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
                <h2 className="text-center">Register Here</h2>
                <br />
                <Row>
                    <Col className="text-center">
                        <Image
                            src="./Images/register.jpg"
                            height="500px"
                            width="400px"
                        />
                    </Col>
                    <Col>
                        <Form
                            onSubmit={(e) => registration(e)}
                            style={{
                                border: "1px solid black",
                                padding: "1rem",
                            }}
                        >
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Name"
                                    name="name"
                                    style={{ border: "1px solid black" }}
                                    onChange={onChangeUser}
                                />
                                <Form.Text>
                                    {state.errors.name.length > 0 && (
                                        <span style={{ color: "red" }}>
                                            {state.errors.name}
                                        </span>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    name="email"
                                    style={{ border: "1px solid black" }}
                                    onChange={onChangeUser}
                                />
                                <Form.Text>
                                    {state.errors.email.length > 0 && (
                                        <span style={{ color: "red" }}>
                                            {state.errors.email}
                                        </span>
                                    )}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Mobile Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter mobile number"
                                    name="mobile"
                                    style={{ border: "1px solid black" }}
                                    onChange={onChangeUser}
                                />
                                <Form.Text>
                                    {state.errors.mobile.length > 0 && (
                                        <span style={{ color: "red" }}>
                                            {state.errors.mobile}
                                        </span>
                                    )}
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    id="password"
                                    style={{ border: "1px solid black" }}
                                    onChange={onChangeUser}
                                />
                                <Form.Text>
                                    {state.errors.password.length > 0 && (
                                        <span style={{ color: "red" }}>
                                            {state.errors.password}
                                        </span>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Re-enter Password"
                                    name="cpassword"
                                    style={{ border: "1px solid black" }}
                                    onChange={onChangeUser}
                                />
                                <Form.Text>
                                    {state.errors.cpassword.length > 0 && (
                                        <span style={{ color: "red" }}>
                                            {state.errors.cpassword}
                                        </span>
                                    )}
                                </Form.Text>
                            </Form.Group>
                            <div className="text-center">
                                <Button variant="dark" type="submit">
                                    Submit
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <br />
        </div>
    );
}
