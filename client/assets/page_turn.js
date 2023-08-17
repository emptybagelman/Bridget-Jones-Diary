const book = document.querySelector(".book");

book.addEventListener("click", () => {
    book.classList.toggle("turnPageAnim");
})

book.addEventListener("animationend", () => {
    book.classList.toggle("turnPageAnim");
})