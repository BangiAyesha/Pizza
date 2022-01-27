import React, { useEffect, useState } from "react";
import { getOrderdetails } from "../config/Myservice";
import { Container, Table } from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";

export default function Orders() {
    const [order1, setOrder1] = useState([]);
    useEffect(() => {
        getOrderdetails().then((res) => {
            let userdata = JSON.parse(localStorage.getItem("user"));
            if (userdata !== null) {
                const matchprof = res.data.filter((data) => {
                    if (data.name === userdata.name) {
                        return data;
                    }
                });
                setOrder1(matchprof);
            }
        });
    }, []);
    return (
        <div>
            <HomeNavbar />
            <br />
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Pizza Names</th>
                            <th>Card Number</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order1 !== null
                            ? order1.map((value, index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{value.name}</td>
                                          <td>{`${value.items}\n`}</td>
                                          <td>{value.cardnumber}</td>
                                          <td>{value.total}</td>
                                      </tr>
                                  );
                              })
                            : ""}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}
