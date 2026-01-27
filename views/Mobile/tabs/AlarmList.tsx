
import React from 'react';
import { Icon } from '../icons';

interface Props {
  onBack: () => void;
}

const AlarmList: React.FC<Props> = ({ onBack }) => {
  const alarms = [
    { title: '轨迹偏离预警', vehicle: '苏A B2291', time: '15:20', level: 'high' },
    { title: '停留超时', vehicle: '新J41277', time: '14:45', level: 'medium' },
    { title: '疑似违规倾倒', vehicle: '苏A 1002S', time: '12:30', level: 'high' },
  ];

  return (
    <div className="absolute inset-0 bg-[#F7F9FC] z-[70] flex flex-col animate-in fade-in slide-in-from-right duration-300">
      <header className="px-6 pt-12 pb-4 bg-white border-b border-slate-100 flex items-center space-x-4">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-lg font-bold text-slate-900 flex-1">异常报警列表</h2>
      </header>

      <div className="p-5 space-y-4">
        {alarms.map((a, i) => (
          <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2 text-rose-500 font-bold text-sm">
                <Icon.Alert />
                <span>{a.title}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium">{a.time}</span>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs font-black text-slate-700">{a.vehicle}</p>
                <p className="text-[10px] text-slate-400">预警等级: {a.level === 'high' ? '严重' : '一般'}</p>
              </div>
              <button className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-xl">详情</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlarmList;
