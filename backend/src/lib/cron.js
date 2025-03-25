import cron from "cron"
import https from "https"

// Create a new cron job that runs every 14 minutes
// The job sends a GET request to the server
const job = new cron.CronJob("*/14 * * * *", () => {
  https
  .get(process.env.BASE_URL, (res) => {
    if (res.statusCode === 200) console.log("GET request to the server was successful")
    else console.log("GET request to the server failed", res.statusCode)
  })
  .on("error", (err) => {
    console.log("Error while sending request ", err)
  })
})

export default job