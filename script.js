const taskInput = document.getElementById('task-input');
const alarmInput = document.getElementById('alarm-input');
const tasksContainer = document.getElementById('tasks-container');
const clockElement = document.getElementById('clock');

function addTask() {
    const taskText = taskInput.value.trim();
    const alarmTime = alarmInput.value;

    if (taskText !== '' && alarmTime !== '') {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <span>Alarm: ${alarmTime}</span>
            <span>Added: ${getCurrentTime()}</span>
            <button onclick="removeTask(this)">Remove</button>
        `;

        tasksContainer.appendChild(taskItem);
        setAlarm(alarmTime, taskText);
        taskInput.value = '';
        alarmInput.value = '';
    }
}

function removeTask(button) {
    const taskItem = button.parentElement;
    tasksContainer.removeChild(taskItem);
}

function setAlarm(alarmTime, taskText) {
    const currentTime = new Date();
    const alarmDateTime = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate(),
        parseInt(alarmTime.split(':')[0]),
        parseInt(alarmTime.split(':')[1]),
        0
    );

    const timeUntilAlarm = alarmDateTime - currentTime;

    if (timeUntilAlarm > 0) {
        setTimeout(() => {
            alert(`Time to complete task: ${taskText}`);
        }, timeUntilAlarm);
    }
}

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
}

// Update the clock every second
setInterval(updateClock, 1000);

// Initial clock update
updateClock();
