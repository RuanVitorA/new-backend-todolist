const { ExpressConfig } = require("./config/express.config")
const {EnvironmentShared} = require("./shared/environment.shared")
require("./config/mysql.config")
require("./jobs/job.executor")

const expressConfig = new ExpressConfig()
const environmentShared = new EnvironmentShared()
const serverPort = environmentShared.getEnv("SERVER_PORT")

expressConfig.getServer().listen(serverPort, () =>{
    console.log(`[INFO] - Server is up and running on port ${serverPort}`)
})







