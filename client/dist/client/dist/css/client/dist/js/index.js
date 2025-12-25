// Mini React-Ersatz – reicht für Shop-Cart
const root=document.getElementById('root');

function renderShop(){
  root.innerHTML=`
    <header>
      <h1>TechVerseHub</h1>
      <button onclick="toggleTheme()">🌗</button>
    </header>
    <main>
      <h2>Products</h2>
      <div class="grid">
        <div class="card">
          <h3>USB-C Cable</h3>
          <p>12 €</p>
          <button onclick="addCart('usb','USB-C Cable',12)">Add</button>
        </div>
        <div class="card">
          <h3>LED Strip</h3>
          <p>25 €</p>
          <button onclick="addCart('led','LED Strip',25)">Add</button>
        </div>
      </div>
      <hr>
      <h2>Cart <span id="badge">0</span></h2>
      <ul id="cartList"></ul>
      <button onclick="checkout()">Checkout (Crypto)</button>
    </main>
  `;
}
window.addCart=function(id,name,price){
  const cart=JSON.parse(localStorage.cart||'[]');
  cart.push({id,name,price});
  localStorage.cart=JSON.stringify(cart);
  document.getElementById('badge').innerText=cart.length;
};
window.toggleTheme=function(){
  const h=document.documentElement;
  const t=h.getAttribute('data-theme')==='dark'?'light':'dark';
  h.setAttribute('data-theme',t);
  localStorage.theme=t;
};
window.checkout=async function(){
  const cart=JSON.parse(localStorage.cart||'[]');
  const total=cart.reduce((a,b)=>a+b.price,0);
  const res=await fetch('/api/crypto-rate?eur='+total);
  const {amount,address}=await res.json();
  alert(`Send ${amount} BTC to:\n${address}`);
};
renderShop();
