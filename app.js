document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("products");
  const addProductForm = document.getElementById("add-product-form");
  const updateProductForm = document.getElementById("update-product-form");
  const updateProductId = document.getElementById("update-id");
  const updateProductName = document.getElementById("update-name");
  const updateProductPrice = document.getElementById("update-price");
  const updateProductDescription = document.getElementById("update-description");
  const deleteProductForm = document.getElementById("delete-product-form");
  async function fetchProducts() {
    try {
      const response = await fetch("http://18.118.28.222:3000/products");
      if (!response.ok) throw new Error('Network response was not ok');
      const products = await response.json();
      renderProducts(products);
    } catch (error) {
      console.error("Fetch error: ", error);
    }
  }

  function renderProducts(products) {
    productList.innerHTML = "";
    products.forEach((product) => {
      const li = document.createElement("li");
      li.textContent = `${product.name} - $${product.price} - ${product.description}`;
      productList.appendChild(li);
    });
  }

  addProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = addProductForm.elements["name"].value;
    const price = addProductForm.elements["price"].value;
    const description = addProductForm.elements["description"].value;
    await addProduct(name, price, description);
    addProductForm.reset();
    fetchProducts();
  });

  updateProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = updateProductId.value;
    const name = updateProductName.value;
    const price = updateProductPrice.value;
    const description = updateProductDescription.value;
    await updateProduct(id, name, price, description);
    updateProductForm.reset();
    updateProductForm.style.display = "none";
    fetchProducts();
  });

  deleteProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const id = deleteProductForm.elements["delete-id"].value;
    await deleteProduct(id);
    deleteProductForm.reset();
    fetchProducts();
  });

  async function addProduct(name, price, description) {
    try {
      const response = await fetch("http://18.118.28.222:3000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, description }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
      console.error("Add product error: ", error);
    }
  }

  async function deleteProduct(id) {
    try {
      const response = await fetch(`http://18.118.28.222:3000/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
      console.error("Delete product error: ", error);
    }
  }

  async function updateProduct(id, name, price, description) {
    try {
      const response = await fetch(`http://18.118.28.222:3000/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, price, description }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
    } catch (error) {
      console.error("Update product error: ", error);
    }
  }

  fetchProducts();
  setInterval(fetchProducts, 5000);
});
