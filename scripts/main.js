const searchInput = document.getElementById('searchInput');
const productsList = document.getElementById('productsList');
const searchResultTitle = document.getElementById('searchResultTitle');
const productItems = Array.from(productsList.querySelectorAll('li'));

// Функция фильтрации товаров
function filterProducts() {
    const query = searchInput.value.trim().toLowerCase();
    searchResultTitle.textContent = `Результат по запросу «${query}»`;

    let anyVisible = false;
    productItems.forEach(item => {
        const name = item.dataset.name.toLowerCase();
        if (name.includes(query)) {
            item.style.display = '';
            anyVisible = true;
        } else {
            item.style.display = 'none';
        }
    });

    if (!anyVisible) {
        productsList.innerHTML = '<li>По вашему запросу ничего не найдено</li>';
    } else {
        // Восстановить изначальный список, если были скрыты
        if (productsList.querySelector('li').textContent === 'По вашему запросу ничего не найдено') {
            productsList.innerHTML = '';
            productItems.forEach(item => productsList.appendChild(item));
        }
    }
}

// Обработчик поиска при вводе
searchInput.addEventListener('input', filterProducts);

// Функция добавления в корзину
function addToCart(product) {
    // Получаем корзину из localStorage или создаем пустой массив
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Проверяем, есть ли товар уже в корзине
    const existingProductIndex = cart.findIndex(item => item.name === product.name);
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Товар "${product.name}" добавлен в корзину!`);
}

// Навешиваем обработчики на кнопки
productsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        const li = e.target.closest('li');
        const product = {
            name: li.dataset.name,
            price: parseFloat(li.dataset.price),
            image: li.dataset.image
        };
        addToCart(product);
    }
});

// Инициализируем фильтр с пустым запросом, чтобы отобразить все товары
filterProducts();