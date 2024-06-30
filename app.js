//? Constants

const free_shipping_limit = 3000
const shipping_price = 25.99
const tax_rate = 0.18

//! Selectors

const deleteAllBtn = document.querySelector(".delete-div .fa-trash-can")
const products =  document.querySelector("article.products")

//* EventListeners

deleteAllBtn.addEventListener("click",()=> {
    if (confirm("Are you sure to delete the products?")) {
        deleteAll()        
    }
})

products.addEventListener("click", (e) =>{

    // Buttons

    if (e.target.classList.contains("fa-plus")) {
        e.target.previousElementSibling.textContent ++
        calculatePrice(e.target)


    } else if (e.target.classList.contains("fa-minus")) {
        if (e.target.nextElementSibling.textContent > 1) {
            e.target.nextElementSibling.textContent --
        }
        calculatePrice(e.target)

    } else if (e.target.classList.contains("fa-trash-can")) {
        e.target.closest(".product").remove()
        totalPrice()
    }

    if (document.querySelectorAll("article.products .fa-trash-can").length < 1) {
        deleteAll()
    }

})



//^ Functions

const deleteAll = () => {
    products.textContent = "No Product"
    products.classList.add("no-product")
    document.querySelector(".delete-div").remove()

    totalPrice()
}

const calculatePrice = (btn) => {
    const discountedPrice = btn.closest(".product-info").querySelector("#discounted-price")
    const productPrice = btn.closest(".buttons-div").querySelector("#product-price")

    const quantity = btn.parentNode.quarySelector("#quantity")

    productPrice.textContent = (discountedPrice.textContent * quantity.textContent).toFixed(2)

    totalPrice()
}

const totalPrice = () => {
    const prices = document.querySelectorAll("#product-price")
    const total = [...prices].reduce((sum, price) => sum + Number(price.textContent),0)
    const shippingPrice = total >= free_shipping_limit || total === 0 ? 0 : shipping_price
    const totalWithShipping = total + shippingPrice
    const tax = totalWithShipping * tax_rate
    const sum = total + tax + shippingPrice

    const selectedPrice = document.querySelector("#selected-price")
    selectedPrice.textContent = total.toFixed(2)
    document.querySelector("#shipping").textContent = shippingPrice.toFixed(2)
    document.querySelector("#tax").textContent = tax.toFixed(2)
    document.querySelector("#total").textContent = sum.toFixed(2)
}

window.addEventListener("load", () => {
    totalPrice()
})


