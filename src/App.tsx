import React, { useState } from 'react';
import { FileText, Activity, Heart } from 'lucide-react';
import HeartBridgeGuide from './components/HeartBridgeGuide';
import HeartMelodyDoc from './components/HeartMelodyDoc';
import HeartMelodySystem from './components/HeartMelodySystem';

type Page = 'system' | 'doc' | 'guide';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('system');

  const pages = [
    { id: 'system' as Page, label: '互動系統', icon: Activity, color: 'from-pink-500 to-purple-600' },
    { id: 'doc' as Page, label: '系統文檔', icon: FileText, color: 'from-blue-500 to-cyan-600' },
    { id: 'guide' as Page, label: 'HeartBridge 指南', icon: Heart, color: 'from-indigo-500 to-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-pink-500 to-purple-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                心之旋律
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              {pages.map(page => {
                const Icon = page.icon;
                return (
                  <button
                    key={page.id}
                    onClick={() => setCurrentPage(page.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      currentPage === page.id
                        ? `bg-gradient-to-r ${page.color} text-white shadow-md`
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{page.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main>
        {currentPage === 'system' && <HeartMelodySystem />}
        {currentPage === 'doc' && <HeartMelodyDoc />}
        {currentPage === 'guide' && <HeartBridgeGuide />}
      </main>
    </div>
  );
}

export default App

