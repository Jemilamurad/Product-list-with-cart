const container = document.querySelector(".container");
const foodContainer = document.getElementById("food-container");
const cart = document.querySelector(".cart");
let amount = document.getElementById("amount");
const emptyCart = document.getElementById("empty-cart");

let cartCount = 0;
let cartItems = [];

const data = [
  {
    image: {
      thumbnail: "./images/image-waffle-thumbnail.jpg",
      desktop: "./images/image-waffle-desktop.jpg",
      mobile: "./images/image-waffle-mobile.jpg",
      tablet: "./images/image-waffle-tablet.jpg",
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },
  {
    image: {
      thumbnail: "./images/image-creme-brulee-thumbnail.jpg",
      mobile: "./images/image-creme-brulee-mobile.jpg",
      tablet: "./images/image-creme-brulee-tablet.jpg",
      desktop: "./images/image-creme-brulee-desktop.jpg",
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },
  {
    image: {
      thumbnail: "./images/image-macaron-thumbnail.jpg",
      mobile: "./images/image-macaron-mobile.jpg",
      tablet: "./images/image-macaron-tablet.jpg",
      desktop: "./images/image-macaron-desktop.jpg",
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },
  {
    image: {
      thumbnail: "./images/image-tiramisu-thumbnail.jpg",
      mobile: "./images/image-tiramisu-mobile.jpg",
      tablet: "./images/image-tiramisu-tablet.jpg",
      desktop: "./images/image-tiramisu-desktop.jpg",
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: "./images/image-baklava-thumbnail.jpg",
      mobile: "./images/image-baklava-mobile.jpg",
      tablet: "./images/image-baklava-tablet.jpg",
      desktop: "./images/image-baklava-desktop.jpg",
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },
  {
    image: {
      thumbnail: "./images/image-meringue-thumbnail.jpg",
      mobile: "./images/image-meringue-mobile.jpg",
      tablet: "./images/image-meringue-tablet.jpg",
      desktop: "./images/image-meringue-desktop.jpg",
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: "./images/image-cake-thumbnail.jpg",
      mobile: "./images/image-cake-mobile.jpg",
      tablet: "./images/image-cake-tablet.jpg",
      desktop: "./images/image-cake-desktop.jpg",
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./images/image-brownie-thumbnail.jpg",
      mobile: "./images/image-brownie-mobile.jpg",
      tablet: "./images/image-brownie-tablet.jpg",
      desktop: "./images/image-brownie-desktop.jpg",
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: "./images/image-panna-cotta-thumbnail.jpg",
      mobile: "./images/image-panna-cotta-mobile.jpg",
      tablet: "./images/image-panna-cotta-tablet.jpg",
      desktop: "./images/image-panna-cotta-desktop.jpg",
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];
const confirmed = () => {
  let totalOrderPrice = 0;

  let cartItemsHtml = cartItems
    .map((item) => {
      const totalPrice = item.price * item.quantity;
      totalOrderPrice += totalPrice;

      return `
        <li class="d-flex gap-4 w-100">
          <img class='thumbnail' src="${item.image.thumbnail}" alt="${
        item.name
      }" width="48" height="48">
          <div class='flex-grow-1'>
            <h5 class='mt-3'>${item.name}</h5>
           
            <p><span class="times">${
              item.quantity
            }x</span>  @ $${item.price.toFixed(
        2
      )}  <span class="total-price"> ${totalPrice.toFixed(2)}</span></p>
          </div>
        </li>
      `;
    })
    .join("");
  cartItemsHtml.innerHTML += `
  <div class='order-total'>
    <h4 class='order'>Order Total <span class='total'>$${totalOrderPrice.toFixed(
      2
    )}</span></h4>
  </div>
`;

  let modalContainer = document.getElementById("modalContainer");
  if (!modalContainer) {
    container.insertAdjacentHTML(
      "beforeend",
      `
        <div class="modal d-block modal-sheet d-block p-4 py-md-5" tabindex="-1" role="dialog" id="modalContainer">
        
          <div class="modal-dialog " role="document">
          
            <div class="modal-content rounded-4 shadow ml-3">
            <svg class='m-5 mb-0' width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 32.121L13.5 24.6195L15.6195 22.5L21 27.879L32.3775 16.5L34.5 18.6225L21 32.121Z" fill="#1EA575"/>
            <path d="M24 3C19.8466 3 15.7865 4.23163 12.333 6.53914C8.8796 8.84665 6.18798 12.1264 4.59854 15.9636C3.0091 19.8009 2.59323 24.0233 3.40352 28.0969C4.21381 32.1705 6.21386 35.9123 9.15077 38.8492C12.0877 41.7861 15.8295 43.7862 19.9031 44.5965C23.9767 45.4068 28.1991 44.9909 32.0364 43.4015C35.8736 41.812 39.1534 39.1204 41.4609 35.667C43.7684 32.2135 45 28.1534 45 24C45 18.4305 42.7875 13.089 38.8493 9.15076C34.911 5.21249 29.5696 3 24 3ZM24 42C20.4399 42 16.9598 40.9443 13.9997 38.9665C11.0397 36.9886 8.73256 34.1774 7.37018 30.8883C6.0078 27.5992 5.65134 23.98 6.34587 20.4884C7.04041 16.9967 8.75474 13.7894 11.2721 11.2721C13.7894 8.75473 16.9967 7.0404 20.4884 6.34587C23.98 5.65133 27.5992 6.00779 30.8883 7.37017C34.1774 8.73255 36.9886 11.0397 38.9665 13.9997C40.9443 16.9598 42 20.4399 42 24C42 28.7739 40.1036 33.3523 36.7279 36.7279C33.3523 40.1036 28.7739 42 24 42Z" fill="#1EA575"/>
            </svg>

              <div class="modal-body">
              
                <h2 class="fw-bold mb-0">Order Confirmed</h2>
                <p>We hope you enjoy our food.</p>
                <ul class="list d-grid gap-4 list-unstyled small" id="cartItemsList">
                  ${cartItemsHtml}
                </ul>
                   <div class='order-total'>
                <h4 class='order mb-4'>Order Total <span class='total'>$${totalOrderPrice.toFixed(
                  2
                )}</span></h4>
              </div>

                <button id='close-btn' type="button" class="btn btn-lg  w-100" data-bs-dismiss="modal" onclick="closeModal()">Start New Order</button>
              </div>
            </div>
          </div>
        </div>
      `
    );
  } else {
    const cartItemsList = document.getElementById("cartItemsList");
    cartItemsList.innerHTML = cartItemsHtml;
  }
  const closeBtn = document.getElementById("close-btn");
  closeBtn.addEventListener("click", closeModal);
};
const deleteFun = (index) => {
  cartItems = cartItems.filter((item, i) => index !== i);
  updateCartUI();
};

const closeModal = () => {
  const modalContainer = document.getElementById("modalContainer");
  modalContainer.classList.remove("d-block");
  cart.innerHTML = "";
  cartCount = 0;
  cartItems = [];
  amount.textContent = `(${cartCount})`;
  emptyCart.classList.remove("hide");
};

const addItem = (index) => {
  emptyCart.classList.add("hide");

  const item = data[index];
  const existingItem = cartItems.find(
    (cartItem) => cartItem.name === item.name
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const newItems = {
      ...item,
      quantity: 1, // start with 1
      inCart: true, // add it to cart
    };
    cartItems.push(newItems);
  }
  cartCount++;
  amount.textContent = `(${cartCount})`;

  updateCartUI();
};

const updateCartUI = () => {
  cart.innerHTML = "";
  let totalOrderPrice = 0;

  cartItems.forEach((item, index) => {
    const totalPrice = item.price * item.quantity;

    totalOrderPrice += totalPrice;

    cart.insertAdjacentHTML(
      "beforeend",
      `
      <div class="cart-item">
        <p class="name">${item.name}</p>
        <p><span class="times">x${
          item.quantity
        }</span>  <span class='each-price'>@ $${item.price.toFixed(
        2
      )}</span>  <span>$${totalPrice.toFixed(
        2
      )}</span><svg id="delete-btn-${index}"  class='delete'
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              fill="none"
              viewBox="0 0 10 10"
            >
              <path
                fill="#CAAFA7"
                d="M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z"
              />
            </svg></p>
   
      </div>
    `
    );
    const deleteBtn = document.getElementById(`delete-btn-${index}`);
    deleteBtn.addEventListener("click", () => deleteFun(index));
  });

  cart.innerHTML += `
  <div class='order-total'>
    <h4 class='order'>Order Total <span class='total'>$${totalOrderPrice.toFixed(
      2
    )}</span></h4>
  </div>
`;

  cart.innerHTML += `<button  class='confirm-btn'>Confirm Order</button>`;

  const confirmBtn = document.querySelector(".confirm-btn");

  confirmBtn.addEventListener("click", confirmed);
};

data.map((item, index) => {
  foodContainer.insertAdjacentHTML(
    "beforeend",
    `
    <div class="each">
     <div class="image-container">
    <img  src=${item.image.desktop}  srcset="${item.image.mobile} 480w, 
                     ${item.image.tablet} 575w, 
                     ${item.image.desktop} 1024w" 
             sizes="(max-width: 480px) 100vw, 
                    (max-width: 768px) 50vw, 
                    33vw" alt="image"/>
     <button class="buy-button" id="buy-button-${index}"><svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" fill="none" viewBox="0 0 21 20"><g fill="#C73B0F" clip-path="url(#a)"><path d="M6.583 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM15.334 18.75a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5ZM3.446 1.752a.625.625 0 0 0-.613-.502h-2.5V2.5h1.988l2.4 11.998a.625.625 0 0 0 .612.502h11.25v-1.25H5.847l-.5-2.5h11.238a.625.625 0 0 0 .61-.49l1.417-6.385h-1.28L16.083 10H5.096l-1.65-8.248Z"/><path d="M11.584 3.75v-2.5h-1.25v2.5h-2.5V5h2.5v2.5h1.25V5h2.5V3.75h-2.5Z"/></g><defs><clipPath id="a"><path fill="#fff" d="M.333 0h20v20h-20z"/></clipPath></defs></svg>Add to Cart</button>
      </div>
    <p>${item.category}</p>
    <p><b>${item.name}</b></p>
    <p class="price">$${item.price.toFixed(2)}</p>
    </div>
    `
  );
  const buyButton = document.getElementById(`buy-button-${index}`);
  buyButton.addEventListener("click", () => addItem(index));
});
