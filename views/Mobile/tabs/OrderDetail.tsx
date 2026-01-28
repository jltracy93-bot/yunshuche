
import React, { useState } from 'react';
import { DetailedOrder, TransportStatus } from '../../../types';
import { Icon } from '../icons';

interface Props {
  order: any; 
  onBack: () => void;
  onOpenPlayback: (order: any) => void;
}

const OrderDetail: React.FC<Props> = ({ order, onBack, onOpenPlayback }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'event'>('basic');
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const timelineEvents = [
    {
      type: 'weighbridge',
      title: '进场地磅过磅',
      time: order.entryTime || '--',
      detail: `采集净重: ${order.w1 || order.weight || '--'} T | 皮重: ${order.tare || '15.10'} T`,
      status: 'completed',
      icon: <Icon.Stats />,
      img: order.photos?.entry || 'https://picsum.photos/seed/entry/300/200'
    },
    {
      type: 'gate',
      title: '出厂道闸抓拍',
      time: order.exitTime || '--',
      detail: '道闸联动抓拍 | 车牌 OCR 识别正常',
      status: 'completed',
      icon: <Icon.Truck />,
      img: order.photos?.gate || 'https://picsum.photos/seed/gate/300/200'
    },
    {
      type: 'dump',
      title: '指定点倾倒拍照',
      time: order.status === '已完成' ? '18:12' : '--',
      detail: `目的地: ${order.d || '--'} | 核销拍照留痕`,
      status: order.status === '已完成' ? 'completed' : 'processing',
      icon: <Icon.Camera />,
      img: order.photos?.dump || (order.status === '已完成' ? 'https://picsum.photos/seed/dump/300/200' : null)
    }
  ];

  return (
    <div className="absolute inset-0 bg-[#F7F9FC] z-[100] flex flex-col animate-in fade-in slide-in-from-right duration-300 overflow-hidden">
      <header className="px-5 pt-12 pb-4 bg-white border-b border-slate-100 flex items-center shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 active:scale-90">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <h2 className="text-[15px] font-black text-slate-900 flex-1 ml-2">运单全流程详情</h2>
        <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black border ${
           order.status === '运输中' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
        }`}>
          {order.status}
        </span>
      </header>

      <div className="px-5 py-3 bg-white border-b border-slate-50 shrink-0">
        <div className="bg-slate-100 p-1 rounded-xl flex w-full">
          <button
            onClick={() => setActiveTab('basic')}
            className={`flex-1 py-2 text-[11px] font-black rounded-lg transition-all ${
              activeTab === 'basic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
            }`}
          >基础档案</button>
          <button
            onClick={() => setActiveTab('event')}
            className={`flex-1 py-2 text-[11px] font-black rounded-lg transition-all ${
              activeTab === 'event' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'
            }`}
          >流转证据</button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 no-scrollbar">
        {activeTab === 'basic' ? (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="bg-white rounded-[1.5rem] p-5 shadow-sm border border-slate-100 space-y-6">
              <div className="flex items-center space-x-4 pb-4 border-b border-slate-50">
                <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center ring-4 ring-blue-50/50">
                   <Icon.Truck />
                </div>
                <div>
                   <h3 className="text-base font-black text-slate-900 leading-tight">{order.plateNumber || order.plate}</h3>
                   <p className="text-[10px] text-slate-400 font-bold">工单: {order.id}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-4 text-[11px]">
                 <div><p className="text-slate-400 font-bold uppercase tracking-tighter">业务日期</p><p className="font-black text-slate-700">{order.date || '2023-10-27'}</p></div>
                 <div><p className="text-slate-400 font-bold uppercase tracking-tighter">运输师傅</p><p className="font-black text-slate-700">{order.driver || '张师傅'}</p></div>
                 <div><p className="text-slate-400 font-bold uppercase tracking-tighter">货物分类</p><p className="font-black text-slate-700">{order.category || order.cargoType}</p></div>
                 <div><p className="text-slate-400 font-bold uppercase tracking-tighter">当前执行节点</p><p className="font-black text-slate-700">{order.node || '进行中'}</p></div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50 relative ml-1">
                <div className="absolute left-[5px] top-6 bottom-2 w-px border-l border-dashed border-slate-200"></div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-blue-50"></div>
                  <p className="text-[10px] text-slate-400 font-bold">始发站点 (发货)</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{order.s || order.sender || '滨江联合热电'}</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-indigo-500 ring-4 ring-indigo-50"></div>
                  <p className="text-[10px] text-slate-400 font-bold">消纳目的地 (收货)</p>
                  <p className="text-xs font-bold text-slate-700 mt-0.5">{order.d || order.receiver || '栖霞再生消纳场'}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-5 border-t border-slate-50 text-center">
                 <div className="bg-slate-50 rounded-xl py-3">
                    <p className="text-[9px] text-slate-400 font-bold">皮重 (T)</p>
                    <p className="text-[13px] font-black text-slate-500 font-mono">{order.tare || '15.10'}</p>
                 </div>
                 <div className="bg-blue-50 rounded-xl py-3">
                    <p className="text-[9px] text-blue-400 font-bold">毛重 (T)</p>
                    <p className="text-[13px] font-black text-blue-600 font-mono">{order.gross || '39.62'}</p>
                 </div>
                 <div className="bg-emerald-50 rounded-xl py-3">
                    <p className="text-[9px] text-emerald-400 font-bold">净重 (T)</p>
                    <p className="text-[13px] font-black text-emerald-600 font-mono">{order.w1 || order.weight || '--'}</p>
                 </div>
              </div>
            </div>
            
            <button 
              onClick={() => onOpenPlayback(order)}
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs shadow-lg active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
                <Icon.Map /><span>查看实时卫星轨迹回放</span>
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 min-h-full animate-in fade-in slide-in-from-bottom-2">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center">
              <span className="w-1 h-3 bg-blue-600 mr-2 rounded-full"></span>
              全流程取证证据链
            </h4>
            <div className="relative space-y-12 pl-8">
              <div className="absolute left-[13px] top-2 bottom-2 w-px bg-slate-100"></div>
              {timelineEvents.map((ev, i) => (
                <div key={i} className="relative">
                  <div className={`absolute -left-[45px] top-0 w-10 h-10 rounded-2xl flex items-center justify-center border-4 border-white shadow-sm z-10 ${
                    ev.status === 'completed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600 animate-pulse'
                  }`}>
                    <div className="scale-75">{ev.icon}</div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <p className="text-[14px] font-black text-slate-900">{ev.title}</p>
                      <span className="text-[9px] text-slate-300 font-mono">{ev.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold leading-relaxed">{ev.detail}</p>
                    {ev.img && (
                      <div className="relative group active:scale-95 transition-transform" onClick={() => setPreviewImage(ev.img)}>
                         <img 
                           src={ev.img} 
                           className="w-full h-32 object-cover rounded-2xl border border-slate-100 shadow-sm" 
                           alt="evidence" 
                         />
                         <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                            <span className="text-[8px] bg-black/40 text-white px-2 py-1 rounded-full font-black backdrop-blur-md">点击放大</span>
                         </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {previewImage && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-6 animate-in fade-in duration-200" onClick={() => setPreviewImage(null)}>
           <div className="relative w-full">
              <img src={previewImage} className="w-full rounded-2xl shadow-2xl" alt="preview" />
              <div className="absolute -top-12 right-0 text-white font-black text-sm">✕</div>
              <p className="text-center text-white/50 text-[10px] font-bold mt-6 uppercase tracking-widest">证据图片详情查看</p>
           </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
