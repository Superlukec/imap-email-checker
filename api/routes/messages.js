const express = require('express');
const router = express.Router();
const imapService = require('../imap-listener/index');

module.exports = router;

router.get('/', getMessages);

function getMessages(req, res) {
    return res.send(
        imapService.getMessages()
        /*
        [
            {
              _id: 1,
              check: true,
              title: "Refill your drained energy levels at work",
              email: "taco@trello.com",
              date: "28/10/2021, 23:40",
              assigned: "DV",
            },
            {
              _id: 2,
              check: false,
              title: "Refill your drained energy levels at work",
              email: "taco@trello.com",
              date: "28/10/2021, 23:40",
            },
            {
              _id: 3,
              check: false,
              title: "You're invited to Mailchimp Open House!",
              email: "openhouse@mailchimp.com",
              date: "05/10/2021, 17:18",
            },
          ]*/
    );
}