const taskList = [];
function findByWeek(pWeek){
    for(let i = 0; i <= taskList.at(-1); i++){
        const a = new Task;
        a = taskList.at(i);
        if(a.week == pWeek)
            return a;
        else
            return "Not found"
    }
}
function findByMember(pAssignMemID){
    for(let i = 0; i <= taskList.at(-1); i++){
        const a = new Task;
        a = taskList.at(i);
        if(a.assignmenedto == pAssignMemID)
            return a;
        else
            return "Not found";
    }
}
function saveTask(pTask){
    taskList.push(pTask);
}
function updateTask(pTaskID, pTask){
    for(let i = 0; i <= taskList.at(-1); i++){
        const a = new Task;
        a = taskList(i);
        if(a.taskID == pTaskID)
            taskList.at(i) = pTask;
    }
}
function deleteTask(pID){
    const b = [];
    for(let i = 0; i <= taskList.at(-1); i++){
        const a = new Task;
        a = taskList.at(i);   
        if(a.taskID == pID){
            for(let j = i; i < taskList.at(-1); i++)
                b.push(taskList.at(i))
            for(j; j >= i; j--)
                taskList.pop();
            for(i; i <= b.at(-1); i++)
                taskList.push(b.at(i));
        }
    }
}