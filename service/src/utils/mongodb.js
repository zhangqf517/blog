/**
 * mongodb操作类
 */

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const systemConfig = require('./system.config')

const dbURL = systemConfig.mongodb_url
let db

MongoClient.connect(dbURL, {
    poolSize: 30, //连接池连接数
    reconnectTries: Number.MAX_VALUE, // try reconnect as long as it's possible  (default: 30)
    reconnectInterval: 5000 // retry every 5 second (default value is 1000 ms - 1 sec)
}, (err, database) => {
    if (err) {
        console.log('连接失败！ ')
        throw err
    }
    console.log('连接成功！  ')
    db = database
})
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
function temporaryRecord(fields){
    fields.createTime = new Date()
    return new Promise((resolve, reject) => {
        if (!fields) {
            reject(errResult('Field is not allowed for null'))
        }
        const collection = db.collection('temporaryRecord')
        collection.save(fields, function (err, res) {
            if (err) {
                resolve(errResult(err.message))
            } else {
                resolve(successResults(res))
            }
            reject(errResult(err))            
        })
    })
}

const DB = function () {

}
const errResult = err => {
    return { success: false, err }
}
const successResults = results => {
    return { success: true, results }
}

/**
* 查询数据
* @param tableName 表名
* @param conditions 查询条件
* @param fields 查询字段
*/
DB.prototype.find = (tableName, conditions, fields) => {
    return new Promise((resolve, reject) => {
        const collection = db.collection(tableName, fields)
        collection.find(conditions, fields).toArray((err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}
/**
 * 更新数据
 * @param tableName 表名
 * @param conditions 更新需要的条件 {_id: id, user_name: name}
 * @param updateFields 要更新的字段 {age: 21, sex: 1}
 */
DB.prototype.update = (tableName, conditions, updateFields) => {
    temporaryRecord({
        tableName: tableName,
        type: 'update',
        ip: getIPAdress(),
        updateFields: updateFields,
        conditions: conditions
    })
    return new Promise((resolve, reject) => {
        if (!updateFields) {
            reject(errResult('Field is not allowed for null'))
        }
        console.log('--------------------------')
        console.log(tableName)
        const collection = db.collection(tableName)
        if (conditions._id) {
            conditions._id = recursiveJson(conditions._id)
        }
        if (typeof updateFields._id === 'string') {
            reject(errResult('can not modify ObjectId'))
        }
        console.log('--------------------------')
        console.log(updateFields)
        console.log('--------------------------')
        console.log(conditions)
        collection.updateOne(conditions, {
            $set: updateFields
        }, (err, res) => {
            if (err) {
                resolve(errResult(err.message))
            } else {
                resolve(successResults(res))
            }
            reject(errResult(err))
        })
    })
}

/**
 * 保存数据
 * @param tableName 表名
 * @param fields 表数据
 * 
 */
DB.prototype.save = (tableName, fields) => {
    temporaryRecord({
        tableName:tableName,
        type:'save',
        ip:getIPAdress(),
        fields:fields
    })
    return new Promise((resolve, reject) => {
        if (!fields) {
            reject(errResult('Field is not allowed for null'))
        }
        const collection = db.collection(tableName)
        collection.save(fields, function (err, res) {
            if (err) {
                resolve(errResult(err.message))
            } else {
                resolve(successResults(res))
            }
            reject(errResult(err))            
        })
    })
}

// 对于 _id 字段的ObjectID 转换
function recursiveJson(condition) {
    if (typeof condition === 'string') {
        return ObjectID(condition)
    }
    if (!condition) {
        return condition
    }
    for (let key of Object.keys(condition)) {
        if (!condition[key]) {
            continue;
        }
        if (isArray(condition[key]) && typeof condition[key][0] === 'string') {
            let arr = []
            condition[key].map(s => {
                arr.push(ObjectID(s))
            })
            condition[key] = arr
        } else if (typeof condition[key] === 'object') {
            recursiveJson(condition[key])
        } else if (typeof condition[key] === 'string' && condition[key].length === 24) {
            condition[key] = ObjectID(condition[key])
        }
    }
    return condition
}

function isArray(o) {
    return Object.prototype.toString.call(o) == '[object Array]';
}

module.exports = new DB()