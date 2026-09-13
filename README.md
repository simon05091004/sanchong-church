# 新北市召會 三重會所 — 網站

參照淡水會所網站的架構所製作的靜態網站，直接放在 GitHub Pages 上即可運作，
**不需要任何後端、資料庫或安裝步驟**。

網址：`https://simon05091004.github.io/sanchong/`

---

## 一、檔案結構

```
sanchong/
├── index.html              首頁
├── faith.html              首頁 › 我們的信仰
├── practice.html           首頁 › 我們的實行
├── testimony.html          首頁 › 蒙恩交通
├── about.html              召會簡介
├── church-life.html        召會簡介 › 召會生活
├── truth.html              真理追求
├── morning-revival.html    真理追求 › 晨興聖言
├── prayer.html             代禱事項
├── meetings.html           聚會時間
├── contact.html            聯絡我們
└── assets/
    ├── style.css           全站樣式（配色、版面、響應式）
    └── site.js             標題帶 / 選單 / 頁尾（全站共用）
```

選單結構與淡水會所相同：

| 主選單 | 子選單 |
| --- | --- |
| 首頁 | 我們的信仰、我們的實行、蒙恩交通 |
| 召會簡介 | 召會生活 |
| 真理追求 | 晨興聖言 |
| 代禱事項 | — |
| 聚會時間 | — |
| 聯絡我們 | — |

---

## 二、最常用的三種修改

### 1. 改會所名稱、標題帶經文、頁尾聯絡資訊

只改 **`assets/site.js`** 最上面的 `SITE` 設定，全站會一起更新：

```js
var SITE = {
  org:  "新北市召會",
  hall: "三重會所",
  verse:    "在祂裏面，你們也同被建造，成為神在靈裏的居所。",
  verseRef: "以弗所書 2章22節",
  address: "新北市三重區　　　路　　號",
  phone:   "(02) 0000-0000",
  email:   "churchinsanchong@example.com"
};
```

### 2. 增加或修改選單項目

一樣在 `assets/site.js`，改 `NAV` 陣列：

```js
{ id: "truth", label: "真理追求", href: "truth.html", children: [
    { id: "morning-revival", label: "晨興聖言", href: "morning-revival.html" }
]},
```

新增一頁時：複製一個現有的 `.html` 檔 → 改 `<body data-page="這頁的 id">`
→ 在 `NAV` 裡加上同樣的 `id`，選單才會把它標成紅色。

### 3. 改配色

改 `assets/style.css` 最上面的 `:root`：

| 變數 | 目前色值 | 用途 |
| --- | --- | --- |
| `--band` | `#A9C9DF` | 頂端標題帶底色（粉藍） |
| `--band-ink` | `#16242E` | 標題帶上的文字 |
| `--brand` | `#2E6D9E` | 頁面大標題 |
| `--brand-dark` | `#1F5480` | 段落標題、連結 |
| `--active` | `#1580CE` | 目前所在頁面的選單顏色 |
| `--hover` | `#4A86B5` | 選單滑過的顏色 |
| `--verse` | `#3E7BA8` | 右側經文區塊的字 |
| `--bg-soft` | `#F4F9FC` | 卡片與提醒方塊的底色 |
| `--line` | `#DCE5EC` | 分隔線 |

整組色票已通過 WCAG AA 對比度檢查（一般內文 ≥ 4.5:1、大字 ≥ 3:1）。
換色時請一併確認對比度，避免淺色字在白底上看不清楚。

---

## 三、需要定期更新的頁面

| 頁面 | 更新頻率 | 更新位置 |
| --- | --- | --- |
| `morning-revival.html` | 每週 | 標題區（訓練、週次、篇題、讀經）＋【週一】～【週六】綱目 |
| `prayer.html` | 每週／每月 | 各 `<div class="group">` 區塊 |
| `testimony.html` | 不定期 | 複製一個 `<article class="story">` 貼到最上面 |
| `meetings.html` | 異動時 | `<ol class="meetings">` 清單 |

晨興綱目的階層寫法：

```html
<li class="lv1"><span class="marker">壹、</span>大點……</li>   <!-- 壹、貳、參 -->
<li class="lv2"><span class="marker">一、</span>中點……</li>   <!-- 一、二、三 -->
<li class="lv3"><span class="marker">1.</span>小點……</li>   <!-- 1. 2. 3. -->
<li class="lv4"><span class="marker">a.</span>更小點……</li> <!-- a. b. c. -->
```

---

## 四、待補的實際資料

檔案中凡標示 **★** 或 `（請填寫）` 之處，都是需要換成實際內容的地方：

- [ ] 會所地址、電話、Email（`assets/site.js` 的 `SITE` ＋ `contact.html`）
- [ ] 各項聚會的實際時間（`meetings.html`）
- [ ] 交通方式與 Google 地圖嵌入碼（`contact.html`）
- [ ] 會所沿革（`about.html`）
- [ ] 會所與聚會照片（放進 `assets/`，取代 `.placeholder` 區塊）
- [ ] 真理課程、生命課程的上課時間（`truth.html`）
- [ ] 每週晨興綱目（`morning-revival.html`）

---

## 五、本機預覽

```bash
cd sanchong
python3 -m http.server 8000
# 瀏覽器開啟 http://localhost:8000/
```

---

## 六、說明

- 網站不使用任何外部框架，只用一支 CSS 與一支 JS，長期維護成本低。
- 中文字型使用 Google Fonts 的 Noto Sans TC；若無法連外，會自動退回系統內建中文字型。
- 未開啟 JavaScript 時，仍會顯示簡易的主選單（`<noscript>` 備援）。
- 《晨興聖言》綱目著作權屬原出版者所有，請僅供會所弟兄姊妹追求之用。
