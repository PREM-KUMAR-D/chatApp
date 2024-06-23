require('dotenv').config({ path: './.env', override: true });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const sequelize = require('./util/database');
const User = require('./models/user');
const Message = require('./models/message');
const Group = require('./models/group');
const UserGroup = require('./models/usergroup');


const app  = express();

app.use(bodyParser.json());


app.use(cors({
    origin: 'http://127.0.0.1:5500',
    methods: ["GET" , "POST"]
    
}));

app.use('/user',userRoutes);
app.use('/message',messageRoutes);


app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname, `public/${req.url}`));
});

User.hasMany(Message);
Message.belongsTo(User);

Group.belongsToMany(User,{
    through: UserGroup
});
User.belongsToMany(Group,{
    through: UserGroup
});

Group.hasMany(Message);
Message.belongsTo(Group);


sequelize
// .sync()
.sync({force:true})
.then(()=>{

    app.listen(process.env.PORT);
})
.catch((err)=> console.log(err));

