const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
app.use(express.json());

// fitness




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.avm4f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    
    try {
        await client.connect();
        const fitnessCollection = client.db('fitness').collection('services');

        app.get('/services', async (req, res) => {
            const query = {};
            const cursor = fitnessCollection.find(query);
            const service = await cursor.toArray();
            res.send(service)
        })
    }
    finally {
        
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('running Fitness Studio Server');
});
app.listen(port, () => {
    console.log('Listening to port',port);
})