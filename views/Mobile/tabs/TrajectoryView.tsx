
import React, { useState } from 'react';
import { Icon } from '../icons';
import { TransportStatus } from '../../../types';

interface VehiclePos {
  id: string;
  plate: string;
  x: number;
  y: number;
  status: TransportStatus;
  speed: string;
  route: string;
}

const TrajectoryView: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>('v1');

  const vehicles: VehiclePos[] = [
    { id: 'v1', plate: '苏A 88888', x: 220, y: 320, status: TransportStatus.IN_TRANSIT, speed: '42km/h', route: 'M 40 450 Q 150 400 220 320 T 360 200' },
    { id: 'v2', plate: '新J 41277', x: 100, y: 520, status: TransportStatus.LOADING, speed: '0km/h', route: 'M 40 580 L 100 520' },
    { id: 'v3', plate: '苏A B2291', x: 280, y: 450, status: TransportStatus.ABNORMAL, speed: '12km/h', route: 'M 320 600 Q 300 520 280 450' },
  ];

  const getMarkerColor = (status: TransportStatus) => {
    switch (status) {
      case TransportStatus.IN_TRANSIT: return 'bg-blue-600 shadow-blue-500/50';
      case TransportStatus.ABNORMAL: return 'bg-rose-600 shadow-rose-500/50';
      case TransportStatus.LOADING: return 'bg-orange-500 shadow-orange-500/50';
      default: return 'bg-slate-600 shadow-slate-500/50';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0f172a] relative overflow-hidden">
      {/* Simulation Map Background */}
      <div className="absolute inset-0 z-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        {/* Synthetic Map Shapes (Polygons for districts) */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <path d="M 0 220 L 120 280 L 180 180 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
          <path d="M 220 420 L 380 480 L 340 320 Z" fill="#334155" stroke="#475569" strokeWidth="2" />
          <circle cx="200" cy="400" r="100" fill="none" stroke="#1e293b" strokeWidth="1" />
        </svg>

        {/* Dynamic Route Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {vehicles.map(v => (
            <path 
              key={v.id}
              d={v.route} 
              fill="none" 
              stroke={v.status === TransportStatus.ABNORMAL ? '#f43f5e' : '#3b82f6'} 
              strokeWidth="2" 
              strokeDasharray="5 5" 
              className={`opacity-30 ${v.status !== TransportStatus.LOADING ? 'animate-[flow_3s_linear_infinite]' : ''}`}
            />
          ))}
        </svg>

        {/* Vehicle Markers */}
        {vehicles.map(v => (
          <div 
            key={v.id}
            onClick={() => setSelectedVehicle(v.id)}
            className="absolute cursor-pointer transition-all duration-700 transform -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: v.x, top: v.y }}
          >
            <div className="relative flex flex-col items-center">
              {/* Ping effect for active/abnormal */}
              {(selectedVehicle === v.id || v.status === TransportStatus.ABNORMAL) && (
                <div className={`absolute -inset-2 rounded-full animate-ping opacity-40 ${getMarkerColor(v.status).split(' ')[0]}`}></div>
              )}
              
              <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white transition-transform duration-300 ${selectedVehicle === v.id ? 'scale-125' : 'scale-100'} ${getMarkerColor(v.status)}`}>
                <div className="scale-[0.7]"><Icon.Truck /></div>
              </div>

              {/* Floating ID Label */}
              <div className={`mt-2 px-2 py-0.5 rounded border border-slate-700 bg-slate-900/90 text-[8px] font-black text-white shadow-xl transition-opacity ${selectedVehicle === v.id ? 'opacity-100' : 'opacity-40'}`}>
                {v.plate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Monitoring Overlay Top */}
      <div className="absolute top-6 left-6 right-6 z-30 pointer-events-none flex justify-between items-start">
        <div className="bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-700 pointer-events-auto">
          <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Active Fleet Monitor</p>
          <p className="text-white text-xs font-black mt-0.5">在线统计: {vehicles.length} / 120</p>
        </div>
        <button className="w-10 h-10 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-700 flex items-center justify-center text-white pointer-events-auto active:scale-90">
          <Icon.Stats />
        </button>
      </div>

      {/* Selected Unit Details Panel */}
      {selectedVehicle && (
        <div className="absolute bottom-6 left-4 right-4 z-30 bg-slate-900/80 backdrop-blur-2xl rounded-[2rem] border border-white/10 p-5 shadow-2xl animate-in slide-in-from-bottom-6 duration-500">
          {vehicles.filter(v => v.id === selectedVehicle).map(v => (
            <div key={v.id} className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-xl ${getMarkerColor(v.status)}`}>
                    <Icon.Truck />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white tracking-tight">{v.plate}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">实时速值: {v.speed}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${
                    v.status === TransportStatus.ABNORMAL ? 'bg-rose-500/20 text-rose-400 border-rose-500/30' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  }`}>
                    {v.status}
                  </span>
                  <p className="text-[8px] text-slate-500 mt-1">更新于 3秒前</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/5">
                <button className="bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl text-[10px] font-black flex items-center justify-center space-x-2 transition-colors">
                  <Icon.Stats />
                  <span>历史轨迹</span>
                </button>
                <button className="bg-blue-600 text-white py-3 rounded-xl text-[10px] font-black flex items-center justify-center space-x-2 transition-colors shadow-lg shadow-blue-900/40">
                  <Icon.Map />
                  <span>详细定位</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Legend bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-6 py-4 flex justify-center pointer-events-none">
        <div className="flex space-x-4 bg-slate-900/50 backdrop-blur px-4 py-2 rounded-full border border-white/5 pointer-events-auto">
           {[
             { label: '在途', color: 'bg-blue-600' },
             { label: '装载', color: 'bg-orange-500' },
             { label: '异常', color: 'bg-rose-600' },
           ].map((l, i) => (
             <div key={i} className="flex items-center space-x-1.5">
               <span className={`w-1.5 h-1.5 rounded-full ${l.color}`}></span>
               <span className="text-[8px] font-black text-slate-400 uppercase">{l.label}</span>
             </div>
           ))}
        </div>
      </div>

      <style>{`
        @keyframes flow { to { stroke-dashoffset: -20; } }
      `}</style>
    </div>
  );
};

export default TrajectoryView;
