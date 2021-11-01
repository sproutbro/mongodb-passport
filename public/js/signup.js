const form = document.querySelector("form")

form.addEventListener("submit", e => {
  e.preventDefault()
  const username = form.querySelector("#username").value
  const password = form.querySelector("#password").value
  fetch("/user/signup", {
    method: "POST",
    headers: {"Content-Type" : "application/json"},
    body: JSON.stringify({username, password})
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
      form.textContent = ` ${json.username} 가입이 완료되었습니다.`
      const loginLink = document.createElement("a")
      loginLink.textContent = "로그인하러가기"
      loginLink.href = "/login"
      form.appendChild(loginLink)
    }
  })
})

