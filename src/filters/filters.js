import {date} from '@/utils';

let sprintName = (sprintName) => {
    if (sprintName === null || sprintName === undefined || sprintName === 0) {
        return "任务栈"
    } else {
        return '冲刺S' + sprintName
    }
};

let timeFormat = (timestamp) => {
    let now = new Date();
    timestamp = timestamp * 1000;
    let mins = Math.floor((now.getTime() - timestamp) / 60 / 1000);
    let minConst = 1;
    let minTenConst = 10 * minConst;
    let hourConst = 6 * minTenConst;
    let dayConst = 24 * hourConst;
    let dayThreeConst = 3 * dayConst;
    if (mins < minTenConst) {
        return '刚刚';
    } else if (mins >= minConst && mins < hourConst) {
        return `${mins}分钟前`
    } else if (mins >= hourConst && mins < dayConst) {
        return `${Math.floor(mins / hourConst)}小时前`
    } else if (mins >= dayConst && mins < dayThreeConst) {
        return `${Math.floor(mins / dayConst)}天前`
    } else {
        let time = new Date(timestamp);
        return date.formatDate(time, 'MM-dd');
    }
};
let projectIcon = (project) => {
    if (project.icon.startsWith('http')) {
        return project.icon
    } else {
        return require('../assets/images/project/' + project.icon + '.png')
    }
};
let userAvatar = (user)=>{
    if(user && user.avatar ){
        if(user.avatar.startsWith('http')){
            return user.avatar
        }else{
            return require('../assets/images/avatar/' + user.avatar + '.png')
        }
    }else{
        return '';
    }
};

export {
    sprintName,
    timeFormat,
    projectIcon,
    userAvatar
}
