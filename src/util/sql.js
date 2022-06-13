
module.exports.prepareFindAllRequest = function (tableName, idField = 'id', ids, fields) {
    var where;
    if (ids) where = ' WHERE ' + idField + ' IN (?)'
    return 'SELECT ' + (fields.length ? fields.join(',') : '*') + ' FROM `' + tableName + '`' + (where || '');
}


module.exports.prepareUpdateByIdRequest = function (tableName, id, data) {
    var updateCmd = 'UPDATE `' +tableName+ '` SET ';
    for (let key in data) updateCmd += key + ' = "' + data[key] + '",'
    updateCmd = updateCmd.substring(0, updateCmd.length - 1);
    return updateCmd + ' WHERE id = ' + id;
}
