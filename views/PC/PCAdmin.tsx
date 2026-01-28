
import React, { useState, useMemo, useEffect } from 'react';
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
};

const TrajectoryModal: React.FC<{ order: any; onClose: () => void }> = ({ order, onClose }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 2));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-[#0f172a] w-[375px] h-[667px] rounded-[3rem] border-[8px] border-slate-800 shadow-2xl relative overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        <div className="h-6 bg-slate-800 w-32 mx-auto rounded-b-xl z-20"></div>
        <div className="p-6 flex justify-between items-center text-white border-b border-white/5 bg-slate-900/50">
          <div>
            <h4 className="text-sm font-bold">{order.plate}</h4>
            <p className="text-[10px] text-slate-400">轨迹回放 - {order.id}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full">✕</button>
        </div>
        <div className="flex-1 relative bg-slate-950">
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 0)', backgroundSize: '30px 30px' }}></div>
          <svg className="absolute inset-0 w-full h-full">
            <path d="M 50 500 Q 150 450 200 300 T 325 150" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeDasharray="10" strokeDashoffset={progress} />
          </svg>
          <div className="absolute transition-all duration-100" style={{ left: `${50 + (275 * progress / 100)}px`, top: `${500 - (350 * progress / 100)}px`, transform: 'translate(-50%, -50%)' }}>
            <div className="w-8 h-8 bg-blue-600 rounded-xl border-2 border-white shadow-xl flex items-center justify-center text-white text-[10px]">🚚</div>
          </div>
          <div className="absolute left-6 bottom-6 bg-black/40 p-3 rounded-xl text-white text-[9px] space-y-1 backdrop-blur-md border border-white/5">
            <p>实时航向: 45.2°</p>
            <p>实时速度: {Math.floor(Math.random() * 20 + 40)} km/h</p>
            <p>路径吻合: 99.2%</p>
          </div>
        </div>
        <div className="p-6 bg-slate-900 border-t border-white/5 space-y-4">
           <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 transition-all" style={{ width: `${progress}%` }}></div>
           </div>
           <div className="flex justify-around">
             <button className="text-[10px] text-white font-bold px-4 py-2 bg-white/10 rounded-lg">倍速 1.0x</button>
             <button className="text-[10px] text-white font-bold px-4 py-2 bg-blue-600 rounded-lg">暂停回放</button>
           </div>
        </div>
      </div>
    </div>
  );
};

const PCAdmin: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [playbackOrder, setPlaybackOrder] = useState<any>(null);

  const [filters, setFilters] = useState({
    search: '',
    date: '',
    category: '',
    status: '',
    weightMin: '',
    weightMax: ''
  });

  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  const menuItems = [
    { id: 'dashboard', label: '可视化大屏', icon: <Icons.Dashboard /> },
    { id: 'orders', label: '工单全流程追溯', icon: <Icons.Orders /> },
    { id: 'sites', label: '站点管理', icon: <Icons.Site /> },
    { id: 'weighbridge', label: '地磅管理', icon: <Icons.Scale /> },
    { id: 'obd', label: 'OBD管理', icon: <Icons.OBD /> },
    { id: 'vehicles', label: '车辆管理', icon: <Icons.Truck /> },
    { id: 'drivers', label: '师傅管理', icon: <Icons.User /> },
    { id: 'enterprises', label: '企业管理', icon: <Icons.Business /> },
  ];

  const moduleConfigs: any = {
    sites: { title: '站点管理', addLabel: '新增站点', columns: ['站点编号', '站点名称', '负责人', '联系电话', '运行状态'], data: [{ id: 'S001', name: '滨江联合热电厂', manager: '张主管', phone: '13812345678', status: '运行中' }, { id: 'S002', name: '栖霞再生消纳场', manager: '王站长', phone: '13988887777', status: '运行中' }, { id: 'S003', name: '大唐发电固废库', manager: '陈工', phone: '13700001111', status: '停机维护' }] },
    weighbridge: { title: '地磅管理', addLabel: '新增地磅', columns: ['设备编号', '所属站点', '规格型号', '最后检定', '状态'], data: [{ id: 'WB-01', site: '滨江厂', model: 'SCS-120', date: '2024-01-15', status: '正常' }] },
    obd: { title: 'OBD管理', addLabel: '领用设备', columns: ['设备ID', '绑定车辆', '电量', '信号', '状态'], data: [{ id: 'OBD-8821', plate: '苏A 88888', battery: '92%', signal: '优', status: '在线' }] },
    vehicles: { title: '车辆管理', addLabel: '车辆入库', columns: ['车牌号', '所属单位', '车辆类型', '主驾驶', '当前状态'], data: [{ id: '苏A 88888', company: '东鑫运输', type: '自卸车', driver: '张师傅', status: '运输中' }] },
    drivers: { title: '师傅管理', addLabel: '师傅入职', columns: ['姓名', '手机号', '准驾类别', '安全评分', '入职日期'], data: [{ name: '张师傅', phone: '13812349901', cert: 'A2', score: '98', date: '2022-05' }] },
    enterprises: { title: '企业管理', addLabel: '新增合作方', columns: ['企业名称', '法人代表', '车队规模', '所属区域', '状态'], data: [{ name: '南京东鑫运输服务有限公司', boss: '刘东', size: '24台', area: '栖霞区', status: '正常' }] },
    orders: {
        title: '工单全流程追溯',
        addLabel: '发布运单',
        data: [
            { id: 'HDXJ26012', date: '2023-10-27', plate: '苏A 88888', entryTime: '14:20', exitTime: '14:45', weight: '24.52', category: '粉煤灰', status: '已完成', node: '已倾倒', photos: { entry: 'https://picsum.photos/seed/1/100', gate: 'https://picsum.photos/seed/2/100', dump: 'https://picsum.photos/seed/3/100' }, driver: '张师傅', s:'滨江厂', d:'栖霞3#库', w1:'24.52', w2:'24.48', tare:'15.10', gross:'39.62' },
            { id: 'HDXJ26013', date: '2023-10-27', plate: '新J 41277', entryTime: '15:10', exitTime: '15:35', weight: '22.10', category: '炉渣', status: '运输中', node: '道闸拍照', photos: { entry: 'https://picsum.photos/seed/4/100', gate: 'https://picsum.photos/seed/5/100' }, driver: '李师傅', s:'滨江厂', d:'江宁再生', w1:'22.10', w2: '--', tare:'15.50', gross:'37.60' },
            { id: 'HDXJ26014', date: '2023-10-27', plate: '苏A B2291', entryTime: '16:05', exitTime: '--', weight: '26.50', category: '石膏', status: '异常', node: '入场过磅', photos: { entry: 'https://picsum.photos/seed/6/100' }, driver: '王师傅', s:'华能厂', d:'栖霞1#库', w1:'26.50', w2:'26.40', tare:'16.20', gross:'42.70' },
        ]
    }
  };

  const filteredOrders = useMemo(() => {
    if (activeMenu !== 'orders') return [];
    return moduleConfigs.orders.data.filter((item: any) => {
      const f = appliedFilters;
      const matchSearch = !f.search || item.id.includes(f.search) || item.plate.includes(f.search);
      const matchDate = !f.date || item.date === f.date;
      const matchCategory = !f.category || item.category === f.category;
      const matchStatus = !f.status || item.status === f.status;
      const weight = parseFloat(item.weight);
      const matchWeight = (!f.weightMin || weight >= parseFloat(f.weightMin)) && (!f.weightMax || weight <= parseFloat(f.weightMax));
      return matchSearch && matchDate && matchCategory && matchStatus && matchWeight;
    });
  }, [activeMenu, appliedFilters, moduleConfigs.orders.data]);

  const renderDashboard = () => (
    <div className="space-y-6 animate-fade-in pb-10">
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
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
      </div>

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

      <div className="grid grid-cols-3 gap-6">
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

      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        <div className="flex justify-between items-center">
            <h3 className="font-bold text-sm text-slate-900 flex items-center">
               <span className="w-1 h-3 bg-blue-600 rounded-full mr-2"></span>
               运单流量趋势
            </h3>
        </div>
        <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[{n:'06',v:42},{n:'08',v:85},{n:'10',v:110},{n:'12',v:65},{n:'14',v:140},{n:'16',v:95},{n:'18',v:30}]}>
                    <defs>
                      <linearGradient id="colorV" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2B579A" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#2B579A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="n" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip />
                    <Area type="monotone" dataKey="v" stroke="#2B579A" strokeWidth={3} fill="url(#colorV)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
      </section>
    </div>
  );

  const renderModuleList = (moduleId: string) => {
    const config = moduleConfigs[moduleId];
    if (!config) return null;
    const data = moduleId === 'orders' ? filteredOrders : config.data;

    return (
      <div className="space-y-6 animate-fade-in pb-10">
        {moduleId === 'orders' && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 grid grid-cols-6 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">搜索工单/车牌</label>
              <input type="text" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold outline-none" value={filters.search} onChange={e => setFilters({...filters, search: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">日期</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold outline-none" value={filters.date} onChange={e => setFilters({...filters, date: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">货物分类</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold outline-none" value={filters.category} onChange={e => setFilters({...filters, category: e.target.value})}>
                <option value="">全部</option>
                <option value="粉煤灰">粉煤灰</option>
                <option value="炉渣">炉渣</option>
                <option value="石膏">石膏</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">拉运量范围(T)</label>
              <div className="flex items-center space-x-2">
                <input type="number" placeholder="最小" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-2 py-2 text-xs font-bold outline-none" value={filters.weightMin} onChange={e => setFilters({...filters, weightMin: e.target.value})} />
                <span className="text-slate-300">-</span>
                <input type="number" placeholder="最大" className="w-full bg-slate-50 border border-slate-100 rounded-xl px-2 py-2 text-xs font-bold outline-none" value={filters.weightMax} onChange={e => setFilters({...filters, weightMax: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase">运单状态</label>
              <select className="w-full bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-xs font-bold outline-none" value={filters.status} onChange={e => setFilters({...filters, status: e.target.value})}>
                <option value="">全部</option>
                <option value="已完成">已完成</option>
                <option value="运输中">运输中</option>
                <option value="异常">异常</option>
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <button onClick={() => setAppliedFilters({...filters})} className="flex-1 py-2 bg-[#2B579A] text-white rounded-xl text-xs font-bold hover:bg-[#1E3E70]">执行查询</button>
              <button onClick={() => {setFilters({search:'', date:'', category:'', status:'', weightMin:'', weightMax:''}); setAppliedFilters({search:'', date:'', category:'', status:'', weightMin:'', weightMax:''});}} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold">重置</button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{config.title}</h3>
              <p className="text-xs text-slate-400 mt-1">共 {data.length} 条符合条件的记录</p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-6 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all" onClick={() => alert('选择本地Excel文件')}>
                <Icons.Import />
                <span>导入数据</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                <Icons.Export />
                <span>导出数据</span>
              </button>
              <button onClick={() => setShowAddModal(true)} className="bg-[#2B579A] text-white px-8 py-2.5 rounded-xl text-xs font-bold shadow-lg flex items-center space-x-2 transition-all active:scale-95 ml-2">
                <Icons.Plus />
                <span>{config.addLabel}</span>
              </button>
            </div>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] text-[11px] uppercase font-bold text-slate-400 border-b border-slate-100">
              <tr>
                <th className="px-6 py-5">#</th>
                {moduleId === 'orders' 
                   ? ['运单号/日期', '车牌号码', '入场/出场', '拉运量(T)', '货物分类', '状态', '流转证据及节点'].map(h => <th key={h} className="px-6 py-5">{h}</th>)
                   : config.columns.map((h: string) => <th key={h} className="px-6 py-5">{h}</th>)
                }
                <th className="px-6 py-5 text-right">操作</th>
              </tr>
            </thead>
            <tbody className="text-[13px] text-slate-600">
              {data.map((item: any, i: number) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-blue-50/20 transition-all cursor-pointer group" onClick={() => moduleId === 'orders' && setSelectedOrder(item)}>
                  <td className="px-6 py-5 text-slate-300 font-mono text-xs">{i + 1}</td>
                  {moduleId === 'orders' ? (
                    <>
                      <td className="px-6 py-5">
                         <div className="font-bold text-slate-900">{item.id}</div>
                         <div className="text-[10px] text-slate-400 font-medium">{item.date}</div>
                      </td>
                      <td className="px-6 py-5 font-bold text-slate-900">{item.plate}</td>
                      <td className="px-6 py-5">
                         <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-emerald-600">入: {item.entryTime}</span>
                            <span className="text-[11px] font-bold text-blue-500">出: {item.exitTime}</span>
                         </div>
                      </td>
                      <td className="px-6 py-5 font-black text-slate-900">{item.weight}</td>
                      <td className="px-6 py-5">
                         <span className="px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600">{item.category}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black border ${item.status === '已完成' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>{item.status}</span>
                      </td>
                      <td className="px-6 py-5">
                         <div className="flex flex-col">
                            <span className="text-[10px] font-black text-slate-800">{item.node}</span>
                            <div className="flex space-x-1 mt-1.5">
                               {item.photos?.entry && <img onClick={(e)=>{e.stopPropagation(); setPreviewImage(item.photos.entry)}} src={item.photos.entry} className="w-8 h-8 rounded-lg object-cover border border-slate-200" alt="entry" />}
                               {item.photos?.gate && <img onClick={(e)=>{e.stopPropagation(); setPreviewImage(item.photos.gate)}} src={item.photos.gate} className="w-8 h-8 rounded-lg object-cover border border-slate-200" alt="gate" />}
                            </div>
                         </div>
                      </td>
                    </>
                  ) : (
                    Object.entries(item).slice(0, config.columns.length).map(([key, val]: any) => (
                      <td key={key} className="px-6 py-5">
                        {val === '运行中' || val === '正常' || val === '在线' ? (
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black">{val}</span>
                        ) : (
                          <span className={key === 'id' || key === 'name' ? 'font-bold text-slate-900' : ''}>{val}</span>
                        )}
                      </td>
                    ))
                  )}
                  <td className="px-6 py-5 text-right space-x-3 whitespace-nowrap">
                    {moduleId === 'orders' ? (
                      <>
                        <button onClick={(e) => {e.stopPropagation(); setPlaybackOrder(item);}} className="text-[11px] font-bold text-blue-600 hover:underline">轨迹回放</button>
                        <button onClick={(e) => {e.stopPropagation(); setSelectedOrder(item);}} className="text-[11px] font-bold text-slate-500 hover:underline">查看详情</button>
                        <button onClick={(e) => {e.stopPropagation(); alert('确认删除记录？');}} className="text-[11px] font-bold text-rose-500 hover:underline">删除</button>
                      </>
                    ) : (
                      <>
                        <button className="text-[11px] font-bold text-blue-600 hover:underline">编辑</button>
                        <button className="text-[11px] font-bold text-rose-500 hover:underline">删除</button>
                      </>
                    )}
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
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex justify-between items-center shrink-0 z-20 shadow-sm">
           <div className="flex items-center space-x-4">
              <span className="text-slate-300 text-[10px] font-black uppercase tracking-widest">Enterprise Console</span>
              <div className="w-px h-4 bg-slate-200"></div>
              <h2 className="text-base font-bold text-slate-900">{menuItems.find(m => m.id === activeMenu)?.label}</h2>
           </div>
           <div className="flex items-center space-x-4 pl-8">
              <div className="text-right">
                 <p className="text-xs font-bold text-slate-900 leading-none">系统管理员</p>
                 <div className="flex items-center justify-end space-x-1 mt-1">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span className="text-[9px] text-slate-400 font-black uppercase">Online</span>
                 </div>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-[#2B579A] text-white flex items-center justify-center font-bold shadow-lg">AD</div>
           </div>
        </header>

        <div className="flex-1 overflow-y-auto p-10 no-scrollbar bg-[#F4F7FA]">
           {activeMenu === 'dashboard' ? renderDashboard() : renderModuleList(activeMenu)}
        </div>

        {previewImage && <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setPreviewImage(null)}><div className="relative max-w-4xl max-h-[80vh] bg-white p-2 rounded-2xl overflow-hidden"><img src={previewImage} className="w-full h-full object-contain" alt="preview" /><button className="absolute top-4 right-4 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center">✕</button></div></div>}
        {playbackOrder && <TrajectoryModal order={playbackOrder} onClose={() => setPlaybackOrder(null)} />}
        
        {/* 工单详情侧滑窗 - 对标小程序补全全部字段 */}
        {selectedOrder && activeMenu === 'orders' && (
          <div className="absolute inset-0 z-[100] flex justify-end">
            <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setSelectedOrder(null)}></div>
            <div className="relative w-[750px] bg-white h-full shadow-2xl animate-in slide-in-from-right duration-500 overflow-y-auto no-scrollbar">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
                <div>
                   <h3 className="text-xl font-bold text-slate-900">运单全流程指令详情</h3>
                   <p className="text-[10px] text-slate-400 mt-1 uppercase font-black tracking-widest">Evidence Chain Report</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} className="w-10 h-10 hover:bg-slate-50 rounded-full flex items-center justify-center text-slate-400 transition-all">✕</button>
              </div>
              <div className="p-8 space-y-8 pb-20">
                {/* 对标小程序：基础档案区 */}
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 shadow-inner space-y-6">
                   <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">工单编号</p><p className="font-bold text-slate-900 text-sm">{selectedOrder.id}</p></div>
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">业务日期</p><p className="font-bold text-slate-900 text-sm">{selectedOrder.date}</p></div>
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">当前状态</p><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-[10px] font-black">{selectedOrder.status}</span></div>
                   </div>
                   <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">车牌号码</p><p className="font-black text-slate-900 text-base">{selectedOrder.plate}</p></div>
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">运输师傅</p><p className="font-bold text-slate-900">{selectedOrder.driver}</p></div>
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">货物名称</p><p className="font-bold text-slate-900">{selectedOrder.category}</p></div>
                   </div>
                   <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-200/50">
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">入场时间</p><p className="font-bold text-emerald-600">{selectedOrder.entryTime}</p></div>
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">出场时间</p><p className="font-bold text-blue-600">{selectedOrder.exitTime}</p></div>
                      <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">当前执行节点</p><p className="font-bold text-slate-700">{selectedOrder.node}</p></div>
                   </div>
                </div>

                {/* 运送路径区 */}
                <div className="grid grid-cols-2 gap-6">
                   <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">始发站点 (发货单位)</p>
                      <p className="font-bold text-slate-700 text-sm">{selectedOrder.s}</p>
                   </div>
                   <div className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">目的地 (消纳点)</p>
                      <p className="font-bold text-slate-700 text-sm">{selectedOrder.d}</p>
                   </div>
                </div>

                {/* 重量计量区 */}
                <div className="bg-[#2B579A]/5 p-8 rounded-[2rem] border border-[#2B579A]/10 grid grid-cols-3 gap-6 text-center">
                   <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">皮重 (T)</p><p className="text-2xl font-black text-slate-400">{selectedOrder.tare || '15.10'}</p></div>
                   <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">毛重 (T)</p><p className="text-2xl font-black text-[#2B579A]">{selectedOrder.gross || '39.62'}</p></div>
                   <div className="space-y-1"><p className="text-[10px] text-slate-400 font-bold uppercase">净重 (T)</p><p className="text-2xl font-black text-emerald-600">{selectedOrder.w1}</p></div>
                </div>

                {/* 对标小程序：流转记录取证 */}
                <div className="space-y-6 pt-4">
                   <h4 className="font-bold text-base text-slate-900 border-l-[6px] border-[#2B579A] pl-4">流转取证记录</h4>
                   <div className="space-y-10 pl-6 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                      {[
                        { t: '进场过磅环节', d: `采集重量: ${selectedOrder.w1} T | 01# 地磅`, time: selectedOrder.entryTime, icon: '⚖️', img: selectedOrder.photos?.entry },
                        { t: '出厂道闸抓拍', d: '南门闸机车牌自动识别', time: selectedOrder.exitTime, icon: '📸', img: selectedOrder.photos?.gate },
                        { t: '倾倒消纳核销', d: '指定区域倾倒现场取证拍照', time: '18:12:45', icon: '✅', img: selectedOrder.photos?.dump }
                      ].map((n, i) => (
                        <div key={i} className="relative pl-12 group">
                           <div className="absolute left-0 top-1 w-7 h-7 rounded-xl border-4 border-white bg-[#2B579A] shadow-lg z-10 flex items-center justify-center text-[10px]">{n.icon}</div>
                           <div className="flex justify-between items-start">
                             <div><p className="text-sm font-bold text-slate-900">{n.t}</p><p className="text-xs text-slate-400 mt-1">{n.d}</p></div>
                             <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{n.time}</span>
                           </div>
                           {n.img && <div className="mt-4"><div className="w-40 aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden cursor-zoom-in" onClick={() => setPreviewImage(n.img)}><img src={n.img} className="w-full h-full object-cover" /></div></div>}
                        </div>
                      ))}
                   </div>
                </div>
                
                <button 
                  onClick={() => setPlaybackOrder(selectedOrder)}
                  className="w-full h-14 bg-slate-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center space-x-3 shadow-xl active:scale-[0.98] transition-all"
                >
                  <Icons.Dashboard /><span>查看该工单详细历史轨迹回放</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {showAddModal && (
          <div className="absolute inset-0 z-[100] flex justify-center items-center">
             <div onClick={() => setShowAddModal(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-fade-in"></div>
             <div className="relative bg-white w-[560px] rounded-[2rem] shadow-2xl p-10 space-y-6 animate-in zoom-in-95 duration-300">
                <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                    <h3 className="text-lg font-bold text-slate-900">数据登记维护</h3>
                    <button onClick={() => setShowAddModal(false)} className="text-slate-300">✕</button>
                </div>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">主要名称</label><input type="text" className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-bold outline-none" /></div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">分类</label><select className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-bold outline-none"><option>默认分类</option></select></div>
                   </div>
                   <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">备注说明</label><textarea className="w-full bg-slate-50 border border-slate-100 p-3 rounded-xl text-sm font-bold outline-none h-24 resize-none" /></div>
                </div>
                <div className="flex space-x-4 pt-4">
                   <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 border border-slate-200 rounded-xl font-bold text-sm">取消</button>
                   <button onClick={() => { alert('已保存'); setShowAddModal(false); }} className="flex-1 py-3 bg-[#2B579A] text-white rounded-xl font-bold text-sm">保存</button>
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
