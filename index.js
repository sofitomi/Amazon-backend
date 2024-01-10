/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({origin: true}));
app.use(express.json());

const stripe = require("stripe")("sk_test_51OO3k1DisYtKipizYDN18dViPAYBC0ejWAlT04XnAzlSblPXEokcCm6rNrNunpbtgMCzteaR5xN34N4kNotcmmVf00VnObx4q9");
console.log(stripe);

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment Request Recieved for this amount >>>", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // ok-created
  response.status(201).send({clientSecret: paymentIntent.client_secret});
});

// losten command
exports.api = functions.https.onRequest(app);
