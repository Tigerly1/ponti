class SiteL {
    constructor() {
        this.LiderSite = "4L"
        this.data = null
        this.validation = ""
        this.STTab = []
        this.online = 0
    }
    beginning() {
        $("#phone").empty()
        this.LiderSite = "OO"
        var img = new Image()
        img.src = "../img/most.jpg"
        $(img).css("height", "20%")
        $(img).css("width", "100%")
        var img1 = new Image()
        img1.src = "../img/startL.jpg"
        $(img1).css("height", "55%")
        $(img1).css("width", "100%")
        $(img1).css("box-sizing", "border-box")
        $(img1).css("border", "5px solid black")
        $(img1).css("border-radius", "20px")
        $("#phone").append(img)
        $("#phone").append(img1)
        $(img1).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4R"
            console.log(this.data)
            if (this.data == null) rooms.createId()
            else this.liderChoice()
        })
        for (let i = 0; i < 3; i++) {
            let div = $("<div>")
            $(div).css("color", "rgb(0,77,128)")
            $(div).css("font-size", "150%")
            $(div).css("margin-top", "5%")
            $(div).css("text-align", "center")
            if (i == 0) {
                $(div).html("<b>Zarządzanie Operacyjne</b>")
                $(div).css("margin-top", "5%")
            } else if (i == 1) {
                $(div).css("color", "rgb(0,0,0)")
                $(div).html("<b>sme4u.eu</b>")
                $(div).on("click", () => {
                    window.location.href = "https://sme4u.eu"
                })
            } else {
                $(div).html("<b>Konsulting Projekty</b>")
            }
            $("#phone").append(div)
        }
    }
    setData(data) {
        this.data = data
    }
    setSTTab(res) {
        this.STTab = res
    }
    setOnline(online) {
        this.online = online
        if (this.LiderSite == "4R") {
            $("#R4online").html(this.online)
        }
    }
    setSTTabAppend(text) {
        console.log(this.STTab)
        if (this.STTab.length == 0) this.STTab = []
        this.STTab.push(text.txt)
        this.STTab.push(text.date)
        if (this.LiderSite == "4R") {
            $("#R4notifi").html(this.STTab.length / 2)
            $("#R4").on("click", () => {
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
        img.src = "../img/backToMain.jpg"
        $("#phone").append(img)
        $(img).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "OC"
            this.liderChoice()
        })
        var img2 = new Image()
        img2.src = "../img/close.jpg"
        $("#phone").append(img2)
        $(img2).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "OO"
            this.beginning()
            if (this.data.length > 0) {
                document.cookie =
                    "code= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                this.STTab = []
                rooms.removeId(this.data)
                this.data = null
            }
        })
    }
    liderChoice() {
        rooms.onlineDelivery()
        $("#phone").empty()
        this.LiderSite = "4R"
        document.title = this.data
        var img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).css("width", "100%")
        $(img).css("height", "10%")
        $(img).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "OC"
            this.close()
        })
        /*  var img1 = new Image()
         img1.src = '../img/EL.svg'
         img1.id = 'clickAndChoose'
         img1.useMap = "image-map"
         img1.width = '1000'
         img1.height = '1000'
         $("#phone").append(img1)
         var map = $('<map name="image-map">')
         $("#phone").append(map)
         for (let i = 0; i < 3; i++) {
             if (i == 0) var area = $('<area target="_blank" alt="check" id="checkBoxClick" title="check" href="https://www.facebook.com" coords="268,403,133,296,0,202,0,644,2,1331,657,1331,653,702" shape="poly">')
             if (i == 1) var area = $('<area target="_blank" alt="number" title="number" id="numberClick" href="https://www.facebook.com" coords="668,696,674,1331,1329,1329,1327,129" shape="poly">')
             if (i == 2) var area = $('<area target="_blank" id="yNClick" alt="yesNo" title="yesNo" href="https://www.facebook.com" coords="663,681,2,172,2,2,1331,0,1324,118" shape="poly">')
             $(map).append(area)
         } */
        let div1 = $("<div>")
        $(div1).attr("id", "stats")
        $("#phone").append(div1)
        var img2 = new Image()
        img2.src = "../img/online.jpg"
        $(img2).attr("id", "online4R")
        $("#stats").append(img2)
        let div2 = $("<div>")
        $(div2).attr("id", "R4online")
        $(div2).html(this.online)
        $("#stats").append(div2)
        var p = $("<p>")
        $(p).css("font-size", "4vh")
        $(p).css("float", "right")
        $(p).css("margin-right", "10px")
        $(p).html("EC" + this.data)
        $("#stats").append(p)
        let div3 = $("<div>")
        $(div3).attr("id", "mainMenu")
        $("#phone").append(div3)
        $(div3).append(
            '<img src="../img/EL.jpg" name="imgmap" usemap="#m_imgmap" border="0" width="100%" height="100%"><map name="m_imgmap"><area  href = "" coords = "0,197,63,249,158,317,268,397,334,445,373,479,462,416,587,295,740,159,740,1,0,1,0,162" id = "yNClick" shape = "poly" ><area target="" alt="" title="" href="" coords="372,929,0,927,0,202,369,485,371,491" id="checkBoxClick" shape="poly"><area target="" alt="" title="" href="" coords="382,486,383,928,739,928,740,165" id="numberClick" shape="poly"></map>'
        )
        console.log(document.body)
        $("#yNClick").on("click", e => {
            e.preventDefault()
            $("#phone").empty()
            this.LiderSite = "RRYN"
            rooms.yesNoEvent()
            rooms.yesNoEventResult()
        })
        $("#numberClick").on("click", e => {
            e.preventDefault()
            $("#phone").empty()
            this.LiderSite = "R0F"
            this.numberChoose()
        })
        $("#checkBoxClick").on("click", e => {
            e.preventDefault()
            $("#phone").empty()
            this.LiderSite = "RCB"
            this.checkbox()
        })
        let div = $("<div>")
        $(div).attr("id", "R4notifi")
        $(div).html(this.STTab.length / 2)
        $("#phone").append(div)
        var img4 = new Image()
        img4.src = "../img/ST.jpg"
        $(img4).attr("id", "R4")
        $("#phone").append(img4)
        if (this.STTab.length > 0) {
            $(img4).on("click", () => {
                $("#phone").empty()
                this.LiderSite = "RST"
                this.raportRST()
            })
        }
        rooms.cookies(this.data, this.LiderSite)
        rooms.textDelivery()
        $("map").imageMapResize()
    }
    raportRST() {
        $("#phone").empty()
        this.LiderSite = "RST"
        let img = new Image()
        img.src = "../img/OK.jpg"
        $(img).css("height", "15%")
        $("#phone").append(img)
        $(img).on("click", () => {
            this.STTab.shift()
            this.STTab.shift()
            rooms.RSTShift()
            if (this.STTab.length == 0) this.liderChoice()
            else this.raportRST()
        })
        let div2 = $("<div>")
        $(div2).attr("id", "ST2")
        let textarea = $("<textarea maxlength=255 disabled>")
        console.log(this.STTab[0])
        $(textarea).html(this.STTab[0])
        $(textarea).attr("id", "ST3")
        $(div2).append(textarea)
        $("#phone").append(div2)
        $(textarea).focus()
        let div3 = $("<div style='text-align:center'>")
        $(div3).html(this.STTab[1])
        $("#phone").append(div3)
        rooms.cookies(this.data, this.LiderSite)
    }
    tNRaport(data) {
        rooms.yesNoEventResultUpdate()
        this.LiderSite = "RRYN"
        $("#phone").empty()
        for (let i = 0; i < 2; i++) {
            let div = $("<div>")
            $(div).css("position", "relative")
            $(div).css("width", "100%")
            $(div).css("height", "40%")
            $(div).css("display", "inline-block")
            $("#phone").append(div)
            var img = new Image()
            if (i == 0) img.src = "../img/YES.jpg"
            else img.src = "../img/NO.jpg"
            $(img).css("height", "100%")
            $(img).css("width", "50%")
            $(img).css("float", "left")
            $(div).append(img)
            let p = $("<p>")
            if (i == 0) $(p).html(data[0])
            else $(p).html(data[1])
            $(p).css("width", "30%")
            $(p).css("height", "40%")
            $(p).css("border", "2px solid black")
            $(p).css("font-size", "3em")
            $(p).css("margin", "15% 0% 15% 15%")
            $(p).css("float", "left")
            $(div).append(p)
        }
        var img2 = new Image()
        img2.src = "../img/OK.jpg"
        $(img2).css("height", "20%")
        $("#phone").append(img2)
        $(img2).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4R"
            this.liderChoice()
        })
        rooms.cookies(this.data, this.LiderSite)
    }
    YNUpdate(data){
        if(this.LiderSite=="RRYN"){
            document.querySelector("#phone > div:nth-child(1) > p").innerHTML = data[0]
            document.querySelector("#phone > div:nth-child(2) > p").innerHTML = data[1]
        }
    }
    numberChoose() {
        var img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4R"
            this.liderChoice()
        })
        this.LiderSite = "ROF"
        for (let i = 0; i < 2; i++) {
            let input = $('<input type="tel" placeholder="MIN">')
            if (i == 1) input = $('<input  type="tel" placeholder="MAX">')
            /* let text = $('<p>')
                                                                if (i == 0) $(text).html('MIN')
                                                                else $(text).html('MAX')
                                                                div.append(text) */
            $("#phone").append(input)
            $(input).css("margin-top", "15%")
            $(input).css("width", "50%")
            $(input).css("height", "20%")
            $(input).css("font-size", "40px")
            $(input).css("text-align", "center")
            $(input).css("float", "left")
            $(input).css("box-sizing", "border-box")
            $(input).css("display", "inline-block")
        }
        var button = new Image()
        button.src = "../img/OK.jpg"
        $(button).css("height", "15%")
        $("#phone").append(button)
        $(button).on("click", () => {
            let minVal = Number(
                Array.from(document.querySelectorAll("input"))[0].value
            )
            let maxVal = Number(
                Array.from(document.querySelectorAll("input"))[1].value
            )
            if (minVal >= 0 && maxVal > minVal && (minVal && maxVal) != NaN) {
                this.max = maxVal
                this.min = minVal
                console.log("Min: " + minVal)
                console.log("Max: " + maxVal)
                $("#phone").empty()
                rooms.numberEvent(minVal, maxVal)
                rooms.numberWaitingForResult()
            }
        })
        rooms.cookies(this.data, this.LiderSite)
    }
    numberReport(data) {
        this.LiderSite = "RROF"
        for (let i = 0; i < 2; i++) {
            var div = $("<div>")
            if (i == 0) $(div).html(data.min)
            else $(div).html(data.max)
            $(div).addClass("table")
            $("#phone").append(div)
        }

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
        array.sort(function(a, b) {
            return a - b
        })
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
        let Q1 =
            (array[Math.floor((IL - 1) / 4)] +
                array[Math.floor((IL - 1) / 4 + 1)]) /
            2
        console.log(Q1)
        let Q3 =
            (array[Math.floor((IL - 1) / 2 + (IL - 1) / 4)] +
                array[Math.floor((IL - 1) / 2 + (IL - 1) / 4 + 1)]) /
            2
        console.log(Q3)
        if (IL == 1) {
            Q1 = array[0]
            Q3 = array[0]
        }
        if (IL % 2 == 0) {
            var MED =
                (array[Math.floor((IL - 1) / 2)] +
                    array[Math.floor((IL - 1) / 2 + 1)]) /
                2
        } else {
            var MED = array[Math.floor((IL - 1) / 2)]
        }
        console.log(MED)
        for (let i = 0; i < 6; i++) {
            let div = $("<div>")
            $(div).addClass("borderWithNumber")
            if (i == 0) {
                var mainDiv1 = $("<div>")
                $(mainDiv1).attr("id", "firstNumberResult")
                $("#phone").append(mainDiv1)
                $(div).html(MIN)
            }
            if (i == 1) $(div).html(MED)
            if (i == 2) $(div).html(MAX)
            if (i < 3) $(mainDiv1).append(div)
            if (i == 3) {
                var mainDiv2 = $("<div>")
                $(mainDiv2).attr("id", "twondNumberResult")
                $("#phone").append(mainDiv2)
                var img2 = new Image()
                img2.src = "../img/range.jpg"
                $(mainDiv2).css("height", "70%")
                $(img2).css("height", "100%")
                $(mainDiv2).append(img2)
            }
            if (i == 4) {
                var mainDiv3 = $("<div>")
                $(mainDiv3).attr("id", "thirdNumberResult")
                $("#phone").append(mainDiv3)
                $(div).attr("id", "margin15")
                $(div).html(Q1)
            }
            if (i == 5) $(div).html(Q3)
            if (i > 3) $(mainDiv3).append(div)
        }
        let div = $("<div>")
        $("#phone").append(div)
        $(div).html("Średnia: " + AV)
        let div1 = $("<div>")
        $("#phone").append(div1)
        $(div1).html("Ilość odpowiedzi: " + IL)
        rooms.cookies(this.data, this.LiderSite)
    }
    checkbox() {
        var img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).on("click", () => {
            $("#phone").empty()
            this.LiderSite = "4R"
            this.liderChoice()
        })
        $(img).css("height", "15%")
        this.LiderSite = "RCB"
        let div = $("<div>")
        $(div).attr("id", "checkboxCheck")
        $("#phone").append(div)
        let div1 = $("<div>")
        $(div1).attr("id", "leftCheckboxCheck")
        $(div).append(div1)
        var validation = ""
        let tabLetters = ["A", "B", "C", "D", "E"]
        var actualDiv1 = ""
        var actualDiv2 = ""
        var button = new Image()
        button.src = "../img/OK.jpg"
        $(button).css("height", "15%")
        $("#phone").append(button)
        $(button).on("click", () => {
            if (validation > "A" || validation > 0) {
                $("#phone").empty()
                rooms.checkboxEvent(validation)
            }
        })
        for (let i = 0; i < 5; i++) {
            let div3 = $("<div>")
            $(div3).addClass("leftCheckboxes")
            let div4 = $("<div>")
            $(div4).addClass("checkbox")
            if (i > 0) {
                $(div3).on("click", () => {
                    if (actualDiv1 != undefined)
                        $(actualDiv1).css({ "background-color": "transparent" })
                    if (actualDiv2 != undefined)
                        $(actualDiv2).css({ "background-color": "transparent" })
                    actualDiv1 = div4
                    $(div4).css({ "background-color": "red" })
                    validation = tabLetters[i]
                })
            }
            let p = $("<p>")
            $(p).html(tabLetters[i])
            $(p).css({ float: "right" })
            $(p).css({ "margin-right": "50%" })
            $(div1).append(div3)
            $(div3).append(p)
            $(div3).append(div4)
        }
        let div2 = $("<div>")
        $(div2).attr("id", "rightCheckboxCheck")
        $(div).append(div2)
        for (let i = 0; i < 10; i++) {
            let div3 = $("<div>")
            $(div3).addClass("rightCheckboxes")
            let div4 = $("<div>")
            $(div4).addClass("checkbox")
            if (i > 0) {
                $(div3).on("click", () => {
                    if (actualDiv1 != undefined)
                        $(actualDiv1).css({ "background-color": "transparent" })
                    if (actualDiv2 != undefined)
                        $(actualDiv2).css({ "background-color": "transparent" })
                    actualDiv2 = div4
                    $(div4).css({ "background-color": "red" })
                    validation = i
                })
            }
            let p = $("<p>")
            $(p).css({ float: "right" })
            $(p).css({ "margin-right": "50%" })
            $(p).html(i)
            $(div2).append(div3)
            $(div3).append(div4)
            $(div3).append(p)
        }
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
        let div = $("<div>")
        $(div).attr("id", "checkboxCheckU")
        $("#phone").append(div)
        let tabLetters = ["A", "B", "C", "D", "E"]
        var x = ""
        if (typeof validation == "string")
            x = tabLetters.indexOf(validation) + 1
        else x = validation + 1
        for (let i = 0; i < x; i++) {
            var filtered = array.filter(value => {
                if (typeof validation == "string") return value == tabLetters[i]
                else return value == i
            })
            let div3 = $("<div>")
            $(div3).addClass("leftCheckboxes")
            let p = $("<p>")
            if (typeof validation == "string")
                $(p).html(tabLetters[i] + " : " + filtered.length)
            else $(p).html(i + " : " + filtered.length)
            $(p).css({ float: "right" })
            $(p).css({ "margin-right": "50%" })
            $(div).append(div3)
            $(div3).append(p)
        }
        rooms.cookies(this.data, this.LiderSite)
    }
}
