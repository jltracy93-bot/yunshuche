
import React from 'react';
import { Icon } from '../icons';
import { DetailedOrder, TransportStatus } from '../../../types';

interface Props {
  onBack: () => void;
  onOpenOrder: (order: DetailedOrder) => void;
  onOpenPlayback: (order: DetailedOrder) => void;
}

const AlarmList: React.FC<Props> = ({ onBack, onOpenOrder, onOpenPlayback }) => {
  // 模拟详细异常数据
  const alarms = [
    { 
      id: 'AL-001',
      title: '轨迹严重偏离', 
      vehicle: '苏A B2291', 
      time: '15:20', 
      level: 'high',
      desc: '偏离预设航道 1.2km，疑似驶向非消纳区域',
      order: {
        id: 'WO20231027012',
        plateNumber: '苏A B2291',
        cargoType: '二级煤灰',
        sender: '大唐发电',
        receiver: '六合消纳区',
        createdAt: '2023-10-27 16:05',
        status: TransportStatus.ABNORMAL
      }
    },
    { 
      id: 'AL-002',
      title: '运输停留超时', 
      vehicle: '新J 41277', 
      time: '14:45', 
      level: 'medium',
      desc: '车辆在 G25 高速段停留超过 45 分钟，请核实',
      order: {
        id: 'HDXJ260123173128106147',
        plateNumber: '新J 41277',
        cargoType: '粉煤灰',
        sender: '克拉玛依发电厂',
        receiver: '东鑫商贸消纳场',
        createdAt: '2026-01-23 17:31',
        status: TransportStatus.IN_TRANSIT
      }
    },
    { 
      id: 'AL-003',
      title: '非法位置拍照', 
      vehicle: '苏A 1002S', 
      time: '12:30', 
      level: 'high',
      desc: '卸货取证照片经纬度与消纳库中心坐标不匹配',
      order: {
        id: 'WO20231027018',
        plateNumber: '苏A 1002S',
        cargoType: '工业废渣',
        sender: '华能热电',
        receiver: '龙江再生厂',
        createdAt: '2023-10-27 16:30',
        status: TransportStatus.ABNORMAL
      }
    },
  ];

  return (
    <div className="absolute inset-0 bg-[#F7F9FC] z-[130] flex flex-col animate-in slide-in-from-right duration-300">
      <header className="px-6 pt-12 pb-4 bg-white border-b border-slate-100 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90 transition-transform">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="ml-2">
           <h2 className="text-lg font-black text-slate-900">异常记录明细</h2>
           <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Anomaly Monitoring Records</p>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar pb-10">
        {alarms.map((a) => (
          <div key={a.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 transition-all active:border-rose-200">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${a.level === 'high' ? 'bg-rose-50 text-rose-500' : 'bg-orange-50 text-orange-500'}`}>
                  <Icon.Alert />
                </div>
                <div>
                  <h4 className="text-[14px] font-black text-slate-900">{a.title}</h4>
                  <p className="text-[11px] font-bold text-slate-400">{a.vehicle}</p>
                </div>
              </div>
              <span className="text-[10px] text-slate-300 font-bold">{a.time}</span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-50">
               <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{a.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <button 
                onClick={() => onOpenPlayback(a.order as DetailedOrder)}
                className="flex items-center justify-center space-x-2 bg-slate-100 text-slate-600 py-3 rounded-xl text-[10px] font-black active:bg-slate-200 transition-colors"
              >
                <Icon.Map />
                <span>轨迹回放</span>
              </button>
              <button 
                onClick={() => onOpenOrder(a.order as DetailedOrder)}
                className="flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 py-3 rounded-xl text-[10px] font-black active:bg-blue-100 transition-colors"
              >
                <span>查看详情</span>
                <span>›</span>
              </button>
            </div>
          </div>
        ))}
        
        <div className="text-center py-6">
           <p className="text-[10px] text-slate-300 font-bold uppercase tracking-widest">已展示全部异常记录</p>
        </div>
      </div>
    </div>
  );
};

export default AlarmList;
