const data = localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList')) : {toDo:[]};
const toDoList = document.getElementsByClassName("todo-list")[0];
const addButton = document.getElementById('add-btn');
const addInput = document.getElementById('add-input');
const editPath = 'M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z'
const removePath = 'M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z'
const confirmIcon = 'M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z'
var counter = data && data.toDo.length > 1 ? data.toDo[data.toDo.length - 1]['id'] : 0; 

addButton.addEventListener('click', addToDo);
addInput.addEventListener('keydown', (e) => {
    if (e.key == 'Enter')
        addToDo();
});

init()

function init(){
    if (!data.toDo.length > 0){
        return renderToDo(null);
    }
    
    for (item of data.toDo){
        renderToDo(item);
    }
}

function renderToDo(item){    
    let newToDo = document.createElement('li');
    let toDoLabel = document.createElement('span');
    let toDoCheckbox = document.createElement('input')
    let labelDiv = document.createElement('div');
    let actionsDiv = document.createElement('div');
    let edit = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let remove = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let editIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    let removeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    editIcon.setAttribute('d', editPath);
    edit.setAttribute('viewBox', '0 0 512 512');
    edit.append(editIcon);
    edit.setAttribute('class', 'btn-edit');
    edit.addEventListener('click', editToDo)
    
    removeIcon.setAttribute('d', removePath);
    remove.setAttribute('viewBox', '0 0 512 512');
    remove.append(removeIcon);
    remove.setAttribute('class', 'btn-remove');
    remove.addEventListener('click', removeToDo);
    
    actionsDiv.append(edit);
    actionsDiv.append(remove);
    actionsDiv.setAttribute('class', 'actions');

    toDoCheckbox.setAttribute('type', 'checkbox');
    toDoCheckbox.addEventListener('click', markAsCompleted);
    if (item.checked){
        toDoLabel.setAttribute('class', 'checked');
        toDoCheckbox.checked = true;
    }
    
    console.log(item)
    toDoLabel.textContent = item.value;

    labelDiv.append(toDoCheckbox);
    labelDiv.append(toDoLabel);
    labelDiv.setAttribute('class', 'label')

    newToDo.append(labelDiv);
    newToDo.append(actionsDiv);
    newToDo.setAttribute('class', 'toDo')
    newToDo.setAttribute('data-id', item.id)
    toDoList.append(newToDo);
}

function updateData(){
    localStorage.setItem('toDoList', JSON.stringify(data));
}

function addToDo(){
    if (addInput.value == '' || /^ /g.test(addInput.value))    
        return null;
    
    counter += 1;
    let newToDo = {id: counter, value: addInput.value, checked: false };
    data.toDo.push(newToDo);
    addInput.value = '';
    renderToDo(newToDo)
    updateData()
}

function removeToDo(){
    let item = this.parentNode.parentNode;
    let id = item.dataset.id;

    let index = data.toDo.findIndex((obj) => {
        return obj.id == id;
    })

    data.toDo.splice(index, 1)
    item.remove();
    updateData();
}

function editToDo(){
    let item = this.parentNode.parentNode;
    let input = document.createElement('input');
    let label = item.querySelector('span');
    let edit = item.querySelector('.btn-edit');
    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '128');
    input.setAttribute('value', label.textContent)
    input.setAttribute('class', 'edit-input')
    input.addEventListener('keydown', confirmEdit);
    input.addEventListener('blur', confirmEdit);
    
    item.firstChild.insertBefore(input, label);
    edit.firstChild.setAttribute('d', confirmIcon);
    edit.removeEventListener('click', editToDo);

    label.remove();
    input.focus()
}

function confirmEdit(e){
    let escapeKeys = ['Enter', 'Tab', 'Escape'];
    let item = this.parentNode.parentNode
    let label = document.createElement('span');
    let input = item.querySelector(".edit-input");
    let edit = item.querySelector('.btn-edit')
    let index = data.toDo.findIndex((obj) => {
        return obj.id == item.dataset.id;
    })

    if (e.type == 'keydown' && !escapeKeys.includes(e.key)){
        return null
    }
    
    if (data.toDo[index]['checked']){
        label.setAttribute('class', 'checked');
    }

    label.textContent = (e.type == 'keydown' && e.key == 'Escape') ? 
    label.textContent = data.toDo[index]['value']:
    input.value;
    
    item.firstChild.insertBefore(label, input);
    input.remove();
    
    edit.firstChild.setAttribute('d', editPath);
    edit.addEventListener('click', editToDo);
    
    data.toDo[index]['value'] = label.textContent;
    updateData();
}

function markAsCompleted(){
    let toDo = this.parentNode.parentNode;
    let toDoLabel = this.nextSibling;

    let index = data.toDo.findIndex((obj) => {
        return obj.id == toDo.dataset.id;
    })

    if (this.checked){
        data.toDo[index]['checked'] = true;
        toDoLabel.setAttribute('class', 'checked')
    } else{
        data.toDo[index]['checked'] = false;
        toDoLabel.removeAttribute('class');
    }

    updateData();
}