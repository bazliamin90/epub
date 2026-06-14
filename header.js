const headerTemplate3 = document.createElement('template');

headerTemplate3.innerHTML = `
<style>
/* === Header Styling === */
.header {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 8px;
	width: 90%;
    max-width: 900px;
    position: sticky;
    top: 0;
    z-index: 998;
    border-radius: 0 0 14px 14px;
    backdrop-filter: blur(8px);
    transition: all 0.3s ease;
}

/* === Menu Buttons === */
.menu {
    border: 1px solid #ccc;
    background-color: #fff;
    border-radius: 8px;
    padding: 0 .4rem;
    height: 22px;
    cursor: pointer;
    display: block;
    object-fit: contain;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}

/* === Title === */
h1 {
    font-family: monospace;
    font-size: 15px;
    text-align: left;
    display: flex;
    align-items: center;
    padding: 5px 0;
    margin: 0;
    max-width: 50rem;
}

h1 a {
    text-decoration: none;
    color: white;
    background: linear-gradient(135deg, #444, #666);
    border-radius: 6px;
    padding: 8px 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: background 0.3s ease;
}

h1 a:hover {
    background: linear-gradient(135deg, #333, #555);
}

/* === Scroll Box === */
.scroll-box {
    position: fixed;
    top: 10px;
    left: 0;
    height: 70vh;
    width: 260px;
    max-width: 90%;
    border-right: 3px solid #b3aaff;
    padding: 14px 10px;
    background: linear-gradient(180deg, #ffffff, #f8f9ff);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch; /* momentum scrolling */
    touch-action: pan-y;
    box-shadow: 4px 0 12px rgba(0, 0, 0, 0.25);
    transform: translateX(-110%);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    border-radius: 0 10px 10px 0;
    scroll-behavior: smooth;
}

.scroll-box.visible {
    transform: translateX(0);
}

/* === Scroll fade top/bottom === */
.fade-top,
.fade-bottom {
    position: sticky;
    left: 0;
    height: 22px;
    z-index: 10;
    pointer-events: none;
}

.fade-top {
    top: 0;
    background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

.fade-bottom {
    bottom: 0;
    background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
}

/* === Close message === */
.close-message {
    font-family: monospace;
    font-size: 10px;
    color: grey;
    margin-bottom: 10px;
    text-align: center;
    font-style: italic;
}

/* === Search Box === */
.search-box {
    width: 92%;
    padding: 6px;
    font-family: monospace;
    font-size: 13px;
    border: 1px solid #8dafff;
    border-radius: 6px;
    outline: none;
    transition: box-shadow 0.2s ease;
}

.search-box:focus {
    box-shadow: 0 0 5px #9cbcff;
}

/* === List Section === */
.scroll-box ol {
    font-family: monospace;
    margin: 5px 0;
    padding: 0;
    list-style-position: outside;
    padding-left: 2.5em;
    color: #555;
}

.scroll-box ol a {
    font-family: monospace;
    text-decoration: underline dotted #ccc;
    text-underline-offset: 3px;
    color: #333;
    transition: color 0.2s ease;
}

.scroll-box ol a:hover {
    color: #0073e6;
}

.scroll-box li {
    font-size: 0.95em;
    padding-bottom: 4px;
}

.hrnone {
    border: 1px solid #f3f3f3;
}

/* === Overlay Background === */
#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease;
    z-index: 999;
}

#overlay.visible {
    opacity: 1;
    visibility: visible;
}

/* === Responsive Mobile Adjustment === */
@media (max-width: 600px) {
    .header {
	width: 100%;
    border-radius: 0;
	margin: 0;
    }

    .scroll-box {
        width: 75%;
    }

    h1 {
        font-size: 13px;
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
    placeholder="Cari bahan bacaan..."
    aria-label="Search list items"
  />
  <ol id="list">
    <li><a href="about.html">About</a></li>

	<hr><b>Bacaan Islami</b><hr class="hrnone">
	<li><a href="010.html">Allah Loves</a></li>
	<li><a href="030.html">Al salam: Stories of the Quran</a></li>
	<li><a href="007.html">Ar-rahiq Al-makhtum</a></li>
	<li>As-sa'di
		<ol>
			<li><a href="015.html">Juz 10-12</a></li>
			<li><a href="016.html">Juz 13-15</a></li>
			<li><a href="017.html">Juz 16-18</a></li>
			<li><a href="018.html">Juz 19-21</a></li>
			<li><a href="019.html">Juz 22-24</a></li>
			<li><a href="020.html">Juz 25-27</a></li>
			<li><a href="021.html">Juz 28-30</a></li>
		</ol>
	</li>
	<li><a href="037.html">Jin, syaitan, iblis</a></li>
    <li><a href="012.html">Lessons From The Stories of The Quran</a></li>
	<li><a href="009.html">Meeting Muhammad</a></li>
	<li><a href="004.html">Tadabbur Ad-Dhuha - An-Nas</a></li>
	<li><a href="008.html">The Parables of The Quran</a></li>
	<li><a href="index.html">The Sirah of The Prophet</a></li>
	<li><a href="006.html">Thematic Tafsir (by juz')</a></li>
	<li>Surah 012. Yusuf
		<ol>
			<li><a href="022.html">Bayyinah Translation</a></li>
			<li><a href="002-yusuf.html">Dr. Yasir Qadhi</a></li>
            <li><a href="031.html">As-sa'di - 33 Lessons</a></li>
			<li><a href="011.html">As-sa'di</a></li>
			<li><a href="005.html">Fuad al Aris</a></li>
			<li><a href="023.html">Markaz al Salam</a></li>
			<li><a href="024.html">Nouman Ali Khan</a></li>
			<li><a href="027.html">Syeikh Abdulbary Yahya</a></li>
			<li><a href="013.html">Tafsir Al-Munir: P1</a></li>
			<li><a href="014.html">Tafsir Al-Munir: P2</a></li>
		</ol>
	</li>
    <li>Surah 018. Al-kahfi
        <ol>
            <li><a href="003-kahf.html">Dr. Yasir Qadhi</a></li>
        </ol>
    </li>
    <li>Surah 041. Fussilat
        <ol>
            <li><a href="033.html">Al-munir - Juz 25</a></li>
            <li><a href="026.html">Syafi Uthmani</a></li>
        </ol>
    </li>
    <li>Surah 042. Asy-syura
        <ol>
            <li><a href="034.html">Al-munir</a></li>
        </ol>
    </li>
    <li>Surah 092. Al-layl
        <ol>
            <li><a href="028.html">Markaz al Salam</a></li>
            <li><a href="025.html">Nouman Ali Khan</a></li>
        </ol>
    </li>
    <li>Surah 093. Ad-dhuha
        <ol>
            <li><a href="032.html">Al-munir</a></li>
        </ol>
    </li>
    <li>Surah 110. An-nasr
        <ol>
            <li><a href="029.html">Markaz al Salam</a></li>
        </ol>
    </li>
    <li>Surah 111. Al-masad
        <ol>
            <li><a href="038.html">Nouman Ali Khan</a></li>
        </ol>
    </li>
    <li>Bazli's tadabbur notes
        <ol>
            <li><a href="041.html">42. Asy-syura</a></li>
            <li><a href="039.html">92. Al-layl</a></li>
        </ol>
    </li>

    <hr><b>Public Health</b><hr class="hrnone">
    <li>Biostatistics
        <ol>
            <li><a href="036.html">Wiley - Introductory Biostatistics</a></li>
        </ol>
    </li>
	</ol>
	<center><p style="font-size: 1em; color: #000000">°❀⋆.ೃ࿔*:･°❀⋆.ೃ࿔*:･</p></center><br><br>
</div>
`;

class Header3 extends HTMLElement {
    connectedCallback() {
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.appendChild(headerTemplate3.content.cloneNode(true));

        const menu = shadowRoot.querySelector('.menu');
        const scrollBox = shadowRoot.querySelector('#scroll-box');
        const overlay = shadowRoot.querySelector('#overlay');
        const searchBox = shadowRoot.querySelector('#search-box');
        const list = shadowRoot.querySelector('#list');
        const fadeTop = shadowRoot.querySelector('.fade-top');
        const fadeBottom = shadowRoot.querySelector('.fade-bottom');

        // === Touch scroll blocker (fixed for mobile) ===
        function blockBackgroundScroll(e) {
            const path = e.composedPath();
            if (!path.includes(scrollBox)) e.preventDefault();
        }

        // === Menu toggle ===
        menu.addEventListener('click', e=>{e.stopPropagation(); toggleScrollBox();});
        scrollBox.addEventListener('click', e=>e.stopPropagation());
        searchBox.addEventListener('click', e=>e.stopPropagation());
        overlay.addEventListener('click', hideScrollBox);

        document.addEventListener('click', e=>{
            const path = e.composedPath();
            if(scrollBox.classList.contains('visible') && !path.includes(scrollBox) && !path.some(el=>el.classList && el.classList.contains('menu'))){
                hideScrollBox();
            }
        });

        function toggleScrollBox() { 
            scrollBox.classList.contains('visible') ? hideScrollBox() : showScrollBox(); 
        }

        function showScrollBox() {
            scrollBox.classList.add('visible');
            overlay.classList.add('visible');

            const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = 'hidden';
            document.body.style.paddingRight = `${scrollBarWidth}px`;

            document.addEventListener('touchmove', blockBackgroundScroll, {passive:false});
            updateFadeShadows();
        }

        function hideScrollBox() {
            scrollBox.classList.remove('visible');
            overlay.classList.remove('visible');

            document.body.style.overflow = '';
            document.body.style.paddingRight = '';

            document.removeEventListener('touchmove', blockBackgroundScroll);
        }

        // === Scroll fade shadows ===
        scrollBox.addEventListener('scroll', updateFadeShadows);
        function updateFadeShadows() {
            const atTop = scrollBox.scrollTop <= 5;
            const atBottom = scrollBox.scrollHeight - scrollBox.clientHeight - scrollBox.scrollTop <= 5;
            fadeTop.style.opacity = atTop ? "0" : "1";
            fadeBottom.style.opacity = atBottom ? "0" : "1";
        }

        // === Search filter ===
        // === Search filter (parent-child aware) ===
searchBox.addEventListener('input', () => {
    const filter = searchBox.value.toLowerCase();

    const allItems = list.querySelectorAll('li');

    // Step 1: reset all
    allItems.forEach(li => li.style.display = 'none');

    // Step 2: process each item
    allItems.forEach(li => {
        const text = li.firstChild.textContent.toLowerCase();
        const matches = text.includes(filter);

        if (filter === '') {
            li.style.display = '';
            return;
        }

        if (matches) {
            // ✅ Show this item
            li.style.display = '';

            // ✅ Show ALL children
            li.querySelectorAll('li').forEach(child => {
                child.style.display = '';
            });

            // ✅ Show ALL parents
            let parent = li.parentElement.closest('li');
            while (parent) {
                parent.style.display = '';
                parent = parent.parentElement.closest('li');
            }
        }
    });

    // Hide section headers when searching
    list.querySelectorAll('b, hr').forEach(el => {
        el.style.display = filter ? 'none' : '';
    });
});
    }
}

customElements.define('header3-component', Header3);