import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useNavigation } from '../hooks/useNavigation';
import './AdminLayout.css';

function resolveTitle(pathname: string, groups: { items: { path: string; label: string }[] }[]) {
  for (const group of groups) {
    for (const item of group.items) {
      if (item.path === pathname) return item.label;
    }
  }
  return 'Admin';
}

export default function AdminLayout() {
  const location = useLocation();
  const { groups, isLoading, error } = useNavigation();

  const title = resolveTitle(location.pathname, groups);

  return (
    <div className="admin-panel">
      <Sidebar groups={groups} isLoading={isLoading} error={error} />

      <main className="admin-content">
        <header className="admin-header">
          <h1>{title}</h1>
        </header>

        <div className="admin-main">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}

