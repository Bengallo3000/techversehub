require('dotenv').config();
const express = require('express');
const cors = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const app = express();

app.use(cors({ origin:true, credentials:true }));
app.use(express.json());
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);
app.use(session({
  store:new SQLiteStore({ db:'sessions.db' }),
  secret:process.env.SESSION_SECRET||'secret',
  resave:false, saveUninitialized:false
}));

// Dummy Crypto Rate
app.get('/api/crypto-rate', async (req,res)=>{
  const eur=parseFloat(req.query.eur)||0;
  const rate=0.000018; // 1 EUR ≈ 0.000018 BTC
  res.json({amount:(eur*rate).toFixed(8), address:'bc1dummyaddress123'});
});

app.use((_,res)=>res.status(404).json({error:'Not found'}));

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>console.log(`Server ${PORT}`));
