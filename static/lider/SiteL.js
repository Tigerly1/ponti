class SiteL {
    constructor() {
        this.LiderSite = "4L";
        this.data = null
    }
    beginning() {
        var img = new Image()
        img.src = "../img/lstart.jpg"
        var img1 = new Image()
        img1.src = "../img/arrow.jpg"
        $("#phone").append(this.LiderSite)
        $("#phone").append(img)
        $("#phone").append(img1)
        $(img1).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "OC"
            this.choose()
        })
    }
    choose() {
        var img = new Image()
        img.src = "../img/ENT.jpg"
        $("#phone").append(this.LiderSite)
        $("#phone").append(img)
        $(img).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4R"
            console.log(this.data)
            if (this.data == null)
                rooms.createId()
            else this.liderChoice(this.data)
        })
        var img1 = new Image()
        img1.src = "../img/EXIT.jpg"
        $("#phone").append(img1)
        $(img1).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "CCM"
            if (this.data == null) {
                this.beginning()
            }
            else this.close()
        })
    }
    setData(data) {
        this.data = data
    }
    close() {
        var img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "OC"
            this.choose()
        })
        var img1 = new Image()
        img1.src = "../img/CLOSE.jpg"
        $("#phone").append(img1)
        $("#phone").append("</br>" + "CLOSE " + this.data + " ?" + "</br>")
        var img2 = new Image()
        img2.src = "../img/OK.jpg"
        $("#phone").append(img2)
        $(img2).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4L"
            this.beginning()
            if (this.data.length > 0) {
                rooms.removeId(this.data)
                this.data = null
            }
        })
    }
    liderChoice(data) {
        var img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "OC"
            this.choose()
        })
        var img1 = new Image()
        img1.src = "../img/TN.jpg"
        $("#phone").append(img1)
        $(img1).addClass('middlel')
        $(img1).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "RYN"
            this.tNChoice()
        })
        var img2 = new Image()
        img2.src = "../img/liczba.jpg"
        $("#phone").append(img2)
        $(img2).addClass('middlel')
        $(img2).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "R0F"
            this.numberChoose()
        })
        var img3 = new Image()
        img3.src = "../img/lista.jpg"
        $(img3).addClass('middlel')
        $("#phone").append(img3)
        $(img3).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "RCB"
        })
        $("#phone").append("EC" + this.data)
    }
    tNChoice() {
        var img = new Image()
        img.src = "../img/TN.jpg"
        $("#phone").append(img)
        var img1 = new Image()
        img1.id = "report"
        img1.src = "../img/report.jpg"
        $("#phone").append(img1)
        rooms.yesNoEvent()
        /* $(img1).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "YN"
        }) */
    }
    tNRaport(tak, nie) {
        $("#phone").empty()
        var img = new Image()
        img.src = "../img/YES.jpg"
        $("#phone").append(img, String(tak))
        var img1 = new Image()
        img1.src = "../img/NO.jpg"
        $("#phone").append(img1, String(nie))
        var img2 = new Image()
        img2.src = "../img/OK.jpg"
        $("#phone").append(img2)
        $(img2).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4R"
            this.liderChoice()
        })
    }
    numberChoose() {
        for (let i = 0; i < 2; i++) {
            let input = $('<input>')
            let div = $('<div>')
            let text = $('<p>')
            if (i == 0) $(text).html('MAX')
            else $(text).html('MIN')
            div.append(text)
            div.append(input)
            $('#phone').append(div)
        }
        let button = $('<button>')
        $(button).text('Continue')
        $('#phone').append(button)
        $(button).on('click', () => {
            let maxVal = Array.from(document.querySelectorAll("input"))[0].value
            let minVal = Array.from(document.querySelectorAll("input"))[1].value
            console.log('Max: ' + maxVal)
            console.log('Min: ' + minVal)
            $('#phone').empty()
            rooms.numberEvent(maxVal, minVal)
        })
    }

}