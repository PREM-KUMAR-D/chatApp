const Message = require('../models/message');

exports.sendMessage = async (req, res, next) => {

    try {
        
        const user = req.user;
        const message = req.body.message;
        const username = req.user.name;
        await user.createMessage({ message: message, username: username })
        res.status(201).json({ message: "Message created", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }


}


exports.getMessages = async (req, res, next) => {
    try {

        const messages = await Message.findAll();
        res.status(200).json({ message: "Message created", success: true , data:messages});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }

}