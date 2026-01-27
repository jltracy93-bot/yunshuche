
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Cell, PieChart, Pie, AreaChart, Area } from 'recharts';

const Icons = {
  Dashboard: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Orders: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Monitor: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Management: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  Plus: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Truck: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  ArrowRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
};

const PCAdmin: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [mgmtTab, setMgmtTab] = useState('sites');
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // --- 核心统计数据 (同步小程序 DashboardView) ---
  const mainStats = [
    { label: '今日运货量', value: '152.4', unit: '吨', color: 'text-blue-600' },
    { label: '累计运货量', value: '12.4k', unit: '吨', color: 'text-emerald-600' },
    { label: '累计运单', value: '428', unit: '单', color: 'text-slate-900' },
    { label: '车均单量', value: '3.5', unit: '单/车', color: 'text-indigo-600' },
  ];

  const vehicleTypeData = [
    { name: '自卸车', value: 65, color: '#3b82f6' },
    { name: '罐式车', value: 25, color: '#6366f1' },
    { name: '半挂车', value: 10, color: '#94a3b8' },
  ];

  const cargoDistData = [
    { name: '粉煤灰', value: 450, color: '#2563eb' },
    { name: '炉渣', value: 210, color: '#10b981' },
    { name: '脱硫石膏', value: 180, color: '#f59e0b' },
    { name: '废渣', value: 120, color: '#64748b' },
  ];

  const vehicleRanking = [
    { plate: '苏A 88888', weight: '245', orders: '12', avatar: '🚛' },
    { plate: '新J 41277', weight: '210', orders: '10', avatar: '🚚' },
    { plate: '苏A B2291', weight: '198', orders: '9', avatar: '🚛' },
    { plate: '苏A 1002S', weight: '156', orders: '7', avatar: '🚚' },
  ];

  const trendData = [
    { name: '06:00', v: 42 }, { name: '08:00', v: 85 }, { name: '10:00', v: 110 },
    { name: '12:00', v: 65 }, { name: '14:00', v: 140 }, { name: '16:00', v: 95 },
    { name: '18:00', v: 30 },
  ];

  const ordersList = [
    {id:'HDXJ26012',p:'苏A 88888',t:'粉煤灰',s:'滨江厂',d:'栖霞3#库',w1:'24.52',w2:'24.48',st:'已完成', driver: '张师傅', time: '2023-10-27 14:30'},
    {id:'HDXJ26013',p:'新J 41277',t:'炉渣',s:'滨江厂',d:'江宁再生',w1:'22.10',w2:'--',st:'在途运输', driver: '李师傅', time: '2023-10-27 15:10'},
    {id:'HDXJ26014',p:'苏A B2291',t:'脱硫石膏',s:'华能厂',d:'栖霞1#库',w1:'26.50',w2:'26.40',st:'异常核销', driver: '王师傅', time: '2023-10-27 16:05'},
  ];

  // --- 资源管理模块数据 ---
  const mgmtLabels: any = {
    sites: { title: '站点', add: '新增站点' },
    weigh: { title: '地磅', add: '登记地磅' },
    obd: { title: 'OBD', add: '领用设备' },
    vehicles: { title: '车辆', add: '登记车辆' },
    drivers: { title: '师傅', add: '入职登记' },
    enterprises: { title: '企业', add: '合作准入' }
  };

  const mgmtData: any = {
    sites: [
      { code: 'S-001', name: '滨江联合热电', type: '煤灰始发站', contact: '张主管', tel: '138-xxxx-1101', status: '运行中' },
      { code: 'S-002', name: '栖霞再生中心', type: '固废消纳站', contact: '王站长', tel: '139-xxxx-2202', status: '运行中' },
    ],
    weigh: [
      { sn: 'WB-NJ-01', site: '滨江热电', model: 'SCS-120', lastCheck: '2023-12-01', status: '正常' },
      { sn: 'WB-QX-03', site: '栖霞消纳', model: 'SCS-100', lastCheck: '2024-01-15', status: '正常' },
    ],
    obd: [
      { id: 'SN88102', plate: '苏A 88888', status: '在线', battery: '95%', signal: '优' },
      { id: 'SN99201', plate: '新J 41277', status: '离线', battery: '12%', signal: '无' },
    ],
    vehicles: [
      { plate: '苏A 88888', owner: '东鑫运输', type: '自卸', driver: '张师傅', status: '任务中' },
      { plate: '苏A B2291', owner: '东鑫运输', type: '罐车', driver: '王师傅', status: '空闲' },
    ],
    drivers: [
      { name: '张师傅', phone: '138****9901', cert: '准驾A2', safety: '5.0', joinDate: '2022-05' },
      { name: '王师傅', phone: '137****3321', cert: '准驾B2', safety: '4.8', joinDate: '2023-01' },
    ],
    enterprises: [
      { name: '南京东鑫运输服务有限公司', rep: '刘东', fleet: '12台', area: '栖霞区', status: '合作中' },
      { name: '江苏顺达固废物流', rep: '陈顺', fleet: '8台', area: '江宁区', status: '审核中' },
    ]
  };

  const renderDashboard = () => (
    <div className="space-y-8 animate-fade-in no-scrollbar pb-20">
      <div className="grid grid-cols-4 gap-6">
        {mainStats.map((s, i) => (
          <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
            <div className="mt-4 flex items-baseline space-x-1">
              <span className={`text-3xl font-black ${s.color}`}>{s.value}</span>
              <span className="text-xs font-bold text-slate-300">{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 mb-8 px-2 tracking-tight text-lg">单量运输趋势分布</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94A3B8', fontWeight: 700}} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94A3B8', fontWeight: 700}} />
                  <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="v" stroke="#2563eb" strokeWidth={5} fill="url(#blueGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 mb-8 px-2 tracking-tight text-lg">运输货物分布统计 (T)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cargoDistData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="name" fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94A3B8', fontWeight: 700}} />
                  <YAxis fontSize={11} tickLine={false} axisLine={false} tick={{fill: '#94A3B8', fontWeight: 700}} />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{borderRadius: '16px', border: 'none'}} />
                  <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={45}>
                    {cargoDistData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 mb-6 px-2 tracking-tight text-lg">车辆类型比例</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={vehicleTypeData} innerRadius={60} outerRadius={80} dataKey="value" paddingAngle={8}>
                    {vehicleTypeData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="font-black text-slate-900 mb-8 px-2 tracking-tight text-lg">车辆运输排行榜 (今日)</h3>
            <div className="space-y-5">
               {vehicleRanking.map((v, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl border border-white hover:bg-white hover:shadow-lg transition-all">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm">{v.avatar}</div>
                      <div>
                        <p className="text-sm font-black text-slate-900">{v.plate}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{v.orders} 趟运次</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-blue-600">{v.weight}<span className="text-[9px] ml-0.5">T</span></p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderManagement = () => (
    <div className="space-y-8 animate-fade-in no-scrollbar pb-20">
      <div className="flex justify-between items-end">
        <div className="flex bg-white p-1.5 rounded-[1.5rem] border border-slate-100 shadow-sm w-fit">
          {Object.entries(mgmtLabels).map(([id, cfg]: any) => (
            <button
              key={id}
              onClick={() => setMgmtTab(id)}
              className={`px-6 py-2.5 text-xs font-black rounded-2xl transition-all ${
                mgmtTab === id ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {cfg.title}管理
            </button>
          ))}
        </div>
        <button className="bg-blue-600 text-white px-8 py-3.5 rounded-[1.5rem] text-xs font-black shadow-2xl flex items-center space-x-2 active:scale-95 transition-all">
          <Icons.Plus />
          <span>{mgmtLabels[mgmtTab].add}</span>
        </button>
      </div>

      <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50/50 text-[10px] uppercase font-black tracking-widest text-slate-400">
            <tr>
              <th className="px-10 py-6">台账编号</th>
              {Object.keys(mgmtData[mgmtTab][0]).map(k => <th key={k} className="px-10 py-6">{k.toUpperCase()}</th>)}
              <th className="px-10 py-6 text-right">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 text-[13px] font-bold text-slate-700">
            {mgmtData[mgmtTab].map((item: any, i: number) => (
              <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-10 py-5 text-slate-300 font-mono text-xs">#{String(i + 1).padStart(3, '0')}</td>
                {Object.values(item).map((v: any, idx) => (
                  <td key={idx} className="px-10 py-5">
                    {typeof v === 'string' && (v.includes('在线') || v.includes('正常') || v.includes('运行')) ? (
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-xl border border-emerald-100 text-[10px] font-black">{v}</span>
                    ) : (v as any)}
                  </td>
                ))}
                <td className="px-10 py-5 text-right flex justify-end items-center space-x-3">
                  <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Icons.Edit /></button>
                  <button className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"><Icons.Trash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMonitor = () => (
    <div className="h-full bg-slate-900 rounded-[4rem] overflow-hidden relative shadow-[0_50px_100px_rgba(0,0,0,0.2)] border-[16px] border-slate-800 animate-fade-in">
       <div className="absolute inset-0 bg-[#0b0f1a]">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#475569 1.5px, transparent 0)', backgroundSize: '70px 70px' }}></div>
          {/* 地图背景修饰 */}
          <svg className="absolute inset-0 w-full h-full opacity-40 stroke-slate-700 fill-transparent pointer-events-none">
             <path d="M 0 500 Q 400 450 800 600 T 1600 400" strokeWidth="20" />
             <path d="M 400 0 L 600 1500" strokeWidth="6" strokeDasharray="15 15" />
          </svg>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-800 font-black uppercase text-7xl opacity-5 select-none tracking-[2.5em] text-center w-full">GEOSPATIAL FLEET</div>
          
          {[
            { id: 1, p: '苏A 88888', x: '28%', y: '35%', c: '#3b82f6', speed: '42.5' },
            { id: 2, p: '新J 41277', x: '72%', y: '68%', c: '#10b981', speed: '0.0' },
            { id: 3, p: '苏A B2291', x: '52%', y: '48%', c: '#f43f5e', speed: '12.8' },
          ].map(v => (
            <div key={v.id} className="absolute transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-all duration-500" style={{ left: v.x, top: v.y }}>
               <div className="relative flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 rounded-full absolute -top-4 animate-ping" style={{ backgroundColor: v.c, opacity: 0.1 }}></div>
                  <div className="w-5 h-5 rounded-full border-4 border-slate-900 shadow-2xl relative z-10" style={{ backgroundColor: v.c }}></div>
                  <div className="mt-4 px-5 py-2 bg-slate-900/95 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 text-[10px] font-black text-white shadow-[0_15px_30px_rgba(0,0,0,0.5)] whitespace-nowrap group-hover:bg-blue-600 transition-colors">
                    {v.p} | {v.speed} km/h
                  </div>
               </div>
            </div>
          ))}
       </div>

       <div className="absolute top-12 left-12 space-y-4">
          <div className="bg-slate-900/80 backdrop-blur-2xl p-6 rounded-[2rem] border border-white/5 w-64">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Fleet Overview</p>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-black text-white">
                <span className="text-slate-500">在途活跃</span>
                <span>12 台</span>
              </div>
              <div className="flex justify-between items-center text-xs font-black text-white">
                <span className="text-slate-500">终端预警</span>
                <span className="text-rose-500">2 项</span>
              </div>
            </div>
          </div>
       </div>
    </div>
  );

  const renderOrderDetail = () => {
    if (!selectedOrder) return null;
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-end">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
        <div className="relative w-[800px] h-full bg-[#F8FAFC] shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto no-scrollbar">
          <div className="p-10 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
            <div>
              <div className="flex items-center space-x-3">
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">运单详情追溯</h3>
                <span className={`px-3 py-1 rounded-xl text-[10px] font-black border ${
                  selectedOrder.st === '已完成' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                }`}>{selectedOrder.st}</span>
              </div>
              <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-widest">Order ID: #{selectedOrder.id}</p>
            </div>
            <button onClick={() => setSelectedOrder(null)} className="w-12 h-12 rounded-full hover:bg-slate-50 flex items-center justify-center text-slate-300 hover:text-slate-900 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>

          <div className="p-10 space-y-10">
            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm grid grid-cols-3 gap-8">
              <div className="col-span-3 pb-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><Icons.Truck /></div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">执行载体</p>
                    <p className="text-sm font-black text-slate-900">{selectedOrder.p} • {selectedOrder.driver}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">货物类型</p>
                  <p className="text-sm font-black text-slate-900">{selectedOrder.t}</p>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">始发站点</p>
                <p className="text-xs font-black text-slate-700">{selectedOrder.s}</p>
              </div>
              <div className="flex items-center justify-center text-slate-200"><Icons.ArrowRight /></div>
              <div>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">收货目的地</p>
                <p className="text-xs font-black text-slate-700">{selectedOrder.d}</p>
              </div>
            </section>

            <section className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10">全生命周期流转记录 (Evidence Chain)</h4>
              <div className="space-y-12 relative pl-10 border-l-2 border-slate-50 ml-4">
                {[
                  { title: '进场称重', time: '17:32', detail: `始发重量: ${selectedOrder.w1} T`, icon: '⚖️' },
                  { title: '道闸离厂', time: '18:03', detail: '南门道闸抓拍存档', hasImg: true, icon: '📸' },
                  { title: 'OBD轨迹追踪', time: '持续中', detail: '实时位置偏差校对正常', isRoute: true, icon: '📍' },
                  { title: '指定点倾倒拍照', time: '18:55', detail: `收货重量: ${selectedOrder.w2} T`, hasImg: true, icon: '✅' },
                ].map((node, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[61px] top-0 w-10 h-10 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-lg z-10">{node.icon}</div>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-black text-slate-900">{node.title}</p>
                        <p className="text-xs text-slate-400 mt-1 font-medium">{node.detail}</p>
                      </div>
                      <span className="text-[10px] font-black text-slate-300">{node.time}</span>
                    </div>
                    {node.hasImg && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                         <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"><img src={`https://picsum.photos/seed/${i}1/400/225`} className="w-full h-full object-cover grayscale" /></div>
                         <div className="aspect-video bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden"><img src={`https://picsum.photos/seed/${i}2/400/225`} className="w-full h-full object-cover grayscale" /></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden text-slate-900 font-sans">
      <aside className="w-80 bg-slate-900 text-white flex flex-col z-30 shadow-2xl relative shrink-0">
        <div className="p-12 border-b border-white/5">
          <div className="flex items-center space-x-4">
             <div className="w-12 h-12 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl"><Icons.Truck /></div>
             <div>
               <h1 className="text-lg font-black tracking-tighter uppercase leading-none">SolidLink</h1>
               <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mt-1">Enterprise v4.2</span>
             </div>
          </div>
        </div>

        <nav className="flex-1 py-14 px-0 space-y-8">
          {[
            { id: 'dashboard', label: '智能驾驶看板', icon: <Icons.Dashboard /> },
            { id: 'orders', label: '工单全流程追溯', icon: <Icons.Orders /> },
            { id: 'monitor', label: '实时在途轨迹', icon: <Icons.Monitor /> },
            { id: 'management', label: '资源管理中心', icon: <Icons.Management /> },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`group relative w-full flex items-center px-12 py-3 transition-all ${
                activeMenu === item.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {activeMenu === item.id && <div className="absolute left-0 w-1.5 h-6 bg-blue-600 rounded-r-full shadow-[0_0_15px_#3b82f6]"></div>}
              <span className={`mr-5 ${activeMenu === item.id ? 'text-blue-500' : 'opacity-50 group-hover:opacity-100'}`}>{item.icon}</span>
              <span className="text-sm font-black tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-28 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-14 flex justify-between items-center shrink-0 z-20">
           <div>
              <h2 className="text-3xl font-black tracking-tighter text-slate-900 uppercase">
                {activeMenu === 'dashboard' ? '智能驾驶看板' : 
                 activeMenu === 'orders' ? '工单全流程追溯' : 
                 activeMenu === 'monitor' ? '实时在途轨迹' : '资源管理中心'}
              </h2>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.4em] mt-1.5">Management Stack / {activeMenu}</p>
           </div>
           <div className="flex items-center space-x-8">
              <div className="text-right">
                <div className="flex items-center space-x-2">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_12px_#10b981]"></div>
                   <span className="text-[11px] font-black text-slate-700">实时数据同步中</span>
                </div>
                <p className="text-[9px] text-slate-400 font-bold mt-1">云端状态: 稳定同步</p>
              </div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-14 no-scrollbar bg-[#F8FAFC]">
           {activeMenu === 'dashboard' && renderDashboard()}
           {activeMenu === 'management' && renderManagement()}
           {activeMenu === 'monitor' && renderMonitor()}
           
           {activeMenu === 'orders' && (
             <div className="space-y-6 animate-fade-in no-scrollbar pb-20">
                <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                  <div className="p-10 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="font-black text-slate-900 tracking-tight text-xl">全链路运单追溯库</h3>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                          <input type="text" placeholder="搜索车牌、工单..." className="bg-slate-50 border-none rounded-[1.5rem] px-6 py-3.5 text-xs font-bold outline-none w-72" />
                          <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300"><Icons.Search /></span>
                      </div>
                      <button onClick={() => setShowAddOrder(true)} className="bg-slate-900 text-white px-8 py-3.5 rounded-[1.5rem] text-xs font-black shadow-2xl hover:bg-slate-800 transition-all flex items-center space-x-2">
                          <Icons.Plus />
                          <span>添加运单</span>
                      </button>
                    </div>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 text-[10px] uppercase font-black tracking-widest text-slate-400">
                      <tr>
                        <th className="px-10 py-6">工单ID</th>
                        <th className="px-10 py-6">运输载体</th>
                        <th className="px-10 py-6">货物类型</th>
                        <th className="px-10 py-6">流转路线</th>
                        <th className="px-10 py-6">始发量(T)</th>
                        <th className="px-10 py-6">状态</th>
                        <th className="px-10 py-6 text-right">详情</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-[13px] font-bold text-slate-700">
                      {ordersList.map((r, i) => (
                        <tr key={i} className="hover:bg-slate-50/30 cursor-pointer group" onClick={() => setSelectedOrder(r)}>
                          <td className="px-10 py-6 font-mono text-xs text-slate-400">#{r.id}</td>
                          <td className="px-10 py-6">
                            <div className="flex items-center space-x-3"><Icons.Truck /><span className="text-slate-900 font-black">{r.p}</span></div>
                          </td>
                          <td className="px-10 py-6"><span className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] text-slate-600 font-black">{r.t}</span></td>
                          <td className="px-10 py-6"><div className="flex items-center space-x-2 text-[10px]">{r.s} → {r.d}</div></td>
                          <td className="px-10 py-6 font-black">{r.w1}</td>
                          <td className="px-10 py-6">
                            <span className={`px-3 py-1 rounded-2xl text-[10px] border ${r.st === '已完成' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{r.st}</span>
                          </td>
                          <td className="px-10 py-6 text-right font-black text-blue-600 group-hover:underline text-xs uppercase">View</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
             </div>
           )}
        </div>

        {/* 添加运单弹窗 - 同步小程序发布指令字段 */}
        {showAddOrder && (
          <div className="absolute inset-0 z-[100] flex">
             <div onClick={() => setShowAddOrder(false)} className="flex-1 bg-slate-900/50 backdrop-blur-sm animate-fade-in"></div>
             <div className="w-[600px] bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
                <div className="p-14 border-b border-slate-50 flex justify-between items-center">
                   <div>
                      <h3 className="text-3xl font-black tracking-tight text-slate-900">发布运输指令</h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-2">Add Transport Order / Sync to App</p>
                   </div>
                   <button onClick={() => setShowAddOrder(false)} className="w-14 h-14 rounded-full hover:bg-slate-50 flex items-center justify-center transition-colors text-slate-300">
                     <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                   </button>
                </div>
                <div className="flex-1 overflow-y-auto p-14 space-y-8 no-scrollbar">
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">执行载体 (车辆/师傅)</label>
                      <select className="w-full bg-slate-50 p-6 rounded-[2rem] border-none font-black text-sm outline-none focus:ring-4 ring-blue-500/5 transition-all">
                        <option>苏A 88888 (空闲 - 张师傅)</option>
                        <option>新J 41277 (装货中 - 李师傅)</option>
                        <option>苏A B2291 (维修中 - 王师傅)</option>
                      </select>
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">货物类型</label>
                        <select className="w-full bg-slate-50 p-6 rounded-[2rem] border-none font-black text-sm outline-none">
                          <option>粉煤灰 (一级)</option>
                          <option>粉煤灰 (二级)</option>
                          <option>脱硫石膏</option>
                          <option>炉渣</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">计划运量 (吨)</label>
                        <input type="number" placeholder="输入吨数" className="w-full bg-slate-50 p-6 rounded-[2rem] border-none font-black text-sm outline-none focus:ring-4 ring-blue-500/5" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">发货单位 (始发地)</label>
                      <input type="text" defaultValue="滨江联合热电有限公司" className="w-full bg-slate-50 p-6 rounded-[2rem] border-none font-black text-sm outline-none" />
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">卸货目的地 (收货点)</label>
                      <input type="text" placeholder="请输入或选择卸货点全称" className="w-full bg-slate-50 p-6 rounded-[2rem] border-none font-black text-sm outline-none focus:ring-4 ring-blue-500/5" />
                   </div>
                </div>
                <div className="p-14 bg-white border-t border-slate-50">
                   <button onClick={() => { alert('运输指令已同步至司机移动端'); setShowAddOrder(false); }} className="w-full bg-blue-600 text-white py-6 rounded-[2.5rem] font-black text-sm shadow-[0_25px_60px_rgba(37,99,235,0.2)] hover:bg-blue-700 active:scale-[0.98] transition-all">确认并立即派发指令</button>
                </div>
             </div>
          </div>
        )}

        {/* 详情侧滑页 */}
        {renderOrderDetail()}
      </main>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      `}</style>
    </div>
  );
};

export default PCAdmin;
