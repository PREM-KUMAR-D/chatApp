const sendmsg = document.getElementById("sdmsg");
sendmsg.addEventListener("click", async (e) => {
  e.preventDefault();
  const message = document.getElementById("msginput").value;
  const token = localStorage.getItem("token");
  let msgdetails = {
    token: token,
    message: message,
  };


  await axios.post("http://localhost:3000/message/send-message", msgdetails, {
    headers: { Authorization: token }
  });

  document.getElementById("msginput").value = "";

});



window.addEventListener("DOMContentLoaded", async () => {


  try {
     await displayMsgs();

  } catch (error) {
    console.log(error);
  }


});


async function displayMsgs(){
  try {
    const token = localStorage.getItem("token");
    const lsdata = JSON.parse(localStorage.getItem("messages"));
    let lastid;
    if (lsdata === null) {
      lastid = 0;
    } else {
      lastid = lsdata[lsdata.length - 1].msgId;
    }

    let mergeMsgs = [];


    const messages = await axios.get(`http://localhost:3000/message/get-messages?id=${lastid}`, { headers: { Authorization: token } });
    const messagesData = messages.data.data;

    if (messagesData.length > 1) {
      if (lsdata) {
        mergeMsgs = lsdata.concat(messagesData);

      } else {
        mergeMsgs = messagesData;
      }

      if(mergeMsgs.length > 1000){
        let remove = mergeMsgs.length - 1000;
        for(let i= 0 ; i< remove ;i++){
          mergeMsgs.shift();
        }
      }


    } else {
      mergeMsgs = JSON.parse(localStorage.getItem("messages"));
    }

    localStorage.setItem("messages",JSON.stringify(mergeMsgs));



    const msgcontainer = document.getElementById("msg");
    // msgcontainer.innerHTML = "";

    for (let i = 0; i < messagesData.length; i++) {
      const msgdiv = document.createElement("pre");
      msgdiv.classList.add("msgdiv")
      const name = document.createElement("div");
      name.innerHTML = `<h6>${messagesData[i].username}:</h6>`;
      msgdiv.appendChild(name);
      const msg = document.createElement("div");
      msg.innerHTML = `<h6>${messagesData[i].message}</h6>`;
      msgdiv.appendChild(msg);
      msgcontainer.appendChild(msgdiv);
    }

  } catch (error) {
    console.log(error);
  }
}

setInterval(displaymsgs, 5000)
