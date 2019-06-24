var express = require("express")
var app = express()
const PORT = process.env.PORT || 3000;
const server = require("http").Server(app);
const io = require("socket.io")(server);
var bodyParser = require("body-parser")
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));
var liderTab = ["4092", "1212"]

app.get('/L', function (req, res) {
    res.sendFile(__dirname + '/static/lider.html');
});

app.get('/U', function (req, res) {
    res.sendFile(__dirname + '/static/user.html');
});
/* io
    .of('/L')
    .on("connection", (client) => {
        client.emit('news', { hello: 'world' });
        client.on('my other event', function (data) {
            console.log(data);
        });
    }); */
const Lider = io
    .of("/L")
    .on('connection', (lider) => {
        lider.on('EC', () => {
            if (liderTab.length == 0) {
                var eCode = EC()
                liderTab.push(eCode)
            }
            else {
                for (let i = 0; i < liderTab.length; i++) {
                    if (i == 0) {
                        var eCode = EC()
                        console.log(eCode)
                    }
                    if (liderTab[i] == EC) i = 0
                }
                liderTab.push(eCode)
            }
            console.log(liderTab)
            lider.emit('connected', eCode)
        })
        lider.on('ECR', (data) => {
            console.log('xd')
            liderTab.splice(liderTab.indexOf(data), 1)
        })
        console.log('Lider connected with code');
        lider.on("joinRoom", (room) => {
            if (liderTab.includes(room)) {
                console.log("L")
                lider.join(room)
                lider.on('yesOrNo', () => {
                    lider.emit('success', 'DŻEBAĆ DISA')
                    //let activeYesOrNo = true
                    console.log('okej')
                    io.of("/U").in(room).emit('TN');
                })
                lider.emit('success', ' succesfully joined this room')
            }
            else {
                console.log("XD")
                return lider.emit("err", "no room here" + room)
            }
        })
    })

const User = io
    .of("/U")
    .on('connection', (client) => {
        console.log('User connected with code');
        client.on("joinRoom", (room) => {
            if (liderTab.includes(room)) {
                console.log("U")
                client.join(room)
                client.on('TNRESULT', (data) => {
                    console.log(data)
                    io.of("/L").in(room).emit('TlubN', data);
                })
                return client.emit('success', 'xd succesfully joined this room')
            }
            else {
                console.log("XD")
                return client.emit("err", "no room here" + room)
            }
        })
    })
function EC() {
    var EC = String(Math.floor(Math.random() * 10000))
    if (EC < 10) EC = "000" + EC
    else if (EC < 100) EC = "00" + EC
    else if (EC < 1000) EC = "0" + EC
    return EC
}
app.post("/EC", (req, res) => {

})
app.post('/ECR', (req, res) => {

})

server.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})