
import React, { useState, useEffect } from 'react';
import { Icon } from '../icons';
import { DetailedOrder, TransportStatus } from '../../../types';

interface Props {
  order: DetailedOrder;
  onBack: () => void;
}

const TrajectoryPlayback: React.FC<Props> = ({ order, onBack }) => {
  const [progress, setProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: any;
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 100 : prev + 1));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, progress]);

  // 模拟路径数据
  const path = "M 40 450 Q 150 400 220 320 T 360 200";

  return (
    <div className="absolute inset-0 bg-[#0f172a] z-[120] flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <header className="px-6 pt-12 pb-4 bg-slate-900/50 backdrop-blur-md border-b border-white/5 flex items-center shrink-0 z-20">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="ml-2 flex-1">
          <h2 className="text-sm font-black text-white tracking-tight">{order.plateNumber} 轨迹回放</h2>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">运单号: {order.id.slice(-8)}</p>
        </div>
      </header>

      {/* Map Simulation */}
      <div className="flex-1 relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <svg className="absolute inset-0 w-full h-full">
           {/* 背景建筑模拟 */}
           <path d="M 0 220 L 120 280 L 180 180 Z" fill="#334155" opacity="0.1" />
           <path d="M 220 420 L 380 480 L 340 320 Z" fill="#334155" opacity="0.1" />
           
           {/* 完整路径 */}
           <path d={path} fill="none" stroke="#ffffff10" strokeWidth="4" strokeLinecap="round" />
           
           {/* 进度路径 */}
           <path 
             d={path} 
             fill="none" 
             stroke="#3b82f6" 
             strokeWidth="4" 
             strokeLinecap="round" 
             strokeDasharray="1000"
             strokeDashoffset={1000 - progress * 10} 
           />
        </svg>

        {/* 车辆图标 */}
        <div 
           className="absolute transition-all duration-75"
           style={{ 
             left: `${40 + (320 * progress / 100)}px`, 
             top: `${450 - (250 * progress / 100)}px`, // 简单线性拟合演示
             transform: 'translate(-50%, -50%)' 
           }}
        >
          <div className="w-10 h-10 bg-blue-600 rounded-2xl border-2 border-white shadow-2xl flex items-center justify-center text-white">
            <Icon.Truck />
          </div>
        </div>

        {/* 节点标记 */}
        <div className="absolute left-[40px] top-[450px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
           <div className="w-3 h-3 bg-emerald-500 rounded-full border-2 border-white shadow-lg"></div>
           <span className="mt-2 text-[8px] font-black text-emerald-500 bg-white/10 px-1 rounded uppercase tracking-tighter">装货点</span>
        </div>
        <div className="absolute left-[360px] top-[200px] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
           <div className="w-3 h-3 bg-rose-500 rounded-full border-2 border-white shadow-lg"></div>
           <span className="mt-2 text-[8px] font-black text-rose-500 bg-white/10 px-1 rounded uppercase tracking-tighter">目的地</span>
        </div>
      </div>

      {/* Playback Controls */}
      <div className="bg-slate-900 border-t border-white/5 p-6 space-y-4 safe-bottom">
        <div className="flex items-center space-x-4">
           <button 
             onClick={() => setIsPlaying(!isPlaying)}
             className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white active:scale-90 transition-transform"
           >
             {isPlaying ? (
               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
             ) : (
               <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
             )}
           </button>
           <div className="flex-1 space-y-1">
              <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                 <span>回放进度</span>
                 <span>{progress}%</span>
              </div>
              <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                 <div className="absolute left-0 h-full bg-blue-500" style={{ width: `${progress}%` }}></div>
              </div>
           </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
           <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">当前速度</p>
              <p className="text-white text-sm font-black mt-1">42 km/h</p>
           </div>
           <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">剩余距离</p>
              <p className="text-white text-sm font-black mt-1">12.5 km</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrajectoryPlayback;
