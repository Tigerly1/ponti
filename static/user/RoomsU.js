class RoomsU {
    constructor() {
        this.User = io.connect('https://pontiapk.herokuapp.com/U')
        //this.User = io.connect('http://localhost:3000/U')
        siteU.inputCode()
    }
    joinRoom(data) {
        this.User.emit('joinRoom', data)
        this.User.on('success', (res) => {
            console.log(res)
            siteU.userScreen()
        })
        this.User.on('err', (msg) => {
            console.log(msg)
            siteU.inputCode()
        })
    }
    tN() {
        this.User.on('TN', () => {
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
            console.log(data)
            siteU.numberChooseStart(data)
        })
    }
    numberChoosed(inputValue) {
        this.User.emit('numberChoosed', inputValue)
    }
    checkboxChoose() {
        this.User.on('checkboxChoose', data => {
            siteU.checkboxChooseStart(data)
        })
    }
    checkboxChoosed(data) {
        this.User.emit('checkboxChoosed', data)
    }
}