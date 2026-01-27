
import React from 'react';
import { Icon } from '../icons';

interface Props {
  onBack: () => void;
  onAdd: () => void;
}

const VehicleManagement: React.FC<Props> = ({ onBack, onAdd }) => {
  const vehicles = [
    { plate: '苏A 88888', driver: '张师傅', status: '运输中', type: '自卸车' },
    { plate: '新J 41277', driver: '李师傅', status: '空闲', type: '罐车' },
    { plate: '苏A B2291', driver: '王师傅', status: '装货中', type: '半挂车' },
    { plate: '苏A 1002S', driver: '赵师傅', status: '异常', type: '自卸车' },
  ];

  return (
    <div className="absolute inset-0 bg-[#F7F9FC] z-[100] flex flex-col animate-in fade-in slide-in-from-right duration-300 overflow-hidden">
      <header className="px-6 pt-12 pb-4 bg-white border-b border-slate-100 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-lg font-black text-slate-900 flex-1 ml-2">车辆档案库</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-5 pb-24 space-y-4 no-scrollbar">
        <div className="flex justify-between items-center px-1 mb-2">
            <span className="text-xs font-bold text-slate-400">共 {vehicles.length} 台注册车辆</span>
        </div>
        {vehicles.map((v, i) => (
          <div key={i} className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all">
            <div className="flex items-center space-x-4">
              <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 ring-2 ring-slate-100/50">
                <Icon.Truck />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 tracking-tight">{v.plate}</p>
                <p className="text-[10px] text-slate-400 font-bold">{v.type} • {v.driver}</p>
              </div>
            </div>
            <span className={`text-[9px] font-black px-2 py-1 rounded-lg border ${
              v.status === '空闲' ? 'bg-slate-50 text-slate-400 border-slate-100' : 
              v.status === '异常' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
            }`}>{v.status}</span>
          </div>
        ))}
      </div>

      {/* Action Button at the Bottom */}
      <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
        <button 
          onClick={onAdd}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 active:scale-95 transition-all flex items-center justify-center space-x-2"
        >
          <Icon.Plus />
          <span>新增车辆档案</span>
        </button>
      </div>
    </div>
  );
};

export default VehicleManagement;
