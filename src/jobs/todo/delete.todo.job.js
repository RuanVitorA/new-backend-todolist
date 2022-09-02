
class DeleteTodoJob{

    constructor(scheduler, db){
        this.scheduler = scheduler
        this.db = db
    }

    execute(){
        try {
            this.scheduler.schedule("* * * * * *", ()=>{
                console.log(`[INFO] = DeleteTodo Job triggered at ${new Date().toISOString()}`)

                this.job()

                console.log(`[INFO] = DeleteTodo Job finished at ${new Date().toISOString()}`)

            })
        } catch (error) {
            console.error(error)
            
        }
    }

    job(){
        const todosFiltered = this.db.execQuery(`select * from todo where date < "${new Date().toISOString()}"`)

        todosFiltered.forEach((todo) =>{
            this.db.execQuery(`delete from todo where id = ${todo.id}`)
        })
        console.log(`[INFO] - DeleteTOdoJob - ${todosFiltered.length} todos found to be deleted`)
    }
}

module.exports = {DeleteTodoJob}