
import React, { useState } from 'react';
import { UserRole, DetailedOrder } from '../../types';
import LeaderHome from './tabs/LeaderHome';
import DriverHome from './tabs/DriverHome';
import OrderHistoryView from './tabs/OrderHistoryView';
import TrajectoryPlayback from './tabs/TrajectoryPlayback';
import DashboardView from './tabs/DashboardView';
import ProfileView from './tabs/ProfileView';
import OrderDetail from './tabs/OrderDetail';
import VehicleManagement from './tabs/VehicleManagement';
import PublishOrder from './tabs/PublishOrder';
import AlarmList from './tabs/AlarmList';
import AddVehicle from './tabs/AddVehicle';
import { Icon } from './icons';

const MobileApp: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.LEADER);
  const [activeTab, setActiveTab] = useState('home');
  const [selectedOrder, setSelectedOrder] = useState<DetailedOrder | null>(null);
  const [playbackOrder, setPlaybackOrder] = useState<DetailedOrder | null>(null);
  const [activeSubView, setActiveSubView] = useState<string | null>(null);

  const leaderTabs = [
    { id: 'home', label: '首页', icon: <Icon.Home /> },
    { id: 'stats', label: '统计', icon: <Icon.Stats /> },
    { id: 'profile', label: '我的', icon: <Icon.User /> },
  ];

  const driverTabs = [
    { id: 'home', label: '首页', icon: <Icon.Home /> },
    { id: 'history', label: '历史运单', icon: <Icon.Map /> },
    { id: 'profile', label: '我的', icon: <Icon.User /> },
  ];

  const tabs = role === UserRole.LEADER ? leaderTabs : driverTabs;

  const isSecondaryActive = !!activeSubView || !!selectedOrder || !!playbackOrder;

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return role === UserRole.LEADER 
          ? <LeaderHome 
              onOpenSub={setActiveSubView} 
              onOpenOrder={setSelectedOrder} 
              onOpenPlayback={setPlaybackOrder}
            /> 
          : <DriverHome 
              onOpenOrder={setSelectedOrder}
              onOpenPlayback={setPlaybackOrder}
            />;
      case 'history':
        return <OrderHistoryView 
          onOpenOrder={setSelectedOrder} 
          onOpenPlayback={setPlaybackOrder}
        />;
      case 'stats':
        return <DashboardView />;
      case 'profile':
        return <ProfileView role={role} setRole={setRole} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#F7F9FC] relative overflow-hidden text-slate-900">
      {!isSecondaryActive && (
        <header className="px-6 pt-12 pb-4 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-40">
          <h1 className="text-lg font-bold tracking-tight">
            {role === UserRole.LEADER ? '煤灰运输取证管理' : '固废运输师傅端'}
          </h1>
          <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center relative">
            <Icon.Alert />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
          </div>
        </header>
      )}

      <main className={`flex-1 overflow-y-auto ${!isSecondaryActive ? 'pb-24' : ''}`}>
        {renderContent()}
      </main>

      {selectedOrder && (
        <OrderDetail 
          order={selectedOrder} 
          onBack={() => setSelectedOrder(null)}
          onOpenPlayback={(order) => {
            setSelectedOrder(null);
            setPlaybackOrder(order);
          }}
        />
      )}

      {playbackOrder && (
        <TrajectoryPlayback 
          order={playbackOrder} 
          onBack={() => setPlaybackOrder(null)} 
        />
      )}
      
      {activeSubView === 'vehicles' && (
        <VehicleManagement 
          onBack={() => setActiveSubView(null)} 
          onAdd={() => setActiveSubView('add-vehicle')}
        />
      )}
      {activeSubView === 'publish' && <PublishOrder onBack={() => setActiveSubView(null)} />}
      {activeSubView === 'alarms' && (
        <AlarmList 
          onBack={() => setActiveSubView(null)} 
          onOpenOrder={setSelectedOrder}
          onOpenPlayback={setPlaybackOrder}
        />
      )}
      {activeSubView === 'add-vehicle' && <AddVehicle onBack={() => setActiveSubView('vehicles')} />}

      {!isSecondaryActive && (
        <nav className="absolute bottom-0 left-0 right-0 h-20 bg-white/95 backdrop-blur-xl border-t border-slate-100 flex justify-around items-center px-4 safe-bottom z-40 rounded-t-[2rem] shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setActiveSubView(null);
              }}
              className={`flex flex-col items-center justify-center w-16 transition-all duration-300 ${
                activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'
              }`}
            >
              <span className={`mb-1 transition-transform ${activeTab === tab.id ? 'scale-110' : 'scale-100'}`}>
                  {tab.icon}
              </span>
              <span className="text-[10px] font-bold tracking-tight">{tab.label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
};

export default MobileApp;
