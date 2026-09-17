'use client';

import { useState } from 'react';
import type { AuthUser, View } from '../types';
import Sidebar from '../shared/Sidebar/index';
import AuthScreen from '../pages/auth/index';
import Dashboard from '../pages/dashboard/index';
import Contacts from '../pages/contacts/index';
import Deals from '../pages/deals/index';
import Users from '../pages/users/index';
import Settings from '../pages/settings/index';

export default function App() {
  const [authView, setAuthView] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<AuthUser | null>(null);
  const [view, setView] = useState<View>('dashboard');

  if (!user) {
    return (
      <div
        suppressHydrationWarning
        className="min-h-screen w-full"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <AuthScreen onLogin={setUser} view={authView} setView={setAuthView} />
      </div>
    );
  }

  return (
    <div
      suppressHydrationWarning
      className="flex h-screen min-h-screen w-full overflow-hidden bg-background"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <Sidebar
        view={view}
        setView={setView}
        user={user}
        onLogout={() => setUser(null)}
      />
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        {view === 'dashboard' && <Dashboard />}
        {view === 'contacts' && <Contacts />}
        {view === 'deals' && <Deals />}
        {view === 'users' && <Users />}
        {view === 'settings' && <Settings user={user} />}
      </main>
    </div>
  );
}
