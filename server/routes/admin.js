const express = require('express');
const router  = express.Router();
const bcrypt  = require('bcryptjs');

const ADMIN_HASH = process.env.ADMIN_PASSWORD_HASH;

// Login-Seite
router.get('/login', (_,res)=>res.sendFile('/admin/login.html',{root:'.'}));

// Login-Post
router.post('/login', async (req,res)=>{
  const ok = await bcrypt.compare(req.body.pwd, ADMIN_HASH);
  if(ok){ req.session.admin=true; return res.redirect('/admin/dashboard'); }
  res.redirect('/admin/login?err=1');
});

// Dashboard
router.get('/dashboard', (req,res)=>{
  if(!req.session.admin) return res.redirect('/admin/login');
  res.sendFile('/admin/dashboard.html',{root:'.'});
});

// API: Produkte auflisten
router.get('/api/products', async (_,res)=>{
  const db = require('../db');
  const rows = await db.all('SELECT * FROM products ORDER BY id');
  res.json(rows);
});

// API: Produkt hinzufügen / ändern
router.post('/api/products', async (req,res)=>{
  const {id,name,price,img,desc} = req.body;
  const db = require('../db');
  await db.run(
    `INSERT OR REPLACE INTO products(id,name,price,img,desc) VALUES(?,?,?,?,?)`,
    [id,name,price,img,desc]
  );
  res.json({ok:true});
});

// Logout
router.post('/logout', (req,res)=>{ req.session.admin=false; res.redirect('/'); });

module.exports = router;
