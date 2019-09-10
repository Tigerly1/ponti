class Rooms {
  constructor() {
    var host = "ponti";
    this.Lider = this.io(host);
    if (document.cookie != "")
      if (document.cookie.split("=")[1].split("")[4] == "L")
        this.createRoom(document.cookie.substring(5, 9));
      else siteL.beginning();
    else siteL.beginning();
    this.array = [];
  }
  io(host) {
    if (host == "localhost") return io.connect("http://localhost:3000/L");
    else if (host == "ponti")
      return io.connect("https://pontiapk.herokuapp.com/L");
  }
  cookies(data, liderChoice) {
    var d = new Date();
    d.setTime(d.getTime() + 30 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      "code=" + data + "L" + liderChoice + ";" + expires + ";path=/";
    console.log(document.cookie);
  }
  createId() {
    this.Lider.emit("EC");
    this.Lider.on("connected", data => {
      siteL.setData(data);
      this.Lider.off("connected");
      console.log("xd");
      this.createRoom(data);
    });
  }

  removeId(data) {
    console.log(data);
    document.cookie = "code= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    this.Lider.emit("ECR", data);
  }
  createRoom(data) {
    this.Lider.emit("joinRoom", data);
    this.Lider.on("success", res => {
      siteL.setSTTab(res.text);
      siteL.setData(data);
      siteL.setOnline(res.online);
      if (document.cookie != "") {
        if (document.cookie.split("=")[1].split("")[4] == "L") {
          if (document.cookie.substring(10) == "4R") siteL.liderChoice();
          else if (document.cookie.substring(10) == "RST") siteL.raportRST();
          else if (document.cookie.substring(10) == "RYN") siteL.tNChoice();
          else if (document.cookie.substring(10) == "RRYN")
            this.yesNoEventResult();
          else if (document.cookie.substring(10) == "ROF") siteL.numberChoose();
          else if (document.cookie.substring(10) == "RROF")
            this.numberWaitingForResult();
          else if (document.cookie.substring(10) == "RRORF")
            this.numberEventResult();
          else if (document.cookie.substring(10) == "RCB") siteL.checkbox();
          else if (document.cookie.substring(10) == "RRCB")
            this.checkboxEventAwaiting();
          else if (document.cookie.substring(10) == "RRRCB")
            this.checkboxEventResult();
        } else siteL.liderChoice();
      } else siteL.liderChoice();
      this.Lider.off("success");
    });
    this.Lider.on("err", msg => {
      this.Lider.off("err");
      console.log(msg);
    });
  }
  onlineDelivery() {
    this.Lider.off("onlineDelivery");
    this.Lider.on("onlineDelivery", data => {
      siteL.setOnline(data);
    });
  }
  textDelivery() {
    this.Lider.off("textDelivered");
    this.Lider.on("textDelivered", text => {
      siteL.setSTTabAppend(text);
    });
  }
  RSTShift() {
    this.Lider.emit("RSTShift");
  }
  yesNoEvent() {
    this.Lider.emit("yesOrNo", null);
  }
  yesNoEventResult() {
    console.log("yeSREPORT");
    this.Lider.emit("yesReport");
    this.Lider.on("yesReported", data => {
      siteL.tNRaport(data);
    });
  }
  numberEvent(minVal, maxVal) {
    this.Lider.emit("numberEvent", { min: minVal, max: maxVal });
  }
  numberWaitingForResult() {
    this.Lider.emit("numberEventWaiting");
    this.Lider.off("numberEventAwaiting");
    this.Lider.on("numberEventAwaiting", data => {
      siteL.numberReport(data);
    });
  }
  numberEventResult() {
    this.Lider.emit("numberEventReport");
    this.Lider.off("numberEventReported");
    this.Lider.on("numberEventReported", data => {
      siteL.numberResult(data);
    });
  }
  checkboxEvent(validation) {
    this.Lider.emit("checkboxEvent", validation);
  }
  checkboxEventAwaiting() {
    this.Lider.emit("checkboxEventWaiting");
    this.Lider.off("checkboxEventAwaiting");
    this.Lider.on("checkboxEventAwaiting", data => {
      siteL.checkboxWaiting(data);
    });
  }
  checkboxEventResult() {
    this.Lider.emit("checkboxEventReport");
    this.Lider.off("checkboxEventReported");
    this.Lider.on("checkboxEventReported", data => {
      siteL.checkboxResult(data);
    });
  }
  online() {
    this.Lider.emit("getOnline");
    this.Lider.off("onGetOnline");
    this.Lider.on("onGetOnline", data => {
      console.log(data);
      siteL.setOnline(data);
      this.numberEventResult();
    });
  }
  updateOnline() {}
}
