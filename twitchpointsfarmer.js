(function() {
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
      new MutationObserver(callback).observe(targetNode, config);
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
    }
    return collected;
  }
  startObserver();
})();