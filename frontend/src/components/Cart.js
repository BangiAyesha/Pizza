import React, { useEffect, useState } from "react";
import { Button, Container, Table, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";
import HomeNavbar from "./HomeNavbar";
import axios from "axios";

export default function Cart() {
    let items = [];
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    let total = [0];
    useEffect(() => {
        let cartItems = JSON.parse(localStorage.getItem("mycart"));
        setCart(cartItems);
    }, []);
    console.log(cart);

    const onAdd = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist) {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...exist, quantity: exist.quantity + 1 }
                        : item
                )
            );
            localStorage.setItem("mycart", JSON.stringify(cart));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const onRemove = (product) => {
        const exist = cart.find((item) => item._id === product._id);
        if (exist.quantity === 1) {
            // setCart(cart.filter((item) => item._id !== product._id));
        } else {
            setCart(
                cart.map((item) =>
                    item._id === product._id
                        ? { ...exist, quantity: exist.quantity - 1 }
                        : item
                )
            );
            localStorage.setItem("mycart", JSON.stringify(cart));
        }
    };

    const onDelete = (index) => {
        let lstore = JSON.parse(localStorage.getItem("mycart"));
        lstore.splice(index, 1);
        console.log(lstore);
        let setStore = JSON.stringify(lstore);
        localStorage.setItem("mycart", setStore);
        setCart(lstore);
    };

    const checkout = () => {
        cart.map((value) => {
            items.push(`${value.name} (${value.quantity}) `);
        });
        let cardno = document.getElementById("card").value;
        let userdata = JSON.parse(localStorage.getItem("user"));
        let checkout = {
            items: items,
            name: userdata.name,
            cardnumber: cardno,
            total: total.reduce((result, number) => result + number),
        };
        console.log(checkout);
        axios
            .post("http://localhost:7000/carddetails", checkout)
            .then((res) => {
                if (res.data.flag === 1) {
                    localStorage.removeItem("mycart");
                    navigate("/success");
                }
            });
    };

    return (
        <div>
            <HomeNavbar />
            <br />
            <Container style={{ backgroundColor: "lightgray" }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Sr.No</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart
                            ? cart.map((value, index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{index + 1}</td>
                                          <td>{value.name}</td>
                                          <td>{value.price}</td>
                                          <td>
                                              <Row>
                                                  <Col>
                                                      <Button
                                                          variant="dark"
                                                          onClick={() =>
                                                              onRemove(value)
                                                          }
                                                      >
                                                          -
                                                      </Button>
                                                  </Col>
                                                  <Col>
                                                      <Form.Control
                                                          type="number"
                                                          placeholder="Enter quantity"
                                                          min="1"
                                                          max="20"
                                                          value={value.quantity}
                                                      />
                                                  </Col>
                                                  <Col>
                                                      <Button
                                                          variant="dark"
                                                          onClick={() =>
                                                              onAdd(value)
                                                          }
                                                      >
                                                          +
                                                      </Button>
                                                  </Col>
                                              </Row>
                                          </td>
                                          <td>
                                              {value.quantity * value.price}
                                          </td>
                                          <td>
                                              <Button
                                                  variant="danger"
                                                  onClick={() =>
                                                      onDelete(index)
                                                  }
                                              >
                                                  Delete
                                              </Button>
                                          </td>
                                          {console.log(
                                              total.push(
                                                  value.price * value.quantity
                                              )
                                          )}
                                      </tr>
                                  );
                              })
                            : ""}
                    </tbody>
                </Table>
                <h4 className="text-right">
                    Total Amount:{" "}
                    {total.reduce((result, number) => result + number)}
                </h4>
                <br />
            </Container>
            <br />
            <Container
                style={{ backgroundColor: "lightgray", padding: "10px" }}
            >
                <Form.Label>Credit Card Number</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Enter credit card details"
                    id="card"
                />
                <br />
                <Button variant="dark" onClick={() => checkout()}>
                    Checkout
                </Button>
            </Container>
        </div>
    );
}
