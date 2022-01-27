import React, { useEffect, useState } from "react";
import { getUserdetails } from "../config/Myservice";
import { Container, Table } from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";

export default function Profile() {
    const [user, setUser] = useState([]);
    useEffect(() => {
        let user1 = JSON.parse(localStorage.getItem("user"));
        setUser(user1);
    }, []);
    return (
        <div>
            <HomeNavbar />
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Conatct Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.mobile}</td>
                            <td>{user.email}</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
