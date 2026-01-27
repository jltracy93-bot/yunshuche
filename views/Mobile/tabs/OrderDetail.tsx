
import React, { useState } from 'react';
import { DetailedOrder, TransportStatus } from '../../../types';
import { Icon } from '../icons';

interface Props {
  order: DetailedOrder;
  onBack: () => void;
}

const OrderDetail: React.FC<Props> = ({ order, onBack }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'event'>('basic');

  const timelineEvents = [
    {
      type: 'weighbridge',
      title: '进场地磅过磅',
      time: '17:32:50',
      detail: '实时重量: 24.52 吨 | 地磅: 01#',
      status: 'completed',
      icon: <Icon.Stats />
    },
    {
      type: 'gate',
      title: '出厂道闸抓拍',
      time: '18:03:38',
      detail: '识别状态: 正常 | 证据已存档',
      status: 'completed',
      hasPhoto: true,
      icon: <Icon.Truck />
    },
    {
      type: 'alert',
      title: '行驶异常提醒',
      time: '18:10:05',
      detail: '检测到车辆行驶偏离预设轨迹 1.2km',
      status: 'warning',
      icon: <Icon.Alert />
    },
    {
      type: 'dump',
      title: '指定点倾倒拍照',
      time: '18:17:15',
      detail: '地点: 栖霞3号消纳库 | 经纬度已校验',
      status: 'processing',
      hasPhoto: true,
      icon: <Icon.Camera />
    },
    {
      type: 'finish',
      title: '运输流程完结',
      time: '-- : --',
      detail: '等待大数据中心最终审核',
      status: 'pending',
      icon: <Icon.Home />
    }
  ];

  return (
    <div className="absolute inset-0 bg-[#F7F9FC] z-[100] flex flex-col animate-in fade-in slide-in-from-right duration-300 overflow-hidden">
      {/* Page Header - Overwrites global header */}
      <header className="px-5 pt-12 pb-4 bg-white border-b border-slate-100 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90 transition-transform">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-[15px] font-black text-slate-900 flex-1 ml-2">运单全流程详情</h2>
        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black border ${
           order.status === TransportStatus.IN_TRANSIT ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-slate-50 text-slate-400'
        }`}>
          {order.status}
        </span>
      </header>

      {/* Internal Tabs */}
      <div className="px-5 py-3 bg-white border-b border-slate-50 shrink-0">
        <div className="bg-slate-100 p-1 rounded-xl flex w-full">
          <button
            onClick={() => setActiveTab('basic')}
            className={`flex-1 py-2 text-[11px] font-black rounded-lg transition-all ${
              activeTab === 'basic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
            }`}
          >
            基础档案
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`flex-1 py-2 text-[11px] font-black rounded-lg transition-all ${
              activeTab === 'event' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
            }`}
          >
            流转记录
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
        {activeTab === 'basic' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 space-y-5">
              <div className="flex items-center space-x-4 pb-4 border-b border-slate-50">
                <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center ring-4 ring-blue-50/50">
                   <Icon.Truck />
                </div>
                <div>
                   <h3 className="text-base font-black text-slate-900 leading-tight">{order.plateNumber}</h3>
                   <p className="text-[10px] text-slate-400 font-bold">ID: {order.id}</p>
                </div>
              </div>

              <div className="space-y-6 relative ml-1">
                <div className="absolute left-[5px] top-2 bottom-2 w-px border-l border-dashed border-slate-200"></div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">装货地</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{order.sender}</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-50"></div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">消纳点</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{order.receiver}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-50">
                 <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">货物名称</p>
                    <p className="text-[11px] font-black text-slate-700 mt-0.5">{order.cargoType}</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">称重吨位</p>
                    <p className="text-[11px] font-black text-slate-700 mt-0.5">24.52 T</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">跟车人员</p>
                    <p className="text-[11px] font-black text-slate-700 mt-0.5">张师傅</p>
                 </div>
                 <div>
                    <p className="text-[9px] text-slate-400 font-bold uppercase">建立时间</p>
                    <p className="text-[11px] font-black text-slate-700 mt-0.5">{order.createdAt}</p>
                 </div>
              </div>
            </div>
            
            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all">
                进入实时轨迹追踪
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 min-h-full animate-in fade-in slide-in-from-bottom-2">
            <div className="relative space-y-8 pl-8">
              <div className="absolute left-[13px] top-2 bottom-2 w-px bg-slate-100"></div>
              {timelineEvents.map((ev, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[45px] top-0 w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors ${
                    ev.status === 'completed' ? 'bg-green-50 text-green-600' : 
                    ev.status === 'warning' ? 'bg-rose-50 text-rose-600' :
                    ev.status === 'processing' ? 'bg-blue-50 text-blue-600 animate-pulse' : 'bg-slate-50 text-slate-300'
                  }`}>
                    <div className="scale-75">{ev.icon}</div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <p className={`text-[13px] font-black ${
                        ev.status === 'completed' ? 'text-slate-900' : 
                        ev.status === 'warning' ? 'text-rose-600' :
                        ev.status === 'processing' ? 'text-blue-600' : 'text-slate-400'
                      }`}>
                        {ev.title}
                      </p>
                      <span className="text-[9px] text-slate-300 font-bold">{ev.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{ev.detail}</p>
                    
                    {ev.hasPhoto && (ev.status === 'completed' || ev.status === 'processing') && (
                      <div className="mt-3 w-44 h-28 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm">
                         <img src={`https://picsum.photos/seed/${ev.type}/400/240`} alt="Evidence" className="w-full h-full object-cover grayscale transition-all active:grayscale-0" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
