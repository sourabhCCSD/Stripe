import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native'
import React, { useState } from 'react'
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

const StripeApp = (props) => {

    const [email, setEmail] = useState('');
    const [cardDetails, setCardDetails] = useState('')
    const {confirmPayment, loading} = useConfirmPayment();

    const API_URL = 'http://192.168.1.5:3000'

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/create-payment-intent`, 
        {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
        })

        {console.log(response, 'is the res')}

        const {clientSecret, error} = await response.json();
        return {clientSecret, error}    
    }



    const handlePressPay = async () => {
        if(!cardDetails?.complete || !email) {
            Alert.alert("Please enter complete card details and Email")
        }
        const billingDetails = {
            email: email
        }

        try {
            const {clientSecret, error} = await fetchPaymentIntentClientSecret();
            if(error) {
                console.log("Unable to process payment");
            } else{
                
                const {paymentIntent, error} = await confirmPayment(
                    clientSecret, {
                        type: 'Card',
                        billingDetails: billingDetails,
                        
                    }
                );
                {console.log(paymentIntent, 'is payemnt')}
                if(error) {
                    alert (`Payment Confirmation Error ${error.message}`)
                }else if(paymentIntent) {
                    alert("Payment Successful");
                    console.log("Payment successful", paymentIntent)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <View style={{padding: 50}}>
    <TextInput style={{borderRadius: 5, backgroundColor: '#cecece', border: 10, width: 300, height: 60, fontSize: 20, marginTop: 20, paddingLeft: 6}}
     autoCapitalize='none'
     placeholder='Email'
     keyboardType='email-address'
     onChange={(value) => setEmail(value.nativeEvent.text)}
    />
    <CardField
        postalCodeEnabled={true}
        placeholders ={{number: "4242 4242 4242 4242"}}
        onCardChange={cardDetails => {setCardDetails(cardDetails)}}
        cardStyle={styles.card}
        style={styles.cardContainer}
    />
    <Button onPress={handlePressPay} title="Pay" disabled={loading} />
    </View>
  )
}

export default StripeApp

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#cecece',
        fontSize: 10
    },

    cardContainer : {
        height: 50,
        marginVertical: 30,
        width: 330,
    }
})