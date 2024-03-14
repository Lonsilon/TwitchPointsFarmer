const targetNode = document.querySelector('.community-points-summary');
const config = { childList: true, subtree: true };
const callback = (mutationList, observer) => {
  for (const mutation of mutationList) {
    if (mutation.type === "childList") {
      const buttonTarget = targetNode.querySelector("button[aria-label='Reclamar bonificación']");
      if (buttonTarget){
        buttonTarget.click();
        break;
      }
    }
  }
};
new MutationObserver(callback).observe(targetNode, config);