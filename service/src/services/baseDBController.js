let ObjectID = require('mongodb').ObjectID // 封装ObjectID

export default class baseController {
    constructor(MongoDB, TableName) {
        this.mongoDB = MongoDB
        this.tableName = TableName
    }
    async find(query){
        let res = await this.MongoDB.find(this.tableName, query.condition ? query.condition : {}, query.fields? query.fields: {})
        return res
    }
    async update(query){
        if(!query.condition){
            let doc = Object.assign({},query)
            delete doc.id
            let res = await this.MongoDB.update(this.tableName,{_id:ObjectID(query.id)},doc)
            return res;
        }else{
            return await this.MongoDB.update(this.tableName, query.condition, query.fields)
        }
    }
    async save(query){
        let _result = await this.MongoDB.save(this.tableName, query)
        _result = {
            success: true,
            results: {
                ops: [{_id: _result.results.ops[0]._id}]
            }
        }
        return _result
    }
}