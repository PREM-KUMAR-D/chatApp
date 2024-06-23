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
    const token = localStorage.getItem("token");
  
    const messages = await axios.get("http://localhost:3000/message/get-messages", { headers: { Authorization: token } });
  
    const msgcontainer = document.getElementById("msg");
    const messagesData= messages.data.data;
  
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


});
