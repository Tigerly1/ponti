var express = require("express")
var app = express()
const PORT = process.env.PORT || 3000;
const server = require("http").Server(app);
const io = require("socket.io")(server);
var bodyParser = require("body-parser")
app.use(express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));
var liderTab = ["4092", "1212"]
var liderEverythingTab = [{
    eCode: '10000',
    tabST: []
}]
app.get('/L', function (req, res) {
    res.sendFile(__dirname + '/static/lider.html');
});

app.get('/U', function (req, res) {
    res.sendFile(__dirname + '/static/user.html');
});
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
            liderEverythingTab[liderEverythingTab.length] = { eCode: eCode, tabST: [] }
            console.log(liderEverythingTab)
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
                lider.on('numberEvent', (data) => {
                    io.of('/U').in(room).emit('numberChoose', data)
                    console.log(data)
                    console.log('xd')
                })
                lider.on('checkboxEvent', (data) => {
                    io.of('/U').in(room).emit('checkboxChoose', data)
                })
                lider.on('RSTShift', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.Ecode == room) element.tabST.shift()
                    })
                })
                var tabST = ""
                liderEverythingTab.forEach((element) => {
                    if (element.Ecode == room) tabST = element.tabST
                    return tabST
                })
                lider.emit('success', tabST)
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
                client.on('numberChoosed', data => {
                    io.of("/L").in(room).emit('number', data)
                })
                client.on('checkboxChoosed', data => {
                    io.of("/L").in(room).emit('checkbox', data)
                })
                client.on('textDelivery', text => {
                    liderEverythingTab.forEach((element) => {
                        console.log(element.eCode)
                        console.log(element)
                        console.log(room)
                        if (element.eCode == room) element.tabST[element.tabST.length] = text
                    })
                    console.log(liderEverythingTab)
                    io.of("/L").in(room).emit('textDelivered', text)
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