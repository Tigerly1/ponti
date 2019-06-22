class RoomsU {
    constructor() {
        this.User = io.connect('https://pontiapk.herokuapp.com/U') || io.connect('http://localhost:3000/U')
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
}