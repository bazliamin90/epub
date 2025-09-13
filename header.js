const headerTemplate3 = document.createElement('template');

headerTemplate3.innerHTML = `
<style>
	.menu {
		border-radius: 4px;
		padding: 2px 4px;
		color: white;
		background-color: #000000ff;
	}

	.scroll-box {
		position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		width: 250px;
		max-width: 90%;
		border-right: 3px solid black;
		padding: 10px;
		background-color: white;
		overflow-y: auto;
		box-shadow: 2px 0 6px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s ease;
		transform: translateX(-100%);
		z-index: 1000;
	}

	.scroll-box.visible {
		transform: translateX(0);
	}

	.scroll-box .close-message {
		font-family: monospace;
		font-size: 8px;
		color: grey;
		margin-bottom: 10px;
		text-align: center;
		font-style: italic;
	}

	.scroll-box .search-box {
		width: 90%;
		padding: 5px;
		margin-bottom: 10px;
		font-family: monospace;
		font-size: 12px;
		border: 1px solid blue;
		border-radius: 4px;
	}

	.scroll-box ol {
		font-family: monospace;
		margin: 0;
		padding: 0;
		list-style-position: outside;
		padding-left: 3em;
		color: red;
	}

	.scroll-box ol a {
		font-family: monospace;
		text-decoration: underline #ccc dotted;
		text-underline-offset: 3px;
		color: #555;
	}

	.scroll-box li {
		font-size: 0.9em;
		padding-bottom: 5px;
	}

	ol li {
		text-align: left;
	}

	.li2 {
		font-size: 12px;
		padding: 5px 0 5px 20px;
	}

	#overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);
		display: none;
		z-index: 999;
		transition: opacity 0.3s ease;
	}

	#overlay.visible {
		display: block;
		opacity: 1;
	}
	
	.hrnone {
		border: 1px solid #f9f9f9;
	}

	#list {
		margin: 20px 0;
	}

	@media (max-width: 600px) {
		.scroll-box {
			width: 70%;
		}
	}
</style>

<div class="header">
  <button class="menu">☰</button>
</div>
<div id="overlay"></div>
<div class="scroll-box" id="scroll-box">
  <div class="close-message">Klik di luar menu untuk tutup</div>
  <input
    type="text"
    class="search-box"
    id="search-box"
    placeholder="Cari buku..."
    aria-label="Search list items"
  />
  <ol id="list">
    <li><a href="#">About</a></li>

	<hr><b>Buku</b><hr class="hrnone">
	<li><a href="index.html">The Sirah of The Prophet</a></li>
	</ol>
</div>
`;

class Header3 extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const shadowRoot = this.attachShadow({ mode: 'open' });
		shadowRoot.appendChild(headerTemplate3.content.cloneNode(true));

		const menu = shadowRoot.querySelector('.menu');
		const scrollBox = shadowRoot.querySelector('#scroll-box');
		const overlay = shadowRoot.querySelector('#overlay');
		const searchBox = shadowRoot.querySelector('#search-box');
		const list = shadowRoot.querySelector('#list');

		let preventTouchScroll = (e) => e.preventDefault();

		menu.addEventListener('click', (event) => {
			event.stopPropagation();
			toggleScrollBox(scrollBox, overlay);
		});

		document.addEventListener('click', function (event) {
			if (
				scrollBox.classList.contains('visible') &&
				!scrollBox.contains(event.target) &&
				!event.target.matches('.menu')
			) {
				hideScrollBox(scrollBox, overlay);
			}
		});

		scrollBox.addEventListener('click', (event) => {
			event.stopPropagation();
		});

		overlay.addEventListener('click', () => hideScrollBox(scrollBox, overlay));

		function toggleScrollBox(scrollBox, overlay) {
			if (scrollBox.classList.contains('visible')) {
				hideScrollBox(scrollBox, overlay);
			} else {
				showScrollBox(scrollBox, overlay);
			}
		}

		function showScrollBox(scrollBox, overlay) {
			scrollBox.classList.add('visible');
			overlay.classList.add('visible');

			// Disable background scrolling (desktop)
			const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = 'hidden';
			document.body.style.paddingRight = `${scrollBarWidth}px`;

			// Disable touch scrolling (mobile)
			document.addEventListener('touchmove', preventTouchScroll, { passive: false });
		}

		function hideScrollBox(scrollBox, overlay) {
			scrollBox.classList.remove('visible');
			overlay.classList.remove('visible');

			// Re-enable background scrolling
			document.body.style.overflow = '';
			document.body.style.paddingRight = '';

			// Re-enable touch scrolling
			document.removeEventListener('touchmove', preventTouchScroll);
		}

		// Search functionality
		searchBox.addEventListener('input', function () {
			const filter = searchBox.value.toLowerCase();
			const items = list.querySelectorAll('li');
			const headings = list.querySelectorAll('b');
			const horizontalRules = list.querySelectorAll('hr');

			items.forEach((item) => {
				const text = item.textContent.toLowerCase();
				item.style.display = text.includes(filter) ? '' : 'none';
			});

			if (!filter) {
				headings.forEach((heading) => heading.style.display = '');
				horizontalRules.forEach((hr) => hr.style.display = '');
				return;
			}

			headings.forEach((heading) => {
				const listItems = heading.nextElementSibling
					? heading.nextElementSibling.querySelectorAll('li')
					: [];
				let anyVisible = false;

				listItems.forEach((item) => {
					if (item.style.display !== 'none') {
						anyVisible = true;
					}
				});

				heading.style.display = anyVisible ? '' : 'none';
			});

			horizontalRules.forEach((hr) => {
				const nextSibling = hr.nextElementSibling;
				if (nextSibling && nextSibling.style.display !== 'none') {
					hr.style.display = '';
				} else {
					hr.style.display = 'none';
				}
			});
		});
	}
}

customElements.define('header3-component', Header3);
