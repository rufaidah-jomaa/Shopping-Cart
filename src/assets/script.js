//array of objects(to store products in shop)
const products = [
  {
    name: "Cherry",
    price: 4,
    quantity: 0,
    productId: 100,
    image: "./images/cherry.jpg"
  },
  {
    name: "Strawberry",
    price: 5,
    quantity: 0,
    productId: 101,
    image: "./images/strawberry.jpg"
  },
  {
    name: "Orange",
    price: 10,
    quantity: 0,
    productId: 102,
    image: "./images/orange.jpg"
  }]

const cart = [] // array to add customer products in it 

//function to get the correct product based on the productId
function getProductById(productId) {
  return products.find((product) => product.productId === productId)
}
//function to add product in the cart based on productId
function addProductToCart(productId) {
  const product = getProductById(productId)
  if (product) {
    product.quantity += 1 //increase the product's quantity
  } else {
    return "Product not Found"
  }
  //if the product is not already in the cart, add it to the cart
  if (cart.findIndex(element => element.productId === productId) === -1) {
    cart.push(product);
  }
}

//function to increase quantity of product that in cart based on productId
function increaseQuantity(productId) {
  const product = getProductById(productId)
  if (product) {
    product.quantity += 1 //increase quantity by 1
  } else {
    return "Product not Found"
  }
}

//function to decrease quantity of product that in cart based on productId
function decreaseQuantity(productId) {
  const product = getProductById(productId)
  if (product) {
    product.quantity -= 1 //decrease by 1
  } else {
    return "Product not Found"
  }
  //if the function decreases the quantity to 0, the product is removed from the cart
  if (product.quantity === 0) {
    const index = cart.findIndex(element => element.productId === productId)
    cart.splice(index, 1)
  }
}

//function for remove a specific product from cart based on productId
function removeProductFromCart(productId) {
  const product = getProductById(productId)
  if (product) {
    product.quantity = 0
  } else {
    return "Product not Found"
  }
  //remove product based on its index in the cart array
  const index = cart.findIndex(element => element.productId === productId)
  cart.splice(index, 1)
}

//function to get the total of all products
function cartTotal() {
  const grandTotal = cart.reduce((accumulator, item) => {
    return accumulator + (item.quantity * item.price);
  }, 0); // 0 is the initial value for the accumulator
  return grandTotal;
}

// function  that empties the products from the cart 
function emptyCart() {
  cart.splice(0, cart.length);
}

//variable to track the totalamount paid 
let totalPaid = 0
//function to enable the user to pay.
function pay(amount) { 
  //variable of amount required from the customer
  const grandTotal = cartTotal() 
  //add the current payment amount to the totalPaid variable
  totalPaid += amount; 
  //the difference between totalPaid and cartTotal
  const remaining = totalPaid - grandTotal;
  if (remaining>=0){
    totalPaid=0
    emptyCart()
  }
  return remaining;
}

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart,
}