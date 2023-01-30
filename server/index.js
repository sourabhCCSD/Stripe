import express from 'express';
import bodyParser from "body-parser"; 

const app = express ();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_5dfdfdz_PLACE_YOUR_OWN_FKING_KEY_HERE_rsdfhsdjfsv";
const SECRET_KEY= "sk_test_51__YOU_DONT_UNDERSTAND_PLACE_YOUR_KEY_HERE_MFKR__8JTHMEu";
import Stripe from 'stripe';
const stripe = Stripe(SECRET_KEY, {apiVersion : "2022-08-01"})

app.use(bodyParser.json())


app.listen(port, () => {
    console.log(`server running at port: ${port}`)
})

app.post("/create-payment-intent", async (req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount : 100,
            currency : "inr",
            payment_method_types : ["card"]
        })

        const clientSecret = paymentIntent.client_secret;

        res.json({
            clientSecret : clientSecret
        })

    } catch (e) {
        console.log(e.message);
        res.json({error : e.message})
    }
})