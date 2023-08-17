window.addEventListener("load", () => {
    const currDate = document.getElementById("date")

    const date = new Date()

    currDate.textContent = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
})

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const textAreaContent = document.getElementById("add_content");
    const now = new Date();

    const date = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`
    const time = `${now.getHours()}:${now.getMinutes()}`

    const form = new FormData(e.target);

    const options = {
        method:"POST",
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body:JSON.stringify({date:date,time:time,content:textAreaContent})
    }

    const response = await fetch("http://localhost:3000/entries",options)
    const data = await response.json();

    if(response.status == 200){
        textAreaContent.textContent = '';
        textAreaContent.placeholder = "Submitted";
    }
    

})