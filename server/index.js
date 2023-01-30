import express from 'express';
import bodyParser from "body-parser"; 

const app = express ();
const port = 3000;
const PUBLISHABLE_KEY = "pk_test_51MVTzOSGV3ffUpQpwGAcK3NC5jG9JVljdBRXueRvSh8mYoKmo4QC0nwyMGVzWnJmNgtUsAYgOzK7h4H0V2rLWGzC00iXFyI7uv";
const SECRET_KEY= "sk_test_51MVTzOSGV3ffUpQpiSilfnpMTWDmnPTQysFeFlxP0LwjncMYn78wWeRYVLLYFirujt9KlwbkwBhoBWx8X3DTPbMR00b8JTHMEu";
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