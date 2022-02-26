const express = require('express')
const morgan = require('morgan')
const {
    sequelize
} = require('./models')
const router = require('./src/routers/index')

const app = express()
const port = 3009

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1', router)

app.get('/', (req, res) => {
    res.send("oke bokkkssss")
})

app.use((req, res) => {
    console.log(`${req.path} tidak ditemukan`);
})

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log(`Server runing on port : ${port}`);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})