console.log("TEST.");

const bodyEl = document.querySelector("body");
const overlayEl = document.querySelector(".overlay ");
const modalEl = document.querySelector(".modal ");
const citySelectorContainer = document.querySelector(".citySelector-container");

const countryList = [
  {
    tage: "taipei_city",
    place: "臺北市",
  },
  {
    tage: "new_taipei_city",
    place: "新北市",
  },
  {
    tage: "taichung_city",
    place: "臺中市",
  },
  {
    tage: "tainan_city",
    place: "臺南市",
  },
  {
    tage: "kaohsiung_city",
    place: "高雄市",
  },
  {
    tage: "keelung_city",
    place: "基隆市",
  },
  {
    tage: "taoyuan_country",
    place: "桃園市",
  },
  {
    tage: "hsinchu_city",
    place: "新竹市",
  },
  {
    tage: "hsinchu_country",
    place: "新竹縣",
  },
  {
    tage: "miaoli_country",
    place: "苗栗縣",
  },
  {
    tage: "changhua_country",
    place: "彰化縣",
  },
  {
    tage: "nantou_country",
    place: "南投縣",
  },
  {
    tage: "yunlin_country",
    place: "雲林縣",
  },
  {
    tage: "chiayi_city",
    place: "嘉義市",
  },
  {
    tage: "chiayi_country",
    place: "嘉義縣",
  },
  {
    tage: "pingtung_country",
    place: "屏東縣",
  },
  {
    tage: "yilan_country",
    place: "宜蘭縣",
  },
  {
    tage: "hualien_country",
    place: "花蓮縣",
  },
  {
    tage: "taitung_country",
    place: "臺東縣",
  },
];

region = ""; //預設區域名稱

let now_Date = new Date(); //現在時間
now_Date.toISOString().split("T")[0];

const offset = now_Date.getTimezoneOffset();
now_Date = new Date(now_Date.getTime() - offset * 60 * 1000);
day = now_Date.toISOString().split(".")[0];
today_now_date = now_Date.toISOString().split(".")[0].split("T")[0];
today_now_time = now_Date.toISOString().split(".")[0].split("T")[1];

// for (var i = 0; i < 5; i++) {
//   window.setTimeout(function () {
//     updatetime();
//   }, 1000);
// }

var startTime = new Date().getTime();
var second = Number(today_now_time.split(":")[2]);

// 用來模擬延遲 Queue 的動作
window.setInterval(function () {
  var i = 0;
  while (i++ < 999999) {}
}, 0);

window.setInterval(function () {
  var endTime = new Date().getTime();
  if (second == 60) {
    second = 0;
  }
  second++;
  updatetime(second);
}, 1000);

function updatetime(second) {
  if (second == 60) {
    second = "00";
  } else if (second == 1) {
    second = "01";
  } else if (second == 2) {
    second = "02";
  } else if (second == 3) {
    second = "03";
  } else if (second == 4) {
    second = "04";
  } else if (second == 5) {
    second = "05";
  } else if (second == 6) {
    second = "06";
  } else if (second == 7) {
    second = "07";
  } else if (second == 8) {
    second = "08";
  } else if (second == 9) {
    second = "09";
  }

  our_today_now_date =
    today_now_date.split("-")[0] +
    "/" +
    today_now_date.split("-")[1] +
    "/" +
    today_now_date.split("-")[2]; //今日日期
  our_today_now_time =
    today_now_time.split(":")[0] +
    ":" +
    today_now_time.split(":")[1] +
    ":" +
    second;

  now_clock = our_today_now_date + " " + our_today_now_time; //現在時刻

  document.querySelector(".time").innerHTML = now_clock;

  // const document.qu
}

async function fetchWeather(region, day) {
  let url = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-480FD02B-2155-49AB-B24B-1796E44F6333&locationName=${region}`;
  citySelectorclose();
  const response = await fetch(url);
  const rawData = await response.json();

  const records = rawData["records"]["location"][0]["weatherElement"];
  const Wx = records[0]["time"][0]["parameter"]["parameterName"];
  const WxValue = records[0]["time"][0]["parameter"]["parameterValue"];
  const PoP = records[1]["time"][0]["parameter"]["parameterName"];
  const MinT = records[2]["time"][0]["parameter"]["parameterName"];
  const CI = records[3]["time"][0]["parameter"]["parameterName"];
  const MaxT = records[4]["time"][0]["parameter"]["parameterName"];

  const regionWeather = [Wx, PoP, MinT, CI, MaxT, WxValue];

  const weatherInfo = {
    region: region,
    date: day,
    Wx: regionWeather[0],
    PoP: regionWeather[1],
    MinT: regionWeather[2],
    CI: regionWeather[3],
    MaxT: regionWeather[4],
    WxValue: regionWeather[5],
  };

  console.log(weatherInfo);

  const now_place = document.querySelector(".now_place");
  now_place.innerHTML = "縣市" + weatherInfo["region"];

  const now_weather = document.querySelector(".now_weather");
  now_place.innerHTML =
    "縣市：" +
    weatherInfo["region"] +
    "<br />" +
    "天氣：" +
    weatherInfo["Wx"] +
    "<br />" +
    "降雨機率：" +
    weatherInfo["PoP"] +
    "％" +
    "<br />" +
    "舒適度：" +
    weatherInfo["CI"] +
    "<br />" +
    "最低溫度：" +
    weatherInfo["MinT"] +
    "°C" +
    "<br />" +
    "最高溫度：" +
    weatherInfo["MaxT"] +
    "°C";
  modalEl.classList.add("active");
  overlayEl.style.display = "block";
  modalEl.style.opacity = 1;
  bodyEl.style.overflowY = "hidden";

  const weatherTypes = {
    isClear: [1],
    isSunnywithCloudy: [2, 3, 19, 24, 25, 26],
    isOvercast: [4, 5, 6, 7, 9, 20, 27, 28],
    isThunderstorm: [15, 16, 17, 18, 21, 22, 33, 34, 35, 36, 41],
    isRain: [8, 10, 11, 12, 13, 14, 29, 30, 31, 32, 38, 39],
    isSnowing: [23, 37, 42],
  };

  //console.log(weatherInfo["WxValue"])
  weatherNumber = Number(weatherInfo["WxValue"]);
  const weatherIcon = document.querySelector("#weatherIcon");
  const weatherPlace = document.querySelector(".weather");

  if (weatherTypes["isClear"].includes(weatherNumber)) {
    overlayEl.style.backgroundColor = "var(--isClear)";
    weatherIcon.src = "./assets/isClear.png";
  } else if (weatherTypes["isOvercast"].includes(weatherNumber)) {
    overlayEl.style.backgroundColor = "var(--isOvercast)";
    weatherIcon.src = "./assets/isOvercast.png";
    weatherPlace.style.bottom = "60px";
  } else if (weatherTypes["isThunderstorm"].includes(weatherNumber)) {
    overlayEl.style.backgroundColor = "var(--isThunderstorm)";
    weatherIcon.src = "./assets/isThunderstorm.png";
    weatherPlace.style.bottom = "10px";
  } else if (weatherTypes["isRain"].includes(weatherNumber)) {
    overlayEl.style.backgroundColor = "var(--isRain)";
    weatherIcon.src = "./assets/isRain.png";
    weatherPlace.style.bottom = "40px";
  } else if (weatherTypes["isSnowing"].includes(weatherNumber)) {
    overlayEl.style.backgroundColor = "var(--isSnowing)";
    weatherIcon.src = "./assets/isSnowing.png";
    weatherPlace.style.bottom = "20px";
  } else if (weatherTypes["isSunnywithCloudy"].includes(weatherNumber)) {
    overlayEl.style.backgroundColor = "var(--isSunnywithCloudy)";
    weatherIcon.src = "./assets/isSunnywithCloudy.png";
    weatherPlace.style.bottom = "60px";
  }
  //測試區
  //overlayEl.style.backgroundColor = "yellow";
  //weatherIcon.src = "./assets/isSunnywithCloudy.png";
  //weatherPlace.style.bottom = "60px";
}

for (const city of countryList) {
  document.getElementById(city.tage).addEventListener("touchstart", (e) => {
    e.preventDefault();
    console.log(city.place);
    region = city.place; //「手機版」點擊後的區域名稱
    fetchWeather(region, day);
  });
}

for (const city of countryList) {
  document.getElementById(city.tage).addEventListener("click", (e) => {
    console.log(city.tage);
    e.preventDefault();
    console.log(city.place);
    region = city.place; //「電腦版」點擊後的區域名稱
    fetchWeather(region, day);
  });
}

function gethelp() {
  citySelectorContainer.style.display = "block";
}

document.querySelector("#close").addEventListener("click", () => {
  citySelectorContainer.style.display = "none";
});

document.querySelector(".overlay").addEventListener("click", () => {
  if (modalEl.classList.value === "modal active") {
    modalEl.style.opacity = 0;
  }

  overlayEl.style.display = "none";
  bodyEl.style.overflowY = "none";
  modalEl.classList.remove("active");
});

function citySelectorclose() {
  citySelectorContainer.style.display = "none";
}

const menu = document.querySelector("citySelector-container");
const arrow = document.getElementById("arrow");
const items = document.querySelectorAll("li");
const container = document.getElementById("citySelector");
let currentItem = 0;
document.addEventListener("keydown", function (event) {
  event.preventDefault();
  switch (event.key) {
    case "ArrowDown":
      if (arrow.offsetTop + arrow.offsetHeight < container.offsetHeight) {
        if (currentItem < items.length - 1) {
          currentItem++;
          arrow.style.top = items[currentItem].offsetTop + "px";
        }
      } else {
        if (currentItem < items.length - 1) {
          currentItem++;
          arrow.style.top = items[currentItem].offsetTop + "px";
          container.scrollTop = items[currentItem].offsetTop;
        } else if (currentItem == items.length - 1) {
          currentItem = 0;
          container.scrollTop = items[currentItem].offsetTop;
          arrow.style.top = items[currentItem].offsetTop + "px";
        }
      }
      region = items[currentItem].textContent;
      break;
    case "ArrowUp":
      // move the arrow to the previous item
      if (currentItem == 0) {
        currentItem = items.length - 1;
        arrow.style.top = items[currentItem].offsetTop + "px";
        container.scrollTop = items[currentItem].offsetTop;
      } else if (currentItem > 0) {
        currentItem--;
        arrow.style.top = items[currentItem].offsetTop + "px";
        container.scrollTop = items[currentItem].offsetTop;
      }
      region = items[currentItem].textContent;
      break;

    case "Enter":
      if (citySelectorContainer.style.display === "none") {
        return;
      } else {
        //region = items[currentItem].textContent;
        fetchWeather(region, day);
      }
      citySelectorclose();
  }
});

document.addEventListener("touchstart", function (event) {
  // get the position of the touch
  const touchY = event.target.offsetTop;

  // find the closest li element to the touch position
  let closestItem = null;
  let closestDistance = Infinity;
  for (const item of items) {
    const distance = Math.abs(touchY - item.offsetTop);
    if (distance < closestDistance) {
      closestItem = item;
      closestDistance = distance;
    }
  }

  // move the arrow to the closest li element
  //arrow.style.left = closestItem.offsetLeft + 'px';
  //arrow.style.top = closestItem.offsetTop + 'px';
});

items.forEach((element) => {
  element.addEventListener("mouseover", mouseEnterEffect);
  element.addEventListener("mouseout", mouseMoveEffect);
});

function mouseEnterEffect(e) {
  arrow.style.top = this.offsetTop + "px";
  region = this.textContent;
  arrow.style.backgroundColor = "rgba(0, 0, 0, 0)";
  this.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
}

function mouseMoveEffect(e) {
  arrow.style.backgroundColor = "rgba(0, 0, 0, 0.2)";
  this.style.backgroundColor = "";
  arrow.classList.add(this.textContent);
  if (arrow.classList.length > 2) {
    arrow.classList.remove(arrow.classList[1]);
  }
}

arrow.addEventListener("click", (e) => {
  region = arrow.classList[1];
  fetchWeather(region, day);
});

const body = document.body;
function checkElementType(e) {
  if (e.type === "keydown") {
    items.forEach((element) => {
      element.removeEventListener("mouseover", mouseEnterEffect);
      element.removeEventListener("mouseout", mouseMoveEffect);
    });
  } else {
    items.forEach((element) => {
      element.addEventListener("mouseover", mouseEnterEffect);
      element.addEventListener("mouseout", mouseMoveEffect);
    });
  }
}
body.addEventListener("keydown", checkElementType, false); //偵測按下按鍵的行為
body.addEventListener("mouseover", checkElementType, false);
