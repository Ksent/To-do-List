'use strict';

let enterTask = document.querySelector('.tasker__new-task');
let taskerType = document.querySelector('.tasker__type-task');
let taskerTypeImg = document.querySelector('.tasker__type-img');
let taskerAddBtn = document.querySelector('.tasker__add-btn');

let taskerList = document.querySelector('.tasker__task-list');
let taskerListAll = taskerList.getElementsByTagName('p');

taskerType.addEventListener('change', function() {

  if (taskerType.value == 1) {
    taskerTypeImg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-type');
  } else if (taskerType.value == 2) {
    taskerTypeImg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-home');
  } else if (taskerType.value == 3) {
    taskerTypeImg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-work');
  } else if (taskerType.value == 4) {
    taskerTypeImg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-shop');
  }
  
});

function listenSelection(valueNumber, strokeColor, newButton, typeIcon) {

  if (taskerType.value == valueNumber) {
    let newTypeIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    newTypeIcon.setAttribute('class', 'tasker__type-icon');
    newTypeIcon.setAttribute('width', '46');
    newTypeIcon.setAttribute('height', '46');
    newTypeIcon.setAttribute('stroke', strokeColor);
    newTypeIcon.setAttribute('fill', 'transparent');
    newButton.before(newTypeIcon);

    let newTypeIconImg = document.createElementNS('http://www.w3.org/2000/svg', 'use');
    newTypeIconImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', typeIcon);
    newTypeIcon.prepend(newTypeIconImg);
  }

}

function bindingInputLabel(selectorAll, newName) {
  for (let i = 0; i < selectorAll.length;) {
    selectorAll[i].setAttribute(newName, 'toggle-task-' + ++i);
  }
}

function createTask(textTask) {
  let newTaskItem = document.createElement('li');
  newTaskItem.setAttribute('class', 'tasker__task-item');
  newTaskItem.setAttribute('draggable', 'true');
  taskerList.append(newTaskItem);
  
  let newTaskText = document.createElement('p');
  newTaskText.setAttribute('class', 'tasker__task-text');
  newTaskItem.prepend(newTaskText);
  
  let newTaskToggle = document.createElement('input');
  newTaskToggle.setAttribute('class', 'tasker__toggle');
  newTaskToggle.setAttribute('type', 'checkbox');
  newTaskText.prepend(newTaskToggle);
  
  let newTaskSubtitle = document.createElement('label');
  newTaskSubtitle.setAttribute('class', 'tasker__subtitle');
  newTaskSubtitle.textContent = textTask;
  newTaskToggle.after(newTaskSubtitle);
  
  let taskerToggleAll = document.querySelectorAll('.tasker__toggle');
  let taskerSubtitleAll = document.querySelectorAll('.tasker__subtitle');
  let nameForInput = 'id';
  let nameForLabel = 'for';
  
  bindingInputLabel(taskerToggleAll, nameForInput);
  bindingInputLabel(taskerSubtitleAll, nameForLabel);
  
  let newToggleIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  newToggleIcon.setAttribute('class', 'tasker__toggle-icon');
  newToggleIcon.setAttribute('width', '16');
  newToggleIcon.setAttribute('height', '16');
  newToggleIcon.setAttribute('fill', 'transparent');
  newToggleIcon.setAttribute('stroke', '#494a4b');
  newTaskSubtitle.after(newToggleIcon);
  
  let newToggleImg = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  newToggleImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#icon-toggle');
  newToggleIcon.prepend(newToggleImg);
  
  let newCheckmarkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  newCheckmarkIcon.setAttribute('class', 'tasker__checkmark-icon');
  newCheckmarkIcon.setAttribute('width', '22');
  newCheckmarkIcon.setAttribute('height', '22');
  newCheckmarkIcon.setAttribute('stroke', '#8fdab7');
  newToggleIcon.after(newCheckmarkIcon);
  
  let newCheckmarkImg = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  newCheckmarkImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#icon-checkmark');
  newCheckmarkIcon.prepend(newCheckmarkImg);

  let newTaskIcons = document.createElement('p');
  newTaskIcons.setAttribute('class', 'tasker__task-icons');
  newTaskText.after(newTaskIcons);
  
  let newDeleteBtn = document.createElement('button');
  newDeleteBtn.setAttribute('class', 'tasker__delete-btn');
  newTaskIcons.prepend(newDeleteBtn);
  
  let newDeleteIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  newDeleteIcon.setAttribute('width', '16');
  newDeleteIcon.setAttribute('height', '16');
  newDeleteIcon.setAttribute('stroke', '#c9cbcc');
  newDeleteIcon.setAttribute('stroke-width', '2');
  newDeleteBtn.prepend(newDeleteIcon);
  
  let newDeleteImg = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  newDeleteImg.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '#icon-delete');
  newDeleteIcon.prepend(newDeleteImg);

  listenSelection(2, '#e67428', newDeleteBtn, '#icon-home');
  listenSelection(3, '#389bc9', newDeleteBtn, '#icon-work');
  listenSelection(4, '#3bd88f', newDeleteBtn, '#icon-shop');
}

taskerAddBtn.addEventListener('click', function(evt) {
  
  if (enterTask.value === '') {
    return;
  } else {
    evt.preventDefault();
    createTask(enterTask.value);  
    enterTask.value = '';   
    taskerType.value = 1; 
    taskerTypeImg.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '#icon-type'); 
  }
  
});

taskerList.addEventListener('click', function(evt) {
  let target = evt.target;
  let taskerItemAll = document.querySelectorAll('.tasker__task-item');

  for (let i = 0; i < taskerItemAll.length; i++) {

    if (taskerItemAll[i].contains(target.closest('button'))) {
      taskerItemAll[i].remove();
    }
    
  }

});

taskerList.addEventListener('dragstart', function(evt) {
  let target = evt.target;

  target.classList.add('selected');
  for (let i = 0; i < taskerListAll.length; i++) {
    taskerListAll[i].classList.add('events');    
  }
});

taskerList.addEventListener('dragend', function(evt) {
  let target = evt.target;

  target.classList.remove('selected');
  for (let i = 0; i < taskerListAll.length; i++) {
    taskerListAll[i].classList.remove('events');    
  }
});

function getNextItem(cursorPosition, target) {
  let nextItem;
  let itemCoord = target.getBoundingClientRect();
  let itemCenter = itemCoord.y + itemCoord.height / 2;

  if (cursorPosition < itemCenter) {
    nextItem = target;
  } else {
    nextItem = target.nextElementSibling;
  }

  return nextItem;
}

taskerList.addEventListener('dragover', function(evt) {
  let target = evt.target;
  let activeItem = taskerList.querySelector('.selected');

  evt.preventDefault();

  if (activeItem !== target && target.classList.contains('tasker__task-item')) {
    let nextItem = getNextItem(evt.clientY, target);

    if (nextItem && activeItem === nextItem.previousElementSibling || activeItem === nextItem) {
      return;
    }

    taskerList.insertBefore(activeItem, nextItem);
  } else {
    return;
  }

});


