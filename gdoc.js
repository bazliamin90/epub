
// =====================================================
// 2. STATE ENGINE
// =====================================================

let docRoot;
let matches = [];
let currentIndex = -1;

let headings = [];

// =====================================================
// 3. LOAD DOC
// =====================================================

fetch(sourceUrl)
  .then(r => r.text())
  .then(html => {

    const container =
      document.getElementById("doc");

    container.innerHTML = html;

    docRoot = container;

    buildOutline();

    // 👇 FADE OUT LOADING HERE
    const loading =
      document.getElementById("loading");

    loading.style.opacity = "0";

    setTimeout(() => {
      loading.remove();
    }, 300);

  });

// =====================================================
// 4. BUILD SIDEBAR OUTLINE (TABS REPLACEMENT)
// =====================================================

function buildOutline(){

  const tabs =
    document.getElementById("tabs");

  headings =
  Array.from(
    docRoot.querySelectorAll("h1, h2, h3")
  );

  headings.forEach((h, i) => {

    const div =
      document.createElement("div");

    div.className = "tab";

    div.textContent =
      h.textContent || `Section ${i+1}`;

    div.onclick = () => {

      const wrapper =
  document.getElementById("docWrapper");

wrapper.scrollTo({
  top:
    h.offsetTop - 20,
  behavior:"smooth"
});

    };

    tabs.appendChild(div);

  });

}

// =====================================================
// 5. SAFE TEXT NODE WALK SEARCH (NO HTML DESTRUCTION)
// =====================================================

function getTextNodes(root){

  const walker =
    document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT,
      null
    );

  const nodes = [];
  let n;

  while(n = walker.nextNode()){
    if(n.nodeValue.trim()){
      nodes.push(n);
    }
  }

  return nodes;

}

// =====================================================
// 6. CLEAR HIGHLIGHTS
// =====================================================

function clearHighlights(){

  const marks =
    docRoot.querySelectorAll("mark");

  marks.forEach(m => {

    const parent =
      m.parentNode;

    parent.replaceChild(
      document.createTextNode(m.textContent),
      m
    );

    parent.normalize();

  });

  matches = [];
  currentIndex = -1;

}

// =====================================================
// 7. SEARCH ENGINE (PRO VERSION)
// =====================================================

function search(){

  clearHighlights();

  const query =
    document.getElementById("searchInput").value;

  if(!query) return;

  const regex =
    new RegExp(query, "gi");

  const nodes =
    getTextNodes(docRoot);

  nodes.forEach(node => {

    const text =
      node.nodeValue;

    if(!regex.test(text)) return;

    const span =
      document.createElement("span");

    span.innerHTML =
      text.replace(regex, m =>
        `<mark>${m}</mark>`
      );

    node.replaceWith(span);

  });

  matches =
    Array.from(docRoot.querySelectorAll("mark"));

  currentIndex = -1;

}

// =====================================================
// 8. NAVIGATION
// =====================================================

function goTo(index){

  if(matches.length === 0) return;

  const el =
    matches[index];

  if(!el) return;

  matches.forEach(m => m.classList.remove("active"));

  el.classList.add("active");

  el.scrollIntoView({
    behavior:"smooth",
    block:"center"
  });

}

// next
function next(){

  if(matches.length === 0) search();

  if(matches.length === 0) return;

  currentIndex =
    (currentIndex + 1) % matches.length;

  goTo(currentIndex);

}

// prev
function prev(){

  if(matches.length === 0) search();

  if(matches.length === 0) return;

  currentIndex =
    (currentIndex - 1 + matches.length)
    % matches.length;

  goTo(currentIndex);

}

// =====================================================
// 9. EVENTS
// =====================================================

document
  .getElementById("searchInput")
  .addEventListener("keydown", e => {

    if(e.key === "Enter"){
      search();
      next();
    }

  });

document.getElementById("nextBtn").onclick = next;
document.getElementById("prevBtn").onclick = prev;

// =====================================================
// 10. TOGGLE TABS
// =====================================================

const toggleTabsBtn =
  document.getElementById("toggleTabsBtn");

const tabs =
  document.getElementById("tabs");

toggleTabsBtn.onclick = () => {

  tabs.classList.toggle("show");

};

// =====================================================
// 11. CLEAR SEARCH
// =====================================================

document
  .getElementById("clearSearchBtn")
  .onclick = () => {

    document
      .getElementById("searchInput")
      .value = "";

    clearHighlights();

  };

// =====================================================
// 12. SCROLL TO TOP
// =====================================================
document.getElementById("topBtn").onclick = () => {
  document.getElementById("docWrapper").scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

function getCurrentSectionIndex(){

  const wrapper =
    document.getElementById("docWrapper");

  const scrollPos =
    wrapper.scrollTop;

  let current = 0;

  headings.forEach((h, i) => {

    if(h.offsetTop - 30 <= scrollPos){
      current = i;
    }

  });

  return current;

}

document
  .getElementById("prevSectionBtn")
  .onclick = function(){

    if(!headings.length) return;

    let index =
      getCurrentSectionIndex();

    index =
      Math.max(0, index - 1);

    document
      .getElementById("docWrapper")
      .scrollTo({
        top:
          headings[index].offsetTop - 20,
        behavior:"smooth"
      });

    this.blur();

};

document
  .getElementById("nextSectionBtn")
  .onclick = function(){

    if(!headings.length) return;

    let index =
      getCurrentSectionIndex();

    index =
      Math.min(
        headings.length - 1,
        index + 1
      );

    document
      .getElementById("docWrapper")
      .scrollTo({
        top:
          headings[index].offsetTop - 20,
        behavior:"smooth"
      });

    this.blur();

};
const docWrapper =
  document.getElementById("docWrapper");

const progressFill =
  document.getElementById("progressFill");

docWrapper.addEventListener("scroll", () => {

  const maxScroll =
    docWrapper.scrollHeight -
    docWrapper.clientHeight;

  const percent =
    maxScroll > 0
      ? (docWrapper.scrollTop / maxScroll) * 100
      : 0;

  progressFill.style.width =
    percent + "%";

});