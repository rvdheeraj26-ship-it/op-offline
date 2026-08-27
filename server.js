const express=require("express");
const path=require("path");
const fs=require("fs");
const crypto=require("crypto");
const app=express();
const PORT=process.env.PORT||3000;
const DB=path.join(__dirname,"data.json");

function readDB(){try{return JSON.parse(fs.readFileSync(DB,"utf8"))}catch{return {sessions:{}}}}
function writeDB(db){fs.writeFileSync(DB,JSON.stringify(db,null,2))}
app.use(express.json({limit:"50kb"}));
app.use(express.static(path.join(__dirname,"public")));

app.post("/api/session",(req,res)=>{
 const db=readDB(), id=crypto.randomUUID();
 db.sessions[id]={createdAt:new Date().toISOString(),answers:[],completed:false};
 writeDB(db); res.json({id});
});
app.post("/api/answer",(req,res)=>{
 const {id,index,answer}=req.body,db=readDB();
 if(!id||!db.sessions[id])return res.status(404).json({error:"Session not found"});
 db.sessions[id].answers[index]={answer,at:new Date().toISOString()};
 writeDB(db);res.json({ok:true});
});
app.post("/api/complete",(req,res)=>{
 const {id,score}=req.body,db=readDB();
 if(!id||!db.sessions[id])return res.status(404).json({error:"Session not found"});
 db.sessions[id].completed=true;db.sessions[id].score=score;db.sessions[id].completedAt=new Date().toISOString();
 writeDB(db);res.json({ok:true});
});
app.get("/api/results",(req,res)=>{
 const key=req.query.key;
 if(key!==process.env.ADMIN_KEY && key!=="rakhi-admin")return res.status(401).json({error:"Unauthorized"});
 const db=readDB();
 res.json(Object.entries(db.sessions).map(([id,v])=>({id,...v})));
});
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"public","index.html")));
app.listen(PORT,()=>console.log(`Operation Offline running on ${PORT}`));
