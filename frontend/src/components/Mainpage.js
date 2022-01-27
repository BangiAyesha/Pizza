import React from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router";
import Mainnavbar from "./Mainnavbar";

export default function Mainpage() {
    const navigate = useNavigate();
    return (
        <div>
            <Mainnavbar />
            <br />
            <Container
                style={{
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                }}
            >
                <Container style={{ padding: "3rem" }}>
                    <h1>Pizza Delivery</h1>
                    <br />
                    <p style={{ fontSize: "x-large" }}>
                        Welcome to Pizza Delivery Service. This is the place
                        where you may choose the most delicious pizza you like
                        from wide variety of options.
                    </p>
                    <hr />
                    <p style={{ fontSize: "large", fontWeight: "bold" }}>
                        We're performing delivery free of charge in case if your
                        order is higher than &#8377;500.
                    </p>
                    <p className="text-center">
                        <Button
                            variant="dark"
                            onClick={() => navigate("/login")}
                        >
                            Sign In and order
                        </Button>
                    </p>
                </Container>
            </Container>
        </div>
    );
}
