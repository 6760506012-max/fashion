/* =========================
   SEARCH
========================= */

function toggleSearch() {

    const searchBox =
        document.getElementById("searchBox");

    if (searchBox) {

        searchBox.classList.toggle("show");

    }

}


/* =========================
   GET CART
========================= */

function getCart() {

    return JSON.parse(
        localStorage.getItem("rnCart") || "[]"
    );

}


/* =========================
   SAVE CART
========================= */

function saveCart(cart) {

    localStorage.setItem(
        "rnCart",
        JSON.stringify(cart)
    );

    updateCount();

}


/* =========================
   CART COUNT
========================= */

function updateCount() {

    const cart =
        getCart();

    const count =
        cart.reduce(
            (sum, product) =>
                sum + product.qty,
            0
        );

    document
        .querySelectorAll("#cartCount")
        .forEach(element => {

            element.textContent =
                count;

        });

}


/* =========================
   ADD PRODUCT
========================= */

function addToCart(name, price) {

    let cart =
        getCart();

    const item =
        cart.find(
            product =>
                product.name === name
        );

    if (item) {

        item.qty++;

    } else {

        cart.push({

            name: name,

            price: price,

            qty: 1

        });

    }

    saveCart(cart);

    alert(
        "เพิ่ม " +
        name +
        " ลงตะกร้าแล้ว"
    );

}


/* =========================
   SHOW PRODUCTS
========================= */

function renderProducts() {

    const box =
        document.getElementById(
            "productList"
        );

    if (
        !box ||
        !window.pageProducts
    ) {

        return;

    }

    box.innerHTML =
        pageProducts
        .map(product => {

            return `

            <article class="product">

                <div
                    class="product-img"
                    style="--tone:${product[2]}"
                >

                    ${product[0]}

                </div>

                <div class="product-name">

                    ${product[0]}

                </div>

                <div class="product-price">

                    ฿${product[1].toLocaleString()}

                </div>

                <button
                    class="add"
                    onclick="addToCart(
                        '${product[0]}',
                        ${product[1]}
                    )"
                >

                    🛒

                </button>

            </article>

            `;

        })
        .join("");

}


/* =========================
   SHOW CART
========================= */

function renderCart() {

    const box =
        document.getElementById(
            "cartItems"
        );

    if (!box) {

        return;

    }

    const cart =
        getCart();

    if (cart.length === 0) {

        box.innerHTML =
            "<p>ยังไม่มีสินค้าในตะกร้า</p>";

    } else {

        box.innerHTML =
            cart.map(
                (product, index) => {

                    return `

                    <div class="cart-row">

                        <span>

                            ${product.name}

                            <br>

                            ฿${product.price.toLocaleString()}

                            × ${product.qty}

                        </span>

                        <button
                            onclick="removeItem(${index})"
                        >

                            ลบ

                        </button>

                    </div>

                    `;

                }
            ).join("");

    }

    const total =
        cart.reduce(
            (sum, product) =>
                sum +
                product.price *
                product.qty,
            0
        );

    document
        .getElementById("total")
        .textContent =
            "฿" +
            total.toLocaleString();

}


/* =========================
   REMOVE PRODUCT
========================= */

function removeItem(index) {

    let cart =
        getCart();

    cart.splice(index, 1);

    saveCart(cart);

    renderCart();

}


/* =========================
   SEARCH PRODUCTS
========================= */

function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        );

    if (!input) {

        return;

    }

    const keyword =
        input.value.toLowerCase();

    document
        .querySelectorAll(".product")
        .forEach(product => {

            if (
                product.textContent
                    .toLowerCase()
                    .includes(keyword)
            ) {

                product.style.display = "";

            } else {

                product.style.display =
                    "none";

            }

        });

}


/* =========================
   START
========================= */

renderProducts();

renderCart();

updateCount();