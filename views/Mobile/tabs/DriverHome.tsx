
import React from 'react';
import { TransportStatus, DetailedOrder } from '../../../types';
import { Icon } from '../icons';

interface Props {
  onOpenOrder: (order: DetailedOrder) => void;
  onOpenPlayback: (order: DetailedOrder) => void;
}

const DriverHome: React.FC<Props> = ({ onOpenOrder, onOpenPlayback }) => {
  const stats = [
    { label: '今日运量', value: '48', unit: '吨' },
    { label: '今日订单', value: '3', unit: '单' },
    { label: '累计运量', value: '1,204', unit: '吨' },
  ];

  const currentJob: DetailedOrder = {
    id: 'WO20231027001',
    plateNumber: '苏A 88888',
    status: TransportStatus.IN_TRANSIT,
    sender: '滨江联合热电',
    receiver: '栖霞再生中心 3#卸货区',
    cargoType: '粉煤灰',
    createdAt: '2023-10-27 14:30'
  };

  const historyJobs: DetailedOrder[] = [
    {
      id: 'WO20231026042',
      plateNumber: '苏A 88888',
      status: TransportStatus.COMPLETED,
      sender: '滨江热电',
      receiver: '栖霞消纳场',
      cargoType: '粉煤灰',
      createdAt: '2023-10-26 14:00'
    },
    {
      id: 'WO20231025091',
      plateNumber: '苏A 88888',
      status: TransportStatus.COMPLETED,
      sender: '滨江热电',
      receiver: '六合再生基地',
      cargoType: '炉渣',
      createdAt: '2023-10-25 09:30'
    }
  ];

  return (
    <div className="p-5 space-y-6 animate-fade-in no-scrollbar pb-10">
      {/* 司机身份卡 */}
      <div className="bg-slate-900 rounded-[2.5rem] p-7 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4">
             <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/5">🚚</div>
             <div>
                <h2 className="text-xl font-black tracking-tight">师傅，辛苦了</h2>
                <div className="flex items-center space-x-2 mt-1.5">
                  <span className="text-[10px] bg-blue-600 px-2 py-0.5 rounded-lg font-black shadow-lg shadow-blue-900/40">{currentJob.plateNumber}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">重型自卸货车</span>
                </div>
             </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mt-8 pt-6 border-t border-white/10">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">{s.label}</p>
                <p className="text-xl font-black">{s.value}<span className="text-[9px] font-bold text-slate-500 ml-0.5">{s.unit}</span></p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 正在执行的任务卡片 */}
      <section className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-50 space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="text-sm font-black text-slate-900 flex items-center">
              <span className="w-1 h-3 bg-blue-600 rounded-full mr-2"></span>
              当前运输任务
            </h3>
            <span className="text-[10px] text-blue-600 bg-blue-50 px-3 py-1 rounded-xl font-black border border-blue-100">{currentJob.status}</span>
        </div>
        
        <div className="space-y-4">
           <div className="flex items-center justify-between bg-slate-50/80 p-4 rounded-2xl border border-white shadow-inner">
              <div className="flex items-center space-x-3 overflow-hidden">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm shrink-0"><Icon.Map /></div>
                <div className="overflow-hidden">
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">卸货目的地</p>
                  <p className="text-xs font-black text-slate-700 truncate">{currentJob.receiver}</p>
                </div>
              </div>
              <button 
                onClick={() => alert('正在调起地图导航...')}
                className="shrink-0 ml-4 px-5 py-2.5 bg-white text-blue-600 text-[10px] font-black rounded-xl shadow-md active:scale-90 transition-all flex items-center space-x-1.5 border border-blue-50 hover:bg-blue-50"
              >
                <Icon.Map />
                <span>导航</span>
              </button>
           </div>

           <div className="flex items-center space-x-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-50">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 shadow-sm"><Icon.Stats /></div>
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest">地磅记录重量</p>
                  <p className="text-xs font-black text-slate-700">24.5吨</p>
                </div>
                <button 
                  onClick={() => onOpenPlayback(currentJob)}
                  className="px-4 py-2 bg-slate-100 rounded-lg text-[9px] font-black text-slate-600 active:bg-slate-200"
                >查看轨迹</button>
              </div>
           </div>
        </div>
        
        <button 
          onClick={() => onOpenOrder(currentJob)}
          className="w-full h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-[1.8rem] text-white font-black text-base shadow-2xl shadow-blue-200 flex items-center justify-center space-x-4 active:scale-[0.97] transition-all border-b-4 border-blue-800"
        >
          <div className="bg-white/20 p-2.5 rounded-2xl shadow-inner">
            <Icon.Camera />
          </div>
          <div className="text-left">
            <p className="text-sm">到达指定地点</p>
            <p className="text-[10px] opacity-70 font-bold uppercase tracking-wider">拍照取证留痕</p>
          </div>
        </button>
      </section>

      {/* 历史运单记录 */}
      <section className="space-y-4 px-1">
        <div className="flex justify-between items-center">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">近期运单回顾</h3>
            <span className="text-[10px] font-black text-blue-600">全部历史 ›</span>
        </div>
        {historyJobs.map((job, i) => (
           <div key={job.id} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex items-center justify-between active:bg-slate-50 transition-colors group">
              <div className="flex items-center space-x-4">
                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 font-mono text-[10px] font-black">#0{i+1}</div>
                 <div onClick={() => onOpenOrder(job)}>
                    <p className="text-xs font-black text-slate-800">{job.sender} → {job.receiver.slice(0, 5)}...</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-0.5">{job.createdAt} • 24.5T</p>
                 </div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); onOpenPlayback(job); }}
                className="text-[10px] font-black text-blue-600 bg-blue-50 px-3 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                轨迹
              </button>
           </div>
        ))}
      </section>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default DriverHome;
