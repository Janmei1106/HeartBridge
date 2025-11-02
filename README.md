# 🩺 心之旋律 - 量子情緒監測系統

一個完整的 ASD（自閉症光譜）情緒預警與安撫介入系統，整合 Apple Watch 即時心率數據，透過量子幸福曲線（QHC）視覺化情緒狀態。

## ✨ 功能特色

### 🔄 互動系統（主功能）
- **即時數據監測**：每 0.2 秒更新 HR、HRV、EDA 三項生理指標
- **量子幸福曲線（QHC）**：創新視覺化情緒穩定度（0-1 範圍）
- **智能風險偵測**：門檻判斷 + 趨勢分析雙重機制
- **預警倒數系統**：5-10 秒提前預警，爭取介入時機
- **安撫介入功能**：
  - 🎵 自動播放安撫音樂
  - 💨 呼吸引導圈（4秒吸、4秒吐動畫）
  - 💗 自動回穩機制
- **Apple Watch 整合**：支援 `window.updateFromNative` 接收真實心率數據
- **互動控制面板**：可調整門檻、觸發測試、手動介入

### 📚 系統文檔
- 完整的技術說明文檔
- 運作流程圖
- 偵測邏輯詳解
- QHC 原理說明

### 🛠️ HeartBridge 指南
- iOS/watchOS 開發指南
- Xcode 設定檢查清單
- 完整程式碼範例
- 演示流程腳本

## 🎯 核心技術

- **React 18** + **TypeScript**：現代化前端框架
- **Vite**：快速開發與建置工具
- **Tailwind CSS**：響應式 UI 設計
- **Canvas API**：即時曲線圖視覺化
- **Web Audio API**：音樂播放支援

## 🚀 快速開始

### 安裝依賴

```bash
npm install
```

### 啟動開發伺服器

```bash
npm run dev
```

訪問 `http://localhost:5173` 即可使用系統。

### 建置生產版本

```bash
npm run build
```

## 📱 Apple Watch 整合

系統已預設支援 Apple Watch 數據接收。當在 iPhone WebView 中載入此頁面時，iOS 端只需呼叫：

```javascript
window.updateFromNative({ hr: 85 }); // 傳入心率數值
```

系統會自動：
1. 接收心率數據
2. 模擬計算 HRV 和 EDA
3. 計算 QHC 值
4. 更新曲線圖
5. 執行風險偵測

## 📂 專案結構

```
量子情緒/
├── src/
│   ├── components/
│   │   ├── HeartMelodySystem.tsx    # 互動系統（主功能）
│   │   ├── HeartMelodyDoc.tsx      # 系統文檔
│   │   └── HeartBridgeGuide.tsx    # HeartBridge 開發指南
│   ├── App.tsx                      # 主應用（導航路由）
│   ├── main.tsx                     # 應用入口點
│   └── index.css                    # 全局樣式
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 使用說明

### 互動系統操作

1. **開始監測**：點擊「開始監測」按鈕啟動數據模擬
2. **觸發前兆**：點擊「觸發前兆」模擬情緒爆發情境
3. **查看曲線**：觀察即時更新的 HR、HRV、EDA、QHC 曲線
4. **調整門檻**：使用滑桿調整各指標的觸發閾值
5. **介入回穩**：系統自動偵測並啟動安撫介入

### 偵測邏輯

- **門檻判斷**：HR > 100 bpm、HRV < 35 ms、EDA > 6.0 μS
- **趨勢判斷**：HR 上升斜率 > 0.9 bpm/s、HRV 下降斜率 < -0.35 ms/s
- **前兆確認**：HR 快速上升 + HRV 快速下降 → 觸發預警倒數

### QHC 計算公式

```
QHC = 1 - α₁·z(HR) + α₂·z(HRV) - α₃·z(EDA)
```

其中：
- α₁, α₂, α₃ 為權重參數
- z() 為標準化函數
- 加入 0.2 Hz 量子波動模擬疊加態

## 🔧 開發說明

### 添加自訂音樂

在 `HeartMelodySystem.tsx` 中的 `<audio>` 標籤添加音檔來源：

```tsx
<audio ref={audioRef} loop>
  <source src="/path/to/your/audio.mp3" type="audio/mpeg" />
</audio>
```

### 調整更新頻率

修改 `HeartMelodySystem.tsx` 中的 `setInterval` 時間（預設 200ms = 0.2秒）：

```tsx
}, 200); // 調整此數值
```

## 📊 系統需求

- **瀏覽器**：Chrome 90+, Firefox 88+, Safari 14+
- **Node.js**：18+ （開發環境）
- **螢幕解析度**：建議 1280x720 以上（完整顯示所有功能）

## 🎓 應用場景

- **臨床輔助**：情緒監控與行為干預
- **研究演示**：ASD 情緒預警系統展示
- **教育訓練**：情緒管理教學工具
- **家庭使用**：ASD 孩童日常情緒監測

## 📝 授權

本專案為客戶專案，請遵循相關使用條款。

## 🤝 支援

如有問題或建議，請聯繫開發團隊。

