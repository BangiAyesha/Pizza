import React, { useEffect, useState } from "react";
import { getMenu } from "../config/Myservice";
import { Card, Button, Row, Container } from "react-bootstrap";
import HomeNavbar from "./HomeNavbar";

export default function Menu() {
    let [itemadded, setItemadded] = useState(false);
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        getMenu().then((res) => {
            console.log(res.data);
            setMenu(res.data);
        });
    }, []);
    console.log(menu);

    const addtoCart = (obj) => {
        console.log(obj.name);
        let item = {
            name: obj.name,
            price: obj.price,
            _id: obj._id,
            quantity: obj.quantity,
        };
        if (localStorage.getItem("mycart") !== null) {
            let arr = JSON.parse(localStorage.getItem("mycart"));
            let idArrays = [];
            arr.forEach((data) => {
                idArrays.push(data._id);
            });

            if (idArrays.includes(obj._id)) {
                // arr.forEach;
                alert("Product Already Added");
                // setItemadded(true);
            } else {
                arr.push(item);
                localStorage.setItem("mycart", JSON.stringify(arr));
                alert("Product Added to Cart");
            }
        } else {
            let arr = [];
            arr.push(item);
            localStorage.setItem("mycart", JSON.stringify(arr));
            alert("Product Added to Cart");
        }
    };

    return (
        <div>
            <HomeNavbar />
            <br />
            <Container
                style={{
                    backgroundColor: "lightgray",
                    border: "1px solid black",
                }}
            >
                <br />
                <Row
                    style={{ justifyContent: "center" }}
                    className="text-center"
                >
                    {menu.map((value, index) => {
                        return (
                            <Card style={{ width: "23rem" }} key={value._id}>
                                <Card.Img
                                    variant="top"
                                    src={value.image}
                                    height="250px"
                                />
                                <Card.Body>
                                    <Card.Title>{value.name}</Card.Title>
                                    <Card.Text>&#8377;{value.price}</Card.Text>
                                    <Button
                                        // disabled={itemadded ? true : false}
                                        variant="primary"
                                        onClick={() => addtoCart(value)}
                                    >
                                        Add to Cart
                                    </Button>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
                <br />
            </Container>
        </div>
    );
}
