import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import './styles/App.scss';
import { useSelector } from 'react-redux';

export default function App() {
  const view = useSelector(state => state.view);

  return (
    <div className="app">
      {view === 'login' &&
        <Login />
      }
      {view === 'dashboard' &&
        <Dashboard />
      }
    </div>
  );
}