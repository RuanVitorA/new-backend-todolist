const { EnvironmentShared } = require("../environment.shared");

const axios = require("axios");

class ZenviaSmsShared {
  constructor() {
    this.environmentShared = new EnvironmentShared();
  }

  send(to, contents) {
    const data = JSON.stringify({
      from: this.environmentShared.getEnv("ZENVIA_SENDER_ID"),
      to,
      contents,
    });

    const config = {
      method: "post",
      url: this.environmentShared.getEnv("ZENVIA_SMS_ENDPOINT"),
      headers: {
        "X-API-TOKEN": this.environmentShared.getEnv("ZENVIA_TOKEN"),
        "Content-type": "application/json",
      },
      data,
    };

    axios(config)
      .then(() => {
        console.log("Sucess. The msg was sent");
      })
      .catch((error) => console.log("Error =>", error));
  }
}

module.exports = { ZenviaSmsShared };
