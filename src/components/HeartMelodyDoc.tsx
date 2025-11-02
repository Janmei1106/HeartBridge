import React, { useState } from 'react';
import { Heart, Activity, Zap, TrendingUp, Music, Target, Brain, Award, FileText, Printer, ChevronRight } from 'lucide-react';

export default function HeartMelodyDoc() {
  const [expandedSection, setExpandedSection] = useState('concept');

  const sections = [
    { id: 'concept', title: '整體概念', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { id: 'flow', title: '運作流程', icon: Activity, color: 'from-blue-500 to-cyan-500' },
    { id: 'detection', title: '偵測判斷', icon: Target, color: 'from-red-500 to-orange-500' },
    { id: 'intervention', title: '介入反應', icon: Music, color: 'from-green-500 to-emerald-500' },
    { id: 'visualization', title: '視覺化', icon: TrendingUp, color: 'from-indigo-500 to-purple-500' },
    { id: 'qhc', title: 'QHC 原理', icon: Award, color: 'from-purple-500 to-pink-500' }
  ];

  const indicators = [
    { name: 'HR', full: 'Heart Rate', unit: 'bpm', meaning: '心率', change: '上升 → 壓力增加', normal: '~80', alert: '~110', color: 'blue' },
    { name: 'HRV', full: 'Heart Rate Variability', unit: 'ms', meaning: '心率變異', change: '下降 → 焦慮上升', normal: '~55', alert: '~30', color: 'green' },
    { name: 'EDA', full: 'Electrodermal Activity', unit: 'μS', meaning: '皮膚電導', change: '上升 → 緊張反應', normal: '~3.5', alert: '~8', color: 'orange' }
  ];

  const flowSteps = [
    { num: '1', text: '觸發模擬 / Watch 實測', bg: 'bg-blue-500' },
    { num: '2', text: '更新數據 → 風險偵測', bg: 'bg-green-500' },
    { num: '3', text: '預警倒數 (5秒)', bg: 'bg-yellow-500' },
    { num: '4', text: '安撫介入啟動', bg: 'bg-purple-500' },
    { num: '5', text: '生理指標回穩', bg: 'bg-pink-500' },
    { num: '6', text: 'QHC 曲線上升', bg: 'bg-indigo-500' }
  ];

  const thresholds = [
    { label: 'HR > 100 bpm', type: '門檻', risk: '高', color: 'red' },
    { label: 'HRV < 35 ms', type: '門檻', risk: '中', color: 'orange' },
    { label: 'EDA > 6.0 μS', type: '門檻', risk: '高', color: 'red' },
    { label: 'HR 上升 > 0.9 bpm/s', type: '趨勢', risk: '警告', color: 'yellow' },
    { label: 'HRV 下降 < -0.35 ms/s', type: '趨勢', risk: '警告', color: 'yellow' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-4 rounded-2xl shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                心之旋律
              </h1>
              <p className="text-gray-600 text-lg">ASD 情緒預警與安撫介入系統 — 完整技術說明</p>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
              <div className="text-blue-600 text-2xl font-bold">0.2s</div>
              <div className="text-xs text-gray-600">資料更新頻率</div>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border-2 border-green-200">
              <div className="text-green-600 text-2xl font-bold">5-10s</div>
              <div className="text-xs text-gray-600">預警倒數</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border-2 border-purple-200">
              <div className="text-purple-600 text-2xl font-bold">3 指標</div>
              <div className="text-xs text-gray-600">HR/HRV/EDA</div>
            </div>
            <div className="bg-pink-50 p-4 rounded-xl border-2 border-pink-200">
              <div className="text-pink-600 text-2xl font-bold">QHC</div>
              <div className="text-xs text-gray-600">量子幸福曲線</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-500" />
            章節導覽
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {sections.map(section => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setExpandedSection(section.id)}
                  className={`p-4 rounded-xl transition text-left ${
                    expandedSection === section.id
                      ? `bg-gradient-to-br ${section.color} text-white shadow-lg scale-105`
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-2" />
                  <div className="font-semibold text-sm">{section.title}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          
          {/* 整體概念 */}
          {expandedSection === 'concept' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-8 h-8 text-pink-500" />
                <h2 className="text-3xl font-bold text-gray-800">整體概念</h2>
              </div>
              
              <div className="bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 rounded-xl p-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  「心之旋律」整合 <strong>HR、HRV、EDA</strong> 三項生理訊號，
                  即時模擬並預測 ASD 孩童情緒爆發前 5-10 秒的生理特徵，
                  當偵測到前兆時自動啟動音樂與呼吸引導的安撫介入。
                </p>
              </div>

              <div className="space-y-4">
                {indicators.map((ind, idx) => (
                  <div key={idx} className={`border-2 border-${ind.color}-200 bg-${ind.color}-50 rounded-xl p-5`}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className={`bg-${ind.color}-500 w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {ind.name}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800 text-lg">{ind.full}</div>
                        <div className="text-gray-600 text-sm">{ind.meaning} ({ind.unit})</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">正常值</div>
                        <div className="font-mono font-bold text-green-600">{ind.normal}</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg">
                        <div className="text-xs text-gray-500 mb-1">警戒值</div>
                        <div className="font-mono font-bold text-red-600">{ind.alert}</div>
                      </div>
                    </div>
                    <div className="bg-white/70 p-3 rounded-lg text-sm text-gray-700">
                      {ind.change}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 運作流程 */}
          {expandedSection === 'flow' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Activity className="w-8 h-8 text-blue-500" />
                <h2 className="text-3xl font-bold text-gray-800">運作流程</h2>
              </div>

              <div className="relative space-y-4">
                {flowSteps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex items-center gap-4">
                      <div className={`${step.bg} w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                        {step.num}
                      </div>
                      <div className="flex-1 bg-gradient-to-r from-gray-50 to-gray-100 p-4 rounded-xl border-2 border-gray-200">
                        <div className="font-semibold text-gray-800">{step.text}</div>
                      </div>
                    </div>
                    {idx < flowSteps.length - 1 && (
                      <div className="absolute left-6 top-14 w-0.5 h-8 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl mt-6">
                <h3 className="font-bold text-xl mb-3">💡 核心邏輯</h3>
                <p className="text-blue-100">
                  系統每 0.2 秒更新數據 → 門檻與趨勢雙重判斷 → 確認前兆後倒數 5 秒 → 
                  自動啟動音樂與呼吸圈 → 生理指標逐步回穩 → 曲線恢復正常
                </p>
              </div>
            </div>
          )}

          {/* 偵測判斷 */}
          {expandedSection === 'detection' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-8 h-8 text-red-500" />
                <h2 className="text-3xl font-bold text-gray-800">偵測判斷邏輯</h2>
              </div>

              <div className="space-y-4">
                {thresholds.map((t, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border-2 border-gray-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        t.color === 'red' ? 'bg-red-500' : 
                        t.color === 'orange' ? 'bg-orange-500' : 'bg-yellow-500'
                      }`}></div>
                      <code className="font-mono text-sm text-gray-700">{t.label}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">{t.type}</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        t.color === 'red' ? 'bg-red-100 text-red-700' :
                        t.color === 'orange' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {t.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">🚨</div>
                <div className="font-bold text-gray-800 text-xl mb-2">前兆確認條件</div>
                <div className="text-gray-700">
                  <strong>HR 快速上升</strong> + <strong>HRV 快速下降</strong> → 觸發預警倒數
                </div>
              </div>
            </div>
          )}

          {/* 介入反應 */}
          {expandedSection === 'intervention' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Music className="w-8 h-8 text-green-500" />
                <h2 className="text-3xl font-bold text-gray-800">介入反應機制</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6 text-center">
                  <div className="text-5xl mb-3">🎵</div>
                  <div className="font-bold text-gray-800 mb-2">安撫音樂</div>
                  <div className="text-sm text-gray-600">自動播放白噪音或自選音檔</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 text-center">
                  <div className="text-5xl mb-3">💨</div>
                  <div className="font-bold text-gray-800 mb-2">呼吸引導圈</div>
                  <div className="text-sm text-gray-600">4秒吸、4秒吐動畫</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 text-center">
                  <div className="text-5xl mb-3">💗</div>
                  <div className="font-bold text-gray-800 mb-2">情緒回穩</div>
                  <div className="text-sm text-gray-600">HR↓ HRV↑ EDA↓</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-4">⏱️ 介入時間軸</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">0s</div>
                    <div>偵測到前兆，倒數開始</div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">5s</div>
                    <div>倒數歸零，音樂與呼吸圈啟動</div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">30s</div>
                    <div>生理指標逐步回穩</div>
                  </div>
                  <div className="flex items-center gap-3 bg-white/10 p-3 rounded-lg">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">60s</div>
                    <div>完全回穩，介入結束</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 視覺化 */}
          {expandedSection === 'visualization' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-8 h-8 text-indigo-500" />
                <h2 className="text-3xl font-bold text-gray-800">即時視覺化呈現</h2>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">📊 曲線圖元素</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-800">藍線</div>
                      <div className="text-xs text-gray-600">HR 心率變化</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                    <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-800">綠線</div>
                      <div className="text-xs text-gray-600">HRV 變異程度</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                    <div className="w-4 h-4 bg-orange-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-800">橘線</div>
                      <div className="text-xs text-gray-600">EDA 皮膚電導</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <div>
                      <div className="font-semibold text-gray-800">紫色虛線</div>
                      <div className="text-xs text-gray-600">QHC 量子幸福曲線</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                    <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                    <div>
                      <div className="font-semibold text-gray-800">黃色直條</div>
                      <div className="text-xs text-gray-600">前兆期預警窗</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-white p-4 rounded-lg">
                    <div className="text-xl">⚠️</div>
                    <div>
                      <div className="font-semibold text-gray-800">橘點徽章</div>
                      <div className="text-xs text-gray-600">情緒爆發前兆點</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5">
                  <h4 className="font-bold text-gray-800 mb-3">💡 晶片指示</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• 風險：低/中/高</div>
                    <div>• 預警倒數：5秒</div>
                    <div>• 介入狀態</div>
                  </div>
                </div>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5">
                  <h4 className="font-bold text-gray-800 mb-3">📊 數值卡</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• HR (bpm)</div>
                    <div>• HRV (ms)</div>
                    <div>• EDA (μS)</div>
                  </div>
                </div>
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5">
                  <h4 className="font-bold text-gray-800 mb-3">🎨 視覺效果</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>• 漸變色曲線</div>
                    <div>• 動態呼吸圈</div>
                    <div>• 警示視窗</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QHC 原理 */}
          {expandedSection === 'qhc' && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-purple-500" />
                <h2 className="text-3xl font-bold text-gray-800">量子幸福曲線 (QHC)</h2>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  QHC 用來可視化「情緒穩定度」，範圍介於 0～1：
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-green-600 mb-1">1.0</div>
                    <div className="text-sm text-gray-600">完全平靜</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">0.5</div>
                    <div className="text-sm text-gray-600">輕度壓力</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg text-center">
                    <div className="text-3xl font-bold text-red-600 mb-1">0.0</div>
                    <div className="text-sm text-gray-600">即將爆發</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6">
                <h3 className="font-bold text-gray-800 mb-4 text-lg">🧮 計算公式</h3>
                <div className="bg-white p-4 rounded-lg font-mono text-sm text-gray-700 text-center mb-4">
                  QHC = 1 - α₁·z(HR) + α₂·z(HRV) - α₃·z(EDA)
                </div>
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• α₁, α₂, α₃ 為權重參數</div>
                  <div>• z() 為標準化函數</div>
                  <div>• 以 0.2 Hz 波動模擬量子態疊加</div>
                  <div>• 介入後逐步回穩至 1.0</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">✨ 創新特色</h3>
                <p className="text-purple-100">
                  結合量子物理概念，用「波函數」呈現情緒的不確定性與疊加態，
                  讓情緒變化不只是數字，更是一種「波動的能量」。
                  介入後的回穩過程就像量子態的塌縮，回歸穩定基態。
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Printer className="w-5 h-5 text-blue-500" />
                使用建議
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>海報展示：擷取各章節關鍵圖表與數據</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>口頭報告：依流程圖順序說明運作邏輯</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                  <span>技術文件：完整保留所有章節內容</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-purple-500" />
                創新亮點
              </h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>5-10秒提前預警，爭取介入時機</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>量子幸福曲線創新視覺化情緒</span>
                </div>
                <div className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" />
                  <span>音樂+呼吸雙重安撫機制</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

