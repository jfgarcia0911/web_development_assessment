//Selecting Elements
const productsElement = document.querySelector(".products");
const cartItemElement = document.querySelector(".cart-items");
const subTotalElement = document.querySelector(".subtotal");
const countElement = document.querySelector("#count");



//Products rendering
function productsList() {
    products.forEach((product) => {
        productsElement.innerHTML +=
            `
        <div class="product-container">
            <div class="item-img">
                <img class="productImg" src="${product.img}" alt="${product.name}">
            </div>
            <div class="desc">
                <h2 class="desc-title">${product.name}</h2>
                <h2><small>₱ </small>${product.price.toLocaleString('en-US')}</h2>
                
            </div>
            <div class="add-to-cart">
                <button onClick='addToCart(${product.id})'>Add to cart</button> 
            </div>
        </div>
        `;
    })

}

productsList();

//Make a variable for addToCart
var cart = [];

//ADD to Cart
function addToCart(id) {
    //we used some() method to check if product already exist in the cart
    if (cart.some((item) => item.id === id)) {
        changeQuantity("plus", id);
    }
    else {
        const item = products.find((product) => product.id === id);
        //Add quantity property and using spread operator
        cart.push({
            ...item,
            quantity: 1
        });
    }
    updateCart();
}

//Update Cart function
function updateCart() {
    renderCartItems();
    renderSubtotal();
}

//Calculate and render subtotal
function renderSubtotal() {
    let totalPrice = 0;
    let totalQty = 0;
    cart.forEach((item) => {
        totalPrice = totalPrice + item.price * item.quantity;
        totalQty = totalQty + item.quantity;
    })

    subTotalElement.innerHTML = `Subtotal (${totalQty} items): ₱ ${totalPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`  //to make 2 decimal points
    countElement.innerHTML = `${totalQty}`
}


//Add Cart Quantity
function renderCartItems() {
    cartItemElement.innerHTML = ""; //To clear cart element to avoid duplication
    cart.forEach((item) => {
        cartItemElement.innerHTML +=
            `
        <div class="cart-item">
            <div class="item-info" onClick="removeItems(${item.id})">
                <img src="${item.img}" alt="">
                <h4>  ${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price.toLocaleString('en-US')}
            </div>
            <div class="units">
                <div class="btn minus" onClick="changeQuantity('minus', ${item.id})">-</div>
                <div class="number">${item.quantity}</div>
                <div class="btn plus" onclick="changeQuantity('plus', ${item.id})">+</div>
            </div>
        </div>
        `
    })
}

//Increment or Decrement the quantity of an item
function changeQuantity(action, id) {
    cart = cart.map((item) => {
        let quantity = item.quantity;

        if (item.id === id) {
            if (action === "minus" && quantity > 1) {
                quantity--;
            }
            else if (action === "plus" && quantity < item.stockAvailable) {
                quantity++;
            }
        }

        return {
            ...item,
            quantity,
        };

    });
    updateCart();
}

//remove items from cart
function removeItems(id) {
    cart = cart.filter((item) => item.id !== id);   //to retain the id that are npt chosen
    updateCart();
}