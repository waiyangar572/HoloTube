maxInd = 0;
let observer;

let sidePeekFrequency = 0.2;

window.onload = function () {
  let aaa = document.querySelector("#logo-icon svg.yt-icon");
  console.log(aaa);
  let pageManager = document.querySelector("ytd-page-manager");
  console.log(pageManager);
  var thumbnailsObserver = new MutationObserver(addClassToThumbnail);
  observer = new MutationObserver(function () {
    console.log("observed mutation");
    // const thumbnailContainer = document.querySelector(
    //   "ytd-rich-grid-renderer > .style-scope.ytd-rich-grid-renderer"
    // );
    const thumbnailContainer = document.querySelector("#contents");
    thumbnailsObserver.observe(thumbnailContainer, { childList: true });
    addClassToThumbnail();
  });
  console.log(pageManager);
  observer.observe(pageManager, { childList: true });
  // container.onload = function() {
  // 	let thumbnailContainer = document.querySelector('ytd-rich-grid-row');
  // 	console.log(thumbnailContainer);
  // 	let contents = document.querySelector('ytd-rich-grid-row div#contents');
  // 	console.log(contents);
  // 	let thumbnail = document.querySelector('.style-scope.ytd-rich-grid-media ytd-thumbnail');
  // 	console.log(thumbnail);
  // 	thumbnail.append(imageWithThumbnail);
  // }
};

function addStyle(str) {
  const sheets = document.styleSheets;
  const sheet = sheets[sheets.length - 1];

  sheet.insertRule(str, sheet.cssRules.length);
}

sidePeekImgURLs = [
  "images/nakiri_side_peek.png",
  "images/aqua_side_peek.png",
  "images/choco_side_peek.png",
  "images/shion_side_peek.png",
  "images/subaru_side_peek.png",
];
function getRandomSidePeekImgURL() {
  const num = sidePeekImgURLs.length;
  const randomInd = intRandom(0, num - 1);
  return sidePeekImgURLs[randomInd];
}
function addMiniImage(str) {
  const sidePeekImg = chrome.runtime.getURL(getRandomSidePeekImgURL());
  // const nakiri_1 = chrome.runtime.getURL('images/nakiri_side_peek.png');
  const miniImage = `
    display: block;
    content: "";
    background-color: transparent;
    background-image: url('${sidePeekImg}');
    background-size: contain;
    background-repeat: no-repeat;
    position: relative;
    bottom: 55px;
    left: -25px;
    width: 40px;
    height: 40px;
    margin-bottom: -40px;
    z-index: 0;`;
  addStyle(`${str}::after{${miniImage}}`);
}

function addClassToThumbnail() {
  console.log("addClassToThumbnail");
  let thumbnails = document.querySelectorAll(
    "ytd-thumbnail:not(.ytd-rich-grid-slim-media):not(.indexed-thumbnail)"
  );
  thumbnails.forEach((e, ind) => {
    if (!e.classList.contains("indexed-thumbnail")) {
      e.classList.add("ytd-thumbnail" + (maxInd + ind));
      e.classList.add("indexed-thumbnail");
    }
  });
  randoms = getRandoms(maxInd, maxInd + thumbnails.length, parseInt(thumbnails.length * sidePeekFrequency));
  randoms.forEach((i) => (i != 1 ? addMiniImage(".ytd-thumbnail" + i) : () => null));
  console.log(randoms);
  maxInd += thumbnails.length;
}

function getRandoms(min, max, length) {
  /** 重複チェック用配列 */
  var randoms = [];
  length = max - min > length ? length : max - min;

  /** 重複チェックしながら乱数作成 */
  for (i = 1; i <= length; i++) {
    while (true) {
      var tmp = intRandom(min, max);
      if (!randoms.includes(tmp)) {
        randoms.push(tmp);
        break;
      }
    }
  }

  return randoms;
}

/** min以上max以下の整数値の乱数を返す */
function intRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
