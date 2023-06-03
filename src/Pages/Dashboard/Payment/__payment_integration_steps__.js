/**
 * 1. install stripe and react stripe JS
 * 2. create a checkout form (card element contains: card number, expiration date, cvv)
 * 3. create account on stripe and get the publishable key (pk)
 * 4. get card information
 * 5. create a payment method
 * 6. use test card to test payment
 * 7. on the server side, install stripe
 * 8. create a payment intent with payment method types: ['card']
 *    make sure you provide amount in cents -> multiply by 100
 * 9. call payment intent API to get client secret and store it in a state
 * 10. use confirmCardPayment API with client secret and card info
 * 11. display confirm card error
 * 12. diplay confirm card success
 * 13. do things after payment ->
 */
