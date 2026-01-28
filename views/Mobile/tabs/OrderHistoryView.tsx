
import React, { useState, useMemo } from 'react';
import { TransportStatus, DetailedOrder } from '../../../types';
import { Icon } from '../icons';

interface Props {
  onOpenOrder: (order: DetailedOrder) => void;
  onOpenPlayback: (order: DetailedOrder) => void;
}

const OrderHistoryView: React.FC<Props> = ({ onOpenOrder, onOpenPlayback }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('全部');

  const filters = ['全部', '已完成', '运输中', '装货中', '异常'];

  const historyOrders: DetailedOrder[] = [
    {
      id: 'WO20231027001',
      plateNumber: '苏A 88888',
      cargoType: '粉煤灰',
      sender: '滨江发电厂',
      receiver: '栖霞再生中心',
      createdAt: '2023-10-27 14:30',
      status: TransportStatus.COMPLETED
    },
    {
      id: 'WO20231026085',
      plateNumber: '苏A 88888',
      cargoType: '粉煤灰',
      sender: '滨江发电厂',
      receiver: '江宁固废基地',
      createdAt: '2023-10-26 09:15',
      status: TransportStatus.COMPLETED
    },
    {
      id: 'WO20231025042',
      plateNumber: '苏A 88888',
      cargoType: '脱硫石膏',
      sender: '华能热电',
      receiver: '栖霞再生中心',
      createdAt: '2023-10-25 16:40',
      status: TransportStatus.ABNORMAL
    }
  ];

  const filteredOrders = useMemo(() => {
    return historyOrders.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            order.receiver.includes(searchQuery) ||
                            order.cargoType.includes(searchQuery);
      const matchesFilter = activeFilter === '全部' || order.status === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, activeFilter]);

  const getStatusColor = (status: TransportStatus) => {
    switch (status) {
      case TransportStatus.COMPLETED: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case TransportStatus.ABNORMAL: return 'bg-rose-50 text-rose-600 border-rose-100';
      case TransportStatus.IN_TRANSIT: return 'bg-blue-50 text-blue-600 border-blue-100';
      case TransportStatus.LOADING: return 'bg-orange-50 text-orange-600 border-orange-100';
      default: return 'bg-slate-50 text-slate-400 border-slate-100';
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="bg-white px-5 py-4 space-y-4 border-b border-slate-100 sticky top-0 z-20">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="搜索运单号、目的地或货物..."
            className="w-full bg-slate-50 border-none rounded-2xl py-3.5 pl-11 pr-4 text-xs font-bold outline-none focus:ring-4 ring-blue-500/5 transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-xl text-[11px] font-black whitespace-nowrap transition-all border ${
                activeFilter === f 
                ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200' 
                : 'bg-white text-slate-400 border-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar pb-24">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <div 
              key={order.id}
              onClick={() => onOpenOrder(order)}
              className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm active:scale-[0.98] transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner group-active:bg-blue-50 transition-colors">
                      <Icon.Truck />
                   </div>
                   <div>
                      <h4 className="text-[13px] font-black text-slate-900 tracking-tight">{order.id}</h4>
                      <p className="text-[9px] text-slate-400 font-bold">{order.createdAt}</p>
                   </div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black border ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="space-y-3">
                 <div className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                    <div>
                       <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">卸货目的地</p>
                       <p className="text-xs font-black text-slate-700">{order.receiver}</p>
                    </div>
                 </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
                 <button 
                  onClick={(e) => { e.stopPropagation(); onOpenPlayback(order); }}
                  className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black text-slate-600 flex items-center space-x-1 active:bg-slate-100"
                 >
                    <Icon.Map />
                    <span>查看轨迹</span>
                 </button>
                 <span className="text-[10px] font-black text-blue-600 flex items-center space-x-1">
                    <span>详情追溯</span>
                    <span className="text-xs">›</span>
                 </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
             <p className="text-xs font-bold text-slate-300">暂无匹配的运单记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryView;
