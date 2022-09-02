const {ZenviaSmsShared} = require("../../shared/sms/zenvia.sms.shared")
class SendSmsTodoJob {
  constructor(scheduler, db) {
    this.scheduler = scheduler;
    this.db = db;
    this.zenviaSmsShared = new ZenviaSmsShared()
  }

  execute() {
    try {
      this.scheduler.schedule("*/30 * * * * *", () => {
        console.log(
          `[INFO] = SendSmsTodoJob Job triggered at ${new Date().toISOString()}`
        );

        this.job();

        console.log(
          `[INFO] = SendSmsTodoJob Job finished at ${new Date().toISOString()}`
        );
      });
    } catch (error) {
      console.error(error);
    }
  }

  job() {
    const todosFiltered = this.db.execQuery(
      `select * from todo where date < DATE_ADD(NOW(), INTERVAL 1 HOUR) and date >= NOW()`
    );

      console.log(todosFiltered)
    todosFiltered.forEach((todo) => {
      const contents = [
        {
          type: "text",
          text: `"hey, pay attention! at "${todo.date}" you will have a thing to do "${todo.name}"`
        }
      ]
      const to = "+5592993572509"
      this.zenviaSmsShared.send(to, contents)
    });
    console.log(
      `[INFO] - SendSmsTodoJob - ${todosFiltered.length} todos found to send a notification message`
    );
  }
}

module.exports = { SendSmsTodoJob };
