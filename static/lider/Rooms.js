class Rooms {
    constructor() {
        this.Lider = io.connect('https://pontiapk.herokuapp.com/L')
        //this.Lider = io.connect('http://localhost:3000/L')
        siteL.beginning()
        this.tak = 0;
        this.nie = 0
        this.array = []
    }


    createId() {
        this.Lider.emit('EC')
        this.Lider.on('connected', (data) => {
            siteL.setData(data)
            this.Lider.off('connected')
            console.log('xd')
            this.createRoom(data)
        })
    }

    removeId(data) {
        console.log(data)
        this.Lider.emit('ECR', data)
    }
    createRoom(data) {
        siteL.liderChoice(data)
        this.Lider.emit('joinRoom', data)
        this.Lider.on('success', (res) => {
            console.log(res)
            this.Lider.off('success')
        })
        this.Lider.on('err', (msg) => {
            this.Lider.off('err')
            console.log(msg)
        })
    }
    yesNoEvent() {
        this.Lider.emit('yesOrNo', null)
        this.Lider.on('TlubN', (data) => {
            console.log(data)
            if (data === "T") this.tak += 1
            else if (data === "N") this.nie += 1
            //siteL.tNRaport(tak, nie)
        })
        $("#report").on('click', () => {
            this.Lider.off('TlubN')
            console.log(this.tak, this.nie)
            console.log('xd')
            siteL.tNRaport(this.tak, this.nie)
            this.tak = 0
            this.nie = 0
        })
    }
    numberEvent(minVal, maxVal) {
        this.Lider.emit('numberEvent', { min: minVal, max: maxVal })
        this.Lider.on('number', (data) => {
            this.array.push(data)
            console.log(this.array)
        })
    }
    numberEventResult() {
        siteL.numberResult(this.array)
    }
    checkboxEvent(validation) {
        this.Lider.emit('checkboxEvent', validation)
        this.Lider.on('checkbox', (data) => {
            this.array.push(data)
            console.log(this.array)
        })
    }
    checkboxEventResult() {
        siteL.checkboxResult(this.array)
    }
}