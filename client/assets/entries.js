async function loadNotes(id){
    const date = document.getElementById("date");
    const time = document.getElementById("time");
    const content = document.getElementById("content");

    const response = await fetch(`http://localhost:3000/entries/${id}`);
    if(response.status === 200){
        const entries = await response.json();
        date.textContent = entries.date;
        time.textContent = entries.time;
        content.textContent = entries.content;
    }
}

async function getEntries(){
    const response = await fetch("http://localhost:3000/entries")
    const entries = await response.json()
    return entries;
}

document.getElementById("entry_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const textarea = document.getElementById("content")

    if(textarea.disabled){
        textarea.disabled = false;
        textarea.style.border = "black solid 1px"
    }

    const options = {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify()
    }

    const entries = getEntries();

    const res = await fetch(`http://localhost:3000/entries/1`)

})

loadNotes(1)