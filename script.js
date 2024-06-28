document.addEventListener('DOMContentLoaded', loadProducts);
// это строка кода, которая добавляет обработчик события DOMContentLoaded к документу.
// DOMContentLoaded - это событие, которое возникает, когда весь HTML-документ был загружен и проанализирован браузером. Это событие возникает раньше, чем все изображения, стили и скрипты были загружены.
// loadProducts - это функция, которая будет вызываться, когда событие DOMContentLoaded возникнет. Эта функция, вероятно, загружает продукты на страницу.
// Таким образом, эта строка кода устанавливает обработчик события DOMContentLoaded, который вызывает функцию loadProducts при срабатывании события.



// получение элементов из HTML-документа
const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const totalCalories = document.getElementById('total-calories-value');



form.addEventListener('submit', addProduct);
// это другая строка кода, которая добавляет обработчик события submit к элементу формы.
// submit - это событие, которое возникает, когда форма отправляется (например, при нажатии на кнопку отправки).
// addProduct - это функция, которая будет вызываться, когда событие submit возникнет. Эта функция, вероятно, добавляет продукт, который был введен в форму.
// Таким образом, эта строка кода устанавливает обработчик события submit, который вызывает функцию addProduct при срабатывании события.




// добавление продукта
function addProduct(event) {
    event.preventDefault();
    // предотвратить автоматическую отправку формы и выполнить свою собственную логику вместо этого.

    // получить значения полей формы
    const productName = document.getElementById('product-name').value;
    const calories = parseInt(document.getElementById('calories').value);

    // если значения полей не пустые, создать продукт и добавить его в список
    if (productName && calories) {


        const product = {
            id: Date.now(),
            name: productName,
            calories: calories
        };

        // добавить продукт в список
        addProductToList(product);


        // очистить значения полей формы
        saveProduct(product);


        // обновить общее количество калорий
        updateTotalCalories();


        // очистить значения полей формы
        document.getElementById('product-name').value = '';
        document.getElementById('calories').value = '';
    }
}


// добавить продукт в список
function addProductToList(product) {

    // создать элемент списка
    const listItem = document.createElement('li');
    // Добавьте атрибут data-id
    listItem.setAttribute('data-id', product.id); 

    // добавить содержимое элемента списка без изменения его отображения.
    listItem.textContent = product.name + ' (' + product.calories + ' ккал)';
    
    // создать кнопки редактирования 
    const editButton = document.createElement('button');
    // добавить содержимое
    editButton.textContent = 'Редактировать';
    // нажатие на кнопку "редактировать"
    editButton.addEventListener('click', function() {
        //  это функция, которая отображает диалоговое окно с заданным сообщением и поле ввода. Пользователь может ввести текст в это поле и нажать "ОК". Функция prompt возвращает введенное пользователем значение.
        const updatedName = prompt('Введите новое название продукта:');
        // преобразует строковое значение, возвращенное функцией prompt, в целочисленное значение. Это необходимо, так как пользователь вводит число в виде строки.
        const updatedCalories = parseInt(prompt('Введите новое количество калорий:'));
        // если оба поля не пустые то у этой записи новое имя и новые калории.
        if (updatedName && !isNaN(updatedCalories)) {
            editProduct(product.id, { name: updatedName, calories: updatedCalories });
        }
    });
    
    // создание кнопки "Удалить"
    const deleteButton = document.createElement('button');
    // содержимое кнопки
    deleteButton.textContent = 'Удалить';

    // при нажатии на кнопку 
    deleteButton.addEventListener('click', function() {
        // вызов функции удаления
        deleteProduct(product.id);

        // удаление из HTML
        productList.removeChild(listItem);

        // обновление общего числа калорий.
        updateTotalCalories();
    });
    
    // добавление кнопок в данную запись
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    //добавление элемента в HTML. Данная запись добавляется на экран в список.
    productList.appendChild(listItem);
}



//сохранение продукта
function saveProduct(product) {
    // функция получить продукты как products
    const products = getProducts();
    products.push(product);

    //сохранение данных в локальном хранилище браузера.localStorage - это объект, который позволяет сохранять данные в локальном хранилище браузера. Данные, сохраненные в localStorage, остаются доступными даже после закрытия браузера или перезагрузки страницы.

    // setItem('products', JSON.stringify(products)) - это метод объекта localStorage, который устанавливает значение для указанного ключа. В данном случае, ключом является 'products', а значение products преобразуется в строку с помощью JSON.stringify, так как localStorage может хранить только строки.
    
    // Таким образом, эта строка кода сохраняет массив products в локальном хранилище браузера под ключом 'products'. Для извлечения этих данных позже, их нужно будет извлечь из локального хранилища и преобразовать обратно в объект с помощью JSON.parse.
    localStorage.setItem('products', JSON.stringify(products));
}

function deleteProduct(id) {
    const products = getProducts();


    //const updatedProducts = products.filter(function(product) {     return product.id !== id; }); - это строка кода, которая создает новый массив updatedProducts, содержащий элементы из массива products, удовлетворяющие условию фильтрации.

    // products - это исходный массив, из которого мы хотим отфильтровать элементы.

    // .filter() - это метод массива, который создает новый массив с элементами, которые прошли проверку, заданную в коллбек-функции.

    // В данном случае, коллбек-функция принимает аргумент product, который представляет каждый элемент массива products. Условие product.id !== id означает, что элемент будет включен в новый массив updatedProducts, если id элемента не равен заданному id.

    // Таким образом, эта строка кода создает новый массив updatedProducts, который содержит элементы из исходного массива products, у которых id не равен заданному id.
    const updatedProducts = products.filter(function(product) {
        return product.id !== id;
    });

    // поместить новый массив в localStorage с помощью localStorage.setItem('products', JSON.stringify(updatedProducts)); - это строка кода, которая сохраняет обновленный массив products в локальном хранилище браузера под ключом 'products'. 
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // обновление общего числа калорий.
    updateTotalCalories();
}

function loadProducts() {

    // получение продуктов из localStorage
    const products = getProducts();

    // добавление продуктов на страницу
    products.forEach(function(product) {
        addProductToList(product);
    });

    // обновление общего числа калорий.
    updateTotalCalories();
}

function getProducts() {

    // получение продуктов из localStorage
    const products = localStorage.getItem('products');

    // если продуктов нет, вернуть пустый массив
    return products ? JSON.parse(products) : [];
}



// обновление общего числа калорий
function updateTotalCalories() {

    // получение продуктов из localStorage
    const products = getProducts();

    // подсчет общего числа калорий
    let totalCalories = 0;
    products.forEach(function(product) {
        totalCalories += product.calories;
    });

    // обновление общего числа калорий на странице
    const totalCaloriesElement = document.getElementById('total-calories-value');
    totalCaloriesElement.textContent = totalCalories;
}


//редактирование продукта
function editProduct(id, updatedProduct) {

    // получение продуктов из localStorage
    const products = getProducts();

    // обновление продукта в массиве
    const updatedProducts = products.map(product => {

        // если id совпадает, обновить продукт
        if (product.id === id) {
            return { ...product, ...updatedProduct };
        }
        return product;
    });

    // поместить обновленный массив в localStorage с помощью localStorage.setItem('products', JSON.stringify(updatedProducts));
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

