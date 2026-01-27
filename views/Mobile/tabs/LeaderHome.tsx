
import React from 'react';
import { TransportStatus, DetailedOrder } from '../../../types';
import { Icon } from '../icons';

interface Props {
  onOpenSub: (sub: string) => void;
  onOpenOrder: (order: DetailedOrder) => void;
}

const LeaderHome: React.FC<Props> = ({ onOpenSub, onOpenOrder }) => {
  const stats = [
    { label: '装货', value: 8, color: 'text-orange-500', bg: 'bg-orange-50/50' },
    { label: '运输', value: 12, color: 'text-blue-500', bg: 'bg-blue-50/50' },
    { label: '卸货', value: 5, color: 'text-cyan-500', bg: 'bg-cyan-50/50' },
    { label: '完成', value: 45, color: 'text-emerald-500', bg: 'bg-emerald-50/50' },
    { label: '异常', value: 2, color: 'text-rose-500', bg: 'bg-rose-50/50' },
  ];

  const orders: DetailedOrder[] = [
    {
      id: 'HDXJ260123173128106147',
      plateNumber: '新J 41277',
      cargoType: '粉煤灰',
      sender: '克拉玛依发电厂',
      receiver: '东鑫商贸消纳场',
      createdAt: '2026-01-23 17:31',
      status: TransportStatus.IN_TRANSIT
    },
    {
      id: 'WO20231027005',
      plateNumber: '苏A 88888',
      cargoType: '一级煤灰',
      sender: '滨江发电厂',
      receiver: '栖霞填埋中心',
      createdAt: '2023-10-27 14:20',
      status: TransportStatus.LOADING
    },
    {
      id: 'WO20231027012',
      plateNumber: '苏A 1002S',
      cargoType: '二级煤灰',
      sender: '大唐发电',
      receiver: '六合消纳区',
      createdAt: '2023-10-27 16:05',
      status: TransportStatus.ABNORMAL
    },
    {
      id: 'WO20231027018',
      plateNumber: '苏A B2291',
      cargoType: '工业废渣',
      sender: '华能热电',
      receiver: '龙江再生厂',
      createdAt: '2023-10-27 16:30',
      status: TransportStatus.COMPLETED
    }
  ];

  const getStatusStyle = (status: TransportStatus) => {
    switch (status) {
      case TransportStatus.LOADING: return 'bg-orange-50 text-orange-600 border-orange-100';
      case TransportStatus.IN_TRANSIT: return 'bg-blue-50 text-blue-600 border-blue-100';
      case TransportStatus.UNLOADING: return 'bg-cyan-50 text-cyan-600 border-cyan-100';
      case TransportStatus.COMPLETED: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case TransportStatus.ABNORMAL: return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="p-4 space-y-4">
      {/* Dynamic Summary - More Compact Grid */}
      <section className="bg-white rounded-[1.5rem] p-4 shadow-sm border border-slate-50">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-xs font-black text-slate-900 flex items-center">
            <span className="w-1 h-3 bg-blue-600 rounded-full mr-2"></span>
            运行概览
          </h3>
          <span className="text-[9px] font-bold text-slate-300">今日 17:00</span>
        </div>
        <div className="grid grid-cols-5 gap-2">
          {stats.map((s, i) => (
            <div key={i} className={`${s.bg} rounded-xl py-2 flex flex-col items-center justify-center transition-all active:scale-95`}>
              <span className={`text-[14px] font-black ${s.color}`}>{s.value}</span>
              <span className="text-[9px] font-bold text-slate-500 mt-0.5">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Alarm Ticker */}
      <section 
        onClick={() => onOpenSub('alarms')}
        className="bg-[#FFF1F0] border border-rose-100 rounded-2xl px-4 py-3 flex items-center active:scale-[0.98] transition-transform"
      >
        <div className="bg-white p-1.5 rounded-lg mr-3 shadow-sm text-rose-500">
          <Icon.Alert />
        </div>
        <div className="flex-1 overflow-hidden h-4 flex items-center">
          <div className="animate-[slide_20s_linear_infinite] whitespace-nowrap text-[11px] font-bold text-rose-800">
            <span className="mr-8">🚨 苏A 1002S 轨迹偏离预警 (待处理)</span>
            <span className="mr-8">🚨 新J 41277 停留时长超过 45min</span>
          </div>
        </div>
        <span className="text-rose-300 text-sm ml-2 font-black">›</span>
      </section>

      {/* Main Actions - Compact Cards */}
      <section className="grid grid-cols-2 gap-3">
        <button 
          onClick={() => onOpenSub('vehicles')}
          className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center space-x-3 active:scale-95 transition-all active:bg-slate-50"
        >
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl"><Icon.Truck /></div>
          <span className="text-xs font-black text-slate-700">车辆档案</span>
        </button>
        <button 
          onClick={() => onOpenSub('publish')}
          className="bg-blue-600 p-4 rounded-2xl shadow-lg shadow-blue-100 flex items-center space-x-3 active:scale-95 transition-all active:bg-blue-700"
        >
          <div className="p-2 bg-white/20 text-white rounded-xl"><Icon.Plus /></div>
          <span className="text-xs font-black text-white">快速发单</span>
        </button>
      </section>

      {/* Compact Order List */}
      <section className="space-y-3">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-xs font-black text-slate-900">运输实时监控</h3>
          <button className="text-[10px] font-black text-blue-600">全部工单 ›</button>
        </div>
        {orders.map((order) => (
          <div 
            key={order.id} 
            onClick={() => onOpenOrder(order)}
            className="bg-white p-4 rounded-[1.5rem] border border-slate-100 shadow-sm active:border-blue-200 transition-colors"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-slate-50 rounded-xl flex items-center justify-center text-blue-500 ring-2 ring-slate-100">
                  <Icon.Truck />
                </div>
                <div>
                  <h4 className="text-[13px] font-black text-slate-900 tracking-tight">{order.plateNumber}</h4>
                  <p className="text-[9px] text-slate-400 font-bold">{order.id.slice(-6)} | {order.createdAt.split(' ')[1]}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black border ${getStatusStyle(order.status)}`}>
                {order.status}
              </span>
            </div>

            <div className="flex items-center space-x-4 text-[10px] font-medium text-slate-600 bg-slate-50/50 p-2 rounded-xl border border-slate-50">
              <div className="flex-1 truncate">
                <span className="text-[8px] font-bold text-slate-400 uppercase mr-1">始</span>
                {order.sender.slice(0, 10)}...
              </div>
              <div className="w-px h-2 bg-slate-200"></div>
              <div className="flex-1 truncate">
                <span className="text-[8px] font-bold text-blue-400 uppercase mr-1">终</span>
                {order.receiver.slice(0, 10)}...
              </div>
            </div>

            <div className="flex space-x-2 mt-3">
              <button className="flex-1 bg-slate-100 text-slate-600 py-2 rounded-xl text-[9px] font-black flex items-center justify-center space-x-1.5 active:bg-slate-200">
                <span className="scale-[0.7]"><Icon.Map /></span>
                <span>轨迹</span>
              </button>
              <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-xl text-[9px] font-black flex items-center justify-center space-x-1.5 active:bg-blue-100">
                <span>流程追溯</span>
                <span>›</span>
              </button>
            </div>
          </div>
        ))}
      </section>

      <style>{`
        @keyframes slide { from { transform: translateX(100%); } to { transform: translateX(-100%); } }
      `}</style>
    </div>
  );
};

export default LeaderHome;
