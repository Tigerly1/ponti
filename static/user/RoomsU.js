class RoomsU {
    constructor() {
        var host = "localhost"
        this.User = this.io(host)
        this.disconnectByLeader()
        if (document.cookie != "")
            if (document.cookie.split("=")[1].split("")[4] == "U") this.joinRoom(document.cookie.substring(5, 9))
            else siteU.inputCode()
        else siteU.inputCode()
    }

    io(host) {
        if (host == "localhost") return io.connect('http://localhost:3000/U')
        else if (host == "ponti") return io.connect('https://pontiapk.herokuapp.com/U')
    }
    disconnectByLeader() {
        this.User.on('disconnected', (res) => {
            this.User.off('disconnected')
            this.leave()
            siteU.inputCode()
        })
    }
    cookies(data) {
        var d = new Date();
        d.setTime(d.getTime() + (30 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "code=" + data + "U;" + expires + ";path=/";
        console.log(document.cookie)
    }
    joinRoom(data) {
        this.User.emit('joinRoom', data)
        this.User.on('success', (res) => {
            this.User.off('success')
            console.log(data)
            this.cookies(data)
            console.log(res)
            siteU.userScreen()
        })
        this.User.on('err', (msg) => {
            this.User.off('success')
            console.log(msg)
            siteU.inputCode()
        })
    }
    leave() {
        document.cookie = "code= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        this.User.disconnect()
        this.User = this.io('localhost')
    }
    textSent(text) {
        console.log(text)
        var date = new Date().toLocaleTimeString()
        this.User.emit('textDelivery', { txt: text, date: date })
    }
    tN() {
        this.User.off('TN')
        this.User.on('TN', () => {
            console.log("TN EVENT")
            siteU.tNStart()
        })
    }
    tNResult(data) {
        console.log(this.User)
        this.User.emit('TNRESULT', data)
        siteU.userScreen()
    }
    numberChoose() {
        this.User.off('numberChoose')
        this.User.on('numberChoose', data => {
            console.log(data)
            siteU.numberChooseStart(data)
        })
    }
    numberChoosed(inputValue) {
        this.User.emit('numberChoosed', inputValue)
    }
    checkboxChoose() {
        this.User.off('checkboxChoose')
        this.User.on('checkboxChoose', data => {
            siteU.checkboxChooseStart(data)
        })
    }
    checkboxChoosed(data) {
        this.User.emit('checkboxChoosed', data)
    }
}