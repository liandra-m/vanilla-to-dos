const list = document.getElementById("list");
const addBar = document.getElementById("toDoLabel")
const editIcon = 'M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z'
const removeIcon = 'M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z'
const confirmIcon = 'M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z'
const data = localStorage.getItem('toDoList') ? JSON.parse(localStorage.getItem('toDoList')) : {toDo:[]};
var counter = data && data.toDo.length > 1 ? data.toDo[data.toDo.length - 1]['id'] : 0; 

addBar.addEventListener('keydown', keydownHandler);

init    ();

function keydownHandler(e){
    if (e.code == 'Enter' || e.code == 'NumpadEnter')
        addToDo();
}

function init(){
    for (item of data.toDo){
        renderToDo(item);
    }
}

function renderToDo(item){    
    let newToDo = document.createElement('li');
    let newSpan = document.createElement('span');
    let newCheck = document.createElement('input')
    let newActionsDiv = document.createElement('div');
    let actionEdit = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let actionRemove = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    let editPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
    let removePath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    newCheck.setAttribute('type', 'checkbox');
    newCheck.addEventListener('click', markAsCompleted);
    
    editPath.setAttribute('d', editIcon);
    actionEdit.setAttribute('viewBox', '0 0 512 512');
    actionEdit.append(editPath);
    actionEdit.setAttribute('class', 'btn-edit');
    actionEdit.addEventListener('click', editToDo)
    
    removePath.setAttribute('d', removeIcon);
    actionRemove.setAttribute('viewBox', '0 0 512 512');
    actionRemove.append(removePath);
    actionRemove.setAttribute('class', 'btn-remove');
    actionRemove.addEventListener('click', removeToDo);
    
    newActionsDiv.append(newCheck);
    newActionsDiv.append(actionEdit);
    newActionsDiv.append(actionRemove);
    newActionsDiv.setAttribute('class', 'actions');
    if (item.checked){
        newSpan.setAttribute('class', 'checked');
        newCheck.checked = true;
    }
    newCheck.setAttribute('id', 'check')
    newSpan.textContent = item.value;
    newToDo.append(newSpan);
    newToDo.append(newActionsDiv);
    newToDo.setAttribute('data-id', item.id)
    list.append(newToDo);

}

function updateData(){
    localStorage.setItem('toDoList', JSON.stringify(data));
}

function addToDo(){
    if (addBar.value == '' || / /g.test(addBar.value))    
        return null;

    counter += 1;
    item = {id: counter, value: addBar.value, checked: false}
    renderToDo(item)
    addBar.value = '';
    data.toDo.push(item);
    updateData();
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
    let firstChild = item.firstChild
    let edit = item.querySelector('.btn-edit');
    input.setAttribute('type', 'text');
    input.setAttribute('maxlength', '128');
    input.setAttribute('value', firstChild.textContent)
    input.addEventListener('keydown', confirmEdit);
    
    item.insertBefore(input, firstChild);
    firstChild.remove();
    input.focus()
    edit.firstChild.setAttribute('d', confirmIcon);
    edit.removeEventListener('click', editToDo);
    edit.addEventListener('click', confirmEdit);
}

function confirmEdit(e){
    if(e.key == "Enter" || e.type == "click"){
        let item = e.type == "click" ? this.parentNode.parentNode : this.parentNode;
        let input = item.firstChild;
        let newSpan = document.createElement('span');
        let edit = item.querySelector('.btn-edit')
        let check = item.querySelector('#check')
        let index = data.toDo.findIndex((obj) => {
            return obj.id == item.dataset.id;
        })
        
        if (data.toDo[index]['checked']){
            newSpan.setAttribute('class', 'checked');
        }

        newSpan.textContent = input.value;
        item.insertBefore(newSpan, input);
        input.remove();
        edit.firstChild.setAttribute('d', editIcon);
        edit.removeEventListener('click', confirmEdit);
        edit.addEventListener('click', editToDo);



        data.toDo[index]['value'] = newSpan.textContent;
        
        updateData();
    }
}

function markAsCompleted(e){
    let item = this.parentNode.parentNode
    let firstChild = item.firstChild;

    let index = data.toDo.findIndex((obj) => {
        return obj.id == item.dataset.id;
    })

    if (this.checked){
        data.toDo[index]['checked'] = true;
        firstChild.setAttribute('class', 'checked')
    } else{
        data.toDo[index]['checked'] = false;
        firstChild.removeAttribute('class');
    }

    updateData();
}