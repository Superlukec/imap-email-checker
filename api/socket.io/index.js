var io = null;

var socketService = {
    startService: startService,
    broadcastMessage: broadcastMessage
}

function startService(io) {
    io = io;

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

}

function broadcastMessage(data) {
    io.emit('new message', data);
}

module.exports = socketService;