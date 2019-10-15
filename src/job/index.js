const axios = require("axios");

setInterval(() => {
  process.env.YT_API_KEY = "";
  axios.default
    .get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=UCSK12kHqjgc2abNw5V1BCLQ&type=video&eventType=live&key=${process.env.YT_API_KEY}`
    )
    .then(response => console.log(response))
    .catch(err => console.log(err));
}, 1000);

const responseOkHandler = reponse => {
  const liveOff = 0;

  if (response.data.pageInfo.totalResults !== liveOff) {
  }
};

const notifyFromSocketIO = videoId => {
  console.log("notifyFromSocketIO");
};
