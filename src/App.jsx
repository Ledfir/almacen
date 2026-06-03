import { useAuth } from './contexts/AuthContext';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const { user, loading } = useAuth();

  // Mostrar loading mientras se verifica la sesión
  if (loading) {
    return (
      <div className="dark min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
          <p className="font-label-bold text-label-bold text-on-surface-variant">
            Cargando...
          </p>
        </div>
      </div>
    );
  }

  // Si hay usuario autenticado, mostrar Dashboard
  // Si no hay usuario, mostrar Login
  return user ? <Dashboard /> : <Login />;
}

export default App;


