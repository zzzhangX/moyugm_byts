class Common {
    $exchangeDate(value: string) {
        let val = Number(value)
        let date = new Date(val * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        let _MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        let _d = d < 10 ? ('0' + d) : d;
        return y + '-' + _MM + '-' + _d;
    }
    exchangeDate(value: string) {
        let val = Number(value)
        let date = new Date(val * 1000); // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        // let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        let _MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        let _d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        let _h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        let _m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        let _s = s < 10 ? ('0' + s) : s;
        return y + '-' + _MM + '-' + _d + ' ' + _h + ':' + _m + ':' + _s;
    }
    $dateToms(date: string | number | Date) {
        let _date = new Date(date)
        let result = Date.parse(`${_date}`) / 1000
        // let result = new Date(date).getTime();
        return result;
      }// 日期转时间戳
}
export default Common