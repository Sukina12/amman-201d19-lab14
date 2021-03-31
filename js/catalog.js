/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);
let counter=0;
// console.log(Product.allProducts);
// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {

  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let itemsOption = document.createElement('option')
    selectElement.appendChild(itemsOption);
    itemsOption.textContent=Product.allProducts[i].name;
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {

  // TODO: Prevent the page from reloading
  event.preventDefault();
  // Do all the things ...
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  counter++;
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(event) {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  // TODO: using those, add one item to the Cart
  let itemSelect = document.getElementById('items').value;
  let quantitySelect = document.getElementById('quantity').value;

  cart.items.push([itemSelect,quantitySelect]);
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let itemCount = document.getElementById('itemCount')
  itemCount.textContent = ` (${counter}) `;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  let resultPart = document.getElementById('cartContents');
  let ulEl = document.createElement ('ul');
  resultPart.appendChild(ulEl);
  let data = JSON.parse(localStorage.getItem('cart'));
  
  let liEl=document.createElement('li');
  ulEl.appendChild(liEl);
  for (let i=0; i<data.length; i++){
    liEl.textContent =`${data[i]}`;
  }
  
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
