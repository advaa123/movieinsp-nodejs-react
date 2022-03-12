const socket = io();
const form = document.getElementById("form");
const input = document.getElementById("input");
const feedback = document.getElementById("feedback");
const messages = document.getElementById("messages");

const addMessage = (user, msg) => {
  let item = document.createElement("li");
  if (user === "Server") {
    item.classList.add("server");
  }

  let userName = document.createElement("div");
  const message = document.createElement("div");
  userName.style.fontWeight = "bold";
  userName.textContent = `${user}: `;
  message.textContent = msg;
  item.appendChild(userName);
  item.appendChild(message);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    socket.emit("user chat message", input.value);
    input.value = "";
  }
});

socket.on("user chat message", (msg) => {
  addMessage("You", msg);
  if (msg === "clear") {
    messages.innerHTML = "";
  }
});

socket.on("server chat message", function (msg) {
  addMessage("Server", msg);
});

socket.on("server typing", (msg) => {
  if (msg === "typing") {
    feedback.innerHTML = "Server typing...";
  } else {
    feedback.innerHTML = "";
  }
});

socket.on("commands", (data) => {
  let item = document.createElement("li");
  data.forEach((command, index) => {
    const link = document.createElement("button");
    link.setAttribute("id", index);
    link.onclick = () => {
      socket.emit("user chat message", command);
    };

    link.innerText = command;
    item.appendChild(link);
  });
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});