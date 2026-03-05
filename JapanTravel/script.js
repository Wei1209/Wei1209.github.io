// 2026 Tokyo Travel Itinerary Data
const itineraryData = [
    {
        date: "2026-03-25",
        day: "Day 1",
        title: "抵達東京",
        activities: [
            { time: "11:30", text: "登機 (KHH)", location: "高雄國際機場", url: "" },
            { time: "15:55", text: "抵達日本 (NRT)", location: "成田國際機場", url: "" },
            { time: "", text: "搭乘 SKYACCESS 到押上", location: "", url: "" },
            { time: "", text: "民宿 Check-in", location: "", url: "https://maps.app.goo.gl/5p2kRMr3GTWvwoXy8" },
            { time: "21:00", text: "燒肉 JUMBO (已訂位)", location: "", url: "https://maps.app.goo.gl/KAePYHnzjx4dMNVt6" },
            { time: "", text: "東京鐵塔或附近逛逛", location: "東京鐵塔", url: "https://maps.app.goo.gl/kpriCHzjzH3edrUGA" }
        ]
    },
    {
        date: "2026-03-26",
        day: "Day 2",
        title: "澀谷與中目黑",
        activities: [
            { time: "", text: "I'm Dount", location: "", url: "https://maps.app.goo.gl/fq7vQpcQyWXhpHX46" },
            { time: "", text: "AFURI 拉麵", location: "", url: "https://maps.app.goo.gl/5r4UReXBw49nEJM59" },
            { time: "", text: "中目黑逛街", location: "中目黑", url: "" },
            { time: "", text: "代官山逛街", location: "代官山", url: "" },
            { time: "", text: "澀谷逛街", location: "澀谷", url: "" },
            { time: "", text: "Shake Shack 澀谷", location: "", url: "https://maps.app.goo.gl/5m6T9sKyzM24nRSa6" },
        ]
    },
    {
        date: "2026-03-27",
        day: "Day 3",
        title: "鎌倉江之島一日遊",
        activities: [
            { time: "", text: "搭乘 JR 前往鎌倉", location: "", url: "" },
            { time: "", text: "鶴岡八幡宮", location: "鎌倉", url: "https://maps.app.goo.gl/NEynKT5b9B68rXMv6" },
            { time: "", text: "午餐 (Giraffa 咖哩 / Kaedena 釜飯)", location: "鎌倉", url: "" },
            { time: "", text: "鎌倉大佛", location: "高德院", url: "https://maps.app.goo.gl/jxHS1RcKtjTDnZzRA" },
            { time: "", text: "七里濱停車場拍照", location: "七里濱", url: "https://maps.app.goo.gl/vCSv8SWzBVpcPZfs9" },
            { time: "", text: "江之島走走", location: "江之島", url: "" },
            { time: "", text: "返回民宿", location: "", url: "" }
        ]
    },
    {
        date: "2026-03-28",
        day: "Day 4",
        title: "新宿與表參道",
        activities: [
            { time: "", text: "新宿逛街", location: "新宿", url: "" },
            { time: "11:30", text: "牛舌檸檬 總本店 (已訂位)", location: "", url: "https://maps.app.goo.gl/56oxsT2g3pPHYexe6" },
            { time: "", text: "表參道逛街", location: "表參道", url: "" },
            { time: "", text: "麵散 烏龍麵", location: "", url: "https://maps.app.goo.gl/hFD9anTpePfzn9iP9" },
            { time: "", text: "原宿探索", location: "原宿", url: "" },
        ]
    },
    {
        date: "2026-03-29",
        day: "Day 5",
        title: "川越小江戶",
        activities: [
            { time: "", text: "川越 小江戶一日遊", location: "川越", url: "https://maps.app.goo.gl/DJEBsUdraqeHE2Hh6" },
            { time: "", text: "上野買藥妝", location: "上野", url: "" }
        ]
    },
    {
        date: "2026-03-30",
        day: "Day 6: 築地與秋葉原",
        title: "築地與秋葉原",
        activities: [
            { time: "", text: "築地市場 吃早餐", location: "築地", url: "https://maps.app.goo.gl/bpm8BoQDsCgvNGCy8" },
            { time: "", text: "秋葉原電器街", location: "秋葉原", url: "https://maps.app.goo.gl/mbuFwAVxKQrcGF2f7" },
            { time: "", text: "銀座", location: "銀座", url: "" },
            { time: "", text: "炸豬排 丸七 銀座", location: "", url: "https://maps.app.goo.gl/We7C1eeyTHqkGPoh6" }
        ]
    },
    {
        date: "2026-03-31",
        day: "Day 7",
        title: "淺草與回程",
        activities: [
            { time: "", text: "上野", location: "上野", url: "" },
            { time: "", text: "淺草", location: "淺草", url: "" },
            { time: "", text: "前往成田機場", location: "成田國際機場", url: "" }
        ]
    }
];

// DOM Elements
const itineraryContainer = document.getElementById('itinerary-list');
const dayButtons = document.querySelectorAll('.day-btn');

// JMA Weather Code Mapping to Lucide Icons & Text
const weatherMap = {
    "100": { icon: "sun", text: "晴天" },
    "101": { icon: "cloud-sun", text: "晴時多雲" },
    "102": { icon: "cloud-sun-rain", text: "晴轉雨" },
    "200": { icon: "cloud", text: "多雲" },
    "201": { icon: "cloud-sun", text: "多雲時晴" },
    "300": { icon: "cloud-rain", text: "雨天" },
    "400": { icon: "cloud-snow", text: "雪天" }
};

function getIconByCode(code) {
    const mainCode = code.charAt(0) + "00";
    if (weatherMap[code]) return weatherMap[code];
    if (weatherMap[mainCode]) return weatherMap[mainCode];
    return { icon: "help-circle", text: "未知" };
}

let jmaForecastData = null;

async function fetchWeatherData() {
    try {
        // Tokyo Area Code: 130000
        const response = await fetch('https://www.jma.go.jp/bosai/forecast/data/forecast/130000.json');
        const data = await response.json();
        jmaForecastData = data;
        return data;
    } catch (error) {
        console.error("Failed to fetch JMA weather data:", error);
        return null;
    }
}

function getForecastForDate(dateStr) {
    if (!jmaForecastData) return null;

    const targetDate = new Date(dateStr).toISOString().split('T')[0];

    // Case 1: Short-term (Day 0, 1, 2)
    const shortTerm = jmaForecastData[0].timeSeries[0];
    const shortIdx = shortTerm.timeDefines.findIndex(d => d.startsWith(targetDate));
    if (shortIdx !== -1) {
        const weatherText = shortTerm.areas[0].weathers[shortIdx];
        const code = jmaForecastData[0].timeSeries[0].areas[0].weatherCodes[shortIdx];
        const tempIdx = jmaForecastData[0].timeSeries[2].timeDefines.findIndex(d => d.startsWith(targetDate));
        let tempStr = "";
        if (tempIdx !== -1) {
            const temps = jmaForecastData[0].timeSeries[2].areas[0].temps;
            // Temps usually come in pairs (min, max) or just current/next
            tempStr = `${temps[tempIdx]}°C`;
        }
        return { text: weatherText, code: code, temp: tempStr };
    }

    // Case 2: Weekly (Day 2-7)
    const weekly = jmaForecastData[1].timeSeries[0];
    const weeklyIdx = weekly.timeDefines.findIndex(d => d.startsWith(targetDate));
    if (weeklyIdx !== -1) {
        const code = weekly.areas[0].weatherCodes[weeklyIdx];
        const tempIdx = jmaForecastData[1].timeSeries[1].timeDefines.findIndex(d => d.startsWith(targetDate));
        let tempStr = "";
        if (tempIdx !== -1) {
            const min = jmaForecastData[1].timeSeries[1].areas[0].tempsMin[tempIdx];
            const max = jmaForecastData[1].timeSeries[1].areas[0].tempsMax[tempIdx];
            tempStr = `${min}°C / ${max}°C`;
        }
        return { text: "", code: code, temp: tempStr }; // Weekly often lacks long text, uses codes
    }

    return null;
}

// Render Itinerary
async function renderItinerary(filterDay = 'all') {
    if (!jmaForecastData) await fetchWeatherData();

    itineraryContainer.innerHTML = '';

    itineraryData.forEach((dayData, index) => {
        if (filterDay !== 'all' && filterDay !== index.toString()) return;

        const forecast = getForecastForDate(dayData.date);
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';

        let weatherHTML = "";
        if (forecast) {
            const { icon, text } = getIconByCode(forecast.code);
            weatherHTML = `
                <div class="weather-info">
                    <span class="weather-title"><i data-lucide="${icon}"></i> 今日天氣:</span>
                    <span class="weather-status">${forecast.text || text} ${forecast.temp ? `(${forecast.temp})` : ''}</span>
                </div>
            `;
        } else {
            weatherHTML = `
                <div class="weather-info">
                    <span class="weather-title"><i data-lucide="cloud-sun"></i> 當天天氣資訊:</span>
                    <span class="weather-status">未有資料</span>
                </div>
            `;
        }

        dayCard.innerHTML = `
            <div class="day-header">
                <h2>${dayData.day}: ${dayData.title}</h2>
                <span class="day-date">${dayData.date}</span>
            </div>
            
            <div class="day-meta-top">
                <a href="https://maps.app.goo.gl/ecJmMpVyiTBaB2zQ7" target="_blank" class="guesthouse-link">
                    <i data-lucide="home"></i> 民宿地點
                </a>
                ${weatherHTML}
            </div>

            <div class="activities">
                ${dayData.activities.map((act) => `
                    <div class="activity-item">
                        <div class="activity-info">
                            ${act.time ? `<div class="activity-time">${act.time}</div>` : ''}
                            <div class="activity-text">${act.text}</div>
                            <div class="activity-meta">
                                ${act.location ? `
                                    <span class="meta-location">
                                        <i data-lucide="map-pin" style="width:14px"></i> ${act.location}
                                    </span>
                                ` : ''}
                                ${act.url ? `
                                    <a href="${act.url}" target="_blank" class="meta-link">
                                        <i data-lucide="external-link" style="width:14px"></i> 地圖連結
                                    </a>
                                ` : ''}
                            </div>
                        </div>
                        ${act.location ? `
                            <div class="activity-actions">
                                <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(act.location)}+美食" target="_blank" class="gourmet-btn">
                                    <i data-lucide="utensils" style="width:16px"></i> 附近美食
                                </a>
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        `;
        itineraryContainer.appendChild(dayCard);
    });

    // Re-initialize Lucide Icons
    lucide.createIcons();
}

// Day Filter Logic
dayButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        dayButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderItinerary(btn.getAttribute('data-day'));
    });
});

// Sakura Petal Animation
function createSakura() {
    const sakuraContainer = document.getElementById('sakura');
    for (let i = 0; i < 20; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal';

        const size = Math.random() * 10 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;

        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDuration = `${Math.random() * 10 + 10}s`;
        petal.style.animationDelay = `${Math.random() * 10}s`;

        sakuraContainer.appendChild(petal);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createSakura();
    renderItinerary();
});
