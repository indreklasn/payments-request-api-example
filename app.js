let count = 0
const cartIncrementButton = document.getElementById('cartIncrement')
const cartDecrementButton = document.getElementById('cartDecrement')
const countElement = document.getElementById('count')
const buyButton = document.getElementById('purchase')

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
  request.show().then(function(paymentResponse) {
    
    // Here we would process the payment. For this demo, simulate immediate success:
    paymentResponse.complete('success')
    .then(function() {
      // For demo purposes:
      introPanel.style.display = 'none';
      successPanel.style.display = 'block';
    });
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
  // Hardcoded for demo purposes:
  return {
    id: 'order-123',
    displayItems: [
      {
        label: 'Example item',
        amount: {currency: 'USD', value: '1.00'}
      }
    ],
    total: {
      label: 'Total',
      amount: {currency: 'USD', value: count.toString() }
    }
  };
}


init()