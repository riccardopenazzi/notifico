//Metodo per creare mappe a partire da una lista
Array.prototype.toMap = function (keyFn) {
    return this.reduce((map, item) => {
        const key = keyFn(item);
        map[key] = item;
        return map;
    }, {});
};
