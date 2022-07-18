const Imap = require('imap');
const simpleParser = require('mailparser').simpleParser;

var messages = [];
var socketService = null;

var imapService = {
    startService: startService,
    getMessages: getMessages
}

function openInbox(cb) {
    imap.openBox('INBOX', false, cb);
}

var imap = new Imap({
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    tls: true,
    tlsOptions: {
        servername: process.env.MAIL_HOST
    }
});

imap.once('ready', function() {
    console.log('Connected');

    openInbox(function(err, box) {
        console.log("Success to inbox (", box.messages.total, ")");
    });

});

imap.on('mail', function(numNewMsgs) {

    messages = [];

    imap.search(['ALL'], function(err, results) {

        if (results.length) {

            var f = imap.seq.fetch('1:*', {
                bodies: ''
            });
            f.on('message', function(msg, seqno) {
                //console.log('Message #%d', seqno);
                var prefix = '(#' + seqno + ') ';

                msg.on('body', function(stream, info) {

                    simpleParser(stream, (err, mail) => {
                        /*
                        let i = 1;
                        if(i == 1) {
                            console.log(mail);
                        }
                        i++;*/


                        messages.push({
                            seq: seqno,
                            _id: mail.messageId,
                            title: mail.subject,
                            email: mail.from.text,
                            date: mail.date,
                        })

                        if(socketService) {
                            socketService.broadcastMessage(messages);
                        }

                    });

                });

                msg.once('end', function() {
                    console.log(prefix + 'Finished');
                });

            });

            f.once('end', function() {
                
                console.log('Done fetching all messages!');

            });

        }
        

    });

});

imap.once('error', function(err) {
    console.log(err);
});

imap.once('end', function() {
    console.log('Connection ended');
});

// export functions below

function startService(socketService) {

    socketService = socketService;

    console.log('start service')

    imap.connect();
    
}

function getMessages() {

    messages.sort((itemA, itemB) => {
        
        let dateA = new Date(itemA.date);
        let dateB = new Date(itemB.date);

        return dateA.seq < dateB.seq;

    });

    messages.sort((a, b) => {
        return b.date - a.date; // ascending
    })

    return messages;
}

module.exports = imapService;