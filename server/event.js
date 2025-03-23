const { Console, error } = require('console');
const express = require('express');
const { link } = require('fs');
const router = express.Router();
const mongoose = require('mongoose')
const { Schema, model } = mongoose;

const eventSchema = new Schema({
    name: String,
    location:String,
    date:String,
    targetAudience:String,
    details:String,
    image:String
})
const event = model('Event', eventSchema);

router.get('/', async (req, res) => {
    try {
        const result = await event.find();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const result = await event.findById(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const {name,date,location,targetAudience,details,image}=req.body
        const e=new event({name:name,date:date,location:location,targetAudience:targetAudience,details:details,image:image})
        await e.save();
        res.json(e);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const {name,date,location,targetAudience,details,image}=req.body
        const result=await event.findByIdAndUpdate(req.params.id,{name:name,date:date,location:location,targetAudience:targetAudience,details:details,image:image},{new:true})
        res.send(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const e = await event.deleteOne({_id:req.params.id})
        res.json(e);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports=router