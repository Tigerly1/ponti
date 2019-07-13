class SiteU {
    constructor() {
    }
    inputCode() {
        $("#phone").empty()
        var inputLen = 0
        var submit = $("<button>")
        $("#phone").append("<p>" + "Wprowadź EC")
        for (let i = 0; i < 4; i++) {
            var input = $("<input  maxlength='1'>")
            $(input).addClass("inputCode")
            $("#phone").append(input)
            if (i == 0) $(input).focus()
            $(input).on('input', () => {
                if (i < 3) Array.from(document.querySelectorAll("input"))[i + 1].focus()
                inputLen = 0
                Array.from(document.querySelectorAll("input")).forEach((element, index) => {
                    inputLen += element.value.length
                    console.log(inputLen)
                    if (inputLen == 4) $(submit).css('background-color', 'green')
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
        $("#phone").empty()
        let img = new Image()
        img.src = "../img/back.jpg"
        $('#phone').append(img)
        $(img).on('click', () => {
            this.inputCode()
        })
        let img1 = new Image()
        img1.src = "../img/TN.jpg"
        $(img1).addClass('middlel')
        $('#phone').append(img1)
        let img2 = new Image()
        img2.src = "../img/lista.jpg"
        $(img2).addClass('middlel')
        $('#phone').append(img2)
        let img3 = new Image()
        img3.src = "../img/liczba.jpg"
        $(img3).addClass('middlel')
        $('#phone').append(img3)
    }
    tNStart() {
        $("#phone").empty()
        let img1 = new Image()
        img1.src = "../img/YES.jpg"
        $('#phone').append(img1)
        var data = ''
        $(img1).on('click', () => {
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
}