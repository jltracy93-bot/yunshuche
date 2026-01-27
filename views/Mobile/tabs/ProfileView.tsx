
import React from 'react';
import { UserRole } from '../../../types';
import { Icon } from '../icons';

interface Props {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const ProfileView: React.FC<Props> = ({ role, setRole }) => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-24 h-24 bg-white rounded-[2rem] shadow-md border-4 border-white flex items-center justify-center text-3xl">
          👤
        </div>
        <div className="text-center">
           <h2 className="text-xl font-bold text-slate-900">{role === UserRole.LEADER ? '李总 (管理端)' : '张师傅 (司机端)'}</h2>
           <p className="text-xs text-slate-400 mt-1">138-0000-0000</p>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-50 overflow-hidden">
         <div className="p-2">
            {[
                { label: '个人资料', icon: <Icon.User /> },
                { label: '绑定车辆', icon: <Icon.Truck /> },
                { label: '系统设置', icon: <Icon.Stats /> },
                { label: '帮助中心', icon: <Icon.Alert /> },
            ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors rounded-2xl">
                    <div className="flex items-center space-x-3 text-slate-600">
                        <span className="text-slate-400">{item.icon}</span>
                        <span className="text-sm font-bold">{item.label}</span>
                    </div>
                    <span className="text-slate-300">›</span>
                </button>
            ))}
         </div>
      </div>

      {/* Role Switcher for Demo */}
      <div className="bg-blue-50 p-6 rounded-[2rem] space-y-4">
         <h4 className="text-xs font-bold text-blue-800 uppercase tracking-widest text-center">切换体验模式</h4>
         <div className="flex bg-white/50 p-1 rounded-2xl">
            <button 
                onClick={() => setRole(UserRole.LEADER)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${role === UserRole.LEADER ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >领导端</button>
            <button 
                onClick={() => setRole(UserRole.DRIVER)}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${role === UserRole.DRIVER ? 'bg-white shadow-sm text-blue-600' : 'text-slate-400'}`}
            >师傅端</button>
         </div>
      </div>

      <button className="w-full py-4 text-red-500 font-bold text-sm bg-white border border-slate-100 rounded-2xl shadow-sm">退出登录</button>
    </div>
  );
};

export default ProfileView;
