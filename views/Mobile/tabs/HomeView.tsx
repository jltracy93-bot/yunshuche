
import React from 'react';
import { TransportStatus } from '../../../types';

const HomeView: React.FC = () => {
  const currentJob = {
    id: 'WO-20231027-001',
    plate: '苏A 88888',
    status: TransportStatus.IN_TRANSIT,
    source: '滨江发电厂',
    dest: '固废填埋场',
    weight: '24.5吨',
    time: '2023-10-27 14:30'
  };

  return (
    <div className="p-4 space-y-4">
      {/* Status Card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-blue-100 text-sm">当前运输状态</p>
            <h2 className="text-2xl font-bold">{currentJob.status}</h2>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-xs backdrop-blur-sm">
            运行中
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
          <div>
            <p className="text-blue-100 text-xs">车牌号</p>
            <p className="font-semibold">{currentJob.plate}</p>
          </div>
          <div>
            <p className="text-blue-100 text-xs">重量</p>
            <p className="font-semibold">{currentJob.weight}</p>
          </div>
        </div>
      </div>

      {/* Route Timeline */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">流程记录</h3>
        <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
          <div className="flex items-start relative pl-8 group">
             <div className="absolute left-0 w-6 h-6 rounded-full bg-green-500 border-4 border-green-100 z-10"></div>
             <div>
                <p className="text-sm font-bold text-slate-800">已过地磅 - 进场</p>
                <p className="text-xs text-slate-400">滨江厂 1号地磅 • 14:10</p>
             </div>
          </div>
          <div className="flex items-start relative pl-8">
             <div className="absolute left-0 w-6 h-6 rounded-full bg-green-500 border-4 border-green-100 z-10"></div>
             <div>
                <p className="text-sm font-bold text-slate-800">已过道闸 - 出厂</p>
                <p className="text-xs text-slate-400">南门道闸 • 14:25</p>
             </div>
          </div>
          <div className="flex items-start relative pl-8">
             <div className="absolute left-0 w-6 h-6 rounded-full bg-blue-500 border-4 border-blue-100 z-10 animate-pulse"></div>
             <div>
                <p className="text-sm font-bold text-blue-600">正在前往 - 填埋场</p>
                <p className="text-xs text-slate-400">OBD 实时定位中...</p>
             </div>
          </div>
          <div className="flex items-start relative pl-8">
             <div className="absolute left-0 w-6 h-6 rounded-full bg-slate-200 z-10"></div>
             <div>
                <p className="text-sm font-bold text-slate-300">倾倒拍照</p>
                <p className="text-xs text-slate-300">等待到达指定地点</p>
             </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center hover:bg-slate-50 transition-colors">
            <span className="text-2xl mb-2">📞</span>
            <span className="text-sm font-medium text-slate-700">联系中控</span>
        </button>
        <button className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center hover:bg-slate-50 transition-colors">
            <span className="text-2xl mb-2">🆘</span>
            <span className="text-sm font-medium text-slate-700">异常报备</span>
        </button>
      </div>
    </div>
  );
};

export default HomeView;
