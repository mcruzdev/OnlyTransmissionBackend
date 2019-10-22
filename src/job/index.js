const axios = require("axios");
const mongoose = require("mongoose");
const Transmissions = mongoose.model("Transmission");
const { emit } = require("../socket");

// TODO: Implementar outra forma de fazer o job. Exemplo: Utilizando node-cron ou node-schedule
setInterval(async () => {
  process.env.YT_API_KEY = "";

  const transmissions = await Transmissions.find({ status: "OFF" });

  if (transmissions) {
    transmissions.forEach(t => {
      axios.default
        .get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${t.channelId}&type=video&eventType=live&key=${process.env.YT_API_KEY}`
        )
        .then(responseOkHandler)
        .catch(err => console.error("err"));
    });
  }
}, 6000);

const responseOkHandler = async response => {
  const liveOff = 0;

  if (response.data.pageInfo.totalResults !== liveOff) {
    const channelId = response.data.items[0].snippet.channelId;
    const videoId = response.data.items[0].id.videoId;

    const transmission = await Transmissions.findOneAndUpdate(
      { channelId },
      { videoId, status: "ON" }
    );

    emit("live:on", transmission);
  }
};

// TODO: Implementar remoção do conteúdo que se passou a ficar offline
