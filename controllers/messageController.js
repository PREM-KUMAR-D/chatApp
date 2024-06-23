const Sequelize = require('sequelize');
const Message = require('../models/message');

exports.sendMessage = async (req, res, next) => {

    try {

        const user = req.user;
        const message = req.body.message;
        const username = req.user.name;
        const groupId = req.body.groupId;

        if(!groupId){
            
            await user.createMessage({ message: message, username: username });
            res.status(201).json({ message: "Message created", success: true });
        }else{
            await user.createMessage({ message: message, username: username , groupId: groupId});
            res.status(201).json({ message: "Message created", success: true });
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }


}


exports.getMessages = async (req, res, next) => {
    try {
        const id = req.query.id;
        if (!id || isNaN(id)) {
            return res.status(400).json({ error: 'Invalid or missing msgId query parameter' });
        }
        const messages = await Message.findAll({
            where: {
                msgId: {
                    [Sequelize.Op.gt]: parseInt(id)
                },
                groupId: null
            }
        });
        res.status(200).json({ message: "Message created", success: true, data: messages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }

}

exports.getGroupMessages = async function (req, res) {
    const groupId = req.query.gid
    if (!groupId || isNaN(groupId)) {
        return res.status(400).json({ error: 'Invalid or missing msgId query parameter' });
    }
    try {
        const messages = await Message.findAll({ where: { GroupId: groupId } });
        res.status(200).json({ message: "Message created", success: true, data: messages });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }






}