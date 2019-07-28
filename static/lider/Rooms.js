class Rooms {
    constructor() {
        this.Lider = io.connect('https://pontiapk.herokuapp.com/L')
        //this.Lider = io.connect('http://localhost:3000/L')
        if (document.cookie != "")
            if (document.cookie.split("=")[1].split("")[4] == "L") this.createRoom(document.cookie.substring(5, 9))
            else siteL.beginning()
        else siteL.beginning()
        this.tak = 0;
        this.nie = 0
        this.array = []
    }

    cookies(data, liderChoice) {
        var d = new Date();
        d.setTime(d.getTime() + (30 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "code=" + data + "L" + liderChoice + ";" + expires + ";path=/";
        console.log(document.cookie)
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
        document.cookie = "code= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        this.Lider.emit('ECR', data)
    }
    createRoom(data) {
        this.Lider.emit('joinRoom', data)
        this.Lider.on('success', (res) => {
            siteL.setSTTab(res)
            siteL.setData(data)
            if (document.cookie != "") {
                if (document.cookie.split("=")[1].split("")[4] == "L") {
                    if (document.cookie.substring(10) == "4R") siteL.liderChoice()
                    else if (document.cookie.substring(10) == "RST") siteL.raportRST()
                    else if (document.cookie.substring(10) == "RYN") siteL.tNChoice()
                    else if (document.cookie.substring(10) == "RRYN") siteL.tNRaport()
                    else if (document.cookie.substring(10) == "ROF") siteL.numberChoose()
                    else if (document.cookie.substring(10) == "RROF") siteL.numberRaport()
                    else if (document.cookie.substring(10) == "RRORF") siteL.numberResult()
                    else if (document.cookie.substring(10) == "RCB") siteL.checkBox()
                    else if (document.cookie.substring(10) == "RRCB") siteL.checkBoxWaiting()
                    else if (document.cookie.substring(10) == "RRRCB") siteL.chechboxResult()
                }
                else siteL.liderChoice()
            }
            else siteL.liderChoice()
            console.log(document.cookie.substring(10))
            console.log(data)
            console.log(res)
            this.Lider.off('success')
        })
        this.Lider.on('err', (msg) => {
            this.Lider.off('err')
            console.log(msg)
        })
    }
    textDelivery() {
        this.Lider.off('textDelivered')
        this.Lider.on('textDelivered', (text) => {
            siteL.setSTTabAppend(text)
        })
    }
    RSTShift() {
        this.Lider.emit('RSTShift')
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
            $("#report").off('click')
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
        this.Lider.off('number')
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
        this.Lider.off('number')
    }
    online() {
        this.Lider.emit('getOnline')
        this.Lider.off('onGetOnline')
        this.Lider.on('onGetOnline', (data) => {
            console.log(data)
            siteL.setOnline(data)
            this.numberEventResult()
        })
    }
}