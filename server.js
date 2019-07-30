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
            liderEverythingTab[liderEverythingTab.length] = { eCode: eCode, tabST: [], yesNoTab: [0, 0], minNumber: 0, maxNumber: 0, numberTab: [], checkboxRange: "", checkboxTab: [], online: 0 }
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
                lider.on('getOnline', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            console.log('XD')
                            lider.emit('onGetOnline', element.online)
                        }
                    })
                })
                lider.on('yesOrNo', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            element.yesNoTab = [0, 0]
                        }
                    })
                    lider.emit('success', 'DŻEBAĆ DISA')
                    //let activeYesOrNo = true
                    console.log('okej')
                    io.of("/U").in(room).emit('TN');
                })
                lider.on('yesReport', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            lider.emit('yesReported', element.yesNoTab)
                        }
                    })
                })
                lider.on('numberEvent', (data) => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            element.numberTab = []
                            element.minNumber = data.min
                            element.maxNumber = data.max
                        }
                    })
                    io.of('/U').in(room).emit('numberChoose', data)
                    console.log(data)
                    console.log('xd')
                })
                lider.on('numberEventWaiting', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            lider.emit('numberEventAwaiting', { min: element.minNumber, max: element.max })
                        }
                    })
                })
                lider.on('numberEventReport', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            lider.emit('numberEventReported', element.numberTab)
                        }
                    })
                })
                lider.on('checkboxEvent', (data) => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            element.checkboxRange = data
                            element.checkboxTab = []
                        }
                    })
                    io.of('/U').in(room).emit('checkboxChoose', data)
                })
                lider.on('checkboxEventWaiting', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            lider.emit('checkboxEventAwaiting', element.checkboxRange)
                        }
                        console.log(liderEverythingTab)
                    })
                })
                lider.on('checkboxEventReport', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            lider.emit('checkboxEventReported', { tab: element.checkboxTab, range: element.checkboxRange })
                        }
                    })
                    console.log(liderEverythingTab)
                })
                lider.on('RSTShift', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            element.tabST.shift()
                            element.tabST.shift()
                        }
                    })
                })
                var tabST = ""
                liderEverythingTab.forEach((element) => {
                    if (element.eCode == room) tabST = element.tabST
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
        console.log(client.id)
        console.log('User connected with code');
        client.on("joinRoom", (room) => {
            if (liderTab.includes(room)) {
                client.join(room)
                console.log(client.id)
                console.log("U")
                liderEverythingTab.forEach((element) => {
                    if (element.eCode == room) {
                        element.online++
                        io.of("/L").in(room).emit('onlineDelivery', element.online)
                        console.log(liderEverythingTab)
                    }
                })
                client.on('TNRESULT', (data) => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {

                            if (data == "T") element.yesNoTab[0] = element.yesNoTab[0] + 1
                            else if (data == "N") element.yesNoTab[1] = element.yesNoTab[1] + 1
                        }
                    })
                    console.log(liderEverythingTab)

                    //io.of("/L").in(room).emit('TlubN', data);
                })
                client.on('numberChoosed', data => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            element.numberTab.push(data)
                        }
                    })
                    //io.of("/L").in(room).emit('number', data)
                })
                client.on('checkboxChoosed', data => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            element.checkboxTab.push(data)
                        }
                    })
                    //io.of("/L").in(room).emit('checkbox', data)
                })
                client.on('textDelivery', date => {
                    console.log(date)
                    liderEverythingTab.forEach((element) => {
                        console.log(element.eCode)
                        console.log(room)
                        if (element.eCode == room) {
                            element.tabST.push(date.txt)
                            element.tabST.push(date.date)
                        }
                        console.log(element)
                    })
                    console.log(liderEverythingTab)
                    io.of("/L").in(room).emit('textDelivered', date)
                })
                client.on('disconnect', () => {
                    liderEverythingTab.forEach((element) => {
                        if (element.eCode == room) {
                            element.online--
                            io.of("/L").in(room).emit('onlineDelivery', element.online)
                        }
                    })
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