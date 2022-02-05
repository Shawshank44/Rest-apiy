const express = require('express')
const res = require('express/lib/response')
const app = express()
const port = 3010
const Students = require('./models/student')
require("./db/connect")

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// app.post("/students",(req,res)=>{
//     const user  =  new Students(req.body)
//     user.save().then(()=>{
//         res.status(201).send(user)
//     }).catch((e)=>{
//         res.status(400).send(e)
//     })
    
// })

app.post("/students", async (req,res)=>{
  try {
    const user = new Students(req.body)
    const createuser = await user.save()
    res.status(201).send(createuser)
  } catch(e){
    res.status(400).send(e)
  }
  
})

app.get("/students", async (req,res)=>{
  try {
    const studentdata = await Students.find()
    res.send(studentdata)
  } catch (e) {
    res.send(e)
    
  }

})

app.get("/students/:id",async (req,res)=>{
    try {
      const _id = req.params.id
      const studentX = await Students.findById(_id)
      console.log(studentX)

      if (!studentX){
        return res.status(404).send()
        
      }else{
        res.send(studentX)
      }

    } catch (e) {
      res.send(e)
    }
})

// Update the students by id

app.patch("/students/:id", async (req,res)=>{
   try {
    const _id = req.params.id
    const updated = await Students.findByIdAndUpdate(_id, req.body)
    res.send(updated)

   } catch (e) {
     res.status(404).send(e)
   }
})

app.delete('/students/:id', async (req,res)=>{
  try {
    const id = req.params.id
    const deleteStu = await Students.findByIdAndDelete(id)

    if(!id){
      return res.status(400).send()
    }else{
      res.send(deleteStu)
    }

  } catch (e) {
    res.status(500).send(e)
  }

})




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
