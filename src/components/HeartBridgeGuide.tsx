import React, { useState } from 'react';
import { FileText, Smartphone, Watch, Globe, CheckCircle, AlertCircle, Code, Settings, Play, Zap, ChevronDown, Activity, Brain, Eye, Headphones, Sliders, BarChart3, Workflow, HeartPulse } from 'lucide-react';

export default function HeartBridgeGuide() {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedCode, setExpandedCode] = useState<Record<string, boolean>>({});

    const tabs = [
        { id: 'overview', label: '專案總覽', icon: FileText },
        { id: 'architecture', label: '運作架構', icon: Workflow },
        { id: 'simulation', label: '模擬邏輯', icon: Brain },
        { id: 'detection', label: '偵測判斷', icon: Activity },
        { id: 'intervention', label: '介入方式', icon: Headphones },
        { id: 'interaction', label: '互動控制', icon: Sliders },
        { id: 'visualization', label: '視覺呈現', icon: BarChart3 },
        { id: 'structure', label: '檔案結構', icon: Code },
        { id: 'code', label: '完整程式碼', icon: Code },
        { id: 'setup', label: 'Xcode 設定', icon: Settings },
        { id: 'demo', label: '演示流程', icon: Play }
    ];

    const toggleCode = (id: string) => {
        setExpandedCode((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
                            <Watch className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">HeartBridge 專案指南</h1>
                            <p className="text-gray-600">Apple Watch ↔ iPhone ↔ 網頁即時心率橋接系統</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="bg-blue-50 p-4 rounded-lg">
                            <Watch className="w-6 h-6 text-blue-600 mb-2" />
                            <div className="text-sm font-semibold text-gray-700">Apple Watch</div>
                            <div className="text-xs text-gray-600">HealthKit 即時監測</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg">
                            <Smartphone className="w-6 h-6 text-green-600 mb-2" />
                            <div className="text-sm font-semibold text-gray-700">iPhone</div>
                            <div className="text-xs text-gray-600">WCSession 橋接</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <Globe className="w-6 h-6 text-purple-600 mb-2" />
                            <div className="text-sm font-semibold text-gray-700">網頁</div>
                            <div className="text-xs text-gray-600">即時視覺化互動</div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="flex overflow-x-auto border-b">
                        {tabs.map(tab => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                        ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    <div className="p-6">

                        {/* Overview Tab */}
                        {activeTab === 'overview' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-xl">
                                    <h2 className="text-2xl font-bold mb-3">系統架構</h2>
                                    <p className="text-blue-100 mb-4">完整的即時心率監測與情緒預警系統</p>
                                    <div className="bg-white/10 p-4 rounded-lg backdrop-blur">
                                        <code className="text-sm">Apple Watch → WCSession → iPhone WebView → JavaScript → 網頁 UI</code>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="border-2 border-green-200 bg-green-50 p-5 rounded-xl">
                                        <CheckCircle className="w-6 h-6 text-green-600 mb-3" />
                                        <h3 className="font-semibold text-gray-800 mb-2">核心功能</h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• 即時心率採集（每秒更新）</li>
                                            <li>• 零延遲數據傳輸</li>
                                            <li>• 自動預警觸發</li>
                                            <li>• 互動式安撫介入</li>
                                        </ul>
                                    </div>
                                    <div className="border-2 border-blue-200 bg-blue-50 p-5 rounded-xl">
                                        <AlertCircle className="w-6 h-6 text-blue-600 mb-3" />
                                        <h3 className="font-semibold text-gray-800 mb-2">技術特點</h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• 純原生 Swift + WatchKit</li>
                                            <li>• 無第三方依賴</li>
                                            <li>• 內嵌式網頁（離線可用）</li>
                                            <li>• 雙向 JS Bridge 通訊</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    <div className="flex items-start gap-3">
                                        <Zap className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">快速開始</h4>
                                            <p className="text-sm text-gray-700">確保完成 Xcode 設定，並將 asd-demo-light.html 放入 iOS/Resources/WebAssets/</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Architecture Tab */}
                        {activeTab === 'architecture' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-xl">
                                    <h2 className="text-2xl font-bold mb-3">🩺 心之旋律系統運作架構</h2>
                                    <p className="text-indigo-100 mb-4">可即時模擬與視覺化 ASD（自閉症光譜）孩童生理狀態的互動網頁系統</p>
                                </div>

                                <div className="bg-white border-2 border-blue-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">三項關鍵生理訊號</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-blue-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left font-semibold text-gray-800">生理指標</th>
                                                    <th className="px-4 py-3 text-left font-semibold text-gray-800">含義</th>
                                                    <th className="px-4 py-3 text-left font-semibold text-gray-800">代表情緒變化</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr className="hover:bg-blue-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">HR（Heart Rate）</td>
                                                    <td className="px-4 py-3 text-gray-700">心率（bpm）</td>
                                                    <td className="px-4 py-3 text-gray-700">上升 → 壓力或興奮增加</td>
                                                </tr>
                                                <tr className="hover:bg-green-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">HRV（Heart Rate Variability）</td>
                                                    <td className="px-4 py-3 text-gray-700">心率變異（ms）</td>
                                                    <td className="px-4 py-3 text-gray-700">下降 → 放鬆度下降、焦慮上升</td>
                                                </tr>
                                                <tr className="hover:bg-orange-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">EDA（Electrodermal Activity）</td>
                                                    <td className="px-4 py-3 text-gray-700">皮膚電導反應（μS）</td>
                                                    <td className="px-4 py-3 text-gray-700">上升 → 緊張或焦慮反應</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-200">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">運作流程圖</h3>
                                    <div className="bg-white p-6 rounded-lg font-mono text-sm space-y-2">
                                        <div className="flex items-center gap-2 text-blue-600">
                                            <span className="font-bold">使用者</span>
                                            <span>→</span>
                                            <span>按鈕觸發模擬 or Apple Watch HR 實測</span>
                                        </div>
                                        <div className="text-center text-gray-500">↓</div>
                                        <div className="flex items-center gap-2 text-green-600">
                                            <span className="font-bold">系統更新</span>
                                            <span>HR / HRV / EDA</span>
                                            <span>→</span>
                                            <span className="font-bold">風險偵測</span>
                                        </div>
                                        <div className="text-center text-gray-500">↓</div>
                                        <div className="flex items-center gap-2 text-yellow-600">
                                            <span className="font-bold">預警倒數（5 秒）</span>
                                        </div>
                                        <div className="text-center text-gray-500">↓</div>
                                        <div className="flex items-center gap-2 text-purple-600">
                                            <span className="font-bold">安撫介入</span>
                                            <span>（呼吸圈＋音樂）</span>
                                        </div>
                                        <div className="text-center text-gray-500">↓</div>
                                        <div className="flex items-center gap-2 text-indigo-600">
                                            <span>HR 回降、HRV 回升、EDA 回穩</span>
                                        </div>
                                        <div className="text-center text-gray-500">↓</div>
                                        <div className="flex items-center gap-2 text-pink-600">
                                            <span>曲線回復正常（量子幸福曲線上升）</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    <div className="flex items-start gap-3">
                                        <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-semibold text-gray-800 mb-1">核心目標</h4>
                                            <p className="text-sm text-gray-700">系統藉由模擬這些變化，觀察「情緒爆發前 5–10 秒」的生理特徵，當偵測到前兆時，會自動啟動「音樂＋呼吸引導」的安撫介入。</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Simulation Logic Tab */}
                        {activeTab === 'simulation' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-xl">
                                    <h2 className="text-2xl font-bold mb-3">模擬邏輯詳細說明</h2>
                                    <p className="text-green-100">數據生成、狀態變化與即時更新機制</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-blue-600" />
                                            數據生成頻率
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• 前端每 <strong>0.2 秒</strong> 自動更新一筆資料</li>
                                            <li>• 持續推動 HR、HRV、EDA 的即時曲線</li>
                                            <li>• 支援「觸發前兆」或「滑桿」快速改變狀態</li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-50 border-2 border-green-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            正常狀態數值
                                        </h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• <strong>HR</strong> 約 80 bpm</li>
                                            <li>• <strong>HRV</strong> 約 55 ms</li>
                                            <li>• <strong>EDA</strong> 約 3.5 μS</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="bg-red-50 border-2 border-red-200 p-5 rounded-xl">
                                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <AlertCircle className="w-5 h-5 text-red-600" />
                                        前兆狀態數值
                                    </h3>
                                    <div className="grid md:grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <div className="font-medium text-gray-800 mb-1">HR 飆升</div>
                                            <div className="text-gray-700">正常 80 → 前兆 110 bpm</div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 mb-1">HRV 下降</div>
                                            <div className="text-gray-700">正常 55 → 前兆 30 ms</div>
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-800 mb-1">EDA 上升</div>
                                            <div className="text-gray-700">正常 3.5 → 前兆 8 μS</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 text-xs text-gray-600 bg-white/50 p-2 rounded">
                                        ⚠️ 這些值會反映在即時曲線上，並驅動後續判斷邏輯
                                    </div>
                                </div>

                                <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
                                    <h4 className="font-semibold text-gray-800 mb-2">模擬機制特點</h4>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>• 數值變化平滑過渡，避免突兀跳變</li>
                                        <li>• 可手動觸發前兆模擬情緒爆發情境</li>
                                        <li>• 支援即時調整與動態響應</li>
                                        <li>• 真實資料串流優先（Apple Watch HR）</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Detection Logic Tab */}
                        {activeTab === 'detection' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-xl">
                                    <h2 className="text-2xl font-bold mb-3">偵測判斷邏輯</h2>
                                    <p className="text-orange-100">門檻判斷與趨勢分析雙重機制</p>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <CheckCircle className="w-5 h-5 text-blue-600" />
                                            （A）門檻判斷
                                        </h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="bg-white p-3 rounded">
                                                <div className="font-medium text-gray-800 mb-1">HR 門檻</div>
                                                <div className="text-gray-700">預設值：<strong>100 bpm</strong></div>
                                                <div className="text-xs text-gray-500 mt-1">HR &gt; 設定值 → 風險升級</div>
                                            </div>
                                            <div className="bg-white p-3 rounded">
                                                <div className="font-medium text-gray-800 mb-1">HRV 門檻</div>
                                                <div className="text-gray-700">預設值：<strong>35 ms</strong></div>
                                                <div className="text-xs text-gray-500 mt-1">HRV &lt; 設定值 → 風險升級</div>
                                            </div>
                                            <div className="bg-white p-3 rounded">
                                                <div className="font-medium text-gray-800 mb-1">EDA 門檻</div>
                                                <div className="text-gray-700">預設值：<strong>6.0 μS</strong></div>
                                                <div className="text-xs text-gray-500 mt-1">EDA &gt; 設定值 → 風險升級</div>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-xs text-orange-600 bg-orange-50 p-2 rounded">
                                            ⚠️ 任一條件成立 → 風險升級為「中」或「高」
                                        </div>
                                    </div>

                                    <div className="bg-green-50 border-2 border-green-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                            <Activity className="w-5 h-5 text-green-600" />
                                            （B）趨勢判斷
                                        </h3>
                                        <div className="space-y-3 text-sm">
                                            <div className="bg-white p-3 rounded">
                                                <div className="font-medium text-gray-800 mb-1">HR 上升斜率</div>
                                                <div className="text-gray-700">臨界值：<strong>&gt; 0.9 bpm/s</strong></div>
                                            </div>
                                            <div className="bg-white p-3 rounded">
                                                <div className="font-medium text-gray-800 mb-1">HRV 下降斜率</div>
                                                <div className="text-gray-700">臨界值：<strong>&lt; -0.35 ms/s</strong></div>
                                            </div>
                                            <div className="bg-white p-3 rounded">
                                                <div className="font-medium text-gray-800 mb-1">EDA 上升斜率</div>
                                                <div className="text-gray-700">臨界值：<strong>&gt; 0.15 μS/s</strong></div>
                                            </div>
                                        </div>
                                        <div className="mt-3 text-xs text-green-600 bg-green-100 p-2 rounded">
                                            ✅ 同時滿足（HR 快速上升 + HRV 下降）→ 進入「情緒爆發前兆期」
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                                    <h4 className="font-semibold text-gray-800 mb-2">預警倒數機制</h4>
                                    <div className="text-sm text-gray-700 space-y-2">
                                        <p>• 當偵測到前兆時，右上角會出現「<strong>預警倒數：5 秒</strong>」的提示</p>
                                        <p>• 代表孩子的身體狀態正在急速改變</p>
                                        <p>• 系統會倒數計時 5 秒後自動進入「安撫介入階段」</p>
                                        <p>• 倒數秒數可自訂為 5～10 秒</p>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 p-5 rounded-xl">
                                    <h3 className="font-semibold text-gray-800 mb-3">判斷流程總結</h3>
                                    <div className="bg-white p-4 rounded-lg text-sm space-y-2">
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">1</span>
                                            <span>即時監測 HR、HRV、EDA 數值</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">2</span>
                                            <span>計算數值變化斜率（趨勢分析）</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold">3</span>
                                            <span>對比門檻值與趨勢臨界值</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">4</span>
                                            <span>觸發預警倒數（5 秒）</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">5</span>
                                            <span>啟動安撫介入機制</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Intervention Tab */}
                        {activeTab === 'intervention' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-pink-500 to-rose-600 text-white p-6 rounded-xl">
                                    <h2 className="text-2xl font-bold mb-3">介入方式詳細說明</h2>
                                    <p className="text-pink-100">音樂、呼吸引導與情緒回穩機制</p>
                                </div>

                                <div className="bg-white border-2 border-pink-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">安撫介入元件</h3>
                                    <div className="space-y-4">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-5 rounded-lg border-l-4 border-blue-500">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Headphones className="w-6 h-6 text-blue-600" />
                                                <h4 className="font-semibold text-gray-800 text-lg">🎵 安撫音樂</h4>
                                            </div>
                                            <ul className="space-y-2 text-sm text-gray-700 ml-9">
                                                <li>• 自動播放（倒數歸零後立即啟動）</li>
                                                <li>• 可上傳自選音檔（如白噪音、自然音）</li>
                                                <li>• 音量可調節，避免過度刺激</li>
                                                <li>• 持續播放至介入結束</li>
                                            </ul>
                                        </div>

                                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-5 rounded-lg border-l-4 border-green-500">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Activity className="w-6 h-6 text-green-600" />
                                                <h4 className="font-semibold text-gray-800 text-lg">💨 呼吸引導圈</h4>
                                            </div>
                                            <ul className="space-y-2 text-sm text-gray-700 ml-9">
                                                <li>• 動畫式圓球：吸氣時放大、吐氣時縮小</li>
                                                <li>• 節奏為 <strong>4 秒吸、4 秒吐</strong>（8 秒一循環）</li>
                                                <li>• 視覺引導使用者跟隨呼吸節奏</li>
                                                <li>• 顏色漸變：緊張時偏紅，放鬆時偏藍</li>
                                            </ul>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-5 rounded-lg border-l-4 border-purple-500">
                                            <div className="flex items-center gap-3 mb-2">
                                                <HeartPulse className="w-6 h-6 text-purple-600" />
                                                <h4 className="font-semibold text-gray-800 text-lg">💗 情緒回穩模擬</h4>
                                            </div>
                                            <ul className="space-y-2 text-sm text-gray-700 ml-9">
                                                <li>• 系統逐步降低內部壓力參數</li>
                                                <li>• <strong>HR 下降</strong>：從 110 → 85 bpm</li>
                                                <li>• <strong>HRV 回升</strong>：從 30 → 50 ms</li>
                                                <li>• <strong>EDA 降低</strong>：從 8 → 4 μS</li>
                                                <li>• 當曲線回復平穩，介入狀態會自動結束</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-yellow-50 border-2 border-yellow-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3">介入時機</h3>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <div className="flex items-start gap-2">
                                                <span className="text-yellow-600 font-bold">→</span>
                                                <span>預警倒數歸零（0 秒）</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-yellow-600 font-bold">→</span>
                                                <span>系統自動進入安撫模式</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-yellow-600 font-bold">→</span>
                                                <span>無需手動觸發</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3">介入結束條件</h3>
                                        <div className="space-y-2 text-sm text-gray-700">
                                            <div className="flex items-start gap-2">
                                                <span className="text-blue-600 font-bold">→</span>
                                                <span>HR 恢復至正常範圍（&lt; 100 bpm）</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-blue-600 font-bold">→</span>
                                                <span>HRV 回升至安全值（&gt; 40 ms）</span>
                                            </div>
                                            <div className="flex items-start gap-2">
                                                <span className="text-blue-600 font-bold">→</span>
                                                <span>系統返回待機狀態</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
                                    <h4 className="font-semibold text-gray-800 mb-2">復原速度調整</h4>
                                    <div className="text-sm text-gray-700 space-y-1">
                                        <p>• <strong>慢速</strong>：約 2-3 分鐘回穩，適合深度放鬆練習</p>
                                        <p>• <strong>中速</strong>：約 1-2 分鐘回穩，標準介入模式</p>
                                        <p>• <strong>快速</strong>：約 30-60 秒回穩，快速測試模式</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Interaction Control Tab */}
                        {activeTab === 'interaction' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white p-6 rounded-xl">
                                    <h2 className="text-2xl font-bold mb-3">互動控制區功能</h2>
                                    <p className="text-teal-100">左側面板完整操作指南</p>
                                </div>

                                <div className="bg-white border-2 border-teal-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">模擬控制區</h3>
                                    <div className="space-y-3">
                                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                            <div className="font-semibold text-gray-800 mb-1">開始／停止資料流</div>
                                            <div className="text-sm text-gray-600">控制即時數據更新，暫停時保留最後狀態</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                            <div className="font-semibold text-gray-800 mb-1">回復正常</div>
                                            <div className="text-sm text-gray-600">將所有生理指標重置為正常狀態值</div>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <div className="font-semibold text-gray-800 mb-1">觸發前兆</div>
                                            <div className="text-sm text-gray-600">模擬情緒爆發前兆，HR 飆升、HRV 下降、EDA 上升</div>
                                        </div>
                                        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                            <div className="font-semibold text-gray-800 mb-1">輕度升高</div>
                                            <div className="text-sm text-gray-600">小幅提升生理指標，測試中等壓力反應</div>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                                            <div className="font-semibold text-gray-800 mb-1">自定跳變</div>
                                            <div className="text-sm text-gray-600">允許手動設定特定數值，用於特殊情境測試</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border-2 border-cyan-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">門檻與參數調整</h3>
                                    <div className="space-y-3">
                                        <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                            <div className="font-semibold text-gray-800 mb-2 flex items-center justify-between">
                                                <span>HR 門檻滑桿</span>
                                                <span className="text-sm font-normal text-gray-500">預設：100 bpm</span>
                                            </div>
                                            <div className="text-sm text-gray-600">調整心率觸發閾值，影響預警敏感度</div>
                                        </div>
                                        <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                            <div className="font-semibold text-gray-800 mb-2 flex items-center justify-between">
                                                <span>HRV 門檻滑桿</span>
                                                <span className="text-sm font-normal text-gray-500">預設：35 ms</span>
                                            </div>
                                            <div className="text-sm text-gray-600">設定心率變異下限，低於此值觸發警告</div>
                                        </div>
                                        <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                            <div className="font-semibold text-gray-800 mb-2 flex items-center justify-between">
                                                <span>EDA 門檻滑桿</span>
                                                <span className="text-sm font-normal text-gray-500">預設：6.0 μS</span>
                                            </div>
                                            <div className="text-sm text-gray-600">控制皮膚電導反應上限，超過即警示</div>
                                        </div>
                                        <div className="bg-white border border-gray-200 p-4 rounded-lg">
                                            <div className="font-semibold text-gray-800 mb-2">復原速度調整</div>
                                            <div className="text-sm text-gray-600">選擇介入後的回穩速率（慢／中／快）</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white border-2 border-indigo-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">安撫功能區</h3>
                                    <div className="space-y-3">
                                        <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
                                            <div className="font-semibold text-gray-800 mb-1">手動啟動安撫</div>
                                            <div className="text-sm text-gray-600">即使未觸發預警，也可手動啟動安撫介入</div>
                                        </div>
                                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                                            <div className="font-semibold text-gray-800 mb-1">上傳音樂檔</div>
                                            <div className="text-sm text-gray-600">支援 MP3、WAV 等格式，可作為自訂安撫音</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Visualization Tab */}
                        {activeTab === 'visualization' && (
                            <div className="space-y-6">
                                <div className="bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white p-6 rounded-xl">
                                    <h2 className="text-2xl font-bold mb-3">視覺呈現與資訊展示</h2>
                                    <p className="text-violet-100">即時曲線圖、晶片指示與數值顯示卡</p>
                                </div>

                                <div className="bg-white border-2 border-violet-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">🟦 曲線圖視覺化</h3>
                                    <div className="space-y-4">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                                <div className="font-semibold text-gray-800 mb-2">藍線：HR（心率變化）</div>
                                                <div className="text-sm text-gray-600">即時顯示心率波動，上升趨勢表示壓力增加</div>
                                            </div>
                                            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                                <div className="font-semibold text-gray-800 mb-2">綠線：HRV（變異程度）</div>
                                                <div className="text-sm text-gray-600">顯示心率變異性，下降表示放鬆度降低</div>
                                            </div>
                                            <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                                                <div className="font-semibold text-gray-800 mb-2">橘線：EDA（皮膚電導）</div>
                                                <div className="text-sm text-gray-600">反映自主神經系統活動，上升表示焦慮反應</div>
                                            </div>
                                            <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                                                <div className="font-semibold text-gray-800 mb-2">紫色虛線：QHC（量子幸福曲線）</div>
                                                <div className="text-sm text-gray-600">綜合穩定指標，範圍 0-1，越低越不穩</div>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                            <div className="font-semibold text-gray-800 mb-2">黃色直條：前兆期（預警窗）</div>
                                            <div className="text-sm text-gray-600">標示情緒爆發前 5-10 秒的時間窗口</div>
                                        </div>
                                        <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                            <div className="font-semibold text-gray-800 mb-2">橘點＋徽章：⚠️「情緒爆發前兆點」</div>
                                            <div className="text-sm text-gray-600">系統偵測到的關鍵警示時刻</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 bg-indigo-50 p-3 rounded text-sm">
                                        <strong>QHC 說明：</strong>QHC 越低 → 情緒越不穩；介入後會逐漸上升。範圍介於 0～1（1.0 = 完全平靜，0.0 = 即將爆發）
                                    </div>
                                </div>

                                <div className="bg-white border-2 border-fuchsia-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">💡 晶片指示</h3>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead className="bg-fuchsia-50">
                                                <tr>
                                                    <th className="px-4 py-3 text-left font-semibold text-gray-800">指示</th>
                                                    <th className="px-4 py-3 text-left font-semibold text-gray-800">意義</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                <tr className="hover:bg-blue-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">風險：低／中／高</td>
                                                    <td className="px-4 py-3 text-gray-700">即時風險等級評估</td>
                                                </tr>
                                                <tr className="hover:bg-yellow-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">預警倒數：5 秒</td>
                                                    <td className="px-4 py-3 text-gray-700">代表爆發前的預警時間窗</td>
                                                </tr>
                                                <tr className="hover:bg-green-50">
                                                    <td className="px-4 py-3 font-medium text-gray-900">介入：啟動／未啟動</td>
                                                    <td className="px-4 py-3 text-gray-700">是否正在播放安撫音與呼吸指導</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="bg-white border-2 border-pink-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">📊 數值顯示卡</h3>
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                                            <div className="text-2xl font-bold text-blue-600 mb-1">HR</div>
                                            <div className="text-sm text-gray-600 mb-2">心率（bpm）</div>
                                            <div className="text-lg font-semibold text-gray-800">即時更新</div>
                                        </div>
                                        <div className="bg-green-50 p-4 rounded-lg text-center">
                                            <div className="text-2xl font-bold text-green-600 mb-1">HRV</div>
                                            <div className="text-sm text-gray-600 mb-2">心率變異（ms）</div>
                                            <div className="text-lg font-semibold text-gray-800">即時更新</div>
                                        </div>
                                        <div className="bg-orange-50 p-4 rounded-lg text-center">
                                            <div className="text-2xl font-bold text-orange-600 mb-1">EDA</div>
                                            <div className="text-sm text-gray-600 mb-2">皮膚電導（μS）</div>
                                            <div className="text-lg font-semibold text-gray-800">即時更新</div>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm text-gray-600">
                                        • 可搭配滑桿微調門檻值，觀察觸發敏感度
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 p-6 rounded-xl">
                                    <h3 className="text-xl font-bold text-gray-800 mb-4">量子幸福曲線（QHC）原理</h3>
                                    <div className="space-y-3 text-sm text-gray-700">
                                        <p>QHC 用來可視化「情緒穩定度」，範圍介於 0～1：</p>
                                        <ul className="space-y-2 ml-4">
                                            <li>• <strong>1.0</strong> → 完全平靜</li>
                                            <li>• <strong>0.5</strong> → 輕度壓力</li>
                                            <li>• <strong>0.0</strong> → 即將爆發</li>
                                        </ul>
                                        <div className="bg-white p-4 rounded-lg mt-3">
                                            <div className="font-mono text-xs text-gray-600 mb-2">計算公式（模擬）：</div>
                                            <div className="font-mono text-sm bg-gray-100 p-3 rounded">
                                                QHC = 1 - α₁·z(HR) + α₂·z(HRV) - α₃·z(EDA)
                                            </div>
                                            <div className="text-xs text-gray-500 mt-2">其中 α 為權重，z 為標準化值</div>
                                        </div>
                                        <p className="text-xs text-gray-600">在目前版本中，QHC 以類波函數方式模擬波動（0.2 Hz 範圍），用以呈現「量子態疊加」的情緒變化，並於介入後逐步回穩。</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                                    <h4 className="font-semibold text-gray-800 mb-2">介面特色</h4>
                                    <ul className="space-y-1 text-sm text-gray-700">
                                        <li>• <strong>清新藍白風格</strong>：視覺柔和、醫療儀表感</li>
                                        <li>• <strong>響應式設計</strong>：iPad、筆電皆能完整展示</li>
                                        <li>• <strong>離線可用</strong>：單一 HTML 檔即可運作，無須伺服器</li>
                                        <li>• <strong>原生串接介面</strong>：支援 Apple Watch HR 即時輸入</li>
                                        <li>• <strong>安全與隱私</strong>：所有資料皆在本機端模擬，不上傳雲端</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* File Structure Tab */}
                        {activeTab === 'structure' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">專案檔案結構</h2>
                                <div className="bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm overflow-x-auto">
                                    <pre>{`HeartBridge/
├─ iOS/
│  ├─ App/
│  │  ├─ HeartBridgeApp.swift
│  │  └─ ContentView.swift
│  ├─ Bridge/
│  │  ├─ WebView.swift
│  │  └─ BridgeSession.swift
│  └─ Resources/
│     └─ WebAssets/
│        └─ asd-demo-light.html
├─ watchOS/
│  ├─ App/
│  │  └─ HeartBridgeWatchApp.swift
│  ├─ Bridge/
│  │  └─ WatchSessionManager.swift
│  └─ Health/
│     └─ HeartRateManager.swift
└─ Shared/
   └─ README.md`}</pre>
                                </div>
                            </div>
                        )}

                        {/* Code Tab */}
                        {activeTab === 'code' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">完整程式碼</h2>

                                <div className="space-y-4">
                                    <div className="border rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleCode('ios1')}
                                            className="w-full bg-blue-500 text-white p-4 flex items-center justify-between hover:bg-blue-600 transition"
                                        >
                                            <span className="font-semibold">iOS/App/HeartBridgeApp.swift</span>
                                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCode.ios1 ? 'rotate-180' : ''}`} />
                                        </button>
                                        {expandedCode.ios1 && (
                                            <div className="bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
                                                <pre>{`import SwiftUI

@main
struct HeartBridgeApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}`}</pre>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleCode('ios2')}
                                            className="w-full bg-blue-500 text-white p-4 flex items-center justify-between hover:bg-blue-600 transition"
                                        >
                                            <span className="font-semibold">iOS/App/ContentView.swift</span>
                                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCode.ios2 ? 'rotate-180' : ''}`} />
                                        </button>
                                        {expandedCode.ios2 && (
                                            <div className="bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
                                                <pre>{`import SwiftUI

struct ContentView: View {
    var body: some View {
        WebView()
            .ignoresSafeArea()
    }
}`}</pre>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleCode('ios3')}
                                            className="w-full bg-blue-500 text-white p-4 flex items-center justify-between hover:bg-blue-600 transition"
                                        >
                                            <span className="font-semibold">iOS/Bridge/WebView.swift</span>
                                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCode.ios3 ? 'rotate-180' : ''}`} />
                                        </button>
                                        {expandedCode.ios3 && (
                                            <div className="bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
                                                <pre>{`import SwiftUI
import WebKit

final class WebViewCoordinator: NSObject, WKNavigationDelegate {
    var webView: WKWebView?
    
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        self.webView = webView
        let js = """
        if (!window.updateFromNative) {
          window.updateFromNative = function(data){
            if (data.hr) { 
              window.state = window.state || {}; 
              window.state = Object.assign({}, window.state, {hr:data.hr}); 
            }
          };
        }
        """
        webView.evaluateJavaScript(js, completionHandler: nil)
        BridgeSession.shared.attach(webView: webView)
    }
}

struct WebView: UIViewRepresentable {
    func makeCoordinator() -> WebViewCoordinator { 
        WebViewCoordinator() 
    }

    func makeUIView(context: Context) -> WKWebView {
        let cfg = WKWebViewConfiguration()
        cfg.allowsInlineMediaPlayback = true
        let wv = WKWebView(frame: .zero, configuration: cfg)
        wv.navigationDelegate = context.coordinator

        if let url = Bundle.main.url(forResource: "asd-demo-light", 
                                     withExtension: "html", 
                                     subdirectory: "WebAssets") {
            wv.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        return wv
    }

    func updateUIView(_ uiView: WKWebView, context: Context) {}
}`}</pre>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleCode('ios4')}
                                            className="w-full bg-blue-500 text-white p-4 flex items-center justify-between hover:bg-blue-600 transition"
                                        >
                                            <span className="font-semibold">iOS/Bridge/BridgeSession.swift</span>
                                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCode.ios4 ? 'rotate-180' : ''}`} />
                                        </button>
                                        {expandedCode.ios4 && (
                                            <div className="bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
                                                <pre>{`import Foundation
import WatchConnectivity
import WebKit

final class BridgeSession: NSObject, WCSessionDelegate {
    static let shared = BridgeSession()
    private override init() { super.init(); activate() }
    private weak var webView: WKWebView?

    func attach(webView: WKWebView) {
        self.webView = webView
    }

    private func activate() {
        guard WCSession.isSupported() else { return }
        let s = WCSession.default
        s.delegate = self
        s.activate()
    }

    func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
        if let hr = message["hr"] as? Int {
            let js = "window.updateFromNative && window.updateFromNative({hr:\\(hr)});"
            DispatchQueue.main.async { [weak self] in
                self?.webView?.evaluateJavaScript(js, completionHandler: nil)
            }
        }
    }

    func session(_ session: WCSession, didReceiveMessage message: [String : Any],
                 replyHandler: @escaping ([String : Any]) -> Void) {
        session(session, didReceiveMessage: message)
        replyHandler(["ok": true])
    }

    func sessionDidBecomeInactive(_ session: WCSession) {}
    func sessionDidDeactivate(_ session: WCSession) { 
        WCSession.default.activate() 
    }
    func session(_ session: WCSession, 
                 activationDidCompleteWith activationState: WCSessionActivationState, 
                 error: Error?) {}
}`}</pre>
                                            </div>
                                        )}
                                    </div>

                                    <div className="border rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => toggleCode('watch1')}
                                            className="w-full bg-green-500 text-white p-4 flex items-center justify-between hover:bg-green-600 transition"
                                        >
                                            <span className="font-semibold">watchOS/App/HeartBridgeWatchApp.swift</span>
                                            <ChevronDown className={`w-5 h-5 transition-transform ${expandedCode.watch1 ? 'rotate-180' : ''}`} />
                                        </button>
                                        {expandedCode.watch1 && (
                                            <div className="bg-gray-900 text-gray-100 p-4 text-sm overflow-x-auto">
                                                <pre>{`import SwiftUI

@main
struct HeartBridgeWatchApp: App {
    @StateObject var hr = HeartRateManager.shared

    var body: some Scene {
        WindowGroup {
            VStack(spacing: 12) {
                Text("HeartBridge ⌚️")
                    .font(.headline)
                
                Text("HR: \\(Int(hr.lastHR)) bpm")
                    .font(.system(size: 28, weight: .bold))
                
                Button(hr.isRunning ? "停止監測" : "開始監測") {
                    hr.isRunning ? hr.stop() : hr.start()
                }
                .buttonStyle(.borderedProminent)
                .tint(hr.isRunning ? .red : .blue)
                
                Text(hr.statusText)
                    .font(.footnote)
                    .foregroundColor(.gray)
            }
            .padding()
        }
    }
}`}</pre>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Setup Tab */}
                        {activeTab === 'setup' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">Xcode 設定檢查清單</h2>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 border-2 border-blue-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3">✓ 1. 建立專案</h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• Xcode 新增 iOS App</li>
                                            <li>• File → New → Target → watchOS App</li>
                                        </ul>
                                    </div>

                                    <div className="bg-green-50 border-2 border-green-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3">✓ 2. iOS Target Capabilities</h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• HealthKit (Read: Heart Rate)</li>
                                            <li>• Background Modes (可選)</li>
                                        </ul>
                                    </div>

                                    <div className="bg-purple-50 border-2 border-purple-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3">✓ 3. watchOS Target Capabilities</h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• HealthKit</li>
                                            <li>• WatchKit Extension</li>
                                        </ul>
                                    </div>

                                    <div className="bg-yellow-50 border-2 border-yellow-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3">✓ 4. Info.plist</h3>
                                        <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs overflow-x-auto mt-2">
                                            <pre>NSHealthShareUsageDescription: "需要讀取心率用於情緒監測"</pre>
                                        </div>
                                    </div>

                                    <div className="bg-orange-50 border-2 border-orange-200 p-5 rounded-xl">
                                        <h3 className="font-semibold text-gray-800 mb-3">✓ 5. 加入網頁檔案</h3>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li>• 建立 iOS/Resources/WebAssets/</li>
                                            <li>• 拖入 asd-demo-light.html</li>
                                            <li>• 勾選 Add to targets (iOS)</li>
                                            <li>• 檢查 Build Phases → Copy Bundle Resources</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Demo Tab */}
                        {activeTab === 'demo' && (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-gray-800 mb-4">演示流程（2 分鐘腳本）</h2>

                                <div className="space-y-3">
                                    <div className="flex gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                        <div className="text-blue-600 font-bold text-lg w-12">0:00</div>
                                        <div>
                                            <div className="font-semibold text-gray-800">開啟 iPhone App</div>
                                            <div className="text-sm text-gray-600">網頁載入完成，顯示初始介面</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                                        <div className="text-green-600 font-bold text-lg w-12">0:10</div>
                                        <div>
                                            <div className="font-semibold text-gray-800">Apple Watch 點「開始監測」</div>
                                            <div className="text-sm text-gray-600">手錶開始採集心率</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                        <div className="text-purple-600 font-bold text-lg w-12">0:15</div>
                                        <div>
                                            <div className="font-semibold text-gray-800">即時心率顯示</div>
                                            <div className="text-sm text-gray-600">iPhone 網頁上的心率數字開始跳動</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                                        <div className="text-orange-600 font-bold text-lg w-12">0:30</div>
                                        <div>
                                            <div className="font-semibold text-gray-800">觸發前兆按鈕</div>
                                            <div className="text-sm text-gray-600">倒數 5 秒預警開始</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                                        <div className="text-red-600 font-bold text-lg w-12">0:35</div>
                                        <div>
                                            <div className="font-semibold text-gray-800">自動介入啟動</div>
                                            <div className="text-sm text-gray-600">呼吸圈動畫 + 安撫音訊播放</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 p-4 bg-indigo-50 rounded-lg border-l-4 border-indigo-500">
                                        <div className="text-indigo-600 font-bold text-lg w-12">1:00</div>
                                        <div>
                                            <div className="font-semibold text-gray-800">完整循環展示</div>
                                            <div className="text-sm text-gray-600">監測 → 預警 → 介入 → 回穩</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-xl mt-6">
                                    <h3 className="text-xl font-bold mb-3">💡 演示口訣</h3>
                                    <p className="text-purple-100">「錶送 HR → 手機丟進網頁 → 曲線與倒數跟著動」</p>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

                {/* Footer Tips */}
                <div className="mt-6 bg-white rounded-xl shadow p-6">
                    <h3 className="font-bold text-gray-800 mb-3">🔧 常見問題</h3>
                    <div className="space-y-3 text-sm">
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                            <div>
                                <div className="font-semibold text-gray-800">看不到心率？</div>
                                <div className="text-gray-600">檢查 Watch 的 HealthKit 授權、確認按了「開始監測」</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <div>
                                <div className="font-semibold text-gray-800">WCSession unreachable？</div>
                                <div className="text-gray-600">iPhone App 需在前景、兩邊都要 activate()、必須用真機</div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <div>
                                <div className="font-semibold text-gray-800">網頁載入失敗？</div>
                                <div className="text-gray-600">確認 asd-demo-light.html 在 Copy Bundle Resources 中</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

