const cards = [...document.querySelectorAll(".scene-card")];

function setupPair(card) {
  const videos = [...card.querySelectorAll("video")];
  const [simple, hard] = videos;
  const playButton = card.querySelector(".pair-play");
  const resetButton = card.querySelector(".pair-reset");
  let syncing = false;

  const other = (video) => (video === simple ? hard : simple);
  const align = (source, target, force = false) => {
    if (force || Math.abs(source.currentTime - target.currentTime) > 0.12) {
      target.currentTime = source.currentTime;
    }
    if (source.playbackRate !== target.playbackRate) target.playbackRate = source.playbackRate;
  };

  videos.forEach((video) => {
    video.addEventListener("play", async () => {
      if (syncing) return;
      syncing = true;
      const target = other(video);
      align(video, target, true);
      try { await target.play(); } catch (_) { /* Browser may require a second click. */ }
      syncing = false;
      playButton.textContent = "同步暂停";
    });

    video.addEventListener("pause", () => {
      if (syncing) return;
      syncing = true;
      other(video).pause();
      syncing = false;
      if (videos.every((item) => item.paused)) playButton.textContent = "同步播放";
    });

    video.addEventListener("seeking", () => {
      if (syncing) return;
      syncing = true;
      align(video, other(video), true);
      syncing = false;
    });

    video.addEventListener("timeupdate", () => {
      if (!syncing && !video.paused) align(video, other(video));
    });
  });

  playButton.addEventListener("click", async () => {
    if (videos.some((video) => !video.paused)) {
      videos.forEach((video) => video.pause());
      playButton.textContent = "同步播放";
      return;
    }
    const anchor = Math.min(...videos.map((video) => video.currentTime));
    videos.forEach((video) => { video.currentTime = anchor; });
    await Promise.allSettled(videos.map((video) => video.play()));
    playButton.textContent = "同步暂停";
  });

  resetButton.addEventListener("click", () => {
    videos.forEach((video) => { video.pause(); video.currentTime = 0; });
    playButton.textContent = "同步播放";
  });

  return { videos, playButton };
}

const pairs = cards.map(setupPair);
const allVideos = pairs.flatMap((pair) => pair.videos);

document.querySelector("#play-all").addEventListener("click", async () => {
  allVideos.forEach((video) => { video.currentTime = 0; });
  await Promise.allSettled(allVideos.map((video) => video.play()));
  pairs.forEach((pair) => { pair.playButton.textContent = "同步暂停"; });
});

document.querySelector("#pause-all").addEventListener("click", () => {
  allVideos.forEach((video) => video.pause());
  pairs.forEach((pair) => { pair.playButton.textContent = "同步播放"; });
});

document.querySelector("#reset-all").addEventListener("click", () => {
  allVideos.forEach((video) => { video.pause(); video.currentTime = 0; });
  pairs.forEach((pair) => { pair.playButton.textContent = "同步播放"; });
});
