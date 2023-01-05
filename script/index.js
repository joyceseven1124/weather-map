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
    isSunnywithCloudy: [2, 3, 4, 12, 15, 16, 19, 21, 24, 25, 34],
    isOvercast: [5, 6, 7, 17, 22, 26, 27, 28],
    isThunderstorm: [8, 9, 10, 13, 18, 20, 29, 30, 41],
    isRain: [11, 14, 31, 32, 33, 35, 36, 38, 39],
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
    //weatherPlace.style.bottom = "10px";
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

function citySelectorclose() {
  citySelectorContainer.style.display = "none";
}

document.querySelector("#close").addEventListener("click", () => {
  citySelectorclose();
});

for (let i = 0; i < 19; i++) {
  //onmouseover
  document.getElementById("helpList" + i).addEventListener("mouseover", (e) => {
    document.getElementById("helpList" + i).style.cssText =
      "background-color: #363737";
    document.getElementById("arrow").style.cssText = "display:none";
    currentItem = i;
  });
}

for (let i = 0; i < 19; i++) {
  //onmouseout
  document.getElementById("helpList" + i).addEventListener("mouseout", (e) => {
    document.getElementById("helpList" + i).style.cssText =
      "background-color: rgb(126, 125, 122)";
    document.getElementById("arrow").style.cssText = "display:none";
  });
}

for (let i = 0; i < 19; i++) {
  document.getElementById("helpList" + i).addEventListener("click", (e) => {
    // document.getElementById("helpList" + i).style.cssText =
    //   "background-color: #363737;";
    // document.getElementById("arrow").style.cssText = "display:none";
    citySelectorclose();
    console.log(e.target.textContent);
    e.preventDefault();
    region = e.target.textContent; //「電腦版」點擊後的幫助清單
    fetchWeather(region, day);
  });
}

document.querySelector(".overlay").addEventListener("click", () => {
  if (modalEl.classList.value === "modal active") {
    modalEl.style.opacity = 0;
  }

  overlayEl.style.display = "none";
  bodyEl.style.overflowY = "none";
  modalEl.classList.remove("active");
});

const arrow = document.getElementById("arrow");
const items = document.querySelectorAll("li");
const container = document.getElementById("citySelector");
let currentItem = 0;

document.addEventListener("keydown", function (event) {
  event.preventDefault();
  for (let i = 0; i < 19; i++) {
    document.getElementById("helpList" + i).style.cssText =
      "background-color: rgb(126, 125, 122)";
  }
  document.getElementById("arrow").style.cssText = "display:block";
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
        }
      }
      break;
    case "ArrowUp":
      // move the arrow to the previous item
      if (currentItem > 0) {
        currentItem--;
        arrow.style.top = items[currentItem].offsetTop + "px";
        container.scrollTop = items[currentItem].offsetTop;
      }
      break;
    case "Enter":
      citySelectorclose();
      region = items[currentItem].textContent;
      fetchWeather(region, day);
  }
});
