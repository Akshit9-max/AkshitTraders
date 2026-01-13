const ADMIN_EMAIL = "proakshit634@gmail.com";
const ADMIN_PASSWORD = "2444666668888888000000000";

let products = JSON.parse(localStorage.getItem("products")) || [];

/* ---------- AUTH ---------- */
function openLogin() {
  document.getElementById("loginBox").classList.remove("hidden");
}

function login() {
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  if (email === ADMIN_EMAIL && pass === ADMIN_PASSWORD) {
    document.getElementById("loginBox").classList.add("hidden");
    document.getElementById("adminPanel").classList.remove("hidden");
    alert("Admin access granted 👑");
  } else {
    alert("Wrong credentials ❌");
  }
}

function closeAdmin() {
  document.getElementById("adminPanel").classList.add("hidden");
}

/* ---------- PRODUCTS ---------- */
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
}

function renderProducts() {
  const shop = document.getElementById("shop");
  shop.innerHTML = "";

  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <img src="${product.img}" onerror="this.src='https://via.placeholder.com/300x300.png'">
      <h2>${product.name}</h2>
      <p>₹${product.price}</p>
      <span class="delete-btn" onclick="deleteProduct(${index})">🗑️</span>
    `;

    shop.appendChild(card);
  });
}

function addProduct() {
  const name = document.getElementById("pname").value;
  const price = document.getElementById("pprice").value;
  const img = document.getElementById("pimg").value;

  if (!name || !price || !img) {
    alert("Fill all fields");
    return;
  }

  products.push({ name, price, img });
  saveProducts();
  renderProducts();

  document.getElementById("pname").value = "";
  document.getElementById("pprice").value = "";
  document.getElementById("pimg").value = "";
}

function deleteProduct(index) {
  const pass = prompt("Enter admin password to delete:");

  if (pass === ADMIN_PASSWORD) {
    products.splice(index, 1);
    saveProducts();
    renderProducts();
    alert("Product deleted 🧹");
  } else {
    alert("Wrong password ❌");
  }
}

/* ---------- INIT ---------- */
renderProducts();

/* ---------- CLICK OUTSIDE CLOSE ---------- */
document.addEventListener("click", function (e) {
  const admin = document.getElementById("adminPanel");
  const login = document.getElementById("loginBox");

  if (!admin.classList.contains("hidden") && !admin.contains(e.target) && !e.target.closest("button")) {
    admin.classList.add("hidden");
  }

  if (!login.classList.contains("hidden") && !login.contains(e.target) && !e.target.closest("button")) {
    login.classList.add("hidden");
  }
});
