// Pairwise transport controls keep the same scene at the same exploration time.
document.querySelectorAll('[data-pair]').forEach(pair => {
  const videos = [...pair.querySelectorAll('video')];
  let lock = false;
  const synchronize = (source, action) => {
    if (lock) return;
    lock = true;
    videos.filter(v => v !== source).forEach(v => {
      if (action === 'play') {
        if (Math.abs(v.currentTime - source.currentTime) > .08) v.currentTime = source.currentTime;
        v.play().catch(() => {});
      } else if (action === 'pause') v.pause();
      else if (action === 'seek' && Math.abs(v.currentTime-source.currentTime)>.08) v.currentTime = source.currentTime;
      else if (action === 'rate') v.playbackRate = source.playbackRate;
    });
    lock = false;
  };
  videos.forEach(v => {
    // Muted inline playback is allowed by standard browser autoplay policies.
    v.muted = true;
    v.defaultMuted = true;
    v.addEventListener('play',()=>synchronize(v,'play'));
    v.addEventListener('pause',()=>synchronize(v,'pause'));
    v.addEventListener('seeking',()=>synchronize(v,'seek'));
    v.addEventListener('ratechange',()=>synchronize(v,'rate'));
  });
  videos[0].addEventListener('timeupdate',()=>{
    if (!videos[0].paused && !videos[1].seeking && Math.abs(videos[0].currentTime-videos[1].currentTime)>.2) synchronize(videos[0],'seek');
  });
  pair.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click',()=>{
    const action = button.dataset.action;
    if (action === 'pause') videos.forEach(v=>v.pause());
    else {
      if (action === 'restart') videos.forEach(v=>{v.currentTime=0;});
      else videos[1].currentTime=videos[0].currentTime;
      videos.forEach(v=>v.play().catch(()=>{}));
    }
  }));
  // Start immediately, including when the comparison section is below the fold.
  // Keep the native controls available if the browser blocks autoplay.
  videos.forEach(v => v.play().catch(() => {}));
});
document.querySelector('#copy-bibtex').addEventListener('click',async event=>{
  const text=document.querySelector('#bibtex').textContent;
  try { await navigator.clipboard.writeText(text); event.target.textContent='Copied'; }
  catch { const range=document.createRange();range.selectNodeContents(document.querySelector('#bibtex'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);event.target.textContent='Selected'; }
  setTimeout(()=>{event.target.textContent='Copy';},2200);
});
