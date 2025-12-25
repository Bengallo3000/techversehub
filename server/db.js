const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('shop.db');

// Tabelle erzeugen (falls nicht vorhanden)
db.serialize(()=>{
  db.run(`CREATE TABLE IF NOT EXISTS products(
    id TEXT PRIMARY KEY,
    name TEXT,
    price REAL,
    img TEXT,
    desc TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS orders(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT,
    total REAL,
    currency TEXT,
    status TEXT,
    created DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);
});

module.exports = {
  all:(sql,params=[])=>new Promise((res,rej)=>{
    db.all(sql,params,(err,rows)=>err?rej(err):res(rows));
  }),
  run:(sql,params=[])=>new Promise((res,rej)=>{
    db.run(sql,params,function(err){ err?rej(err):res(this); });
  })
};
