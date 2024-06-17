document.addEventListener('DOMContentLoaded', loadProducts);

const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const totalCalories = document.getElementById('total-calories-value');

form.addEventListener('submit', addProduct);

function addProduct(event) {
    event.preventDefault();
    const productName = document.getElementById('product-name').value;
    const calories = parseInt(document.getElementById('calories').value);
    if (productName && calories) {
        const product = {
            id: Date.now(),
            name: productName,
            calories: calories
        };
        addProductToList(product);
        saveProduct(product);
        updateTotalCalories();
        document.getElementById('product-name').value = '';
        document.getElementById('calories').value = '';
    }
}

function addProductToList(product) {
    const listItem = document.createElement('li');
    listItem.setAttribute('data-id', product.id); // Добавьте атрибут data-id
    listItem.textContent = product.name + ' (' + product.calories + ' ккал)';
    
    const editButton = document.createElement('button');
    editButton.textContent = 'Редактировать';
    editButton.addEventListener('click', function() {
        const updatedName = prompt('Введите новое название продукта:');
        const updatedCalories = parseInt(prompt('Введите новое количество калорий:'));
        
        if (updatedName && !isNaN(updatedCalories)) {
            editProduct(product.id, { name: updatedName, calories: updatedCalories });
        }
    });
    
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.addEventListener('click', function() {
        deleteProduct(product.id);
        productList.removeChild(listItem);
        updateTotalCalories();
    });
    
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    productList.appendChild(listItem);
}

function saveProduct(product) {
    const products = getProducts();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function deleteProduct(id) {
    const products = getProducts();
    const updatedProducts = products.filter(function(product) {
        return product.id !== id;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    updateTotalCalories();
}

function loadProducts() {
    const products = getProducts();
    products.forEach(function(product) {
        addProductToList(product);
    });
    updateTotalCalories();
}

function getProducts() {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
}

function updateTotalCalories() {
    const products = getProducts();
    let totalCalories = 0;
    products.forEach(function(product) {
        totalCalories += product.calories;
    });
    const totalCaloriesElement = document.getElementById('total-calories-value');
    totalCaloriesElement.textContent = totalCalories;
}

function editProduct(id, updatedProduct) {
    const products = getProducts();
    const updatedProducts = products.map(product => {
        if (product.id === id) {
            return { ...product, ...updatedProduct };
        }
        return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    loadProducts();
}

function editProduct(id, updatedProduct) {
    const products = getProducts();
    const updatedProducts = products.map(product => {
        if (product.id === id) {
            return { ...product, ...updatedProduct };
        }
        return product;
    });
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    
    // Найдите элемент списка продукта и обновите его содержимое
    const listItem = document.querySelector(`li[data-id="${id}"]`);
    if (listItem) {
        listItem.textContent = updatedProduct.name + ' (' + updatedProduct.calories + ' ккал)';
        
        // Добавьте кнопки "Редактировать" и "Удалить" заново
        const editButton = document.createElement('button');
        editButton.textContent = 'Редактировать';
        editButton.addEventListener('click', function() {
            const updatedName = prompt('Введите новое название продукта:');
            const updatedCalories = parseInt(prompt('Введите новое количество калорий:'));
    
            if (updatedName && !isNaN(updatedCalories)) {
                editProduct(id, { name: updatedName, calories: updatedCalories });
            }
        });
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.addEventListener('click', function() {
            deleteProduct(id);
            productList.removeChild(listItem);
            updateTotalCalories();
        });
    
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);
    }
    
    updateTotalCalories();
}

