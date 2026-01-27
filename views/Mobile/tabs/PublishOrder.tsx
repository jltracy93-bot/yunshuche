
import React from 'react';

interface Props {
  onBack: () => void;
}

const PublishOrder: React.FC<Props> = ({ onBack }) => {
  return (
    <div className="absolute inset-0 bg-[#F7F9FC] z-[100] flex flex-col animate-in fade-in slide-in-from-right duration-300 overflow-hidden">
      {/* Secondary Page Header */}
      <header className="px-6 pt-12 pb-4 bg-white border-b border-slate-100 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90 transition-transform">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-lg font-black text-slate-900 flex-1 ml-2">发布运输指令</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 space-y-5">
          {/* Vehicle Selection */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">执行车辆</label>
            <div className="relative">
              <select className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-500/10 appearance-none">
                <option>苏A 88888 (空闲)</option>
                <option>新J 41277 (装货中)</option>
                <option>苏A B2291 (维修中)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 text-xs font-black">▼</div>
            </div>
          </div>

          {/* Cargo Type */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">货物类型</label>
            <div className="relative">
              <select className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none appearance-none">
                <option>粉煤灰 (一级)</option>
                <option>粉煤灰 (二级)</option>
                <option>脱硫石膏</option>
                <option>炉渣</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-300 text-xs font-black">▼</div>
            </div>
          </div>

          {/* Starting Quantity - NEW FIELD */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">预计始发量 (吨)</label>
            <input 
              type="number" 
              placeholder="请输入计划运输吨数" 
              className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-500/10" 
            />
          </div>

          {/* Sender */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">发货单位</label>
            <input 
              type="text" 
              defaultValue="滨江联合热电有限公司" 
              className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none" 
            />
          </div>

          {/* Destination - REFINED FIELD */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">卸货目的地</label>
            <input 
              type="text" 
              placeholder="请输入或选择消纳目的地" 
              className="w-full bg-slate-50 border-none p-4 rounded-2xl text-xs font-bold outline-none focus:ring-2 ring-blue-500/10" 
            />
          </div>
        </div>

        {/* Tips Section */}
        <div className="px-4">
          <p className="text-[10px] text-slate-400 leading-relaxed text-center">
            * 发布后指令将实时同步至司机APP端，<br/>
            并开始全流程OBD轨迹监控。
          </p>
        </div>

        {/* Submit Action */}
        <button 
          onClick={() => { alert('运输指令发布成功！'); onBack(); }}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-blue-200 active:scale-95 transition-all mb-4"
        >
          确认并立即派发
        </button>
      </div>
    </div>
  );
};

export default PublishOrder;
