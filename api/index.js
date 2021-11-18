const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
      origin: '*'
    }
});

require('dotenv').config();
const port = 3000;
const cors = require('cors');
const imapService = require('./imap-listener/index');
const socketService = require('./socket.io/index');

socketService.startService(io);
imapService.startService(socketService);


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/** MONGOOSE - Database connection **/
// ==========================================================
var dbConfig = require('./config');
const mongoose = require('mongoose');

(async () => {
    try {
      await mongoose.connect(dbConfig.url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
       });

       console.log('DB connected');
    } catch (err) {    
        throw err;
    }
})();
require('./models/user');
// ==========================================================


/** INSTALL */
// ==========================================================
const install = require('./install/index');
install.install().then(() => {
    console.log('Install complete');    
}).catch(err => {
    console.log('Install failed');
    console.log(err);
    process.exit(1);
});
// ==========================================================



// routes
app.use('/api/authenticate', require('./routes/authenticate'))
app.use('/api/messages', require('./routes/messages'))


app.get('*', (req, res) => {
    return res.sendStatus(404)
})

server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})