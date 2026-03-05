// 2026 Tokyo Travel Itinerary Data
const itineraryData = [
    {
        date: "2026-03-25",
        day: "Day 1",
        title: "抵達東京",
        activities: [
            { time: "11:30", text: "登機 (KHH)", location: "高雄國際機場" },
            { time: "15:55", text: "抵達日本 (NRT)", location: "成田國際機場" },
            { time: "", text: "搭乘 SKYACCESS 到押上", location: "" },
            { time: "", text: "民宿 Check-in", location: "抵達民宿", url: "https://maps.app.goo.gl/5p2kRMr3GTWvwoXy8" },
            { time: "21:00", text: "燒肉 JUMBO (已訂位)", location: "燒肉 JUMBO", url: "https://maps.app.goo.gl/KAePYHnzjx4dMNVt6" },
            { time: "", text: "東京鐵塔或附近逛逛", location: "東京鐵塔", url: "https://maps.app.goo.gl/kpriCHzjzH3edrUGA" }
        ]
    },
    {
        date: "2026-03-26",
        day: "Day 2",
        title: "澀谷與中目黑",
        activities: [
            { time: "", text: "Shake Shack", location: "", url: "" },
            { time: "", text: "I'm Dount", location: "", url: "" },
            { time: "", text: "中目黑探索", location: "中目黑", url: "" },
            { time: "", text: "澀谷逛街", location: "澀谷", url: "" },
            { time: "", text: "代官山散策", location: "代官山", url: "" },
            { time: "", text: "AFURI 拉麵午餐", location: "AFURI", url: "" }
        ]
    },
    {
        date: "2026-03-27",
        day: "Day 3",
        title: "鎌倉江之島一日遊",
        activities: [
            { time: "", text: "搭乘 JR 前往鎌倉", location: "", url: "" },
            { time: "", text: "鶴岡八幡宮", location: "鎌倉", url: "" },
            { time: "", text: "午餐 (Giraffa 咖哩 / Kaedena 釜飯)", location: "鎌倉", url: "" },
            { time: "", text: "鎌倉大佛", location: "高德院", url: "" },
            { time: "", text: "江之島走走", location: "江之島", url: "" },
            { time: "", text: "七里濱停車場拍照", location: "七里濱", url: "" },
            { time: "", text: "返回民宿", location: "", url: "" }
        ]
    },
    {
        date: "2026-03-28",
        day: "Day 4",
        title: "新宿與表參道",
        activities: [
            { time: "", text: "新宿逛街", location: "新宿", url: "" },
            { time: "", text: "表參道散步", location: "表參道", url: "" },
            { time: "", text: "麵散 烏龍麵", location: "麵散", url: "" },
            { time: "", text: "原宿探索", location: "原宿", url: "" },
            { time: "", text: "牛舌檸檬 (名店)", location: "牛舌檸檬", url: "https://tabelog.com/tw/tokyo/A1304/A130401/13264721/" }
        ]
    },
    {
        date: "2026-03-29",
        day: "Day 5",
        title: "川越小江戶",
        activities: [
            { time: "", text: "川越 小江戶一日遊", location: "川越", url: "" },
            { time: "", text: "上野買藥妝", location: "上野", url: "" }
        ]
    },
    {
        date: "2026-03-30",
        day: "Day 6: 築地與秋葉原",
        title: "築地與秋葉原",
        activities: [
            { time: "", text: "築地市場 吃早餐", location: "築地", url: "" },
            { time: "", text: "上野公園", location: "上野", url: "" },
            { time: "", text: "秋葉原電器街", location: "秋葉原", url: "" },
            { time: "", text: "銀座奢華下午", location: "銀座", url: "" },
            { time: "", text: "炸豬排 丸七 銀座", location: "丸七 銀座", url: "" }
        ]
    },
    {
        date: "2026-03-31",
        day: "Day 7",
        title: "淺草與回程",
        activities: [
            { time: "", text: "淺草雷門", location: "淺草", url: "" },
            { time: "", text: "前往成田機場", location: "NRT", url: "" }
        ]
    }
];

// DOM Elements
const itineraryContainer = document.getElementById('itinerary-list');
const dayButtons = document.querySelectorAll('.day-btn');

// Fetch Weather Info (Mocked since trip is too far in future)
function getWeatherInfo(date) {
    const today = new Date();
    const targetDate = new Date(date);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // JMA usually provides 7-day forecast
    if (diffDays >= 0 && diffDays <= 7) {
        // Here we could fetch from JMA if we had a proxy/backend, 
        // but for now we follow the requirement: show "未有資料" for future
        return "未有資料";
    }
    return "未有資料";
}

// Render Itinerary
function renderItinerary(filterDay = 'all') {
    itineraryContainer.innerHTML = '';

    itineraryData.forEach((dayData, index) => {
        if (filterDay !== 'all' && filterDay !== index.toString()) return;

        const weather = getWeatherInfo(dayData.date);
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        dayCard.innerHTML = `
            <div class="day-header">
                <h2>${dayData.day}: ${dayData.title}</h2>
                <span class="day-date">${dayData.date}</span>
            </div>
            
            <div class="day-meta-top">
                <a href="https://maps.app.goo.gl/ecJmMpVyiTBaB2zQ7" target="_blank" class="guesthouse-link">
                    <i data-lucide="home"></i> 民宿地點
                </a>
                <div class="weather-info">
                    <span class="weather-title"><i data-lucide="cloud-sun"></i> 當天天氣資訊:</span>
                    <span class="weather-status">${weather}</span>
                </div>
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
