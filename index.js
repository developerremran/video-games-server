const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const cors = require('cors')
require('dotenv').config()

const productsData = require('./Data/normalData.json')

// midalewere

app.use(cors());
app.use(express.json());

// _______


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://VideoGameToys:fr9AVVH1ZoxYhuqu@cluster0.qujhgtx.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
   
    const collectionDataDb = client.db("collectionDataDb").collection('collectionDataDb');
    
    app.get('/mytoys', async(req, res)=>{
        const product = collectionDataDb.find();
        const result = await product.toArray();
        res.send(result)
    })

    app.post('/mytoys', async(req, res)=>{
         const storeBody = req.body;
        const result = await collectionDataDb.insertOne(storeBody)
        res.send(result)
    })



    




    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// __________


app.get('/', (req, res)=>{
    res.send('WellDone Server is Running......')
})



app.get('/products', (req, res)=>{
    res.send(productsData)
})

app.get('/products/:id', (req, res)=>{
    const id = req.params.id;
    console.log(id);
    const result = productsData.find(product=> product.id === id)
    res.send(result)

})

app.listen(port, ()=>{
    console.log('server side running');
})