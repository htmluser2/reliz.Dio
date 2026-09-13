const products = [
	{ name: 'труси «потужний аргумент»', price: '3000 грн', category: 'верх', image: 'https://nusho.com.ua/photos/elem/f/20230205_145717_%D0%BF%D0%BE%D1%82%D1%83%D0%B6%D0%BD%D0%B8%D0%B9%20%D0%B0%D1%80%D0%B3%D1%83%D0%BC%D0%B5%D0%BD%D1%82.jpg' },
	{ name: 'футболка «молодіжна»', price: '8 400 грн', category: 'верх', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNeQ5qbwPFlQ8xCed-N_2P4UA0F1d7a5h6PymBInaGxWwmQF_SrGRkqg0p&s=10' },
	{ name: 'Штани «рошенська»', price: '4 900 грн', category: 'низ', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Сорочка «Маніфест»', price: '3 600 грн', category: 'верх', image: 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Кепка «P-отужно»', price: '1 200 грн', category: 'аксесуари', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Ремінь «ex-pp»', price: '1 800 грн', category: 'аксесуари', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85' }
];

const productsContainer = document.querySelector('#products');
const bagCount = document.querySelector('#bag-count');
const toast = document.querySelector('#toast');
const cart = document.querySelector('#cart');
const cartBackdrop = document.querySelector('#cart-backdrop');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const cartItems = [];

function renderProducts(filter = 'all') {
	const visibleProducts = filter === 'all' ? products : products.filter((product) => product.category === filter);
	productsContainer.innerHTML = visibleProducts.map((product, index) => `
		<article class="product-card" style="--card-index: ${index}">
			<div class="product-image-wrap"><img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy"><button class="quick-add" data-product="${product.name}" type="button" aria-label="Додати ${product.name} до сумки">+</button></div>
			<div class="product-meta"><div><p class="product-category">${product.category}</p><h3>${product.name}</h3></div><strong>${product.price}</strong></div>
		</article>`).join('');
}

function showToast(message) {
	toast.textContent = message;
	toast.classList.add('visible');
	window.clearTimeout(showToast.timer);
	showToast.timer = window.setTimeout(() => toast.classList.remove('visible'), 2400);
}

function getPrice(price) {
	return Number(price.replace(/\D/g, ''));
}

function formatPrice(price) {
	return `${new Intl.NumberFormat('uk-UA').format(price)} грн`;
}

function renderCart() {
	const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
	const totalPrice = cartItems.reduce((total, item) => total + getPrice(item.product.price) * item.quantity, 0);
	bagCount.textContent = totalItems;
	cartTotal.textContent = formatPrice(totalPrice);
	cartItemsContainer.innerHTML = cartItems.length ? cartItems.map((item, index) => `
		<div class="cart-item"><img src="${item.product.image}" alt="${item.product.name}"><div class="cart-item-info"><h3>${item.product.name}</h3><p>${item.product.price} · ${item.quantity} шт.</p><button class="remove-item" data-index="${index}" type="button">Видалити</button></div></div>`).join('') : '<p class="empty-cart">Ваша сумка порожня.<br>Оберіть річ із колекції.</p>';
}

const revealObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			revealObserver.unobserve(entry.target);
		}
	});
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function openCart() {
	cart.classList.add('open');
	cartBackdrop.classList.add('visible');
	cart.setAttribute('aria-hidden', 'false');
}

function closeCart() {
	cart.classList.remove('open');
	cartBackdrop.classList.remove('visible');
	cart.setAttribute('aria-hidden', 'true');
}

document.querySelectorAll('.filter-button').forEach((button) => {
	button.addEventListener('click', () => {
		document.querySelector('.filter-button.active').classList.remove('active');
		button.classList.add('active');
		renderProducts(button.dataset.filter);
	});
});

productsContainer.addEventListener('click', (event) => {
	const button = event.target.closest('.quick-add');
	if (!button) return;
	const product = products.find((item) => item.name === button.dataset.product);
	const existingItem = cartItems.find((item) => item.product.name === product.name);
	if (existingItem) existingItem.quantity += 1;
	else cartItems.push({ product, quantity: 1 });
	renderCart();
	showToast(`${button.dataset.product} додано до сумки`);
});

cartItemsContainer.addEventListener('click', (event) => {
	const button = event.target.closest('.remove-item');
	if (!button) return;
	cartItems.splice(Number(button.dataset.index), 1);
	renderCart();
});

document.querySelector('#bag-button').addEventListener('click', openCart);
document.querySelector('#close-cart').addEventListener('click', closeCart);
cartBackdrop.addEventListener('click', closeCart);
document.querySelector('#checkout-button').addEventListener('click', () => {
	if (!cartItems.length) {
		showToast('Додайте хоча б одну річ');
		return;
	}
	cartItems.length = 0;
	renderCart();
	closeCart();
	showToast('Дякуємо! Замовлення прийнято');
});

renderProducts();
renderCart();
