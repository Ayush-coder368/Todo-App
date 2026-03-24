const todo = document.querySelector("#todo")
const progress = document.querySelector("#progress")
const done = document.querySelector("#done")
const tasks = document.querySelectorAll(".task")
let taskData = {}
let dragElement = null

function AddTask(title, desc, column) {
    const div = document.createElement("div");
    div.classList.add('task')
    div.setAttribute("draggable", 'true')
    div.innerHTML = `<h2>${title}</h2>
                    <p>${desc}</p>
                    <button>Delete</button>`
    column.appendChild(div)
    div.addEventListener("drag", () => {
        dragElement = div
    })
    const deleteButton = div.querySelector("button")
    deleteButton.addEventListener("click",()=>{
        div.remove();
        updateTaskCount();
    })
    return div;
}
function updateTaskCount(){
    const cols = [todo, progress, done];
    for (const col of cols) {
        const tasks = col.querySelectorAll(".task");

        taskData[col.id] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })
        localStorage.setItem("tasks", JSON.stringify(taskData));
        const count = col.querySelector(".right");
        count.innerText = tasks.length;
    }
}


if (localStorage.getItem("tasks")) {
    const data = JSON.parse(localStorage.getItem("tasks"));
    for (const col in data) {
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task => {
            AddTask(task.title,task.desc,column)
        })
    }
    updateTaskCount()
}

tasks.forEach(task => {
    task.addEventListener("drag", (e) => {
        dragElement = task
    })
})
function addDragEvents(column) {
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over")
    })
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over")
    })
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    })
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over")
        updateTaskCount();
    })
}
addDragEvents(todo)
addDragEvents(progress)
addDragEvents(done)

const toggleModal = document.querySelector(".toggle-modal");
const modal = document.querySelector(".modal")
const modalBg = document.querySelector(".modal .bg")
const addTask = document.querySelector("#add-task")


toggleModal.addEventListener("click", () => {
    modal.classList.toggle("active")
})
modalBg.addEventListener("click", () => {
    modal.classList.remove("active")
})

addTask.addEventListener("click", () => {
    const taskTitle = document.querySelector("#task-title-input").value;
    const taskdesc = document.querySelector("#task-desc-input").value;
    AddTask(taskTitle,taskdesc,todo)
    updateTaskCount();
    modal.classList.remove("active")
})






// progress.addEventListener("dragenter",()=>{
//     progress.classList.add("hover-over")
// })
// progress.addEventListener("dragleave",()=>{
//     progress.classList.remove("hover-over")
// })
// done.addEventListener("dragenter",()=>{
//     done.classList.add("hover-over")
// })
// done.addEventListener("dragleave",()=>{
//     done.classList.remove("hover-over")
// })
