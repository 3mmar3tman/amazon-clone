const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe");

// App config
const app = express();

// middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
  const total = req.query.total;

  console.log("Payment Request Received > ", total);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).send({ error: error.message });
  }
});

// example endpoint
// http://127.0.0.1:5001/clone-dfcdb/us-central1/api

// Listen command
exports.api = functions.https.onRequest(app);
