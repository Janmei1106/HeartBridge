import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, RotateCcw, AlertTriangle, Music, Wind, Activity, Target, Settings, Heart, TrendingUp, Zap, Smile, Frown, Meh, Radio } from 'lucide-react';

interface DataPoint {
  time: number;
  hr: number;
  hrv: number;
  eda: number;
  qhc: number;
}

export default function HeartMelodySystem() {
  const [isRunning, setIsRunning] = useState(false);
  const [data, setData] = useState<DataPoint[]>([]);
  const [currentValues, setCurrentValues] = useState({ hr: 80, hrv: 55, eda: 3.5, qhc: 0.85 });
  const [riskLevel, setRiskLevel] = useState<'低' | '中' | '高'>('低');
  const [warningCountdown, setWarningCountdown] = useState<number | null>(null);
  const [isIntervening, setIsIntervening] = useState(false);
  const [isBreathingCycle, setIsBreathingCycle] = useState(false); // true = 吸氣, false = 吐氣
  
  // 門檻設定
  const [thresholds, setThresholds] = useState({
    hr: 100,
    hrv: 35,
    eda: 6.0
  });
  
  // 模擬參數
  const simulationRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const breathingRef = useRef<any>(null);
  const [breathingScale, setBreathingScale] = useState(1);
  const [watchConnected, setWatchConnected] = useState(false);

  // 初始化：建立 window.updateFromNative 介面接收 Apple Watch 數據
  useEffect(() => {
    // @ts-ignore
    window.updateFromNative = (data: { hr?: number }) => {
      if (data.hr !== undefined) {
        handleWatchData(data.hr);
      }
    };
    
    return () => {
      // @ts-ignore
      if (window.updateFromNative) {
        // @ts-ignore
        delete window.updateFromNative;
      }
    };
  }, []);

  // 處理 Apple Watch 傳入的心率數據
  const handleWatchData = useCallback((hr: number) => {
    setWatchConnected(true); // 標記已連接
    setCurrentValues(prev => {
      // 根據真實 HR 模擬 HRV 和 EDA
      const hrv = hr > 100 ? Math.max(30, 55 - (hr - 80) * 0.5) : 55;
      const eda = hr > 100 ? Math.min(8, 3.5 + (hr - 80) * 0.1) : 3.5;
      const qhc = calculateQHC(hr, hrv, eda);
      
      const newPoint: DataPoint = {
        time: Date.now(),
        hr,
        hrv,
        eda,
        qhc
      };
      
      setData(prevData => [...prevData.slice(-199), newPoint]); // 保留最後200個點
      
      detectRisk({ hr, hrv, eda, qhc });
      
      return { hr, hrv, eda, qhc };
    });
  }, []);

  // 計算量子幸福曲線（QHC）
  const calculateQHC = (hr: number, hrv: number, eda: number): number => {
    // 標準化函數
    const z = (value: number, min: number, max: number) => (value - min) / (max - min);
    
    // 權重參數
    const alpha1 = 0.4; // HR 權重
    const alpha2 = 0.3; // HRV 權重
    const alpha3 = 0.3; // EDA 權重
    
    // 標準化值（HR 和 EDA 越高越差，HRV 越高越好）
    const zHR = z(hr, 60, 140);
    const zHRV = 1 - z(hrv, 20, 80); // 反向（HRV 低時 z 高）
    const zEDA = z(eda, 1, 10);
    
    // QHC 計算（加入量子波動 0.2 Hz）
    const baseQHC = 1 - alpha1 * zHR + alpha2 * zHRV - alpha3 * zEDA;
    const quantumWave = Math.sin(Date.now() / 5000 * 0.2 * Math.PI * 2) * 0.05; // 0.2 Hz 波動
    
    return Math.max(0, Math.min(1, baseQHC + quantumWave));
  };

  // 偵測風險等級
  const detectRisk = useCallback((values: { hr: number; hrv: number; eda: number; qhc: number }) => {
    const { hr, hrv, eda } = values;
    
    // 門檻判斷
    const hrOver = hr > thresholds.hr;
    const hrvUnder = hrv < thresholds.hrv;
    const edaOver = eda > thresholds.eda;
    
    // 趨勢判斷（需要歷史數據）
    let hrTrend = 0;
    let hrvTrend = 0;
    if (data.length >= 5) {
      const recent = data.slice(-5);
      hrTrend = (recent[recent.length - 1].hr - recent[0].hr) / (recent.length * 0.2);
      hrvTrend = (recent[recent.length - 1].hrv - recent[0].hrv) / (recent.length * 0.2);
    }
    
    const hrTrendHigh = hrTrend > 0.9;
    const hrvTrendLow = hrvTrend < -0.35;
    
    // 風險等級判斷
    let risk: '低' | '中' | '高' = '低';
    if (hrOver || edaOver || (hrTrendHigh && hrvTrendLow)) {
      risk = '高';
    } else if (hrvUnder || hrTrendHigh || hrvTrendLow) {
      risk = '中';
    }
    
    setRiskLevel(risk);
    
    // 如果檢測到前兆且尚未開始倒數
    if (risk === '高' && !warningCountdown && !isIntervening) {
      setWarningCountdown(5);
    }
  }, [thresholds, data, warningCountdown, isIntervening]);

  // 預警倒數
  useEffect(() => {
    if (warningCountdown !== null && warningCountdown > 0) {
      const timer = setTimeout(() => {
        setWarningCountdown(warningCountdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (warningCountdown === 0) {
      // 倒數歸零，啟動介入
      setIsIntervening(true);
      setWarningCountdown(null);
      // 啟動音樂（如果有）
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      // 啟動呼吸引導
      startBreathingGuide();
    }
  }, [warningCountdown]);

  // 啟動呼吸引導（4秒吸、4秒吐）
  const startBreathingGuide = () => {
    setIsBreathingCycle(true); // 開始吸氣
    setBreathingScale(0.8);
    
    const breathingInterval = setInterval(() => {
      setIsBreathingCycle(prev => {
        if (prev) {
          // 從吸氣轉吐氣
          setBreathingScale(1.2);
          return false;
        } else {
          // 從吐氣轉吸氣
          setBreathingScale(0.8);
          return true;
        }
      });
    }, 4000); // 4秒切換
    
    breathingRef.current = breathingInterval;
  };

  // 停止呼吸引導
  const stopBreathingGuide = () => {
    if (breathingRef.current) {
      clearInterval(breathingRef.current);
      breathingRef.current = null;
    }
    setIsBreathingCycle(false);
    setBreathingScale(1);
  };

  // 介入結束檢查
  useEffect(() => {
    if (isIntervening) {
      // 檢查是否回穩
      if (currentValues.hr < thresholds.hr && currentValues.hrv > 40 && currentValues.eda < 5) {
        // 回穩後再等3秒確認
        const timer = setTimeout(() => {
          setIsIntervening(false);
          stopBreathingGuide();
          if (audioRef.current) {
            audioRef.current.pause();
          }
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [isIntervening, currentValues, thresholds]);

  // 模擬數據生成（每0.2秒）
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentValues(prev => {
          // 正常波動模擬
          const hrChange = (Math.random() - 0.5) * 2;
          const hrvChange = (Math.random() - 0.5) * 2;
          const edaChange = (Math.random() - 0.5) * 0.1;
          
          // 如果正在介入，逐步回穩
          let hr = prev.hr + (isIntervening ? -0.5 : hrChange);
          let hrv = prev.hrv + (isIntervening ? 0.3 : hrvChange);
          let eda = prev.eda + (isIntervening ? -0.05 : edaChange);
          
          // 限制範圍
          hr = Math.max(60, Math.min(140, hr));
          hrv = Math.max(20, Math.min(80, hrv));
          eda = Math.max(1, Math.min(10, eda));
          
          const qhc = calculateQHC(hr, hrv, eda);
          
          const newPoint: DataPoint = {
            time: Date.now(),
            hr,
            hrv,
            eda,
            qhc
          };
          
          setData(prevData => [...prevData.slice(-199), newPoint]);
          detectRisk({ hr, hrv, eda, qhc });
          
          return { hr, hrv, eda, qhc };
        });
      }, 200); // 0.2秒
      
      simulationRef.current = interval;
      return () => clearInterval(interval);
    }
  }, [isRunning, isIntervening, detectRisk]);

  // 繪製曲線圖
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    
    // 清空畫布
    ctx.clearRect(0, 0, width, height);
    
    if (data.length < 2) return;
    
    // 計算縮放比例
    const maxTime = Math.max(...data.map(d => d.time));
    const minTime = Math.min(...data.map(d => d.time));
    const timeRange = Math.max(maxTime - minTime, 60000); // 至少顯示60秒
    
    // 繪製背景網格
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = (height / 4) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // 繪製各曲線（每個指標獨立標準化）
    const drawLine = (
      values: number[],
      color: string,
      minVal: number,
      maxVal: number,
      isDashed: boolean = false,
      offset: number = 0
    ) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.setLineDash(isDashed ? [5, 5] : []);
      ctx.beginPath();
      
      values.forEach((value, idx) => {
        const x = ((data[idx].time - minTime) / timeRange) * width;
        // 標準化到 0-1 範圍
        const normalizedValue = Math.max(0, Math.min(1, (value - minVal) / (maxVal - minVal)));
        // 映射到畫布 Y 座標（留出上下邊距）
        const y = height - (normalizedValue * height * 0.7 + height * 0.15) + offset;
        
        if (idx === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    };
    
    // 繪製 HR（藍線）- 範圍 60-140 bpm
    drawLine(data.map(d => d.hr), '#3b82f6', 60, 140);
    
    // 繪製 HRV（綠線）- 範圍 20-80 ms
    drawLine(data.map(d => d.hrv), '#10b981', 20, 80);
    
    // 繪製 EDA（橘線）- 範圍 1-10 μS
    drawLine(data.map(d => d.eda), '#f97316', 1, 10);
    
    // 繪製 QHC（紫色虛線）- 範圍 0-1
    drawLine(data.map(d => d.qhc), '#a855f7', 0, 1, true);
    
    // 如果有預警期間，標示黃色區域
    if (warningCountdown !== null) {
      ctx.fillStyle = 'rgba(255, 255, 0, 0.2)';
      ctx.fillRect(0, 0, width, height);
    }
    
  }, [data, warningCountdown]);

  // 設定情緒狀態
  const setEmotionState = (hr: number, hrv: number, eda: number) => {
    const newValues = {
      hr,
      hrv,
      eda,
      qhc: calculateQHC(hr, hrv, eda)
    };
    
    setCurrentValues(newValues);
    
    // 立即添加數據點
    const newPoint: DataPoint = {
      time: Date.now(),
      ...newValues
    };
    setData(prevData => [...prevData.slice(-199), newPoint]);
    
    detectRisk(newValues);
    
    // 如果是激動狀態，啟動預警倒數
    if (hr > 100) {
      setWarningCountdown(5);
    } else {
      setWarningCountdown(null);
    }
  };

  // 觸發前兆（保持向後相容）
  const triggerWarning = () => {
    setEmotionState(110, 30, 8);
  };

  // 回復正常
  const resetToNormal = () => {
    setCurrentValues({ hr: 80, hrv: 55, eda: 3.5, qhc: 0.85 });
    setData([]);
    setWarningCountdown(null);
    setIsIntervening(false);
    stopBreathingGuide();
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-3 rounded-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  心之旋律系統
                </h1>
                <p className="text-gray-600">即時情緒預警與安撫介入</p>
              </div>
            </div>
            
            {/* 狀態指示 */}
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-lg font-semibold ${
                riskLevel === '高' ? 'bg-red-100 text-red-700' :
                riskLevel === '中' ? 'bg-orange-100 text-orange-700' :
                'bg-green-100 text-green-700'
              }`}>
                風險：{riskLevel}
              </div>
              {warningCountdown !== null && (
                <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg font-bold">
                  預警倒數：{warningCountdown} 秒
                </div>
              )}
              {isIntervening && (
                <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  介入：啟動
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          
          {/* 左側控制面板 */}
          <div className="lg:col-span-1 space-y-4">
            
            {/* Apple Watch 連接狀態 */}
            <div className="bg-white rounded-xl shadow-lg p-4 border-2 border-blue-200">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Radio className="w-5 h-5" />
                Apple Watch 連接
              </h3>
              <div className={`p-3 rounded-lg mb-3 ${
                watchConnected ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-50 border-2 border-gray-300'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${watchConnected ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  <span className={`font-semibold ${watchConnected ? 'text-green-700' : 'text-gray-600'}`}>
                    {watchConnected ? '已連接' : '未連接'}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  {watchConnected 
                    ? '正在接收即時心率數據' 
                    : '請在 iPhone App 中啟動監測'}
                </p>
              </div>
            </div>

            {/* 模擬控制 */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                模擬控制
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`w-full py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                    isRunning ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
                  }`}
                >
                  {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRunning ? '停止監測' : '開始監測'}
                </button>
                <button
                  onClick={resetToNormal}
                  className="w-full py-2 px-4 rounded-lg bg-green-500 text-white font-semibold flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  回復正常
                </button>
              </div>
            </div>

            {/* 情緒狀態快速設定 */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                情緒狀態
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setEmotionState(75, 60, 2.5)}
                  className="py-2 px-3 rounded-lg bg-green-100 text-green-700 font-semibold text-sm flex items-center justify-center gap-1 hover:bg-green-200 transition"
                >
                  <Smile className="w-4 h-4" />
                  平穩
                </button>
                <button
                  onClick={() => setEmotionState(85, 50, 4.0)}
                  className="py-2 px-3 rounded-lg bg-yellow-100 text-yellow-700 font-semibold text-sm flex items-center justify-center gap-1 hover:bg-yellow-200 transition"
                >
                  <Meh className="w-4 h-4" />
                  輕度壓力
                </button>
                <button
                  onClick={() => setEmotionState(95, 40, 5.5)}
                  className="py-2 px-3 rounded-lg bg-orange-100 text-orange-700 font-semibold text-sm flex items-center justify-center gap-1 hover:bg-orange-200 transition"
                >
                  <Frown className="w-4 h-4" />
                  中度緊張
                </button>
                <button
                  onClick={() => setEmotionState(110, 30, 8.0)}
                  className="py-2 px-3 rounded-lg bg-red-100 text-red-700 font-semibold text-sm flex items-center justify-center gap-1 hover:bg-red-200 transition"
                >
                  <AlertTriangle className="w-4 h-4" />
                  情緒激動
                </button>
              </div>
            </div>

            {/* 數值顯示卡 */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">📊 即時數值</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">HR (bpm)</div>
                  <div className="text-2xl font-bold text-blue-600">{Math.round(currentValues.hr)}</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">HRV (ms)</div>
                  <div className="text-2xl font-bold text-green-600">{Math.round(currentValues.hrv)}</div>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">EDA (μS)</div>
                  <div className="text-2xl font-bold text-orange-600">{currentValues.eda.toFixed(1)}</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">QHC</div>
                  <div className="text-2xl font-bold text-purple-600">{(currentValues.qhc * 100).toFixed(0)}%</div>
                </div>
              </div>
            </div>

            {/* 門檻設定 */}
            <div className="bg-white rounded-xl shadow-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">⚙️ 門檻設定</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-600">HR 門檻: {thresholds.hr} bpm</label>
                  <input
                    type="range"
                    min="80"
                    max="120"
                    value={thresholds.hr}
                    onChange={(e) => setThresholds({ ...thresholds, hr: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">HRV 門檻: {thresholds.hrv} ms</label>
                  <input
                    type="range"
                    min="20"
                    max="50"
                    value={thresholds.hrv}
                    onChange={(e) => setThresholds({ ...thresholds, hrv: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-600">EDA 門檻: {thresholds.eda.toFixed(1)} μS</label>
                  <input
                    type="range"
                    min="4"
                    max="8"
                    step="0.1"
                    value={thresholds.eda}
                    onChange={(e) => setThresholds({ ...thresholds, eda: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* 主視覺化區域 */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* 曲線圖 */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                即時曲線圖
              </h3>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={400}
                  className="w-full h-auto border border-gray-200 rounded-lg"
                />
                {/* 圖例 */}
                <div className="absolute top-2 right-2 bg-white/90 p-2 rounded-lg shadow text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>HR</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span>HRV</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span>EDA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="border-b border-dashed border-purple-500">QHC</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 安撫介入區域 */}
            {(isIntervening || warningCountdown !== null) && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  安撫介入
                </h3>
                
                {warningCountdown !== null && !isIntervening && (
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">⏰</div>
                    <div className="text-3xl font-bold text-yellow-600 mb-2">
                      預警倒數：{warningCountdown} 秒
                    </div>
                    <p className="text-gray-600">即將啟動安撫介入...</p>
                  </div>
                )}
                
                {isIntervening && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* 呼吸引導圈 */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-8 flex items-center justify-center">
                      <div
                        className="rounded-full bg-gradient-to-br from-blue-400 to-purple-500 transition-all duration-4000"
                        style={{
                          width: `${100 * breathingScale}px`,
                          height: `${100 * breathingScale}px`,
                          transform: `scale(${breathingScale})`
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center text-white font-bold text-xl">
                          {isBreathingCycle ? '吸' : '呼'}
                        </div>
                      </div>
                    </div>
                    
                    {/* 介入狀態 */}
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Music className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-gray-800">安撫音樂</span>
                        </div>
                        <p className="text-sm text-gray-600">正在播放放鬆音樂...</p>
                        <audio ref={audioRef} loop>
                          {/* 實際使用時可添加音檔來源 */}
                          <source src="" type="audio/mpeg" />
                        </audio>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Wind className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-gray-800">呼吸引導</span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {isBreathingCycle ? '請跟隨圓圈... 吸氣' : '請跟隨圓圈... 吐氣'}
                        </p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="font-semibold text-gray-800 mb-2">回穩進度</div>
                        <div className="text-sm text-gray-600">
                          HR: {Math.round(currentValues.hr)} bpm → 目標: {'<'} {thresholds.hr} bpm
                        </div>
                        <div className="text-sm text-gray-600">
                          HRV: {Math.round(currentValues.hrv)} ms → 目標: {'>'} 40 ms
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Apple Watch 連接說明 */}
        <div className="mt-4 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-blue-500 p-2 rounded-lg">
              <Radio className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 text-lg mb-2">如何連接 Apple Watch</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-1">步驟 1：設定 iOS App</div>
                  <p className="text-gray-600">在 iPhone 上打開 HeartBridge App，確保已授權 HealthKit 權限</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-1">步驟 2：啟動 Watch 監測</div>
                  <p className="text-gray-600">在 Apple Watch 上點擊「開始監測」按鈕，手錶開始採集心率</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <div className="font-semibold text-gray-800 mb-1">步驟 3：自動連接</div>
                  <p className="text-gray-600">當心率數據傳送到 iPhone App 後，會自動透過 <code className="bg-gray-100 px-1 rounded">window.updateFromNative()</code> 傳送到網頁</p>
                </div>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <div className="font-semibold text-gray-800 mb-1">💡 提示</div>
                  <p className="text-gray-700">
                    如果無法連接，請檢查：<br/>
                    • iPhone App 是否在前景運行<br/>
                    • Apple Watch 與 iPhone 是否配對<br/>
                    • HealthKit 權限是否已授權<br/>
                    • 必須使用真機測試（模擬器無法連接）
                  </p>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                  <div className="font-semibold text-gray-800 mb-1">🎮 模擬測試</div>
                  <p className="text-gray-700">
                    在等待連接 Apple Watch 時，您可以使用上方的情緒狀態按鈕進行模擬測試：
                    <br/>• <strong>平穩</strong>：正常狀態（HR: 75, HRV: 60, EDA: 2.5）
                    <br/>• <strong>輕度壓力</strong>：輕微上升（HR: 85, HRV: 50, EDA: 4.0）
                    <br/>• <strong>中度緊張</strong>：壓力增加（HR: 95, HRV: 40, EDA: 5.5）
                    <br/>• <strong>情緒激動</strong>：觸發預警（HR: 110, HRV: 30, EDA: 8.0）
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

