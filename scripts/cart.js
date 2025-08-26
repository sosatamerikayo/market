const cartList = document.getElementById('cartList');
const clearCartBtn = document.getElementById('clearCartBtn');
const checkoutBtn = document.getElementById('checkoutBtn');

// Функция отображения корзины
function displayCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li>Корзина пуста</li>';
        checkoutBtn.style.display = 'none';
        return;
    } else {
        checkoutBtn.style.display = '';
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="vertical-align: middle;">
                    <strong>${item.name}</strong> — $${item.price} x ${item.quantity} = $${(item.price * item.quantity).toFixed(2)}
                `;
        cartList.appendChild(li);
    });
}

// Очистка корзины
clearCartBtn.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите очистить корзину?')) {
        localStorage.removeItem('cart');
        displayCart();
    }
});

// Имитация оплаты (можно расширить)
checkoutBtn.addEventListener('click', (e) => {
    e.preventDefault();
    alert('Спасибо за покупку!');
    localStorage.removeItem('cart');
    displayCart();
});

displayCart();
