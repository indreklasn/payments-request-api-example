let count = 0
const cartIncrementButton = document.getElementById('cartIncrement')
const cartDecrementButton = document.getElementById('cartDecrement')
const countElement = document.getElementById('count')
const buyButton = document.getElementById('purchase')
const thankYouMessage = document.getElementById('thankYouMessage')
thankYouMessage.style.opacity = 0;

function init() {
  
  countElement.innerHTML = count
  cartIncrementButton.addEventListener('click', () => {
    count++
    countElement.innerHTML = `${count}$`
  })
  
  cartDecrementButton.addEventListener('click', () => {
    if(count === 0) return 
    count--
    countElement.innerHTML = `${count}$`
  })
}


buyButton.addEventListener('click', () => {
  const request = new PaymentRequest(buildSupportedPaymentMethodData(), buildShoppingCartDetails());
  request.canMakePayment().then(result => {

    if (result) {

      request.show().then(paymentResponse => {
        console.log(paymentResponse.details)
        // Here we would process the payment. For this demo, simulate immediate success:
        paymentResponse.complete('success')
          .then(() => thankYouMessage.style.opacity = 1)
      })
    }
  })
})

function buildSupportedPaymentMethodData() {
  // Example supported payment methods:
  return [{
    supportedMethods: 'basic-card',
    data: {
      supportedNetworks: ['visa', 'mastercard'],
      supportedTypes: ['debit', 'credit']
    }
  }];
}

function buildShoppingCartDetails() {
  return {
    id: 'count-order',
    displayItems: [
      {
        label: 'Example item',
        amount: {currency: 'USD', value: '1.00'}
      }
    ],
    total: {
      label: 'Total',
      amount: {currency: 'USD', value: count }
    }
  };
}

init()