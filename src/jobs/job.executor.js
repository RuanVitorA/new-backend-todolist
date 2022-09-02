const jobScheduler = require("node-cron")
const db = require("../config/mysql.config")
const {DeleteTodoJob} = require("./todo/delete.todo.job")
const {SendSmsTodoJob} = require("./todo/send.sms.todo.job")


class jobExecutor {
    constructor(){
        this.execute()
    }

    execute(){
        //new DeleteTodoJob(jobScheduler,db).execute()
        new SendSmsTodoJob(jobScheduler,db).execute()

    }
}

module.exports = new jobExecutor()