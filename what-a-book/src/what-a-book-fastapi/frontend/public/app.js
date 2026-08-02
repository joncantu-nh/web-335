const API_BASE = "http://localhost:8000";
const $ = (selector) => document.querySelector(selector);
const el = { title:$("#titleSearch"), author:$("#authorFilter"), genre:$("#genreFilter"), customer:$("#customerSelect"), status:$("#statusMessage"), wishStatus:$("#wishlistSummary"), books:$("#bookResults"), wishlist:$("#wishlistResults"), count:$("#resultCount"), help:$("#helpDialog") };

async function api(path, options={}) {
  const response = await fetch(`${API_BASE}${path}`, { headers:{"Content-Type":"application/json"}, ...options });
  if (!response.ok) { const body = await response.json().catch(()=>({})); throw new Error(body.detail || `Request failed (${response.status})`); }
  return response.json();
}

function esc(value) { return String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;"); }
function card(book, wishlist=false) {
  const action = wishlist
    ? `<button class="remove-button" data-remove="${esc(book.bookId)}">Remove</button>`
    : `<button data-add="${esc(book.bookId)}" ${el.customer.value ? "" : "disabled"}>Add to Wishlist</button>`;
  return `<article class="book-card"><h3>${esc(book.title)}</h3><div class="meta">${esc(book.author)} · ${esc(book.genre)}</div><div class="meta">Book ID: ${esc(book.bookId)}</div><div class="meta">${esc(book.condition)} · First published ${book.firstPublishedYear}</div><div class="price">$${Number(book.price).toFixed(2)}</div>${action}</article>`;
}

async function loadLists() {
  const [authors, genres, customers] = await Promise.all([api("/api/authors"), api("/api/genres"), api("/api/customers")]);
  el.author.insertAdjacentHTML("beforeend", authors.map(v=>`<option>${esc(v)}</option>`).join(""));
  el.genre.insertAdjacentHTML("beforeend", genres.map(v=>`<option>${esc(v)}</option>`).join(""));
  el.customer.insertAdjacentHTML("beforeend", customers.map(c=>`<option value="${esc(c.customerId)}">${esc(c.firstName)} ${esc(c.lastName)} (${esc(c.customerId)})</option>`).join(""));
}

async function loadBooks() {
  el.status.textContent = "Loading books…";
  const params = new URLSearchParams();
  if (el.title.value.trim()) params.set("title", el.title.value.trim());
  if (el.author.value) params.set("author", el.author.value);
  if (el.genre.value) params.set("genre", el.genre.value);
  try { const books = await api(`/api/books?${params}`); el.books.innerHTML = books.map(b=>card(b)).join(""); el.count.textContent = `${books.length} book${books.length===1?"":"s"}`; el.status.textContent = books.length ? "" : "No books matched."; }
  catch (e) { el.status.textContent = e.message; }
}

async function loadWishlist() {
  if (!el.customer.value) { el.wishStatus.textContent = "Select a customer first."; return; }
  try { const items = await api(`/api/customers/${encodeURIComponent(el.customer.value)}/wishlist`); el.wishlist.innerHTML = items.map(i=>card(i.book,true)).join(""); el.wishStatus.textContent = `${items.length} wishlist item${items.length===1?"":"s"}.`; }
  catch (e) { el.wishStatus.textContent = e.message; }
}

async function addBook(bookId) {
  if (!el.customer.value) { el.status.textContent = "Select a customer first."; return; }
  try { const result = await api("/api/wishlist", {method:"POST", body:JSON.stringify({customerId:el.customer.value,bookId})}); el.status.textContent = result.message; await loadWishlist(); }
  catch (e) { el.status.textContent = e.message; }
}
async function removeBook(bookId) {
  try { const result = await api(`/api/customers/${encodeURIComponent(el.customer.value)}/wishlist/${encodeURIComponent(bookId)}`, {method:"DELETE"}); el.wishStatus.textContent = result.message; await loadWishlist(); }
  catch (e) { el.wishStatus.textContent = e.message; }
}

$("#searchButton").addEventListener("click", loadBooks);
$("#showAllButton").addEventListener("click", ()=>{ el.title.value=""; el.author.value=""; el.genre.value=""; loadBooks(); });
$("#viewWishlistButton").addEventListener("click", loadWishlist);
el.customer.addEventListener("change", ()=>{ loadBooks(); el.wishlist.innerHTML=""; el.wishStatus.textContent=""; });
$("#helpButton").addEventListener("click", ()=>el.help.showModal());
el.books.addEventListener("click", e=>{ const b=e.target.closest("[data-add]"); if(b) addBook(b.dataset.add); });
el.wishlist.addEventListener("click", e=>{ const b=e.target.closest("[data-remove]"); if(b) removeBook(b.dataset.remove); });
(async()=>{ try { await loadLists(); await loadBooks(); } catch(e) { el.status.textContent=`Could not start: ${e.message}`; } })();
