// products
let products = [
  {
     "image": {
          "thumbnail": "./assets/images/image-waffle-thumbnail.jpg",
          "mobile": "./assets/images/image-waffle-mobile.jpg",
          "tablet": "./assets/images/image-waffle-tablet.jpg",
          "desktop": "./assets/images/image-waffle-desktop.jpg"
     },
     "id": 1,
     "name": "Waffle with Berries",
     "category": "Waffle",
     "price": 6.50
  },
  {
      "image": {
          "thumbnail": "./assets/images/image-creme-brulee-thumbnail.jpg",
          "mobile": "./assets/images/image-creme-brulee-mobile.jpg",
          "tablet": "./assets/images/image-creme-brulee-tablet.jpg",
          "desktop": "./assets/images/image-creme-brulee-desktop.jpg"
      },
      "id": 2,
      "name": "Vanilla Bean Crème Brûlée",
      "category": "Crème Brûlée",
      "price": 7.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-macaron-thumbnail.jpg",
          "mobile": "./assets/images/image-macaron-mobile.jpg",
          "tablet": "./assets/images/image-macaron-tablet.jpg",
          "desktop": "./assets/images/image-macaron-desktop.jpg"
      },
      "id": 3,
      "name": "Macaron Mix of Five",
      "category": "Macaron",
      "price": 8.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-tiramisu-thumbnail.jpg",
          "mobile": "./assets/images/image-tiramisu-mobile.jpg",
          "tablet": "./assets/images/image-tiramisu-tablet.jpg",
          "desktop": "./assets/images/image-tiramisu-desktop.jpg"
      },
      "id": 4,
      "name": "Classic Tiramisu",
      "category": "Tiramisu",
      "price": 5.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-baklava-thumbnail.jpg",
          "mobile": "./assets/images/image-baklava-mobile.jpg",
          "tablet": "./assets/images/image-baklava-tablet.jpg",
          "desktop": "./assets/images/image-baklava-desktop.jpg"
      },
      "id": 5,
      "name": "Pistachio Baklava",
      "category": "Baklava",
      "price": 4.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-meringue-thumbnail.jpg",
          "mobile": "./assets/images/image-meringue-mobile.jpg",
          "tablet": "./assets/images/image-meringue-tablet.jpg",
          "desktop": "./assets/images/image-meringue-desktop.jpg"
      },
      "id": 6,
      "name": "Lemon Meringue Pie",
      "category": "Pie",
      "price": 5.00
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-cake-thumbnail.jpg",
          "mobile": "./assets/images/image-cake-mobile.jpg",
          "tablet": "./assets/images/image-cake-tablet.jpg",
          "desktop": "./assets/images/image-cake-desktop.jpg"
      },
      "id": 7,
      "name": "Red Velvet Cake",
      "category": "Cake",
      "price": 4.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-brownie-thumbnail.jpg",
          "mobile": "./assets/images/image-brownie-mobile.jpg",
          "tablet": "./assets/images/image-brownie-tablet.jpg",
          "desktop": "./assets/images/image-brownie-desktop.jpg"
      },
      "id": 8,
      "name": "Salted Caramel Brownie",
      "category": "Brownie",
      "price": 4.50
   },
   {
      "image": {
          "thumbnail": "./assets/images/image-panna-cotta-thumbnail.jpg",
          "mobile": "./assets/images/image-panna-cotta-mobile.jpg",
          "tablet": "./assets/images/image-panna-cotta-tablet.jpg",
          "desktop": "./assets/images/image-panna-cotta-desktop.jpg"
      },
      "id": 9,
      "name": "Vanilla Panna Cotta",
      "category": "Panna Cotta",
      "price": 6.50
   }
];

// get all variables needed
let quantityBtns = document.querySelectorAll('.quantity-btns');
let quantity = document.querySelector('.quantity-number');
let productsSection = document.querySelector('.products-section');
let productList = document.querySelector('.products');
let mainCart = document.querySelector('.main-cart');
let cartList = document.querySelector('.cart-list');
let emptyCart = document.querySelector('.empty-cart');
let loadedCart = document.querySelector('.loaded-cart');

// show and hide cart on small devices
let closeIcon = document.querySelector('.fa-close');
let cartIcon = document.querySelector('.fa-shopping-cart');
// show Cart
let openCart = ()=>{
    cartIcon.addEventListener('click', ()=>{
        if(mainCart.style.display = 'none'){
            mainCart.style.display = 'block';
            cartIcon.style.display = "none";
            closeIcon.style.display = "block";
        }
    })
}
openCart();
// close cart
let closeCart = ()=>{
    closeIcon.addEventListener('click', ()=>{
        if ( mainCart.style.display = 'block') {
            mainCart.style.display = 'none';
            cartIcon.style.display = "block";
            closeIcon.style.display = "none";
        }
    })
} 
closeCart();

// cart array
let basket = JSON.parse(localStorage.getItem('shopData')) || [];

// push products to html
let generateItems = ()=>{
    productList.innerHTML =
    products.map((item)=>{
        let { id, name, category, price, image } = item;
       return`
        <div class="item" id="${id}">
        <!-- image wrapper -->
        <div class="item-img-div">
        <img src="${image.desktop}" alt="${name}" class="item-img">
        <div class="item-btns">
            <button class="addToCartBtn" onclick="addToCart(${id})">
            <img src="assets/images/icon-add-to-cart.svg" alt="">
            Add to cart
            </button>
            <button class="quantity-btns">
            <img src="assets/images/icon-decrement-quantity.svg" alt="" class="quantity-minus" onclick="changeNumberOfUnits('minus', ${id})">
            <div class="quantity-number">1</div>
            <img src="assets/images/icon-increment-quantity.svg" alt="" class="quantity-plus" onclick="changeNumberOfUnits('plus', ${id})">
            </button>
        </div>
        </div>
        <!-- item details -->
        <div class="item-details">
        <div class="item-category">${category}</div>
        <div class="item-name">${name}</div>
        <div class="item-price">$${price}</div>
        </div>
        </div>
        `;
    }).join("")
}
generateItems();

// add to cart
let addToCart = (id)=>{
    let checkItemInCart = basket.some((x)=> x.id === id);
    if(checkItemInCart){
        return;
    } else{
        const newItem = products.find((x)=> x.id === id);
        basket.push({
            ...newItem,
            numberOfUnits: 1,
        });

        // add image border to the item selected.
        let productId = id;
        let item = document.getElementById(`${productId}`);
        let itemImg = item.querySelector('.item-img');
        itemImg.classList.add('item-border');
    }
    toggleQtyBtns();
    updateCart();
}

let updateCart = ()=>{
    renderCartItems();
    renderSubTotal();
}

// add to cart html
let renderCartItems = ()=>{
    loadedCart.style.display = "flex";
    emptyCart.style.display = "none";
    cartList.innerHTML = "";

    basket.map((x)=>{
    let { id, name, category, price, image, numberOfUnits } = x;
    cartList.innerHTML += `
        <div class="cart-item">
            <div class="cart-item-details">
              <h3 class="cart-name">${name}</h3>
              <div class="cart-qty-and-price">
                <span class="cart-item-total">
                ${numberOfUnits}x
                </span>
                <span class="cart-price">@ $${price}</span>
                <span class="cart-total-price">$${price * numberOfUnits}</span>
              </div>
            </div>
              <!-- delete button -->
              <img src="assets/images/icon-remove-item.svg" alt="" class="delete-item" onclick="deleteItems(${id})">
        </div>
    `;
    })
}

// increment and decrement function
let changeNumberOfUnits = (action, id)=>{
    basket = basket.map((item)=> {
        let oldNumberOfUnits = item.numberOfUnits;
        if(item.id === id ){
            if(action === "minus" && oldNumberOfUnits > 1){
                oldNumberOfUnits --;
                let item = document.getElementById(`${id}`);
                let qty = item.querySelector('.quantity-number');
                qty.innerHTML = oldNumberOfUnits;
            } 
            else if(action === "plus" && oldNumberOfUnits < 10){
                oldNumberOfUnits ++;
                let item = document.getElementById(`${id}`);
                let qty = item.querySelector('.quantity-number');
                qty.innerHTML = oldNumberOfUnits;
            }
        }
        return {
            ...item,
            numberOfUnits: oldNumberOfUnits,
        }

    }) 
    updateCart();
    /* localStorage.setItem('shopData', JSON.stringify(basket)); */
}

// calculate item prices
let renderSubTotal = ()=>{
    let totalEl = document.querySelector('.grand-price');
    let totalItemsEl = document.querySelector('.cart-total-number');
    let totalPrice = 0
    let totalItems = 0;
    basket.map((x)=> {
        totalItems = totalItems + x.numberOfUnits;
        totalPrice = totalPrice + (x.price * x.numberOfUnits);

        totalItemsEl.innerHTML = totalItems;
        totalEl.innerHTML = `$${totalPrice.toFixed(2)}`;
    })
}

// toggle qty  buttons on items
let toggleQtyBtns = ()=>{
    productList.addEventListener('click', (e)=>{
        let clicked = e.target;
        let qtyBtns = clicked.nextElementSibling;
        if(clicked.classList.contains('addToCartBtn')){
            clicked.style.display = 'none';
            qtyBtns.style.display = 'flex';
        }
    })
}

// delete items from cart
let deleteItems = (id)=>{
    basket = basket.filter((x)=> x.id !== id);
    
    let productItems = document.querySelectorAll('.products .item');
    products.forEach((product)=> {
        let productId = id;
        productItems.forEach((x)=> {
            let item = document.getElementById(`${productId}`);
            let addBtn = item.querySelector('.addToCartBtn');
            let qtyBtns = item.querySelector('.quantity-btns');
            let itemImg = item.querySelector('.item-img');
            itemImg.classList.remove('item-border');
            qtyBtns.style.display = "none";
            addBtn.style.display = "flex";
        })
    })
    updateCart();
    hideLoadedCart();
}

//hide loaded cart
let hideLoadedCart = ()=>{
    let loadedCart = document.querySelector('.loaded-cart');
    let emptyCart = document.querySelector('.empty-cart');

    let search = basket.length === 0;
    if(search){
        loadedCart.style.display = 'none';
        emptyCart.style.display = 'block';
    } else {
        loadedCart.style.display = 'block';
        emptyCart.style.display = 'none';
    }
    console.log(search);
}

// confirm orders
let confirmOrders = ()=>{
    let confirmedMain = document.querySelector('.confirmed-main');
    let ordersHTML = document.querySelector('.confirmed-orders');
    confirmedMain.style.display = "block";
    ordersHTML.innerHTML = 
    basket.map((x)=> {
        let {id, name, image, numberOfUnits, price} = x;
        return `
        <div class="order">
        <div class="order-header">
          <img src="${image.desktop}" alt="${name}" class="order-item-img">
          <div class="order-item-details">
            <h5 class="order-item-name">${name}</h5>
            <div class="order-qty-and-price">
              <span class="order-item-qty">${numberOfUnits}x</span>
              <span class="order-buy-price">$${price}</span>
            </div>              
        </div>
        </div>
        <div class="order-price">$${price * numberOfUnits}</div>
    </div>
        `;
    })
}
// start new order.
let startNewOrder = ()=>{
    let newOrderBtn = document.querySelector('.new-order-btn');
    let confirmedMain = document.querySelector('.confirmed-main');
    let emptyCart = document.querySelector('.empty-cart');
    let loadedCart = document.querySelector('.loaded-cart');
    let images = document.querySelectorAll('.item-img');
    let qtyBtns = document.querySelectorAll('.quantity-btns');
    let addBtns = document.querySelectorAll('.addToCartBtn');
    let cartList = document.querySelector('.cart-list');
    
        confirmedMain.style.display = 'none';
        qtyBtns.forEach((btn)=> {
            if(btn.style.display = 'flex'){
                btn.style.display = 'none';
            }
        })
        // show addtocart buttons on items
        addBtns.forEach((btn)=> {
            if(btn.style.display = 'none'){
                btn.style.display = 'flex';
            }
        })
        // hide image borders on all items
        images.forEach((img)=> {
            if(img.classList.contains('item-border')){
                img.classList.remove('item-border');
            }
        })
    clearBasket();
}
// clear Basket
let clearBasket = ()=>{
    basket = basket.filter((x)=> x.numberOfUnits !== 0);
}