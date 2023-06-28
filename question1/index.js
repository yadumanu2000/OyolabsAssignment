import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const express = require('express')

const app = express()
app.use(bodyParser.json())
mongoose.connect('mongodb://localhost:27017/customers')
const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
})
const Customer = mongoose.model('Customer', CustomerSchema)
app.post('/customers', async (req, res) => {
  const {name, phone} = req.body
  try {
    const customer = await Customer.create({name, phone})
    res.status(201).json(customer)
  } catch (err) {
    res.status(500).json(err)
  }
})
app.listen(3000, () => console.log('Server is running on port 3000'))
