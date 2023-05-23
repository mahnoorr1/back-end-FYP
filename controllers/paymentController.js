var asyncHandler = require('express-async-handler')
const stripe = require("stripe")('sk_test_51NAEw6Apl2m6sshaN2x3jt7wpw6iV3JiCTXFzpNwJDG8mlcHhAojqcCvc4ZAwexPibtpM5z1p4HXP4PGwRKgZQ8v00aILZNFRm');

const paymentController = asyncHandler(
    async (req, res) => {
        const { items } = req.body;
      
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
          amount: calculateOrderAmount(items),
          currency: "usd",
          automatic_payment_methods: {
            enabled: true,
          },
        });
      
        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      }
)

// const pkrPayment = asyncHandler( async (req, res) => {
//   const { token } = req.body;

//   try {
//     // Validate the card token
//     const validatedToken = await stripe.tokens.retrieve(token);

//     if (!validatedToken.card) {
//       res.status(400).json({ error: 'Invalid card token' });
//       return;
//     }

//     // Create a charge
//     const charge = await stripe.charges.create({
//       amount: 100, // The payment amount in cents (e.g., 10000 represents 100 PKR)
//       currency: 'PKR',
//       source: token, // The token received from the client-side
//       description: 'Payment description',
//     });

//     // Handle successful payment
//     res.status(200).json({ message: 'Payment successful', charge });
//   } catch (error) {
//     // Handle payment error
//     res.status(500).json({ error: 'Payment failed' });
//   }
// })
const payment = asyncHandler(
  async (req, res) => {
    const { amount, currency, cardholderName, cardNumber, cardExpiryDate, csv } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        payment_method_data: {
          type: 'card',
          card: {
            name: cardholderName,
            number: cardNumber,
            exp_month: parseInt(cardExpiryDate.split('/')[0]),
            exp_year: parseInt(cardExpiryDate.split('/')[1]),
            cvc: csv,
          },
        },
      });
  
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while creating the payment intent.' });
    }
  });

const usdPayment = asyncHandler(
  async (req, res) => {
    const { amount, cardHolderName, cardNumber, expiryDate, csv } = req.body;
  
    try {
      // Create a payment intent on Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
        payment_method_data: {
          type: 'card',
          card: {
            number: cardNumber,
            exp_month: expiryDate.split('/')[0],
            exp_year: expiryDate.split('/')[1],
            cvc: csv,
          },
        },
        description: 'Payment description',
      });
  
      // Confirm the payment intent
      const paymentResult = await stripe.paymentIntents.confirm(paymentIntent.id);
  
      // Send the response to the client
      res.status(200).json({ success: true, paymentResult });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Payment failed' });
    }
  }
)
module.exports = {
    paymentController,
    usdPayment,
    payment
}