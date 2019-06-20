let sprintName = (sprintName)=>{
    if (sprintName === null || sprintName === undefined || sprintName === 0) {
        return "任务栈"
    } else {
        return '冲刺S' + sprintName
    }
}


export {
    sprintName
}
