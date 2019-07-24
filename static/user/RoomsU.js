class RoomsU {
    constructor() {
        this.User = io.connect('https://pontiapk.herokuapp.com/U')
        //this.User = io.connect('http://localhost:3000/U')
        if (document.cookie.split("")[4] == "U") this.joinRoom(document.cookie.substring(0, 4))
        else siteU.inputCode()
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
    tN() {
        this.User.on('TN', () => {
            this.User.off('TN')
            console.log("TN EVENT")
            siteU.tNStart()
        })
    }
    tNResult(data) {
        this.User.emit('TNRESULT', data)
        siteU.userScreen()
    }
    numberChoose() {
        this.User.on('numberChoose', data => {
            this.User.off('numberChoose')
            console.log(data)
            siteU.numberChooseStart(data)
        })
    }
    numberChoosed(inputValue) {
        this.User.emit('numberChoosed', inputValue)
    }
    checkboxChoose() {
        this.User.on('checkboxChoose', data => {
            this.User.off('checkboxChoose')
            siteU.checkboxChooseStart(data)
        })
    }
    checkboxChoosed(data) {
        this.User.emit('checkboxChoosed', data)
    }
}