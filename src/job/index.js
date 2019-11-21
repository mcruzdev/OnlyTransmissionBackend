const axios = require("axios");
const mongoose = require("mongoose");
const Transmissions = mongoose.model("Transmission");
const { emit } = require("../socket");
const nodecron = require("node-cron");

// Task - Verify every five minutes
nodecron.schedule("*/1 * * * *", async () => {
  const transmissions = await Transmissions.find({ status: "OFF" });

  if (transmissions) {
    transmissions.forEach(async t => {
      const response = await searchEventLiveByChannelId(t.channelId);
      await verifyIfOnHandler(response);
    });
  }
});

// Task - Verify every ten minutes
nodecron.schedule("*/30 * * * *", async () => {
  const transmissions = await Transmissions.find({ status: "ON" });

  if (transmissions) {
    transmissions.forEach(async t => {
      const response = await searchEventLiveByChannelId(t.channelId);
      await verifyIfOffHandler(response, t.channelId);
    });
  }
});

const isOn = response => {
  const off = 0;
  return response.data.pageInfo.totalResults !== off;
};

const searchEventLiveByChannelId = async channelId => {
  return await axios.default.get(
    `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${process.env.YT_API_KEY}`
  );
};

const verifyIfOffHandler = async (response, channelId) => {
  if (!isOn(response)) {
    const transmission = await Transmissions.findOneAndUpdate(
      { channelId },
      { status: "OFF", videoId: null }
    );

    emit("live:off", transmission);
  }
};

const verifyIfOnHandler = async response => {
  if (isOn(response)) {
    console.log("isOn");
    const channelId = response.data.items[0].snippet.channelId;
    const videoId = response.data.items[0].id.videoId;

    const transmission = await Transmissions.findOneAndUpdate(
      { channelId },
      { videoId, status: "ON" }
    );

    emit("live:on", transmission);
  } else {
    console.log("isOff");
  }
};
