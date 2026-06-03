import { useAuth } from './contexts/AuthContext';

function Dashboard() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <div className="dark min-h-screen bg-background text-on-surface">
      {/* Header */}
      <header className="bg-surface-container border-b border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                precision_manufacturing
              </span>
              <div>
                <h1 className="font-headline-md text-headline-md text-on-surface">
                  CNC Workshop Inventory
                </h1>
                <p className="font-label-bold text-label-bold text-on-surface-variant">
                  SISTEMA DE CONTROL INDUSTRIAL
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-surface-container-high border border-outline-variant rounded hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined text-on-surface-variant">
                logout
              </span>
              <span className="font-label-bold text-label-bold text-on-surface-variant">
                CERRAR SESIÓN
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 p-6 bg-surface-container border border-outline-variant rounded-lg">
          <div className="flex items-start gap-4">
            <span className="material-symbols-outlined text-primary text-4xl">
              waving_hand
            </span>
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                ¡Bienvenido al Sistema!
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
                Usuario: <span className="text-primary font-semibold">{user?.email}</span>
              </p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Has iniciado sesión correctamente. El dashboard completo estará disponible próximamente.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stat Card 1 */}
          <div className="bg-surface-container border border-outline-variant rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-primary text-3xl">
                inventory_2
              </span>
              <span className="font-label-bold text-label-bold text-on-surface-variant">
                INVENTARIO
              </span>
            </div>
            <p className="font-headline-lg text-headline-lg text-on-surface">
              0
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Herramientas registradas
            </p>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-surface-container border border-outline-variant rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-secondary text-3xl">
                precision_manufacturing
              </span>
              <span className="font-label-bold text-label-bold text-on-surface-variant">
                MÁQUINAS
              </span>
            </div>
            <p className="font-headline-lg text-headline-lg text-on-surface">
              0
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              CNC operativas
            </p>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-surface-container border border-outline-variant rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-tertiary text-3xl">
                swap_horiz
              </span>
              <span className="font-label-bold text-label-bold text-on-surface-variant">
                MOVIMIENTOS
              </span>
            </div>
            <p className="font-headline-lg text-headline-lg text-on-surface">
              0
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Hoy
            </p>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-surface-container border border-outline-variant rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="material-symbols-outlined text-error text-3xl">
                warning
              </span>
              <span className="font-label-bold text-label-bold text-on-surface-variant">
                ALERTAS
              </span>
            </div>
            <p className="font-headline-lg text-headline-lg text-on-surface">
              0
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Stock bajo
            </p>
          </div>
        </div>

        {/* Coming Soon */}
        <div className="bg-surface-container border border-outline-variant rounded-lg p-8 text-center">
          <span className="material-symbols-outlined text-on-surface-variant text-6xl mb-4 block">
            construction
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface mb-2">
            Dashboard en Construcción
          </h3>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">
            Estamos trabajando en las funcionalidades completas del sistema de inventario.
            Próximamente podrás gestionar herramientas, máquinas CNC y generar reportes.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-on-surface-variant opacity-50">
              <span className="material-symbols-outlined text-sm">smart_toy</span>
              <span className="font-data-mono text-data-mono">Industrial Core v4.2.0</span>
            </div>
            <div className="text-on-surface-variant/30 font-label-bold text-label-bold">
              © 2024 PRECISION CNC SYSTEMS
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;
