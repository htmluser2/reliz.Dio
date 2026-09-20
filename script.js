const products = [
	{ name: 'Футболка «потужність»', price: '8 400 грн', category: 'верх', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj6XPgi57Tj4YTCNuAv1hbxF5Qayyb2oK4c7GFSRQ2-kDo_BoKHKkRjEg&s=10' },
	{ name: 'Сорочка «Маніфест»', price: '3 600 грн', category: 'верх', image: 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Поло «Ознака»', price: '6 100 грн', category: 'верх', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Светр «Порядок»', price: '9 600 грн', category: 'верх', image: 'https://s.estro.ua/static/content/thumbs/*x*/7/a3/xzu7fg-bcbe4d6e0bf7a9d66ef303dc6409ba37.jpg' },
	{ name: 'Куртка «Профіль»', price: '14 800 грн', category: 'верх', image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Піджака «Лінія»', price: '12 300 грн', category: 'верх', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Тренч «Лінія»', price: '16 900 грн', category: 'верх', image: 'https://tales.ua/upload/iblock/23e/e1jq1q7j931nm65v0tfe1appk6a8iva4.jpg' },
	{ name: 'Жилет «Сигнал»', price: '5 600 грн', category: 'верх', image: 'https://static.staff-clothes.com/uploads/media/image_product/0001/79/acaa42849c234f41af7a2a05db7e5a4f.jpeg' },
	{ name: 'Джинси «Компас»', price: '4 900 грн', category: 'низ', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Штани «Силует»', price: '5 300 грн', category: 'низ', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Класичні брюки «Стандарт»', price: '5 900 грн', category: 'низ', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Кросівки «Пульс»', price: '7 200 грн', category: 'низ', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Кепка «P-01»', price: '1 200 грн', category: 'аксесуари', image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85' },
	{ name: 'Ремінь «EPP»', price: '1 800 грн', category: 'аксесуари', image: 'https://content1.rozetka.com.ua/goods/images/big/252120569.png' },
	{ name: 'Рюкзак «Старт»', price: '3 900 грн', category: 'аксесуари', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85' }
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
