// 
const express = require('express');
const router = express.Router();
const Record = require('../models/Record');
const config = require('dotenv').config();

//add mailer
const nodemailer = require('nodemailer');

router.get('/', async (req, res) => {
    res.json(await Record.find())
});

router.get(':id', async (req, res) => {
    res.json(await Record.findById(req.params.id))
});


router.post('/', async (req,res) => {
    const record = new Record(req.body);
    await record.save();

    //create mask of mailtext
    const output = `
    <p>You have a new message from nice-app:</p>
    <ul>
        <li>mame: ${req.body.name}</li>
        <li>email: ${req.body.email}</li>
        <li>address: ${req.body.address}</li>
        <li>gender: ${req.body.gender}</li>
    </ul>
    `;

    //initialization of smtp transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMEIL_KEY
        }
    });

    //create of mail options
    let mailOptions = {
        from: 'my fullstack app',
        to: 'ilya-79@yandex.ru',
        subject: 'new message',
        text: req.body.name,
        html: output
    }

    //sending
    transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageID);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });

    res.json({state:'success'});

});

router.put('/:id', async (req, res) => {
    await Record.findByIdAndUpdate(req.params.id, req.body);
    res.json({ state: 'updated' });
});

router.delete('/:id', async (req, res) => {
    await Record.findByIdAndRemove(req.params.id);
    res.json({ state: "deleted" });
});

module.exports = router;