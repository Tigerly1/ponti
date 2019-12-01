class SiteU {
    constructor() { }
    inputCode() {
        $("#phone").empty()
        var inputLen = 0
        var p = $("<p>")
        $(p).html("Wprowadź EC")
        $(p).attr("id", "pEEC")
        var div = $("<div>")
        $(div).attr("id", "inputer")
        $("#phone").append(p)
        $("#phone").append(div)
        for (let i = 0; i < 4; i++) {
            var input = $("<input  type='tel' maxlength='1'>")
            $(input).addClass("inputCodeEEC")
            $(div).append(input)
            if (i == 0) $(input).focus()
            $(input).on("input", () => {
                inputLen = 0
                var a = 0
                Array.from(document.querySelectorAll("input")).forEach(
                    (element, index) => {
                        if (element.value == "" && a == 0) {
                            element.focus()
                            a++
                        }
                        inputLen += element.value.length
                        console.log(inputLen)
                        if (inputLen == 4) {
                            var eCode = ""
                            Array.from(
                                document.querySelectorAll("input")
                            ).forEach((element, index) => {
                                eCode += String(element.value)
                                element.value = ""
                            })
                            console.log(eCode)
                            roomsU.joinRoom(eCode)
                        }
                    }
                )
            })
        }
        let div1 = $("<div>")
        $(div1).attr("id", "adV")
        $(div1).css("margin-top", "35%")
        $("#phone").append(div1)
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
            $("#adV").append(div)
        }
    }
    userScreen() {
        roomsU.tN()
        roomsU.numberChoose()
        roomsU.checkboxChoose()
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).on("click", () => {
            roomsU.leave()
            this.inputCode()
        })

        let img4 = new Image()
        img4.src = "../img/ST.jpg"
        $(img4).addClass("ST4A")
        $("#phone").append(img4)
        $(img4).on("click", () => {
            this.text()
        })
    }
    text() {
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).css('height', '15%')
        $(img).on("click", () => {
            this.userScreen()
        })
        let div2 = $("<div>")
        $(div2).attr("id", "ST2")
        let textarea = $("<textarea maxlength=255>")
        $(textarea).attr("id", "ST3")
        $(div2).append(textarea)
        $("#phone").append(div2)
        $(textarea).focus()
        var button = new Image()
        button.src = "../img/OK.jpg"
        $(button).css("height", "15%")
        $("#phone").append(button)
        $(button).on("click", () => {
            var x = document.querySelector("textarea").value
            if (x.length > 0) {
                roomsU.textSent(x)
                this.userScreen()
            }
        })
    }
    tNStart() {
        console.log("tNSTART")
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).on("click", () => {
            this.userScreen()
        })
        let img1 = new Image()
        img1.src = "../img/YES.jpg"
        $("#phone").append(img1)
        var data = ""
        $(img1).css("width", "50%")
        $(img1).on("click", () => {
            console.log("1")
            data = "T"
            roomsU.tNResult(data)
        })
        let img2 = new Image()
        $(img2).css("width", "50%")
        img2.src = "../img/NO.jpg"
        $("#phone").append(img2)
        $(img2).on("click", () => {
            $(img2).off("click")
            data = "N"
            roomsU.tNResult(data)
        })
    }
    numberChooseStart(data) {
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $("#phone").append(img)
        $(img).on("click", () => {
            this.userScreen()
        })
        for (let i = 0; i < 4; i++) {
            if (i < 2) {
                var div = $("<div>")
                $(div).addClass("table")
            }
            $(div).css("margin-top", "4%")
            $(div).css("width", "40%")
            $(div).css("height", "20%")
            $(div).css("font-size", "4em")
            $(div).css("text-align", "center")
            let minVal = data.min
            let maxVal = data.max
            if (i == 0) $(div).html(minVal)
            else if (i == 1) $(div).html(maxVal)
            else if (i == 2) {
                var input = $('<input type="tel">')
                $(input).css("margin", "10% 30% 0% 30%")
                $(input).css("width", "40%")
                $(input).css("height", "10%")
                $(input).css("font-size", "2em")
                $(input).css("text-align", "center")
                $("#phone").append(input)
            } else {
                let button = $("<button>")
                $(button).html("Continue")
                $(button).addClass("btn-grad")
                div.append(button)
                button.on("click", () => {
                    let inputVal = parseInt(
                        document.querySelector("input").value
                    )
                    console.log(inputVal)
                    console.log(minVal)
                    console.log(maxVal)
                    if (
                        inputVal >= parseInt(minVal) &&
                        inputVal <= parseInt(maxVal)
                    ) {
                        console.log("dziala")
                        roomsU.numberChoosed(inputVal)
                        this.userScreen()
                    } else console.log("nie działa")
                })
                $("#phone").append(button)
            }
            if (i < 2) $("#phone").append(div)
        }
    }
    checkboxChooseStart(data) {
        $("#phone").empty()
        let div = $("<div>")
        $(div).attr("id", "checkboxCheckU")
        $("#phone").append(div)
        var validation = ""
        let tabLetters = ["A", "B", "C", "D", "E"]
        var actualDiv1 = ""
        var button = new Image()
        button.src = "../img/OK.jpg"
        $(button).css("height", "15%")
        $("#phone").append(button)
        $(button).on("click", () => {
            if (validation != "") {
                $("#phone").empty()
                roomsU.checkboxChoosed(validation)
                this.userScreen()
            }
        })
        var x = ""
        if (typeof data == "string") x = tabLetters.indexOf(data)
        else x = data
        for (let i = 0; i <= x; i++) {
            let div3 = $("<div>")
            $(div3).addClass("leftCheckboxes")
            let div4 = $("<div>")
            $(div4).addClass("checkbox")
            $(div3).on("click", () => {
                if (actualDiv1 != undefined)
                    $(actualDiv1).css({ "background-color": "transparent" })
                actualDiv1 = div4
                $(div4).css({ "background-color": "red" })
                if (typeof data == "string") validation = tabLetters[i]
                else validation = i
            })
            let p = $("<p>")
            if (typeof data == "string") $(p).html(tabLetters[i])
            else {
                $(p).html(i)

            }
            $(p).css({ 'float': 'right' })
            $(p).css({ 'margin-right': '50%' })
            $(div).append(div3)
            $(div3).append(p)
            $(div3).append(div4)
        }
    }
}
