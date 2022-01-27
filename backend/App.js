const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const jwtSecret = "asdfrtuyxsde4677dff788";
const cors = require("cors");
const app = express();
const PORT = 7000;
const postRoutes = require("./routes/postRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use("/loginusers", postRoutes);

const db = "mongodb://localhost:27017/PizzaDelivery";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
    } catch (err) {
        console.log(err.message);
    }
};
connectDB();

//jwt setup
function autenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log(token);
    if (token == null) {
        res.json({ err: 1, msg: "Token not matched" });
    } else {
        jwt.verify(token, jwtSecret, (err, data) => {
            if (err) {
                res.json({ err: 1, msg: "Token is invalid" });
            } else {
                next();
            }
        });
    }
}

const Menu = require("./db/Menu.js");
const Userdetails = require("./db/Userdetails.js");
const Order = require("./db/Order.js");

// app.get("/", (req, res) => {
//     console.log("Abc");
//     res.send("abc");
// });

app.get("/menu", (req, res) => {
    Menu.find({}, (err, data) => {
        console.log(err);
        console.log(data);
        if (err) throw err;
        res.send(data);
    });
});

app.get("/userdetails", (req, res) => {
    Userdetails.find({}, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

// app.post("/loginusers", (req, res) => {
//     console.log(req.body);
//     let email = req.body.email;
//     let password = req.body.password;
//     Userdetails.findOne({ email: email, password: password }, (err, data) => {
//         if (err) {
//             res.send({ flag: 1, message: "Invalid email or password" });
//         } else {
//             res.send({ flag: 0, message: "Login Success" });
//         }
//     });
// });

app.post("/loginusers", (req, res) => {
    console.log(req.body);
    // let email = req.body.email;
    // let password = req.body.password;
    Userdetails.findOne({ email: req.body.email }, (err, data) => {
        if (data) {
            if (req.body.password === data.password) {
                let payload = {
                    oid: req.body.email,
                };
                const token = jwt.sign(payload, jwtSecret, {
                    expiresIn: 1060000,
                });
                console.log(token);
                res.json({
                    flag: 1,
                    message: "Login Success",
                    token: token,
                    user: data,
                });
            } else {
                res.json({ flag: 0, message: "Password not matched" });
            }
        } else {
            res.json({ err: 0, message: "User not registered" });
        }
    });
});

// app.post("/login", (req, res) => {
//     const { email, password } = req.body;
//     User.findOne({ email: email }, (err, user) => {
//         if (user) {
//             if (password === user.password) {
//                 res.send({ message: "Login Successfull", user: user });
//             } else {
//                 res.send({ message: "Password didn't match" });
//             }
//         } else {
//             res.send({ message: "User not registered" });
//         }
//     });
// });

app.post("/register", (req, res) => {
    console.log(req.body);
    Userdetails.findOne({ email: req.body.email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered" });
        } else {
            let field = {
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email,
                password: req.body.password,
            };
            let ins = new Userdetails(field);
            ins.save((err) => {
                if (err) {
                    res.send({ flag: 0, message: err });
                } else {
                    res.send({ flag: 1, message: "Registered Successfully!" });
                }
            });
        }
    });
});

app.post("/carddetails", (req, res) => {
    let field = {
        items: req.body.items,
        name: req.body.name,
        cardnumber: req.body.cardnumber,
        total: req.body.total,
    };
    let ins = new Order(field);
    ins.save((err) => {
        if (err) {
            res.send("Error");
        } else {
            res.send({ flag: 1, msg: "Details Added" });
        }
    });
});

app.get("/orderdetails", (req, res) => {
    Order.find({}, (err, data) => {
        if (err) throw err;
        res.send(data);
    });
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log("Listening at port " + PORT);
});
