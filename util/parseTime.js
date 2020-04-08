module.exports = function parseTime(ms, { fromNow = false, includeSeconds = false, base = '' } = {}) {

    let obj = (fromNow ? parsems(ms) : parsems(Date.now() - ms));

    for (var i in obj) {
        if (obj[i] === 0 || ['milliseconds', 'microseconds', 'nanoseconds'].includes(i) || (!includeSeconds && i === 'seconds')) continue;
        base += `${obj[i]} ${(obj[i] === 1 ? i.slice(0, -1) : i)} `;
    }

    return (!base ? 'Just now' : base + 'ago');

}