const form = document.querySelector("form")

form.addEventListener("submit", e => {
  e.preventDefault()
  const username = form.querySelector("#username").value
  const password = form.querySelector("#password").value
  const remember = form.querySelector("#remember").checked
  fetch("/user/login", {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({username, password, remember})
  })
  .then(res => {
    return res.json()
  })
  .then(json => {
    if(json.message) {
      const message = document.querySelector(".message")
      message.textContent = json.message
    }
    if(json.username) {
      location.href = "/user"
    }
  })
})