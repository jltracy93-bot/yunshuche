
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';

const DashboardView: React.FC = () => {
  // 核心运输指标数据
  const mainStats = [
    { label: '今日运货量', value: '152.4', unit: '吨', color: 'text-blue-600', bg: 'bg-blue-50/50' },
    { label: '累计运货量', value: '12.4k', unit: '吨', color: 'text-emerald-600', bg: 'bg-emerald-50/50' },
    { label: '累计运单', value: '428', unit: '单', color: 'text-slate-900', bg: 'bg-slate-100/50' },
    { label: '车均单量', value: '3.5', unit: '单/车', color: 'text-indigo-600', bg: 'bg-indigo-50/50' },
  ];

  // 车辆类型分布数据
  const vehicleTypeData = [
    { name: '自卸车', value: 65, color: '#3b82f6' },
    { name: '罐式车', value: 25, color: '#6366f1' },
    { name: '半挂车', value: 10, color: '#94a3b8' },
  ];

  // 运送货物分布数据
  const cargoDistData = [
    { name: '粉煤灰', value: 450, color: '#2563eb' },
    { name: '炉渣', value: 210, color: '#10b981' },
    { name: '脱硫石膏', value: 180, color: '#f59e0b' },
    { name: '废渣', value: 120, color: '#64748b' },
  ];

  // 车辆运输排行榜
  const vehicleRanking = [
    { plate: '苏A 88888', weight: '245', orders: '12', avatar: '🚛' },
    { plate: '新J 41277', weight: '210', orders: '10', avatar: '🚚' },
    { plate: '苏A B2291', weight: '198', orders: '9', avatar: '🚛' },
    { plate: '苏A 1002S', weight: '156', orders: '7', avatar: '🚚' },
  ];

  // 单量运输趋势统计数据
  const trendData = [
    { name: '06', v: 42 },
    { name: '08', v: 85 },
    { name: '10', v: 110 },
    { name: '12', v: 65 },
    { name: '14', v: 140 },
    { name: '16', v: 95 },
    { name: '18', v: 30 },
  ];

  return (
    <div className="p-4 space-y-5 no-scrollbar pb-24">
      {/* 今日运营指标概览 */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-black text-slate-900">运输核心指标</h3>
        <span className="text-[10px] font-bold text-slate-300">更新于 17:35</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {mainStats.map((s, i) => (
          <div key={i} className={`${s.bg} p-4 rounded-2xl border border-white shadow-sm transition-all active:scale-95`}>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-wider">{s.label}</p>
            <div className="flex items-baseline mt-1">
              <span className={`text-xl font-black ${s.color}`}>{s.value}</span>
              <span className="text-[9px] font-bold text-slate-300 ml-1">{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 分布统计 Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* 车辆类型分布 */}
        <section className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">车辆类型分布</h4>
           <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie data={vehicleTypeData} innerRadius={25} outerRadius={45} dataKey="value" paddingAngle={5}>
                       {vehicleTypeData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Pie>
                 </PieChart>
              </ResponsiveContainer>
           </div>
           <div className="space-y-1">
              {vehicleTypeData.map(d => (
                 <div key={d.name} className="flex justify-between items-center text-[9px] font-bold">
                    <span className="text-slate-500">{d.name}</span>
                    <span className="text-slate-900">{d.value}%</span>
                 </div>
              ))}
           </div>
        </section>

        {/* 货物分布图 */}
        <section className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">运输货物分布</h4>
           <div className="h-32 w-full">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={cargoDistData} layout="vertical">
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={8} width={40} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ fontSize: '10px', borderRadius: '8px', border: 'none' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                       {cargoDistData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                    </Bar>
                 </BarChart>
              </ResponsiveContainer>
           </div>
           <p className="text-[8px] text-slate-400 text-center font-bold">单位: 吨 (T)</p>
        </section>
      </div>

      {/* 车辆运输排行榜 */}
      <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
         <div className="flex justify-between items-center mb-5">
            <h3 className="text-sm font-black text-slate-900">车辆运输排行榜</h3>
            <span className="text-[9px] text-blue-600 font-black">今日排行</span>
         </div>
         <div className="space-y-4">
            {vehicleRanking.map((v, i) => (
               <div key={i} className="flex items-center justify-between group active:bg-slate-50 p-1 rounded-xl transition-all">
                  <div className="flex items-center space-x-3">
                     <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-lg">{v.avatar}</div>
                     <div>
                        <p className="text-xs font-black text-slate-900">{v.plate}</p>
                        <p className="text-[9px] text-slate-400 font-bold">{v.orders} 趟运次</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-xs font-black text-blue-600">{v.weight}<span className="text-[8px] ml-0.5">T</span></p>
                     <p className="text-[8px] text-slate-300 uppercase font-black">运送总量</p>
                  </div>
               </div>
            ))}
         </div>
      </section>

      {/* 单量运输趋势统计 */}
      <section className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-slate-900">单量运输趋势</h3>
            <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">Order Volume Trend</p>
          </div>
          <span className="px-2 py-1 bg-blue-50 text-blue-600 text-[8px] font-black rounded-lg">实时</span>
        </div>
        
        <div className="h-44 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorTrend" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis dataKey="name" fontSize={9} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 700 }} />
                    <YAxis fontSize={9} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontWeight: 700 }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', padding: '8px' }} />
                    <Area type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={3} fill="url(#colorTrend)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </section>

      {/* 补充：底部操作提示 */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center space-x-3 opacity-60">
        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 text-xs">ℹ️</div>
        <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
          统计数据每 5 分钟自动更新一次。如有数据偏差，请联系调度中心人工核对。
        </p>
      </div>
    </div>
  );
};

export default DashboardView;
