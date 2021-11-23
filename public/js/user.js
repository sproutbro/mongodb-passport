document.body.addEventListener("click", e => {
    if(e.target.dataset.id) {
        console.log(e.target.dataset.id)
    }
})