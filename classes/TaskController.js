function getTaskByWeek(pWeek){
    return findByWeek(pWeek);
}
function createTask(pID, pTitle, pDescr, pStatus, pWeek, pAssignMemID, pCreateByMemID, pCreateAt, pCompleteAt){
    const task = new Task(pID, pTitle, pDescr, pStatus, pWeek, pAssignMemID, pCreateByMemID, pCreateAt, pCompleteAt);
    saveTask(task);
}
function updateTaskStatus(pTaskID, pStatus){
    for(let i = 0; i <= taskList.at(-1); i++){
        const a = new Task;
        a = taskList(i);
        if(a.taskID == pTaskID){
            a.status = pStatus;
            taskList.at(i) = a;
        }
    }
}