class SiteL {
    constructor() {
        this.LiderSite = "4L";
        this.data = null
        this.validation = ""
        this.STTab = []
        this.online = 0
    }
    beginning() {
        $("#phone").empty()
        this.LiderSite = "OO"
        var img = new Image()
        img.src = "../img/lstart.jpg"
        var img1 = new Image()
        img1.src = "../img/arrow.jpg"
        $("#phone").append(this.LiderSite)
        $("#phone").append(img)
        $("#phone").append(img1)
        $(img1).on("click", () => {
            this.choose()
        })
    }
    choose() {
        $("#phone").empty()
        this.LiderSite = "OC"
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
            else this.liderChoice()
        })
        var img1 = new Image()
        img1.src = "../img/EXIT.jpg"
        $("#phone").append(img1)
        $(img1).on("click", () => {
            if (this.data == null) {
                this.beginning()
            }
            else this.close()
        })
    }
    setData(data) {
        this.data = data
    }
    setSTTab(res) {
        this.STTab = res
    }
    setOnline(online) {
        this.online = online
        console.log(this.online)
    }
    setSTTabAppend(text) {
        console.log(this.STTab)
        if (this.STTab.length == 0) this.STTab = []
        this.STTab.push(text.txt)
        this.STTab.push(text.date)
        if (this.LiderSite == '4R') {
            $('#R4notifi').html(this.STTab.length / 2)
            $('#R4notifi').on("click", () => {
                $("#phone").empty()
                this.LiderSite = "RST"
                this.raportRST()
            })
        }
    }
    close() {
        $("#phone").empty()
        this.LiderSite = "CCM"
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
            this.LiderSite = "OO"
            this.beginning()
            if (this.data.length > 0) {
                document.cookie = "code= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                this.STTab = []
                rooms.removeId(this.data)
                this.data = null
            }
        })
    }
    liderChoice() {
        $('#phone').empty()
        this.LiderSite = "4R"
        document.title = this.data
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
            rooms.yesNoEvent()
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
            this.checkbox()
        })
        var img4 = new Image()
        img4.src = "../img/ST.jpg"
        $(img4).attr('id', 'R4')
        $("#phone").append(img4)
        let div = $('<div>')
        $(div).attr('id', 'R4notifi')
        $(div).html(this.STTab.length / 2)
        $('#phone').append(div)
        if (this.STTab.length > 0) {
            $(div).on("click", () => {
                $("#phone").empty()
                this.LiderSite = "RST"
                this.raportRST()
            })
        }
        var img5 = new Image()
        img5.src = "../img/online.jpg"
        $(img5).attr('id', 'online4R')
        $("#phone").append(img5)
        let div = $('<div>')
        $(div).attr('id', 'R4online')
        $(div).html(0 || this.online)
        $('#phone').append(div)
        $("#phone").append("EC" + this.data)
        rooms.cookies(this.data, this.LiderSite)
        rooms.textDelivery()
    }
    raportRST() {
        $("#phone").empty()
        this.LiderSite = "RST"
        let img = new Image()
        img.src = "../img/OK.jpg"
        $('#phone').append(img)
        $(img).on('click', () => {
            this.STTab.shift()
            this.STTab.shift()
            rooms.RSTShift()
            if (this.STTab.length == 0) this.liderChoice()
            else this.raportRST()
        })
        let div1 = $("<div>")
        $(div1).attr('id', 'ST1')
        let div2 = $("<div>")
        $(div2).attr('id', 'ST2')
        let textarea = $("<textarea maxlength=255 disabled>")
        console.log(this.STTab[0])
        $(textarea).html(this.STTab[0])
        $(textarea).attr('id', 'ST3')
        $(div2).append(textarea)
        $(div1).append(div2)
        $("#phone").append(div1)
        $(textarea).focus()
        let div3 = $('<div>')
        $(div3).html(this.STTab[1])
        $("#phone").append(div3)
        rooms.cookies(this.data, this.LiderSite)
    }
    tNChoice() {
        this.LiderSite = "RYN"
        var img = new Image()
        img.src = "../img/TN.jpg"
        $("#phone").append(img)
        var img1 = new Image()
        img1.id = "report"
        img1.src = "../img/report.jpg"
        $("#phone").append(img1)
        $(img1).on('click', () => {
            rooms.yesNoEventResult()
        })
        /* $(img1).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "YN"
        }) */
        rooms.cookies(this.data, this.LiderSite)
    }
    tNRaport(data) {
        this.LiderSite = "RRYN"
        $("#phone").empty()
        var img = new Image()
        img.src = "../img/YES.jpg"
        $("#phone").append(img, String(data[0]))
        var img1 = new Image()
        img1.src = "../img/NO.jpg"
        $("#phone").append(img1, String(data[1]))
        var img2 = new Image()
        img2.src = "../img/OK.jpg"
        $("#phone").append(img2)
        $(img2).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4R"
            this.liderChoice()
        })
        rooms.cookies(this.data, this.LiderSite)
    }
    numberChoose() {
        this.LiderSite = "ROF"
        for (let i = 0; i < 2; i++) {
            let input = $('<input>')
            let div = $('<div>')
            let text = $('<p>')
            if (i == 0) $(text).html('MIN')
            else $(text).html('MAX')
            div.append(text)
            div.append(input)
            $('#phone').append(div)
        }
        let button = $('<button>')
        $(button).text('Continue')
        $('#phone').append(button)
        $(button).on('click', () => {
            let minVal = Array.from(document.querySelectorAll("input"))[0].value
            let maxVal = Array.from(document.querySelectorAll("input"))[1].value
            if (minVal >= 0 && maxVal > minVal) {
                this.max = maxVal
                this.min = minVal
                console.log('Min: ' + minVal)
                console.log('Max: ' + maxVal)
                $('#phone').empty()
                rooms.numberEvent(minVal, maxVal)
                rooms.numberWaitingForResult()
            }
        })
        rooms.cookies(this.data, this.LiderSite)
    }
    numberReport(data) {
        this.LiderSite = "RROF"
        var img1 = new Image()
        img1.id = "report"
        img1.src = "../img/report.jpg"
        $("#phone").append(img1)
        $(img1).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "RROF"
            rooms.online()
        })
        rooms.cookies(this.data, this.LiderSite)
    }
    numberResult(array) {
        this.LiderSite = "RRORF"
        console.log(this.online)
        array.sort(function (a, b) { return a - b })
        console.log(array)
        console.log(this.min)
        console.log(this.max)
        var img2 = new Image()
        img2.src = "../img/OK.jpg"
        $("#phone").append(img2)
        $(img2).on("click", () => {
            console.log(this)
            $("#phone").empty()
            this.liderChoice()
            this.LiderSite = "4R"

        })
        let IL = array.length
        console.log(IL)
        let MIN = Math.min(...array)
        console.log(MIN)
        let MAX = Math.max(...array)
        console.log(MAX)
        var AV = 0
        array.map((el, i) => {
            AV += el
            if (i + 1 == IL) AV = Math.round(AV / IL)
        })
        console.log(AV)
        let Q1 = (array[Math.floor((IL - 1) / 4)] + array[Math.floor((IL - 1) / 4 + 1)]) / 2
        console.log(Q1)
        let Q3 = (array[Math.floor((IL - 1) / 2 + (IL - 1) / 4)] + array[Math.floor((IL - 1) / 2 + (IL - 1) / 4 + 1)]) / 2
        console.log(Q3)
        if (IL % 2 == 0) {
            var MED = (array[Math.floor((IL - 1) / 2)] + array[Math.floor((IL - 1) / 2 + 1)]) / 2
        }
        else {
            var MED = array[Math.floor((IL - 1) / 2)]
        }
        console.log(MED)
        for (let i = 0; i < 6; i++) {
            let div = $('<div>')
            $(div).addClass('borderWithNumber')
            if (i == 0) {
                var mainDiv1 = $('<div>')
                $(mainDiv1).attr('id', 'firstNumberResult');
                $("#phone").append(mainDiv1)
                $(div).html(MIN)
            }
            if (i == 1) $(div).html(MED)
            if (i == 2) $(div).html(MAX)
            if (i < 3) $(mainDiv1).append(div)
            if (i == 3) {
                var mainDiv2 = $('<div>')
                $(mainDiv2).attr('id', 'twondNumberResult');
                $("#phone").append(mainDiv2)
                var img2 = new Image()
                img2.src = "../img/range.jpg"
                $(mainDiv2).append(img2)
            }
            if (i == 4) {
                var mainDiv3 = $('<div>')
                $(mainDiv3).attr('id', 'thirdNumberResult');
                $("#phone").append(mainDiv3)
                $(div).html(Q1)

            }
            if (i == 5) $(div).html(Q3)
            if (i > 3) $(mainDiv3).append(div)

        }
        let div = $('<div>')
        $("#phone").append(div)
        $(div).html(AV)
        let div1 = $('<div>')
        $("#phone").append(div1)
        $(div1).html(IL)
        rooms.cookies(this.data, this.LiderSite)
    }
    checkbox() {
        this.LiderSite = "RCB"
        let div = $('<div>')
        $(div).attr('id', 'checkboxCheck');
        $("#phone").append(div)
        let div1 = $('<div>')
        $(div1).attr('id', 'leftCheckboxCheck');
        $(div).append(div1)
        var validation = ""
        let tabLetters = ["A", "B", "C", "D", "E"]
        var actualDiv1 = ''
        var actualDiv2 = ''
        var button = $('<button>')
        $("#phone").append(button)
        $(button).on('click', () => {
            if (validation > "A" || validation > 0) {
                $("#phone").empty()
                rooms.checkboxEvent(validation)
                rooms.checkboxEventAwaiting()
            }

        })
        for (let i = 0; i < 5; i++) {
            let div3 = $("<div>")
            $(div3).addClass('leftCheckboxes')
            let div4 = $('<div>')
            $(div4).addClass('checkbox')
            if (i > 0) {
                $(div3).on('click', () => {
                    if (actualDiv1 != undefined) $(actualDiv1).css({ "background-color": 'transparent' })
                    if (actualDiv2 != undefined) $(actualDiv2).css({ "background-color": 'transparent' })
                    actualDiv1 = div4
                    $(div4).css({ "background-color": 'red' })
                    validation = tabLetters[i]
                    $(button).css({ "background-color": 'green' })
                })
            }
            let p = $('<p>')
            $(p).html(tabLetters[i])
            $(div1).append(div3)
            $(div3).append(div4)
            $(div3).append(p)
        }
        let div2 = $('<div>')
        $(div2).attr('id', 'rightCheckboxCheck');
        $(div).append(div2)
        for (let i = 0; i < 10; i++) {
            let div3 = $("<div>")
            $(div3).addClass('rightCheckboxes')
            let div4 = $('<div>')
            $(div4).addClass('checkbox')
            if (i > 0) {
                $(div3).on('click', () => {
                    if (actualDiv1 != undefined) $(actualDiv1).css({ "background-color": 'transparent' })
                    if (actualDiv2 != undefined) $(actualDiv2).css({ "background-color": 'transparent' })
                    actualDiv2 = div4
                    $(div4).css({ "background-color": 'red' })
                    validation = i
                    $(button).css({ "background-color": 'green' })
                })
            }
            let p = $('<p>')
            $(p).html(i)
            $(div2).append(div3)
            $(div3).append(div4)
            $(div3).append(p)

        }
        rooms.cookies(this.data, this.LiderSite)
    }
    checkboxWaiting(validation) {
        this.LiderSite = "RRCB"
        this.validation = validation
        for (let i = 0; i < 2; i++) {
            let div = $("<div>")
            $(div).addClass("table")
            console.log(typeof validation)
            if (i == 0 && typeof validation == "string") $(div).html("A")
            else if (i == 0 && typeof validation == "number") $(div).html("0")
            if (i == 1) $(div).html(validation)
            $('#phone').append(div)
        }
        var img1 = new Image()
        img1.id = "report"
        img1.src = "../img/report.jpg"
        $("#phone").append(img1)
        $(img1).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "RCB"
            rooms.checkboxEventResult()
        })
        rooms.cookies(this.data, this.LiderSite)
    }
    checkboxResult(data) {
        var array = data.tab
        var validation = data.range
        this.LiderSite = "RRRCB"
        var img2 = new Image()
        img2.src = "../img/OK.jpg"
        $("#phone").append(img2)
        $(img2).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4R"
            console.log(this)
            this.liderChoice()
        })
        let div = $('<div>')
        $(div).attr('id', 'checkboxCheckU');
        $("#phone").append(div)
        let tabLetters = ["A", "B", "C", "D", "E"]
        var actualDiv1 = ''
        var button = $('<button>')
        $("#phone").append(button)
        var x = ""
        if (typeof validation == "string") x = tabLetters.indexOf(validation) + 1
        else x = validation
        for (let i = 0; i < x; i++) {
            var filtered = array.filter((value) => {
                if (typeof validation == "string") return value == tabLetters[i]
                else return value == i
            })
            let div3 = $("<div>")
            $(div3).addClass('leftCheckboxes')
            let div4 = $('<div>')
            $(div4).addClass('checkbox')
            let p = $('<p>')
            if (typeof validation == "string") $(p).html(tabLetters[i] + " : " + filtered.length)
            else $(p).html(i + " : " + filtered.length)
            $(div).append(div3)
            $(div3).append(div4)
            $(div3).append(p)
        }
        rooms.cookies(this.data, this.LiderSite)
    }
}