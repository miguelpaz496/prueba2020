const express = require('express')
var cors = require('cors')

var bodyParser = require('body-parser')

const app = express()


app.use(cors())

// parse application/x-www-form-urlencoded
app.use(bodyParser.json()) 


const port = 3001

require("./routes/translateRouter")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

