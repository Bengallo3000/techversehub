// Admin CRUD
const tbl = document.getElementById('tbl');
const form = document.getElementById('form');

async function load(){
  const list = await fetch('/api/products').then(r=>r.json());
  tbl.innerHTML = '<tr><th>ID</th><th>Name</th><th>Price</th><th>Img</th><th>Desc</th></tr>';
  list.forEach(p=>{
    const row = tbl.insertRow();
    row.innerHTML = `
      <td>${p.id}</td>
      <td>${p.name}</td>
      <td>${p.price.toFixed(2)} €</td>
      <td><img src="${p.img}" width="60"></td>
      <td>${p.desc}</td>`;
  });
}
form.addEventListener('submit', async e=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  await fetch('/api/products',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(data)
  });
  form.reset(); load();
});
load();
