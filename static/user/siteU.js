class SiteU {
    constructor() {
    }
    inputCode() {
        $("#phone").empty()
        var inputLen = 0
        var submit = $("<button>")
        var p = $("<p>")
        $(p).html("Wprowadź EC")
        $(p).attr('id', 'pEEC')
        $("#phone").append(p)
        for (let i = 0; i < 4; i++) {
            var input = $("<input  maxlength='1'>")
            $(input).addClass("inputCodeEEC")
            $("#phone").append(input)
            if (i == 0) $(input).focus()
            $(input).on('input', () => {
                inputLen = 0
                var a = 0
                Array.from(document.querySelectorAll("input")).forEach((element, index) => {
                    if (element.value == "" && a == 0) {
                        element.focus()
                        a++
                    }
                    inputLen += element.value.length
                    console.log(inputLen)
                    if (inputLen == 4) {
                        $(submit).css('background-color', 'green')
                        element.blur()
                    }
                    if (inputLen < 4) $(submit).css('background-color', 'red')
                })
            })
        }
        $("#phone").append(submit)
        $(submit).text("Join")
        $(submit).css('background-color', 'red')
        $(submit).on('click', () => {
            if (inputLen == 4) {
                var eCode = ""
                Array.from(document.querySelectorAll("input")).forEach((element, index) => {
                    eCode += String(element.value)
                    element.value = ""
                })
                console.log(eCode)
                roomsU.joinRoom(eCode)
            }
        })
    }
    userScreen() {
        roomsU.tN()
        roomsU.numberChoose()
        roomsU.checkboxChoose()
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $('#phone').append(img)
        $(img).on('click', () => {
            roomsU.leave()
            this.inputCode()
        })

        let img4 = new Image()
        img4.src = "../img/ST.jpg"
        $(img4).addClass('ST4A')
        $('#phone').append(img4)
        $(img4).on('click', () => {
            this.text()
        })
    }
    text() {
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $('#phone').append(img)
        $(img).on('click', () => {
            this.userScreen()
        })
        let div1 = $("<div>")
        $(div1).attr('id', 'ST1')
        let div2 = $("<div>")
        $(div2).attr('id', 'ST2')
        let textarea = $("<textarea maxlength=255>")
        $(textarea).attr('id', 'ST3')
        $(div2).append(textarea)
        $(div1).append(div2)
        $("#phone").append(div1)
        $(textarea).focus()
        let button = $('<button>')
        $(button).attr('id', 'ST4')
        $("#phone").append(button)
        $(button).on('click', () => {
            var x = document.querySelector("textarea").value
            if (x.length > 0) {
                roomsU.textSent(x)
                this.userScreen()
            }
        })
    }
    tNStart() {
        console.log('tNSTART')
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $('#phone').append(img)
        $(img).on('click', () => {
            this.userScreen()
        })
        let img1 = new Image()
        img1.src = "../img/YES.jpg"
        $('#phone').append(img1)
        var data = ''
        $(img1).on('click', () => {
            console.log("1")
            data = "T"
            roomsU.tNResult(data)
        })
        let img2 = new Image()
        img2.src = "../img/NO.jpg"
        $('#phone').append(img2)
        $(img2).on('click', () => {
            $(img2).off('click')
            data = "N"
            roomsU.tNResult(data)
        })
    }
    numberChooseStart(data) {
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $('#phone').append(img)
        $(img).on('click', () => {
            this.userScreen()
        })
        for (let i = 0; i < 4; i++) {
            if (i < 3) var div = $('<div>')
            if (i < 2) $(div).addClass('table')
            let minVal = data.min
            let maxVal = data.max
            if (i == 0) $(div).html(minVal)
            else if (i == 1) $(div).html(maxVal)
            else if (i == 2) {
                var input = $('<input>')
                div.append(input)
            }
            else {
                let button = $('<button>')
                $(button).addClass('btn')
                div.append(button)
                button.on('click', () => {
                    let inputVal = parseInt(document.querySelector('input').value)
                    console.log(inputVal)
                    console.log(minVal)
                    console.log(maxVal)
                    if (inputVal >= parseInt(minVal) && inputVal <= parseInt(maxVal)) {
                        console.log('dziala')
                        roomsU.numberChoosed(inputVal)
                        this.userScreen()
                    }
                    else console.log('nie działa')
                })
                $('#phone').append(button)
            }
            if (i < 3) $('#phone').append(div)

        }

    }
    checkboxChooseStart(data) {
        $("#phone").empty()
        let div = $('<div>')
        $(div).attr('id', 'checkboxCheckU');
        $("#phone").append(div)
        var validation = ""
        let tabLetters = ["A", "B", "C", "D", "E"]
        var actualDiv1 = ''
        var button = $('<button>')
        $("#phone").append(button)
        $(button).on('click', () => {
            if (validation != "") {
                $("#phone").empty()
                roomsU.checkboxChoosed(validation)
                this.userScreen()
            }
        })
        var x = ""
        if (typeof data == "string") x = tabLetters.indexOf(data) + 1
        else x = data
        for (let i = 0; i < x; i++) {
            let div3 = $("<div>")
            $(div3).addClass('leftCheckboxes')
            let div4 = $('<div>')
            $(div4).addClass('checkbox')
            $(div3).on('click', () => {
                if (actualDiv1 != undefined) $(actualDiv1).css({ "background-color": 'transparent' })
                actualDiv1 = div4
                $(div4).css({ "background-color": 'red' })
                if (typeof data == "string") validation = tabLetters[i]
                else validation = i
                $(button).css({ "background-color": 'green' })
            })
            let p = $('<p>')
            if (typeof data == "string") $(p).html(tabLetters[i])
            else $(p).html(i)
            $(div).append(div3)
            $(div3).append(div4)
            $(div3).append(p)
        }
    }
}