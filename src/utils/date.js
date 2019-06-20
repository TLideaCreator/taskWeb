export default {
     formatDate (date, format) {
        if (!format || format === '') {
            format = 'yyyy-MM-dd';
        }
        let o = {
            'M+': date.getMonth() + 1, // month
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(), // minute
            's+': date.getSeconds(), // second
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds() // millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1,
                (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (let k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1,
                    RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return format;
    },

    stringToDate (dateString) {
        let date = new Date();
        let year = dateString.substring(0, 4);
        let month = dateString.substring(4, 6);
        let day = dateString.substring(6, 8);
        date.setFullYear(year, month-1, day);
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },

    formatDates (dateLength) {
        var date1 = new Date();
        var date2 = new Date(date1);
        date2.setDate(date1.getDate() + dateLength);
        return this.formatDate(date2,'yyyyMMdd');
    }
}
