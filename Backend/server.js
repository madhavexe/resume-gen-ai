require('dotenv').config()
const app = require('./src/app')
const connectToDB = require('./src/config/database')
const dns = require('dns')

// Change DNS
dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectToDB()

app.listen(3000, () => {
    console.log('server running at PORT 3000')
})