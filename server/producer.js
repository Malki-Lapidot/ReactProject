const { Console, error } = require('console');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const producerSchema = new Schema({
    name: String,
    email: String,
    phone:String,
    details:String,
    events:[{eventID:String,eventName:String}]
})
const producer = model('Producer', producerSchema);

router.get('/', async (req, res) => {
    try {
        const result = await producer.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:email', async (req, res) => {
    try {
        const result = await producer.findOne({'email':req.params.email});
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const {name,email,phone,details,events}=req.body
        const p=new producer({name:name,email:email,phone:phone,details:details,events:events})
        await p.save();
        res.json(p);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:email', async (req, res) => {
    try {
        await producer.deleteOne({email:req.params.email})
        const {name,email,phone,details,events}=req.body
        const p=new producer({name:name,email:email,phone:phone,details:details,events:events})
        await p.save();
        res.json(p);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router