const express=require("express");
const {createtodo}=require("./types")
const {todo}=require("./db")
const app=express();
app.use(express.json());

app.post("/todo",async function(req,res){
  const createPayload=req.body;
  const parsedPayload=createtodo.safeParse(createPayload);
  if(!parsedPayload.success){
    res.status(411).json({
        msg:"Give correct inputs",
    })
  }
  await todo.create({
    title:createPayload.title,
    description:createPayload.description,
  })
  res.json({
    msg:"Todo Created"
  })
})

app.get("/todos",async function(req,res){
    const todos=await todo.find({});
    res.json({
        todos
    })

})

app.put("/completed",async function(req,res){
    const updatePayload=req.body;
    const parsedPayload=createtodo.safeParse(updatePayload);
  if(!parsedPayload.success){
    res.status(411).json({
        msg:"Give correct inputs",
    })
    return;
  }
  await todo.update({
    _id:req.body.id
  },{
    completed:true
  })
  res.json({
    msg:"Todo mark as completed"
  })
    
})
app.listen(3000);