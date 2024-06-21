require('dotenv').config({ path: './.env', override: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const userRoutes = require('./routes/user');
const sequelize = require('./util/database');


const app  = express();

app.use(bodyParser.json());


app.use(cors());

app.use('/user',userRoutes);


app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname, `public/${req.url}`));
});

sequelize
.sync({force:true})
.then(()=>{

    app.listen(process.env.PORT);
})
.catch((err)=> console.log(err));

