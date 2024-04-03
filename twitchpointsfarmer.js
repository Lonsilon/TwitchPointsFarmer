(function() {
  let originalStreamer;
  let observer;
  let iDetectChangeStreamer;
  let collectedPoints = 0;
  function startObserver(){
    const targetNode = document.querySelector('.community-points-summary > div:nth-child(2)');
    if (targetNode){
      const config = { childList: true };
      const callback = (mutationList, observer) => {
        for (const mutation of mutationList) {
          if (collectPoints(targetNode)){
              break;
          }
        }
      };
      collectPoints(targetNode);
      observer = new MutationObserver(callback).observe(targetNode, config);
      originalStreamer = location.pathname;
      iDetectChangeStreamer = iDetectChangeStreamer || setInterval(() => {
        if (location.pathname !== originalStreamer) {
          currentUrl = location.pathname;
          startObserver();
        }
      }, 3000);
      console.log('Twitch Points Farmer initialized');
    } else {
      setTimeout(startObserver, 3000);
    }
  }
  function collectPoints(targetNode){
    let collected = false;
    const buttonTarget = targetNode.querySelector("button");
    if (buttonTarget){
      buttonTarget.click();
      collected = true;
    } else {
      const figureTarget = targetNode.querySelector("figure");
      if (figureTarget){
        collectedPoints += parseInt(figureTarget.parentElement.innerText);
        console.log('points collected ' + figureTarget.parentElement.innerText + ' - total ' + collectedPoints);
      }
    }
    return collected;
  }
  console.log('Twitch Points Farmer started');
  startObserver();
})();