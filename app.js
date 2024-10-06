let carts = document.querySelectorAll(".add-to-cart");

document.addEventListener("DOMContentLoaded", () => {
    loadCartNumbers();
    displayCart();
    totalCost();
});

let products = [
    {
        "image": "./assets/images/image-waffle-thumbnail.jpg",
        "name": "Waffle with Berries",
        "category": "Waffle",
        "price": 6.50,
        "incart": 0
    },
    {
        "image": "./assets/images/image-creme-brulee-thumbnail.jpg",
        "name": "Vanilla Bean Crème Brûlée",
        "category": "Crème Brûlée",
        "price": 7.00,
        "incart": 0
    },
    {
        "image": "./assets/images/image-macaron-thumbnail.jpg",
        "name": "Macaron Mix of Five",
        "category": "Macaron",
        "price": 8.00,
        "incart": 0
    },
    {
        "image": "./assets/images/image-tiramisu-thumbnail.jpg",
        "name": "Classic Tiramisu",
        "category": "Tiramisu",
        "price": 5.50,
        "incart": 0
    },
    {
        "image": "./assets/images/image-baklava-thumbnail.jpg",
        "name": "Pistachio Baklava",
        "category": "Baklava",
        "price": 4.00,
        "incart": 0
    },
    {
        "image": "./assets/images/image-meringue-thumbnail.jpg",
        "name": "Lemon Meringue Pie",
        "category": "Pie",
        "price": 5.00,
        "incart": 0
    },
    {
        "image": "./assets/images/image-cake-thumbnail.jpg",
        "name": "Red Velvet Cake",
        "category": "Cake",
        "price": 4.50,
        "incart": 0
    },
    {
        "image": "./assets/images/image-brownie-thumbnail.jpg",
        "name": "Salted Caramel Brownie",
        "category": "Brownie",
        "price": 4.50,
        "incart": 0
    },
    {
        "image": "./assets/images/image-panna-cotta-thumbnail.jpg",
        "name": "Vanilla Panna Cotta",
        "category": "Panna Cotta",
        "price": 6.50,
        "incart": 0
    }
];

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        let product = products[i];
        cartNumbers(product);
        totalCost(product);
        cartItems(product);
        displayCart();
    });
}

function loadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem("totalprice");
    document.querySelector("#carts span").textContent = productNumbers || 0;
    document.querySelector(".total-price span").textContent = "$" + (cartCost || 0);
}

function cartNumbers(product) {
    let productNumbers = parseInt(localStorage.getItem('cartNumbers')) || 0;
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector("#carts span").textContent = productNumbers + 1;
}

function cartItems(product) {
    let cartItems = JSON.parse(localStorage.getItem("itemincart")) || {};

    if (cartItems[product.name]) {
        cartItems[product.name].incart += 1;
    } else {
        product.incart = 1;
        cartItems[product.name] = product;
    }

    localStorage.setItem("itemincart", JSON.stringify(cartItems));
}

function totalCost(product) {
    let cartCost = parseFloat(localStorage.getItem("totalprice")) || 0;
    let newCartCost = cartCost + product.price;
    localStorage.setItem("totalprice", newCartCost.toFixed(2));
    document.querySelector(".total-price span").textContent = "$" + newCartCost.toFixed(2);
}

function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('itemincart')) || {};
    let productContainer = document.querySelector(".product-cart");

    if (productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML +=
                `<div class="cart-item">
                    <h4 class="product-name">${item.name}</h4>
                    <div class="quantity-desc">
                        <div class="quantity-text">
                            <h4>${item.incart}X</h4>
                            <p>@ $${item.price.toFixed(2)}</p>
                            <p>Total: $${(item.incart * item.price).toFixed(2)}</p>
                        </div>
                        <img src="./assets/images/icon-remove-item.svg" alt="Remove item" class="remove-item" data-name="${item.name}">
                    </div>
                </div>`;
        });
        addRemoveButtons();
    }
}

function addRemoveButtons() {
    let removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            let itemName = button.getAttribute('data-name');
            removeItem(itemName);
        });
    });
}

function removeItem(productName) {
    let cartItems = JSON.parse(localStorage.getItem("itemincart")) || {};
    let productNumbers = parseInt(localStorage.getItem('cartNumbers')) || 0;
    let cartCost = parseFloat(localStorage.getItem("totalprice")) || 0;

    if (cartItems[productName]) {
        let item = cartItems[productName];
        let itemTotalPrice = item.incart * item.price;

        localStorage.setItem("totalprice", (cartCost - itemTotalPrice).toFixed(2));
        localStorage.setItem("cartNumbers", productNumbers - item.incart);
        delete cartItems[productName];
        localStorage.setItem("itemincart", JSON.stringify(cartItems));

        loadCartNumbers();
        displayCart();
    }
}

let submit = document.querySelector('#comfirm-order');
if (submit) {
    submit.addEventListener('click', () => {
        localStorage.removeItem('cartNumbers');
        localStorage.removeItem("itemincart");
        localStorage.removeItem("totalprice");
        document.querySelector("#carts span").textContent = 0;
        document.querySelector(".total-price span").textContent = " $0";
        displayCart();
    });
}
