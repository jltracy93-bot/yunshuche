
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, Cell, PieChart, Pie, Legend } from 'recharts';

const Icons = {
  Dashboard: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  Orders: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  Site: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Scale: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7h-9m0 0l2-2m-2 2l2 2M4 17h9m0 0l-2-2m2 2l-2 2"/></svg>,
  OBD: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  Truck: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>,
  User: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Business: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3l2-4h14l2 4"/></svg>,
  Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Import: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Export: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>,
  Search: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Edit: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  Trash: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>,
};

const PCAdmin: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // 模块数据台账配置
  const moduleConfigs: any = {
    sites: {
      title: '站点管理',
      addLabel: '新增站点',
      columns: ['站点编号', '站点名称', '负责人', '联系电话', '运行状态'],
      data: [
        { id: 'S001', name: '滨江联合热电厂', manager: '张主管', phone: '13812345678', status: '运行中' },
        { id: 'S002', name: '栖霞再生消纳场', manager: '王站长', phone: '13988887777', status: '运行中' },
        { id: 'S003', name: '大唐发电固废库', manager: '陈工', phone: '13700001111', status: '停机维护' },
      ]
    },
    weighbridge: {
      title: '地磅管理',
      addLabel: '新增地磅',
      columns: ['设备编号', '所属站点', '规格型号', '最后检定', '状态'],
      data: [
        { id: 'WB-01', site: '滨江厂', model: 'SCS-120', date: '2024-01-15', status: '正常' },
        { id: 'WB-02', site: '栖霞消纳', model: 'SCS-100', date: '2023-12-10', status: '异常' },
      ]
    },
    obd: {
      title: 'OBD管理',
      addLabel: '领用设备',
      columns: ['设备ID', '绑定车辆', '电量', '信号', '状态'],
      data: [
        { id: 'OBD-8821', plate: '苏A 88888', battery: '92%', signal: '优', status: '在线' },
        { id: 'OBD-9902', plate: '新J 41277', battery: '15%', signal: '良', status: '低电量' },
      ]
    },
    vehicles: {
      title: '车纳管理',
      addLabel: '车辆入库',
      columns: ['车牌号', '所属单位', '车辆类型', '主驾驶', '当前状态'],
      data: [
        { id: '苏A 88888', company: '东鑫运输', type: '自卸车', driver: '张师傅', status: '运输中' },
        { id: '新J 41277', company: '天山物流', type: '罐车', driver: '李师傅', status: '空闲' },
        { id: '苏A B2291', company: '东鑫运输', type: '半挂车', driver: '王师傅', status: '任务中' },
      ]
    },
    drivers: {
      title: '师傅管理',
      addLabel: '师傅入职',
      columns: ['姓名', '手机号', '准驾类别', '安全评分', '入职日期'],
      data: [
        { name: '张师傅', phone: '13812349901', cert: 'A2', score: '98', date: '2022-05' },
        { name: '李师傅', phone: '13799887766', cert: 'B2', score: '100', date: '2023-01' },
      ]
    },
    enterprises: {
      title: '企业管理',
      addLabel: '新增合作方',
      columns: ['企业名称', '法人代表', '车队规模', '所属区域', '状态'],
      data: [
        { name: '南京东鑫运输服务有限公司', boss: '刘东', size: '24台', area: '栖霞区', status: '正常' },
        { name: '新疆天山固废物流', boss: '阿凡提', size: '12台', area: '克拉玛依', status: '正常' },
      ]
    },
    orders: {
        title: '工单全流程追溯',
        addLabel: '发布运单',
        data: [
            {id:'HDXJ26012',p:'苏A 88888',t:'粉煤灰',s:'滨江厂',d:'栖霞3#库',w1:'24.52',w2:'24.48',st:'已完成', driver: '张师傅', time: '2023-10-27 14:30'},
            {id:'HDXJ26013',p:'新J 41277',t:'炉渣',s:'滨江厂',d:'江宁再生',w1:'22.10',w2:'--',st:'在途运输', driver: '李师傅', time: '2023-10-27 15:10'},
            {id:'HDXJ26014',p:'苏A B2291',t:'脱硫石膏',s:'华能厂',d:'栖霞1#库',w1:'26.50',w2:'26.40',st:'异常核销', driver: '王师傅', time: '2023-10-27 16:05'},
        ]
    }
  };

  const menuItems = [
    { id: 'dashboard', label: '智能驾驶看板', icon: <Icons.Dashboard /> },
    { id: 'orders', label: '工单全流程追溯', icon: <Icons.Orders /> },
    { id: 'sites', label: '站点管理', icon: <Icons.Site /> },
    { id: 'weighbridge', label: '地磅管理', icon: <Icons.Scale /> },
    { id: 'obd', label: 'OBD管理', icon: <Icons.OBD /> },
    { id: 'vehicles', label: '车纳管理', icon: <Icons.Truck /> },
    { id: 'drivers', label: '师傅管理', icon: <Icons.User /> },
    { id: 'enterprises', label: '企业管理', icon: <Icons.Business /> },
  ];

  // 看板核心组件
  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* 欢迎及总体概况 */}
      <div className="bg-gradient-to-r from-[#2B579A] to-[#3a7bd5] rounded-2xl p-8 text-white shadow-lg flex justify-between items-center relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold">系统管理员 您好！</h2>
          <p className="text-blue-100/70 text-sm mt-2">监管正在运行：地磅 12台 | OBD终端 128个 | 实时在途 15台</p>
          <div className="mt-4 flex space-x-4">
            <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-bold backdrop-blur-sm">云端同步正常</span>
            <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-bold backdrop-blur-sm">数据加密已开启</span>
          </div>
        </div>
        <div className="relative z-10 bg-white/10 px-10 py-5 rounded-2xl backdrop-blur-md border border-white/20 text-center shadow-inner">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-100">师傅总活跃度</p>
          <p className="text-3xl font-black mt-1">85.4%</p>
          <div className="w-full bg-white/20 h-1 mt-3 rounded-full overflow-hidden">
            <div className="bg-emerald-400 h-full w-[85%] shadow-[0_0_10px_#34d399]"></div>
          </div>
        </div>
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
      </div>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-6 gap-4">
        {[
          { label: '今日运单量', value: '42', unit: '单', color: 'text-blue-600' },
          { label: '累计运单', value: '4,280', unit: '单', color: 'text-slate-900' },
          { label: '今日运货量', value: '1,542.4', unit: '吨', color: 'text-emerald-600' },
          { label: '累计运货量', value: '124.5k', unit: '吨', color: 'text-indigo-600' },
          { label: '车均单量', value: '3.5', unit: '单/车', color: 'text-cyan-600' },
          { label: '师傅活跃数', value: '38', unit: '人', color: 'text-orange-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{s.label}</p>
            <div className="mt-4 flex items-baseline space-x-1">
              <span className={`text-2xl font-black ${s.color}`}>{s.value}</span>
              <span className="text-[10px] font-bold text-slate-300 ml-0.5">{s.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-3 gap-6">
        {/* 左侧：车辆及货物类型分布 */}
        <div className="col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-72 flex flex-col">
            <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center">
              <span className="w-1 h-3 bg-blue-600 rounded-full mr-2"></span>
              车辆类型分布
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={[{n:'自卸车',v:65},{n:'罐式车',v:25},{n:'半挂车',v:10}]} innerRadius={45} outerRadius={65} dataKey="v" paddingAngle={5}>
                    <Cell fill="#2B579A" /><Cell fill="#409EFF" /><Cell fill="#909399" />
                  </Pie>
                  <Tooltip />
                  <Legend iconSize={8} wrapperStyle={{fontSize:'10px', fontWeight:700}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-72 flex flex-col">
            <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center">
              <span className="w-1 h-3 bg-indigo-600 rounded-full mr-2"></span>
              货物类型分布
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{n:'粉煤灰',v:450},{n:'炉渣',v:210},{n:'石膏',v:180},{n:'废渣',v:120}]} layout="vertical">
                  <XAxis type="number" hide />
                  <YAxis dataKey="n" type="category" axisLine={false} tickLine={false} fontSize={10} width={45} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="v" radius={[0, 4, 4, 0]}>
                    <Cell fill="#2B579A" /><Cell fill="#409EFF" /><Cell fill="#f59e0b" /><Cell fill="#909399" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 右侧：师傅运单排行榜 */}
        <div className="col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 flex items-center">
                <span className="w-1 h-3 bg-emerald-500 rounded-full mr-2"></span>
                师傅运单排行榜 (TOP 5)
              </h3>
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">今日动态</span>
           </div>
           <div className="flex-1 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-400">
                  <tr>
                    <th className="px-6 py-4">排名</th>
                    <th className="px-6 py-4">师傅姓名</th>
                    <th className="px-6 py-4">完成单量</th>
                    <th className="px-6 py-4">运输吨数</th>
                    <th className="px-6 py-4 text-right">活跃指数</th>
                  </tr>
                </thead>
                <tbody className="text-[13px] text-slate-600">
                  {[
                    { rank: 1, name: '张师傅', orders: 12, weight: 245.2, score: 98 },
                    { rank: 2, name: '李师傅', orders: 10, weight: 210.5, score: 95 },
                    { rank: 3, name: '王师傅', orders: 9, weight: 198.8, score: 92 },
                    { rank: 4, name: '赵师傅', orders: 7, weight: 156.4, score: 88 },
                    { rank: 5, name: '刘师傅', orders: 6, weight: 142.1, score: 85 },
                  ].map((d, i) => (
                    <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className={`w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-black ${i < 3 ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          {d.rank}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-900">{d.name}</td>
                      <td className="px-6 py-4">{d.orders} <span className="text-[10px] text-slate-300 ml-1">单</span></td>
                      <td className="px-6 py-4 font-black">{d.weight} <span className="text-[10px] text-slate-300 font-normal">T</span></td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center space-x-2">
                           <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-blue-600 h-full" style={{width: `${d.score}%`}}></div>
                           </div>
                           <span className="font-mono text-[10px] text-blue-600">{d.score}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );

  const renderModuleList = (moduleId: string) => {
    const config = moduleConfigs[moduleId];
    if (!config) return null;

    return (
      <div className="space-y-6 animate-fade-in pb-10">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{config.title}</h3>
              <p className="text-xs text-slate-400 mt-1">全量台账管理 | 当前在线共 {config.data.length} 条记录</p>
            </div>
            <div className="flex items-center space-x-3">
              {moduleId === 'orders' && (
                <>
                  <button className="flex items-center space-x-2 px-6 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <Icons.Import />
                    <span>导入工单</span>
                  </button>
                  <button className="flex items-center space-x-2 px-6 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    <Icons.Export />
                    <span>导出工单</span>
                  </button>
                </>
              )}
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-[#2B579A] text-white px-8 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-blue-900/10 hover:bg-[#1E3E70] flex items-center space-x-2 transition-all active:scale-95 ml-2"
              >
                <Icons.Plus />
                <span>{config.addLabel}</span>
              </button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5">#</th>
                {moduleId === 'orders' 
                   ? ['工单编号', '车辆', '货物', '节点', '重量', '状态'].map(h => <th key={h} className="px-8 py-5">{h}</th>)
                   : config.columns.map((h: string) => <th key={h} className="px-8 py-5">{h}</th>)
                }
                <th className="px-8 py-5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-slate-600">
              {config.data.map((item: any, i: number) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-blue-50/20 transition-all cursor-pointer group" onClick={() => moduleId === 'orders' && setSelectedOrder(item)}>
                  <td className="px-8 py-5 text-slate-300 font-mono text-xs">{i + 1}</td>
                  {Object.entries(item).slice(0, moduleId === 'orders' ? 6 : config.columns.length).map(([key, val]: any) => (
                    <td key={key} className="px-8 py-5">
                      {val === '运行中' || val === '正常' || val === '已完成' || val === '在线' ? (
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black">{val}</span>
                      ) : val === '异常' || val === '停机维护' || val === '异常核销' || val === '离线' ? (
                        <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-lg text-[10px] font-black">{val}</span>
                      ) : (
                        <span className={key === 'id' || key === 'p' || key === 'name' ? 'font-bold text-slate-900' : ''}>{val}</span>
                      )}
                    </td>
                  ))}
                  <td className="px-8 py-5 text-right flex justify-end items-center space-x-2">
                    <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Icons.Edit /></button>
                    <button className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><Icons.Trash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-[#F0F2F5] overflow-hidden text-slate-700 font-sans">
      {/* 侧边栏 - OA深蓝风格 #2B579A */}
      <aside className="w-64 bg-[#2B579A] text-white flex flex-col z-30 shadow-2xl shrink-0">
        <div className="h-20 flex items-center px-8 bg-[#244A85] shadow-inner">
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mr-3 border border-white/20">
             <Icons.Truck />
          </div>
          <div className="overflow-hidden">
             <h1 className="text-base font-bold tracking-tight leading-tight">运输取证监管系统</h1>
             <p className="text-[9px] text-blue-200/50 uppercase font-black tracking-widest">SolidLink Management</p>
          </div>
        </div>

        <nav className="flex-1 py-8 overflow-y-auto no-scrollbar space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenu(item.id)}
              className={`w-full flex items-center px-8 py-4 transition-all relative ${
                activeMenu === item.id 
                ? 'bg-[#1E3E70] text-white font-bold' 
                : 'text-blue-100/60 hover:bg-[#1E3E70]/50 hover:text-white'
              }`}
            >
              {activeMenu === item.id && <div className="absolute left-0 top-1 bottom-1 w-1.5 bg-[#409EFF] rounded-r-full shadow-[0_0_10px_#409eff]"></div>}
              <span className={`mr-4 transition-transform duration-300 ${activeMenu === item.id ? 'scale-110 text-white' : 'opacity-60'}`}>{item.icon}</span>
              <span className="text-[13px] tracking-wide">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* 顶部通栏 */}
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex justify-between items-center shrink-0 z-20 shadow-sm">
           <div className="flex items-center space-x-4">
              <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Enterprise Console</span>
              <div className="w-px h-4 bg-slate-200"></div>
              <h2 className="text-base font-bold text-slate-900">{menuItems.find(m => m.id === activeMenu)?.label}</h2>
           </div>
           <div className="flex items-center space-x-8">
              <div className="relative">
                 <input type="text" placeholder="全域台账检索..." className="bg-slate-50 border border-slate-100 rounded-full px-6 py-2.5 text-xs w-80 outline-none focus:ring-4 ring-blue-500/10 transition-all shadow-inner" />
                 <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300"><Icons.Search /></span>
              </div>
              <div className="flex items-center space-x-4 pl-8 border-l border-slate-100">
                 <div className="text-right">
                    <p className="text-xs font-bold text-slate-900 leading-none">系统管理员</p>
                    <div className="flex items-center justify-end space-x-1 mt-1">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                       <span className="text-[9px] text-slate-400 font-black uppercase">Online</span>
                    </div>
                 </div>
                 <div className="w-10 h-10 rounded-2xl bg-[#2B579A] text-white flex items-center justify-center font-bold shadow-lg shadow-blue-900/20">AD</div>
              </div>
           </div>
        </header>

        {/* 核心展示区 */}
        <div className="flex-1 overflow-y-auto p-10 no-scrollbar bg-[#F4F7FA]">
           {activeMenu === 'dashboard' ? renderDashboard() : renderModuleList(activeMenu)}
        </div>

        {/* 运单详情侧滑页 */}
        {selectedOrder && activeMenu === 'orders' && (
          <div className="absolute inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
            <div className="relative w-[700px] bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto no-scrollbar">
              <div className="p-10 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <div>
                    <h3 className="text-2xl font-bold text-slate-900">运输指令证据链</h3>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Evidence Traceability Collection</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="w-12 h-12 hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-400 transition-all">✕</button>
              </div>
              <div className="p-10 space-y-10 pb-20">
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 grid grid-cols-2 gap-8 shadow-inner">
                   <div className="space-y-1"><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">车牌号码</p><p className="font-black text-slate-900 text-lg">{selectedOrder.p}</p></div>
                   <div className="space-y-1"><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">运输师傅</p><p className="font-black text-slate-900 text-lg">{selectedOrder.driver}</p></div>
                   <div className="space-y-1"><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">起始站点</p><p className="font-black text-slate-700">{selectedOrder.s}</p></div>
                   <div className="space-y-1"><p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">卸货目的地</p><p className="font-black text-slate-700">{selectedOrder.d}</p></div>
                </div>
                
                <div className="space-y-8">
                   <h4 className="font-black text-base text-slate-900 border-l-[10px] border-[#2B579A] pl-5 uppercase tracking-tighter">运输全过程流转记录</h4>
                   <div className="space-y-12 pl-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                      {[
                        { t: '进场过磅环节', d: `通过01#地磅 | 实测重量: ${selectedOrder.w1} T`, time: '14:20', icon: '⚖️', img: true },
                        { t: '出厂道闸抓拍', d: '南门闸机联动系统自动识别车牌并抓拍', time: '14:35', icon: '📸', img: true },
                        { t: 'OBD路径监控', d: '全程GPS轨迹同步，路径匹配度 99%', time: '持续中', icon: '📍' },
                        { t: '指定地点拍照', d: '消纳库倾倒现场取证照片已上传并记录坐标', time: '15:10', icon: '✅', img: true }
                      ].map((n, i) => (
                        <div key={i} className="relative pl-14 group">
                           <div className="absolute left-0 top-1 w-7 h-7 rounded-xl border-4 border-white bg-[#2B579A] shadow-xl z-10 flex items-center justify-center text-[10px] font-bold text-white transition-all group-hover:scale-125 group-hover:rotate-6">{n.icon}</div>
                           <div className="flex justify-between items-start">
                             <div>
                               <p className="text-sm font-black text-slate-900">{n.t}</p>
                               <p className="text-xs text-slate-400 mt-2 leading-relaxed">{n.d}</p>
                             </div>
                             <span className="text-[10px] font-black text-slate-300 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{n.time}</span>
                           </div>
                           {n.img && (
                             <div className="mt-6 grid grid-cols-2 gap-4">
                                <div className="aspect-video bg-slate-100 rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all"><img src={`https://picsum.photos/seed/${i}a/400/225`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" /></div>
                                <div className="aspect-video bg-slate-100 rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-all"><img src={`https://picsum.photos/seed/${i}b/400/225`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" /></div>
                             </div>
                           )}
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 通用录入弹窗 */}
        {showAddModal && (
          <div className="absolute inset-0 z-[100] flex justify-center items-center">
             <div onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"></div>
             <div className="relative bg-white w-[560px] rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] p-12 space-y-8 animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center border-b border-slate-50 pb-6">
                    <div>
                      <h3 className="text-xl font-black text-slate-900">数据登记维护</h3>
                      <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-black">Register Ledger Record</p>
                    </div>
                    <button onClick={() => setShowAddModal(false)} className="w-10 h-10 hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-300 transition-colors">✕</button>
                </div>
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">台账主要名称</label>
                        <input type="text" className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold outline-none focus:ring-4 ring-blue-500/10 transition-all" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">属性配置</label>
                        <select className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold outline-none appearance-none transition-all">
                           <option>高优先级</option>
                           <option>常规标准</option>
                        </select>
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">关联说明 / 备注</label>
                      <textarea className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-sm font-bold outline-none h-28 focus:ring-4 ring-blue-500/10 resize-none transition-all" />
                   </div>
                </div>
                <div className="flex space-x-4 pt-4">
                   <button onClick={() => setShowAddModal(false)} className="flex-1 py-4 border border-slate-200 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all">取消</button>
                   <button onClick={() => { alert('数据已安全录入台账'); setShowAddModal(false); }} className="flex-1 py-4 bg-[#2B579A] text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 active:scale-95 transition-all">确认保存</button>
                </div>
             </div>
          </div>
        )}
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
