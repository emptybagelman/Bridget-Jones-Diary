async function loadNotes(id){
    
    const pagePrefix = getPrefix(id);

    const date = document.getElementById(`${pagePrefix}date`);
    const time = document.getElementById(`${pagePrefix}time`);
    const content = document.getElementById(`${pagePrefix}content`);


    const response = await fetch(`http://localhost:3000/entries/${id}`);
    if(response.status === 200){
        const entries = await response.json();
        date.textContent = entries.date;
        time.textContent = entries.time;
        content.textContent = entries.content;
    }   
    if(document.getElementById("ldate").textContent === ''){
        document.getElementById("ledit").style.display = "none";
    }else{
        document.getElementById("ledit").style.display = "block";
    }
    if(document.getElementById("rdate").textContent === ''){
        document.getElementById("redit").style.display = "none";
    }else{
        document.getElementById("redit").style.display = "block";

    } 
}

async function setSession(pfx,id) {

    if(pfx === "l"){
        sessionStorage.setItem("left",id)
    }else{
        sessionStorage.setItem("right",id)
    }
}

async function getEntries(){
    const response = await fetch("http://localhost:3000/entries")
    const entries = await response.json()
    return entries;
}

function getPrefix(id){
    const LorR = id%2 === 0 ? false : true;
    if(LorR){
        return "l";
    }else{
        return "r";
    }
}

function updatePageNumbers(){
    const left = document.querySelector(".pageLeft");
    const right = document.querySelector(".pageRight");

    left.textContent = sessionStorage.getItem("left");
    right.textContent = sessionStorage.getItem("right");
}

function disableEdit(id){
    document.getElementById(`${id}content`).disabled = true;
    document.getElementById(`${id}content`).style.border = "none";
    document.getElementById(`${id}cancelButton`).style.display = "none";
    document.getElementById(`${id}updateButton`).style.display = "none";
    document.getElementById(`${id}edit`).style.display = "block";
}

window.addEventListener("load", async () => {
    const entries = await getEntries()
    setSession("l",entries[0].entry_id)
    setSession("r",entries[1].entry_id)

    loadNotes(sessionStorage.getItem("left"))
    loadNotes(sessionStorage.getItem("right"))
})


document.querySelector(".before").addEventListener("click", () => {
    if(!(sessionStorage.getItem("left") <= 1)){
        sessionStorage.setItem("left",Number(sessionStorage.getItem("left"))-2)
        sessionStorage.setItem("right",Number(sessionStorage.getItem("right"))-2)

        loadNotes(sessionStorage.getItem("left"))
        loadNotes(sessionStorage.getItem("right"))
        updatePageNumbers()
    }else{
        console.log("Can't go any further")
    }

})

document.querySelector(".next").addEventListener("click", () => {
    sessionStorage.setItem("left",Number(sessionStorage.getItem("left"))+2)
    sessionStorage.setItem("right",Number(sessionStorage.getItem("right"))+2)

    loadNotes(sessionStorage.getItem("left"))
    loadNotes(sessionStorage.getItem("right"))
    updatePageNumbers()


})

// LEFT
document.getElementById("lentry_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const textAreaContent = document.getElementById("lcontent").value;

    const options = {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({content:textAreaContent})
    }

    fetch("http://localhost:3000/entries/1",options)
    disableEdit("l")
})


document.getElementById("ledit").addEventListener("click", async (e) => {
    const textarea = document.getElementById("lcontent")
    const leditBtn = document.getElementById("ledit")
    const updateBtn = document.getElementById("lupdateButton")
    const cancelBtn = document.getElementById("lcancelButton")


    if(textarea.disabled){
        textarea.disabled = false;
        textarea.style.border = "black solid 1px"
        leditBtn.style.display = "none";
        updateBtn.style.display = "block";
        cancelBtn.style.display = "block";
    }
})

document.getElementById("lcancelButton").addEventListener("click", async (e) => {
    disableEdit("l")
})

// RIGHT
document.getElementById("rentry_form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const textAreaContent = document.getElementById("rcontent").value;

    const options = {
        method:"PATCH",
        headers: {"Content-Type":"application/json"},
        body:JSON.stringify({content:textAreaContent})
    }

    fetch("http://localhost:3000/entries/2",options)
    disableEdit("r")
})

document.getElementById("redit").addEventListener("click", async (e) => {
    const textarea = document.getElementById("rcontent")
    const reditBtn = document.getElementById("redit")
    const updateBtn = document.getElementById("rupdateButton")
    const cancelBtn = document.getElementById("rcancelButton")


    if(textarea.disabled){
        textarea.disabled = false;
        textarea.style.border = "black solid 1px"
        reditBtn.style.display = "none";
        updateBtn.style.display = "block";
        cancelBtn.style.display = "block";
    }
})

document.getElementById("rcancelButton").addEventListener("click", async (e) => {
    document.getElementById("rcontent").disabled = true;
    document.getElementById("rcontent").style.border = "none";
    document.getElementById("rcancelButton").style.display = "none";
    document.getElementById("rupdateButton").style.display = "none";
    document.getElementById("redit").style.display = "block";
})
