let input = document.getElementById("todoInput");
let list = document.getElementById("noofList");
let All = document.getElementById('all');
let Active = document.getElementById('active');
let Completed = document.getElementById('complete');
let Clear = document.getElementById('clear');
let add = document.getElementById("add");
let NoOfTodos = document.querySelector("#first");
let buttons = document.getElementById("buttons");
let radio = document.querySelector("#inputRadio");
let Mood = document.querySelector("#iconMoon");

let divider = document.querySelector("#divider");

let todos = [];
let allTodos = [];
let complete = [];


radio.addEventListener('click', () => {
    todos.push(input.value);
    allTodos.push(input.value);
    localStorage.setItem('allTodos',JSON.stringify(allTodos))
    localStorage.setItem('todos',JSON.stringify(allTodos))

    input.classList.remove("todoInput");
    addTodo(input.value);
    input.value = '';
    radio.checked = false;
})

function addTodo(todo){
    let para = document.createElement('p')
    para.innerText = todo
    para.id = "todoPara";
    let div = document.createElement("div");
    divider.appendChild(div)
    
    createRadiobutton();
    div.appendChild(para);
    let line = document.createElement('hr');
    div.appendChild(line);

    if(todo === ''){
        let lastElement = divider.lastChild;
        lastElement.remove();
        input.classList.add("todoInput");
        todos.pop();
    }
    let dividerHeight = divider.offsetHeight;
    
    if(dividerHeight > 350){
        list.classList.add('noofList');
    }
    else{
        list.classList.remove('noofList')
    }

    let count = divider.childElementCount;
    let todosCount = '';
    todosCount = `<p>Count Of Todos : ${count}</p>`;
    NoOfTodos.innerHTML = todosCount;

    var radioBtn;
function createRadiobutton(){
    radioBtn = document.createElement("i");
    div.appendChild(radioBtn);
    radioBtn.setAttribute('class','fa-regular fa-circle fa-lg');

    radioBtn.addEventListener('click', () => {
        var index;
        radioBtn.setAttribute("id","nowCompleted")
        let nextPara = radioBtn.nextSibling.innerHTML;
        complete.push(nextPara);
        localStorage.setItem("complete",JSON.stringify(complete));
        index = todos.indexOf(nextPara);
        if(index >= 0){
            todos.splice(index,1);
        }
        localStorage.setItem("todos",JSON.stringify(todos));

        let parent = radioBtn.parentElement;
        para.classList.add("completedNow");


        let dividerHeight = divider.offsetHeight;
        if(dividerHeight <= 350){
            list.classList.remove('noofList');
        }
        let count = todos.length;
        let todosCount = '';
        todosCount = `<p>${count} items left</p>`;
        NoOfTodos.innerHTML = todosCount;
    })
}
}
All.addEventListener('click',(e) => {
    e.preventDefault();
    divider.innerHTML = ''; 
    todos.map((elements) => {
        addTodo(elements);
    })
    complete.map((elements) => {
        addTodo(elements);
    })
    input.classList.remove("todoInput");

    let count = divider.childElementCount;
    let todosCount = '';
    todosCount = `<p>All Todos : ${count}</p>`;
    NoOfTodos.innerHTML = todosCount;
})

Active.addEventListener("click", (e) => {
    e.preventDefault();
    while(divider.firstChild){
        divider.removeChild(divider.firstChild) 
    }
    todos.map((elements) => {
        addTodo(elements);
    })
    input.classList.remove("todoInput");
    let count = divider.childElementCount;
    let todosCount = '';
    todosCount = `<p>Active Todos : ${count}</p>`;
    NoOfTodos.innerHTML = todosCount;
})
Completed.addEventListener("click", () => {
    
    divider.innerHTML = '';
    complete.map((elements) => {
        addTodo(elements);
    })
    
    input.classList.remove("todoInput");
    let count = divider.childElementCount;
    let todosCount = '';
    todosCount = `<p>Completed Todos : ${count}</p>`;
    NoOfTodos.innerHTML = todosCount;

})
Clear.addEventListener('click',(e) => {
    e.preventDefault();
    removeTodo(todos);
    removeTodo(allTodos);
    removeTodo(complete);
    divider.innerHTML = ""

    let todosCount = '';
    todosCount = `<p>Count Of Todos : 0</p>`;
    NoOfTodos.innerHTML = todosCount;

    localStorage.setItem("allTodos",JSON.stringify(allTodos));
    localStorage.setItem("todos",JSON.stringify(todos));
    localStorage.setItem("complete",JSON.stringify(complete));

})
function removeTodo(todo){
    while(todo.length = 0){
        todo.shift();
    }
}
Mood.addEventListener('click',() => {
    dayMood();
    Mood.addEventListener('click', ()=>{
        nightMood()
    })
})
function dayMood(){
    document.getElementById('inputRadio').classList.add("dayInputRadio");
    document.getElementById('body').classList.add("dayBody");
    document.getElementById('todo').classList.add("dayTodo");
    input.classList.add("dayTodoInput");
    buttons.classList.add("dayButtons")
    document.getElementById('lowerLayer').classList.add("dayLowerLayer");
    document.getElementById('todo').classList.add("dayMood");
    document.getElementById('noofList').classList.add("dayNoofList");
    document.getElementById('lastLine').classList.add("dayLastLine");
    
    Mood.src = 'Media/icon-moon.svg';
}
function nightMood(){
    document.getElementById('inputRadio').classList.remove("dayInputRadio");
    document.getElementById('body').classList.remove("dayBody");
    document.getElementById('todo').classList.remove("dayTodo");
    input.classList.remove("dayTodoInput");
    buttons.classList.remove("dayButtons")
    document.getElementById('lowerLayer').classList.remove("dayLowerLayer");
    document.getElementById('todo').classList.remove("dayMood");
    document.getElementById('noofList').classList.remove("dayNoofList");
    document.getElementById('lastLine').classList.remove("dayLastLine");

    Mood.src = 'Media/icon-sun.svg';
}