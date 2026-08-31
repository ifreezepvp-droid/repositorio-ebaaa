// ========== HAMBURGUERIA MOREIRA — APP ==========
const MENU = {
  burgers: [
    { id: 1,  name: 'Elvis Burger',        desc: 'Hambúrguer artesanal 200g, cheddar derretido e cebola caramelizada', price: 32.00, img: 'img/elvis-burger.jpg', badge: 'Clássico' },
    { id: 2,  name: 'Marilyn Burger',       desc: 'Hambúrguer artesanal, gorgonzola, cogumelos gourmet, tomate cereja, rúcula e cebola', price: 36.00, img: 'img/marilyn-burger.jpg', badge: 'Gourmet' },
    { id: 3,  name: 'Philadelphia',         desc: 'Filé mignon em tiras, muçarela, cheddar, catupiry, parmesão e cebola caramelizada', price: 42.00, img: 'img/philadelphia-burger.jpg', badge: 'Premium' },
    { id: 4,  name: 'Classic Costela',      desc: 'Costela desfiada lentamente, cheddar derretido, coleslaw e molho barbecue da casa', price: 40.00, img: 'img/costela-burger.jpg' },
    { id: 5,  name: 'Smash Burger',         desc: 'Dois smash patties 90g prensados na chapa, queijo americano, picles, cebola e molho especial', price: 34.00, img: 'img/smash-burger.jpg' },
    { id: 6,  name: 'Bacon Burger',         desc: 'Hambúrguer artesanal 200g, bacon crocante, cheddar, alface, tomate e maionese', price: 35.00, img: 'img/bacon-burger.jpg' },
    { id: 7,  name: 'Veggie Burger',        desc: 'Hambúrguer de grão-de-bico e quinoa, queijo coalho grelhado, rúcula e maionese de ervas', price: 30.00, img: 'img/veggie-burger.jpg' },
    { id: 8,  name: 'Chicken Burger',       desc: 'Filé de frango grelhado, queijo prato, alface, tomate e a famosa maionese verde', price: 33.00, img: 'img/chicken-burger.jpg' },
  ],
  xis: [
    { id: 10, name: 'Xis da Casa',          desc: 'Pão, hambúrguer, presunto, queijo, ovo, alface, tomate e a famosa maionese verde', price: 30.00, img: 'img/xis-da-casa.jpg', badge: 'Tradicional' },
    { id: 11, name: 'Xis Bacon',            desc: 'Pão, hambúrguer, bacon crocante, presunto, queijo, ovo, alface, tomate e maionese', price: 35.00 },
    { id: 12, name: 'Xis Coração',          desc: 'Pão, coração de galinha, presunto, queijo, ovo, alface, tomate e maionese', price: 35.00 },
    { id: 13, name: 'Xis Calabresa',        desc: 'Pão, calabresa fatiada, presunto, queijo, ovo, alface, tomate e maionese', price: 34.00 },
    { id: 14, name: 'Xis Filé',             desc: 'Pão, bife de filé mignon, presunto, queijo, ovo, alface, tomate e maionese', price: 40.00, badge: 'Premium' },
  ],
  porcoes: [
    { id: 20, name: 'Onion Rings',         desc: 'Anéis de cebola empanados crocantes com molho barbecue', price: 22.00, img: 'img/onion-rings.jpg' },
    { id: 21, name: 'Fritas Tradicionais',  desc: 'Porção generosa de batata frita crocante e sequinha', price: 18.00 },
    { id: 22, name: 'Fritas com Cheddar',   desc: 'Batata frita coberta com cheddar derretido e bacon crocante', price: 26.00 },
    { id: 23, name: 'Nuggets (12un)',       desc: 'Nuggets de frango crocantes com molho da casa', price: 24.00 },
    { id: 24, name: 'Polenta Frita',        desc: 'Palitos de polenta frita dourada e crocante', price: 16.00 },
  ],
  bebidas: [
    { id: 30, name: 'Milk-shake Chocolate', desc: 'Milk-shake clássico americano sabor chocolate com chantilly', price: 18.00, img: 'img/milkshake.jpg' },
    { id: 31, name: 'Milk-shake Morango',   desc: 'Milk-shake clássico americano sabor morango com chantilly', price: 18.00 },
    { id: 32, name: 'Milk-shake Ovomaltine', desc: 'Milk-shake com ovomaltine crocante e chantilly', price: 20.00 },
    { id: 33, name: 'Coca-Cola 350ml',      desc: 'Lata gelada', price: 7.00 },
    { id: 34, name: 'Coca-Cola 600ml',      desc: 'Garrafa gelada', price: 10.00 },
    { id: 35, name: 'Guaraná Antarctica',   desc: 'Lata 350ml gelada', price: 6.00 },
    { id: 36, name: 'Água Mineral 500ml',   desc: 'Com ou sem gás', price: 5.00 },
    { id: 37, name: 'Cerveja Lata 350ml',   desc: 'Brahma, Skol ou Original', price: 9.00 },
  ],
};

const WHATSAPP_NUMBER = '5554981282167';
let cart = {};

// ========== INIT ==========
document.addEventListener('DOMContentLoaded', () => {
  renderProducts('burgers');
  setupTabs();
  updateStatus();
  setupScrollAnimations();
});

// ========== TABS ==========
function setupTabs() {
  document.querySelectorAll('.tab').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.tab);
    });
  });
}

// ========== RENDER MENU ==========
function renderProducts(category) {
  const grid = document.getElementById('products-grid');
  const items = MENU[category] || [];
  grid.innerHTML = items.map((item, i) => {
    const qty = cart[item.id]?.qty || 0;
    const rowClass = i % 2 === 1 ? 'row-red' : 'row-dark';
    const badge = item.badge ? `<span class="menu-badge">${item.badge}</span>` : '';
    const emoji = category === 'bebidas' ? '🥤' : category === 'porcoes' ? '🍟' : '🍔';
    const imgSide = item.img
      ? `<div class="menu-img-side"><img src="${item.img}" alt="${item.name}" loading="lazy" /></div>`
      : `<div class="menu-img-side"><div class="menu-img-placeholder">${emoji}</div></div>`;
    const addBtn = qty === 0
      ? `<button class="add-btn" onclick="addToCart(${item.id},'${category}')">+ Pedir</button>`
      : `<div class="qty-control"><button class="qty-btn" onclick="changeQty(${item.id},-1,'${category}')">−</button><span class="qty-value">${qty}</span><button class="qty-btn" onclick="changeQty(${item.id},1,'${category}')">+</button></div>`;
    return `<div class="menu-row ${rowClass}" style="animation-delay:${i*0.06}s">${imgSide}<div class="menu-info-side"><div class="menu-name">${item.name}</div><div class="menu-desc">${item.desc}</div>${badge}<div class="menu-bottom"><div class="menu-price">${fmt(item.price)}</div>${addBtn}</div></div></div>`;
  }).join('');
}

// ========== CART ==========
function addToCart(id, cat) {
  const item = findItem(id);
  if (!item) return;
  if (cart[id]) { cart[id].qty++; } else { cart[id] = { ...item, qty: 1 }; }
  updateCartUI();
  renderProducts(cat);
}

function changeQty(id, d, cat) {
  if (!cart[id]) return;
  cart[id].qty += d;
  if (cart[id].qty <= 0) delete cart[id];
  updateCartUI();
  renderProducts(cat);
}

function findItem(id) {
  for (const c of Object.values(MENU)) {
    const f = c.find(i => i.id === id);
    if (f) return f;
  }
  return null;
}

function updateCartUI() {
  const items = Object.values(cart);
  const count = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const floatEl = document.getElementById('cart-float');
  floatEl.classList.toggle('hidden', count === 0);
  document.getElementById('cart-count').textContent = count;
  document.getElementById('cart-total').textContent = fmt(total);
  document.getElementById('cart-modal-total').textContent = fmt(total);

  const el = document.getElementById('cart-items');
  if (!count) {
    el.innerHTML = '<p style="text-align:center;color:#555;padding:24px;font-size:0.85rem;">Carrinho vazio</p>';
    return;
  }

  el.innerHTML = items.map(i => `
    <div class="cart-item">
      <div>
        <span class="cart-item-name">${i.qty}x ${i.name}</span><br/>
        <span class="cart-item-price">${fmt(i.price)} cada</span>
      </div>
      <div class="cart-item-right">
        <span class="cart-item-subtotal">${fmt(i.price * i.qty)}</span>
        <button class="cart-remove" onclick="removeFromCart(${i.id})">✕</button>
      </div>
    </div>
  `).join('');
}

function removeFromCart(id) {
  delete cart[id];
  updateCartUI();
  const t = document.querySelector('.tab.active');
  if (t) renderProducts(t.dataset.tab);
}

function toggleCart() {
  const m = document.getElementById('cart-modal');
  m.classList.toggle('hidden');
  document.body.style.overflow = m.classList.contains('hidden') ? '' : 'hidden';
}

// ========== WHATSAPP ==========
function sendToWhatsApp() {
  const items = Object.values(cart);
  if (!items.length) return;

  const addr = document.getElementById('cart-address').value.trim();
  const obs = document.getElementById('cart-obs').value.trim();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  let msg = `🍔 *PEDIDO — HAMBURGUERIA MOREIRA*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;

  items.forEach(i => {
    msg += `▸ *${i.qty}x* ${i.name}\n`;
    msg += `   ${fmt(i.price)} × ${i.qty} = *${fmt(i.price * i.qty)}*\n\n`;
  });

  msg += `━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *TOTAL: ${fmt(total)}*\n\n`;

  if (obs) msg += `📝 *Observações:*\n${obs}\n\n`;
  msg += `📍 *Endereço:*\n${addr || '(informar endereço)'}\n\n`;
  msg += `⏰ Pedido feito às ${new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}\n`;
  msg += `📱 Via site Hamburgueria Moreira`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

// ========== STATUS ==========
function updateStatus() {
  const day = new Date().getDay();
  const time = new Date().getHours() + new Date().getMinutes() / 60;
  let open = false;
  if (day === 1) open = false;
  else if (day >= 2 && day <= 5) open = (time >= 11.5 && time < 13.5) || (time >= 18.5 && time < 23);
  else if (day === 6) open = (time >= 11.5 && time < 14) || (time >= 18.5 && time < 23);
  else open = time >= 18.5 && time < 22.5;

  const b = document.getElementById('status-badge');
  if (open) {
    b.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#4ade80;"></span><span style="color:#4ade80;">Aberto</span>`;
    b.style.background = 'rgba(74,222,128,0.1)';
    b.style.border = '1px solid rgba(74,222,128,0.3)';
  } else {
    const txt = day === 1 ? 'Fecha segunda' : 'Fechado';
    b.innerHTML = `<span style="width:6px;height:6px;border-radius:50%;background:#f87171;"></span><span style="color:#f87171;">${txt}</span>`;
    b.style.background = 'rgba(248,113,113,0.1)';
    b.style.border = '1px solid rgba(248,113,113,0.3)';
  }
}

// ========== SCROLL ANIMATIONS ==========
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });

  // Header shrink on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
      header.style.background = 'rgba(26,26,26,0.98)';
    } else {
      header.style.background = '#1a1a1a';
    }
  }, { passive: true });
}

function fmt(v) { return `R$ ${v.toFixed(2).replace('.', ',')}`; }
