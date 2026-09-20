const products = [
	{
		name: 'Футболка «Потужність»',
		price: '8 400 грн',
		category: 'верх',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj6XPgi57TjY4TCNuAv1hbxF5Qayyb2oK4c7GFSRQ2-kDo_BoKHKkRjEg&s=10'
	},
	{
		name: 'Сорочка «Маніфест»',
		price: '3 600 грн',
		category: 'верх',
		image: 'https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Поло «Ознака»',
		price: '6 100 грн',
		category: 'верх',
		image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Светр «Порядок»',
		price: '9 600 грн',
		category: 'верх',
		image: 'https://s.estro.ua/static/content/thumbs/*x*/7/a3/xzu7fg-bcbe4d6e0bf7a9d66ef303dc6409ba37.jpg'
	},
	{
		name: 'Куртка «Профіль»',
		price: '14 800 грн',
		category: 'верх',
		image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Піджак «Лінія»',
		price: '12 300 грн',
		category: 'верх',
		image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Тренч «Лінія»',
		price: '16 900 грн',
		category: 'верх',
		image: 'https://tales.ua/upload/iblock/23e/e1jq1q7j931nm65v0tfe1appk6a8iva4.jpg'
	},
	{
		name: 'Жилет «Сигнал»',
		price: '5 600 грн',
		category: 'верх',
		image: 'https://static.staff-clothes.com/uploads/media/image_product/0001/79/acaa42849c234f41af7a2a05db7e5a4f.jpeg'
	},
	{
		name: 'Джинси «Компас»',
		price: '4 900 грн',
		category: 'низ',
		image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Штани «Силует»',
		price: '5 300 грн',
		category: 'низ',
		image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Класичні брюки «Стандарт»',
		price: '5 900 грн',
		category: 'низ',
		image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Кросівки «Пульс»',
		price: '7 200 грн',
		category: 'низ',
		image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Кепка «P-01»',
		price: '1 200 грн',
		category: 'аксесуари',
		image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=900&q=85'
	},
	{
		name: 'Ремінь «EPP»',
		price: '1 800 грн',
		category: 'аксесуари',
		image: 'https://content1.rozetka.com.ua/goods/images/big/252120569.png'
	},
	{
		name: 'Рюкзак «Старт»',
		price: '3 900 грн',
		category: 'аксесуари',
		image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85'
	}
];


/* =========================================================
   ELEMENTS
========================================================= */

const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

const productsContainer = $('#products');

const bagButton = $('#bag-button');
const bagCount = $('#bag-count');

const cart = $('#cart');
const cartBackdrop = $('#cart-backdrop');
const cartItemsContainer = $('#cart-items');
const cartTotal = $('#cart-total');

const closeCartButton = $('#close-cart');
const checkoutButton = $('#checkout-button');

const toast = $('#toast');
const header = $('.site-header');
const heroImage = $('.hero-image');
const heroStamp = $('.hero-stamp');


/* =========================================================
   SETTINGS
========================================================= */

const reduceMotion = window.matchMedia(
	'(prefers-reduced-motion: reduce)'
).matches;

const touchDevice = window.matchMedia(
	'(pointer: coarse)'
).matches;


/* =========================================================
   CART STORAGE
========================================================= */

const STORAGE_KEY = 'pp-fashion-cart';

let cartItems = [];

try {
	const savedCart = localStorage.getItem(
		STORAGE_KEY
	);

	if (savedCart) {
		cartItems = JSON.parse(savedCart);
	}
} catch (error) {
	cartItems = [];
}


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {
	try {
		localStorage.setItem(
			STORAGE_KEY,
			JSON.stringify(cartItems)
		);
	} catch (error) {
		console.warn(
			'Не вдалося зберегти кошик',
			error
		);
	}
}


/* =========================================================
   PRICE
========================================================= */

function getPrice(price) {
	return Number(
		String(price).replace(/\D/g, '')
	);
}


function formatPrice(price) {
	return `${new Intl.NumberFormat('uk-UA').format(price)} грн`;
}


/* =========================================================
   TOAST
========================================================= */

let toastTimer;

function showToast(message) {
	if (!toast) {
		return;
	}

	toast.textContent = message;

	toast.classList.remove('visible');

	void toast.offsetWidth;

	toast.classList.add('visible');

	clearTimeout(toastTimer);

	toastTimer = setTimeout(() => {
		toast.classList.remove('visible');
	}, 2600);
}


/* =========================================================
   NUMBER ANIMATION
========================================================= */

function animateNumber(
	element,
	from,
	to,
	duration = 400
) {
	if (!element || reduceMotion) {
		if (element) {
			element.textContent = to;
		}

		return;
	}

	const start = performance.now();

	function update(currentTime) {
		const progress = Math.min(
			(currentTime - start) / duration,
			1
		);

		const eased =
			1 - Math.pow(1 - progress, 3);

		const value = Math.round(
			from + (to - from) * eased
		);

		element.textContent = value;

		if (progress < 1) {
			requestAnimationFrame(update);
		}
	}

	requestAnimationFrame(update);
}


/* =========================================================
   PRODUCTS
========================================================= */

function renderProducts(filter = 'all') {
	if (!productsContainer) {
		return;
	}

	const visibleProducts =
		filter === 'all'
			? products
			: products.filter(
				product =>
					product.category === filter
			);

	productsContainer.innerHTML =
		visibleProducts
			.map(
				(product, index) => `
					<article
						class="product-card"
						style="--card-index: ${index}"
						data-product="${product.name}"
					>
						<div class="product-image-wrap">

							<img
								src="${product.image}"
								alt="${product.name}"
								class="product-image"
								loading="lazy"
								draggable="false"
							>

							<button
								class="quick-add"
								data-product="${product.name}"
								type="button"
								aria-label="Додати ${product.name} до сумки"
							>
								+
							</button>

						</div>

						<div class="product-meta">

							<div>
								<p class="product-category">
									${product.category}
								</p>

								<h3>
									${product.name}
								</h3>
							</div>

							<strong>
								${product.price}
							</strong>

						</div>
					</article>
				`
			)
			.join('');

	animateProductCards();

	if (!touchDevice && !reduceMotion) {
		initProductTilt();
	}
}


/* =========================================================
   PRODUCT CARD ANIMATION
========================================================= */

function animateProductCards() {
	const cards = $$('.product-card');

	cards.forEach((card, index) => {
		if (reduceMotion) {
			card.style.opacity = '1';
			return;
		}

		card.animate(
			[
				{
					opacity: 0,
					transform:
						'translateY(45px) scale(.96)'
				},
				{
					opacity: 1,
					transform:
						'translateY(0) scale(1)'
				}
			],
			{
				duration: 750,
				delay: index * 65,
				easing:
					'cubic-bezier(.16, 1, .3, 1)',
				fill: 'both'
			}
		);
	});
}


/* =========================================================
   PRODUCT 3D TILT
========================================================= */

function initProductTilt() {
	const cards = $$('.product-card');

	cards.forEach(card => {
		if (card.dataset.tiltReady) {
			return;
		}

		card.dataset.tiltReady = 'true';

		card.addEventListener(
			'mousemove',
			event => {
				const rect =
					card.getBoundingClientRect();

				const x =
					(event.clientX - rect.left) /
					rect.width -
					0.5;

				const y =
					(event.clientY - rect.top) /
					rect.height -
					0.5;

				const rotateX = y * -5;
				const rotateY = x * 5;

				card.style.transform =
					`perspective(900px)
					rotateX(${rotateX}deg)
					rotateY(${rotateY}deg)
					translateY(-7px)`;
			}
		);

		card.addEventListener(
			'mouseleave',
			() => {
				card.style.transform = '';
			}
		);
	});
}


/* =========================================================
   CART RENDER
========================================================= */

function renderCart() {
	if (!bagCount || !cartTotal) {
		return;
	}

	const totalItems =
		cartItems.reduce(
			(total, item) =>
				total + item.quantity,
			0
		);

	const totalPrice =
		cartItems.reduce(
			(total, item) =>
				total +
				getPrice(item.product.price) *
				item.quantity,
			0
		);

	const previousCount =
		Number(bagCount.textContent) || 0;

	animateNumber(
		bagCount,
		previousCount,
		totalItems
	);

	cartTotal.textContent =
		formatPrice(totalPrice);

	if (!cartItemsContainer) {
		return;
	}

	if (!cartItems.length) {
		cartItemsContainer.innerHTML = `
			<div class="empty-cart">
				<p>
					Ваша сумка порожня.
				</p>

				<span>
					Оберіть річ із колекції.
				</span>
			</div>
		`;

		return;
	}

	cartItemsContainer.innerHTML =
		cartItems
			.map(
				(item, index) => `
					<div
						class="cart-item"
						data-cart-index="${index}"
					>

						<img
							src="${item.product.image}"
							alt="${item.product.name}"
							loading="lazy"
						>

						<div class="cart-item-info">

							<h3>
								${item.product.name}
							</h3>

							<p>
								${item.product.price}
							</p>

							<div class="cart-quantity">

								<button
									class="quantity-button"
									data-index="${index}"
									data-action="minus"
									type="button"
									aria-label="Зменшити кількість"
								>
									−
								</button>

								<span>
									${item.quantity}
								</span>

								<button
									class="quantity-button"
									data-index="${index}"
									data-action="plus"
									type="button"
									aria-label="Збільшити кількість"
								>
									+
								</button>

							</div>

							<button
								class="remove-item"
								data-index="${index}"
								type="button"
							>
								Видалити
							</button>

						</div>

					</div>
				`
			)
			.join('');
}


/* =========================================================
   ADD TO CART
========================================================= */

function addToCart(productName, button) {
	const product = products.find(
		item => item.name === productName
	);

	if (!product) {
		return;
	}

	const existingItem =
		cartItems.find(
			item =>
				item.product.name ===
				product.name
		);

	if (existingItem) {
		existingItem.quantity += 1;
	} else {
		cartItems.push({
			product,
			quantity: 1
		});
	}

	saveCart();
	renderCart();

	showToast(
		`${product.name} додано до сумки`
	);

	if (button && !reduceMotion) {
		button.animate(
			[
				{
					transform:
						'scale(1) rotate(0)'
				},
				{
					transform:
						'scale(.7) rotate(-12deg)'
				},
				{
					transform:
						'scale(1.18) rotate(8deg)'
				},
				{
					transform:
						'scale(1) rotate(0)'
				}
			],
			{
				duration: 500,
				easing:
					'cubic-bezier(.16, 1, .3, 1)'
			}
		);
	}

	if (
		bagButton &&
		!reduceMotion
	) {
		bagButton.animate(
			[
				{
					transform:
						'scale(1)'
				},
				{
					transform:
						'scale(1.12)'
				},
				{
					transform:
						'scale(1)'
				}
			],
			{
				duration: 350
			}
		);
	}
}


/* =========================================================
   REMOVE ITEM
========================================================= */

function removeFromCart(index) {
	if (!cartItems[index]) {
		return;
	}

	const removed =
		cartItems[index].product.name;

	cartItems.splice(index, 1);

	saveCart();
	renderCart();

	showToast(
		`${removed} видалено`
	);
}


/* =========================================================
   QUANTITY
========================================================= */

function changeQuantity(
	index,
	direction
) {
	const item = cartItems[index];

	if (!item) {
		return;
	}

	item.quantity += direction;

	if (item.quantity <= 0) {
		removeFromCart(index);
		return;
	}

	saveCart();
	renderCart();
}


/* =========================================================
   OPEN CART
========================================================= */

function openCart() {
	if (!cart || !cartBackdrop) {
		return;
	}

	cart.classList.add('open');
	cartBackdrop.classList.add(
		'visible'
	);

	cart.setAttribute(
		'aria-hidden',
		'false'
	);

	document.body.style.overflow =
		'hidden';

	if (!reduceMotion) {
		cart.animate(
			[
				{
					transform:
						'translateX(105%)'
				},
				{
					transform:
						'translateX(0)'
				}
			],
			{
				duration: 400,
				easing:
					'cubic-bezier(.16, 1, .3, 1)'
			}
		);
	}
}


/* =========================================================
   CLOSE CART
========================================================= */

function closeCart() {
	if (!cart || !cartBackdrop) {
		return;
	}

	cart.classList.remove('open');

	cartBackdrop.classList.remove(
		'visible'
	);

	cart.setAttribute(
		'aria-hidden',
		'true'
	);

	document.body.style.overflow = '';
}


/* =========================================================
   FILTERS
========================================================= */

$$('.filter-button').forEach(button => {
	button.addEventListener(
		'click',
		() => {
			$$('.filter-button').forEach(
				item => {
					item.classList.remove(
						'active'
					);
				}
			);

			button.classList.add(
				'active'
			);

			renderProducts(
				button.dataset.filter
			);

			if (!reduceMotion) {
				button.animate(
					[
						{
							transform:
								'scale(.94)'
						},
						{
							transform:
								'scale(1)'
						}
					],
					{
						duration: 220
					}
				);
			}
		}
	);
});


/* =========================================================
   PRODUCT CLICK
========================================================= */

if (productsContainer) {
	productsContainer.addEventListener(
		'click',
		event => {
			const button =
				event.target.closest(
					'.quick-add'
				);

			if (!button) {
				return;
			}

			addToCart(
				button.dataset.product,
				button
			);
		}
	);
}


/* =========================================================
   CART CLICK
========================================================= */

if (cartItemsContainer) {
	cartItemsContainer.addEventListener(
		'click',
		event => {
			const quantityButton =
				event.target.closest(
					'.quantity-button'
				);

			if (quantityButton) {
				const index =
					Number(
						quantityButton.dataset.index
					);

				const action =
					quantityButton.dataset.action;

				changeQuantity(
					index,
					action === 'plus'
						? 1
						: -1
				);

				return;
			}

			const removeButton =
				event.target.closest(
					'.remove-item'
				);

			if (removeButton) {
				removeFromCart(
					Number(
						removeButton.dataset.index
					)
				);
			}
		}
	);
}


/* =========================================================
   CART BUTTONS
========================================================= */

if (bagButton) {
	bagButton.addEventListener(
		'click',
		openCart
	);
}

if (closeCartButton) {
	closeCartButton.addEventListener(
		'click',
		closeCart
	);
}

if (cartBackdrop) {
	cartBackdrop.addEventListener(
		'click',
		closeCart
	);
}


/* =========================================================
   CHECKOUT
========================================================= */

if (checkoutButton) {
	checkoutButton.addEventListener(
		'click',
		() => {
			if (!cartItems.length) {
				showToast(
					'Додайте хоча б одну річ'
				);

				return;
			}

			cartItems.length = 0;

			saveCart();
			renderCart();
			closeCart();

			showToast(
				'Дякуємо! Замовлення прийнято'
			);
		}
	);
}


/* =========================================================
   ESCAPE
========================================================= */

document.addEventListener(
	'keydown',
	event => {
		if (
			event.key === 'Escape' &&
			cart?.classList.contains('open')
		) {
			closeCart();
		}
	}
);


/* =========================================================
   HEADER SCROLL
========================================================= */

let lastScroll = 0;
let ticking = false;

function updateScroll() {
	const scrollY = window.scrollY;

	if (header) {
		if (scrollY > 60) {
			header.classList.add(
				'is-scrolled'
			);
		} else {
			header.classList.remove(
				'is-scrolled'
			);
		}

		if (
			scrollY > lastScroll &&
			scrollY > 180
		) {
			header.classList.add(
				'is-hidden'
			);
		} else {
			header.classList.remove(
				'is-hidden'
			);
		}
	}

	lastScroll = scrollY;
	ticking = false;
}

window.addEventListener(
	'scroll',
	() => {
		if (!ticking) {
			requestAnimationFrame(
				updateScroll
			);

			ticking = true;
		}
	},
	{
		passive: true
	}
);


/* =========================================================
   SCROLL PROGRESS
========================================================= */

const progressBar =
	document.createElement('div');

progressBar.className =
	'js-scroll-progress';

progressBar.setAttribute(
	'aria-hidden',
	'true'
);

document.body.appendChild(
	progressBar
);

Object.assign(
	progressBar.style,
	{
		position: 'fixed',
		top: '0',
		left: '0',
		width: '0%',
		height: '3px',
		background: 'var(--accent)',
		zIndex: '9999',
		pointerEvents: 'none',
		transformOrigin: 'left center',
		transition:
			'width 80ms linear'
	}
);

function updateProgress() {
	const scrollTop =
		window.scrollY;

	const scrollHeight =
		document.documentElement
			.scrollHeight -
		window.innerHeight;

	const progress =
		scrollHeight > 0
			? (scrollTop / scrollHeight) *
				100
			: 0;

	progressBar.style.width =
		`${progress}%`;
}

window.addEventListener(
	'scroll',
	updateProgress,
	{
		passive: true
	}
);

updateProgress();


/* =========================================================
   HERO PARALLAX
========================================================= */

if (
	heroImage &&
	!touchDevice &&
	!reduceMotion
) {
	window.addEventListener(
		'scroll',
		() => {
			const rect =
				heroImage.getBoundingClientRect();

			const offset =
				(rect.top -
					window.innerHeight / 2) *
				0.045;

			heroImage.style.backgroundPosition =
				`center calc(26% + ${offset}px)`;
		},
		{
			passive: true
		}
	);
}


/* =========================================================
   HERO STAMP
========================================================= */

if (
	heroStamp &&
	!reduceMotion &&
	!touchDevice
) {
	let stampFrame = null;

	window.addEventListener(
		'scroll',
		() => {
			if (stampFrame) {
				return;
			}

			stampFrame =
				requestAnimationFrame(
					() => {
						const rotation =
							12 +
							window.scrollY *
								0.025;

						const y =
							Math.min(
								window.scrollY *
									0.025,
								18
							);

						heroStamp.style.transform =
							`translateY(${y}px)
							rotate(${rotation}deg)`;

						stampFrame = null;
					}
				);
		},
		{
			passive: true
		}
	);
}


/* =========================================================
   MAGNETIC BUTTONS
========================================================= */

function initMagneticButtons() {
	if (
		touchDevice ||
		reduceMotion
	) {
		return;
	}

	const buttons = [
		...$$('.hero-link'),
		...$$('.bag-button'),
		...$$('.filter-button'),
		...$$('.checkout-button')
	];

	buttons.forEach(button => {
		if (button.dataset.magnetic) {
			return;
		}

		button.dataset.magnetic = 'true';

		button.addEventListener(
			'mousemove',
			event => {
				const rect =
					button.getBoundingClientRect();

				const x =
					event.clientX -
					rect.left -
					rect.width / 2;

				const y =
					event.clientY -
					rect.top -
					rect.height / 2;

				button.style.transform =
					`translate(
						${x * 0.12}px,
						${y * 0.12}px
					)`;
			}
		);

		button.addEventListener(
			'mouseleave',
			() => {
				button.style.transform =
					'';
			}
		);
	});
}

initMagneticButtons();


/* =========================================================
   CURSOR GLOW
========================================================= */

if (
	!touchDevice &&
	!reduceMotion
) {
	const cursorGlow =
		document.createElement('div');

	cursorGlow.className =
		'js-cursor-glow';

	Object.assign(
		cursorGlow.style,
		{
			position: 'fixed',
			zIndex: '9998',
			left: '0',
			top: '0',
			width: '180px',
			height: '180px',
			borderRadius: '50%',
			pointerEvents: 'none',
			background:
				'radial-gradient(circle, rgba(201,255,61,.10) 0%, rgba(201,255,61,0) 70%)',
			transform:
				'translate(-50%, -50%)',
			mixBlendMode: 'multiply',
			opacity: '0',
			transition:
				'opacity 300ms ease'
		}
	);

	document.body.appendChild(
		cursorGlow
	);

	let cursorX = 0;
	let cursorY = 0;
	let glowX = 0;
	let glowY = 0;

	window.addEventListener(
		'mousemove',
		event => {
			cursorX = event.clientX;
			cursorY = event.clientY;

			cursorGlow.style.opacity =
				'1';
		}
	);

	window.addEventListener(
		'mouseleave',
		() => {
			cursorGlow.style.opacity =
				'0';
		}
	);

	function animateCursor() {
		glowX +=
			(cursorX - glowX) * 0.12;

		glowY +=
			(cursorY - glowY) * 0.12;

		cursorGlow.style.left =
			`${glowX}px`;

		cursorGlow.style.top =
			`${glowY}px`;

		requestAnimationFrame(
			animateCursor
		);
	}

	animateCursor();
}


/* =========================================================
   REVEAL OBSERVER
========================================================= */

const revealElements =
	$$('.reveal');

if (
	'IntersectionObserver' in window
) {
	const revealObserver =
		new IntersectionObserver(
			entries => {
				entries.forEach(
					entry => {
						if (
							!entry.isIntersecting
						) {
							return;
						}

						entry.target.classList.add(
							'is-visible'
						);

						revealObserver.unobserve(
							entry.target
						);
					}
				);
			},
			{
				threshold: 0.15,
				rootMargin:
					'0px 0px -50px 0px'
			}
		);

	revealElements.forEach(
		element => {
			revealObserver.observe(
				element
			);
		}
	);
} else {
	revealElements.forEach(
		element => {
			element.classList.add(
				'is-visible'
			);
		}
	);
}


/* =========================================================
   EDITORIAL IMAGE PARALLAX
========================================================= */

const editorialImage =
	$('.editorial-image');

if (
	editorialImage &&
	!touchDevice &&
	!reduceMotion
) {
	window.addEventListener(
		'scroll',
		() => {
			const rect =
				editorialImage.getBoundingClientRect();

			if (
				rect.bottom < 0 ||
				rect.top >
					window.innerHeight
			) {
				return;
			}

			const visible =
				1 -
				Math.abs(
					rect.top -
						window.innerHeight /
							2
				) /
					window.innerHeight;

			const move =
				(visible - 0.5) * 22;

			editorialImage.style.backgroundPosition =
				`center calc(42% + ${move}px)`;
		},
		{
			passive: true
		}
	);
}


/* =========================================================
   IMAGE LOADING EFFECT
========================================================= */

$$('img').forEach(image => {
	if (image.complete) {
		image.classList.add(
			'loaded'
		);
	}

	image.addEventListener(
		'load',
		() => {
			image.classList.add(
				'loaded'
			);
		},
		{
			once: true
		}
	);
});


/* =========================================================
   SMOOTH ANCHORS
========================================================= */

$$('a[href^="#"]').forEach(link => {
	link.addEventListener(
		'click',
		event => {
			const targetId =
				link.getAttribute('href');

			if (
				!targetId ||
				targetId === '#'
			) {
				return;
			}

			const target =
				document.querySelector(
					targetId
				);

			if (!target) {
				return;
			}

			event.preventDefault();

			const headerHeight =
				header?.offsetHeight || 0;

			const targetTop =
				target.getBoundingClientRect()
					.top +
				window.scrollY -
				headerHeight -
				20;

			window.scrollTo({
				top: targetTop,
				behavior: reduceMotion
					? 'auto'
					: 'smooth'
			});
		}
	);
});


/* =========================================================
   IMAGE HOVER FOLLOW
========================================================= */

if (
	!touchDevice &&
	!reduceMotion
) {
	$$('.product-image-wrap').forEach(
		wrap => {
			wrap.addEventListener(
				'mousemove',
				event => {
					const rect =
						wrap.getBoundingClientRect();

					const x =
						(event.clientX -
							rect.left) /
							rect.width *
							100;

					const y =
						(event.clientY -
							rect.top) /
							rect.height *
							100;

					const image =
						wrap.querySelector(
							'.product-image'
						);

					if (!image) {
						return;
					}

					image.style.transform =
						`scale(1.07)
						translate(
							${(50 - x) * 0.025}%,
							${(50 - y) * 0.025}%
						)`;
				}
			);

			wrap.addEventListener(
				'mouseleave',
				() => {
					const image =
						wrap.querySelector(
							'.product-image'
						);

					if (!image) {
						return;
					}

					image.style.transform =
						'';
				}
			);
		}
	);
}


/* =========================================================
   KEYBOARD CART ACCESS
========================================================= */

document.addEventListener(
	'keydown',
	event => {
		if (
			event.key === '/' &&
			document.activeElement.tagName !==
				'INPUT'
		) {
			event.preventDefault();

			if (bagButton) {
				bagButton.focus();
			}
		}
	}
);


/* =========================================================
   CART ITEM ENTER ANIMATION
========================================================= */

if (cartItemsContainer) {
	const observer =
		new MutationObserver(() => {
			if (reduceMotion) {
				return;
			}

			$$('.cart-item').forEach(
				(item, index) => {
					if (
						item.dataset.animated
					) {
						return;
					}

					item.dataset.animated =
						'true';

					item.animate(
						[
							{
								opacity: 0,
								transform:
									'translateX(20px)'
							},
							{
								opacity: 1,
								transform:
									'translateX(0)'
							}
						],
						{
							duration: 350,
							delay: index * 50,
							easing:
								'cubic-bezier(.16,1,.3,1)',
							fill: 'both'
						}
					);
				}
			);
		});

	observer.observe(
		cartItemsContainer,
		{
			childList: true
		}
	);
}


/* =========================================================
   PROMO INTERACTION
========================================================= */

const promoPhoto =
	$('.promo-photo');

const promoCopy =
	$('.promo-copy');

if (
	promoPhoto &&
	promoCopy &&
	!touchDevice &&
	!reduceMotion
) {
	promoPhoto.addEventListener(
		'mouseenter',
		() => {
			promoCopy.animate(
				[
					{
						transform:
							'translateX(0)'
					},
					{
						transform:
							'translateX(8px)'
					},
					{
						transform:
							'translateX(0)'
					}
				],
				{
					duration: 500,
					easing:
						'cubic-bezier(.16,1,.3,1)'
				}
			);
		}
	);
}


/* =========================================================
   RANDOM MICRO MOTION
========================================================= */

if (
	heroStamp &&
	!reduceMotion
) {
	setInterval(() => {
		heroStamp.animate(
			[
				{
					transform:
						'rotate(12deg) translateY(0)'
				},
				{
					transform:
						'rotate(15deg) translateY(-4px)'
				},
				{
					transform:
						'rotate(12deg) translateY(0)'
				}
			],
			{
				duration: 1800,
				easing: 'ease-in-out'
			}
		);
	}, 4500);
}


/* =========================================================
   INITIALIZATION
========================================================= */

renderProducts();
renderCart();