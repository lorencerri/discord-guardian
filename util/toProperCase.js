module.exports = function toProperCase(str) {
    str = str.split('_');
    str = str.map(i => i.charAt(0).toUpperCase() + i.substring(1));
    return str.join(' ');
};