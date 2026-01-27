
import React from 'react';

interface Props {
  onBack: () => void;
}

const AddVehicle: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="absolute inset-0 bg-[#F7F9FC] z-[110] flex flex-col animate-in fade-in slide-in-from-right duration-300 overflow-hidden">
      <header className="px-6 pt-12 pb-4 bg-white border-b border-slate-100 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90 transition-transform">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-lg font-black text-slate-900 flex-1 ml-2">登记新车辆</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">车牌号码</label>
            <input 
              type="text" 
              placeholder="如：苏A 88888" 
              className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-500/10 uppercase" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">车辆类型</label>
            <div className="relative">
              <select className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none appearance-none">
                <option>自卸货车</option>
                <option>罐式货车</option>
                <option>半挂牵引车</option>
                <option>厢式货车</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 text-xs font-black">▼</div>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">绑定主司机</label>
            <input 
              type="text" 
              placeholder="输入姓名或手机号" 
              className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-500/10" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">OBD设备号 (SN)</label>
            <input 
              type="text" 
              placeholder="扫描或输入16位设备编码" 
              className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-500/10" 
            />
          </div>
        </div>

        <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-50 space-y-3">
            <h4 className="text-[10px] font-black text-blue-800 uppercase tracking-widest">资质文件上传</h4>
            <div className="grid grid-cols-2 gap-3">
                <div className="aspect-video bg-white rounded-xl border border-dashed border-blue-200 flex flex-col items-center justify-center space-y-1 active:bg-blue-50 transition-colors">
                    <span className="text-xl">🪪</span>
                    <span className="text-[9px] font-bold text-blue-400">行驶证正本</span>
                </div>
                <div className="aspect-video bg-white rounded-xl border border-dashed border-blue-200 flex flex-col items-center justify-center space-y-1 active:bg-blue-50 transition-colors">
                    <span className="text-xl">🚛</span>
                    <span className="text-[9px] font-bold text-blue-400">车辆侧面照</span>
                </div>
            </div>
        </div>

        <button 
          onClick={() => { alert('车辆档案已提交审核！'); onBack(); }}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 active:scale-95 transition-all mb-4"
        >
          提交档案审核
        </button>
      </div>
    </div>
  );
};

export default AddVehicle;
