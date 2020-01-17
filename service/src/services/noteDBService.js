import baseController from './baseDBController'
import MongoDB from '../utils/mongodb.js'

class note extends baseController {
    constructor() {
        super()
        this.tableName = 'noteList'
        this.MongoDB = MongoDB
    }
}

export default new note