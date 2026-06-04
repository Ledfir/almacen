import { useAuth } from './contexts/AuthContext';
import { useState } from 'react';

function Dashboard() {
  const { user, signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="dark bg-surface-dim text-on-surface font-body-md overflow-hidden">
      {/* SideNavBar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container border-r border-outline-variant flex flex-col py-6 px-4">
        <div className="mb-8 px-2">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">CNC Command</h1>
          <p className="font-label-bold text-label-bold text-on-surface-variant">Station 04-B</p>
        </div>

        <button className="mb-8 w-full bg-primary text-on-primary font-label-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-transform active:scale-95">
          <span className="material-symbols-outlined">add</span>
          Nueva Orden
        </button>

        <nav className="flex-1 flex flex-col gap-1">
          <a className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-lg transition-transform duration-150 scale-[0.98]" href="#">
            <span className="material-symbols-outlined">precision_manufacturing</span>
            <span className="font-label-bold">Estado del Taller</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-label-bold">Inventario</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
            <span className="material-symbols-outlined">assignment</span>
            <span className="font-label-bold">Órdenes</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
            <span className="material-symbols-outlined">settings_suggest</span>
            <span className="font-label-bold">Mantenimiento</span>
          </a>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-bold">Configuración</span>
          </a>
        </nav>

        <div className="mt-auto flex flex-col gap-1 border-t border-outline-variant pt-4">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <img
              alt="Perfil del Operador"
              className="w-8 h-8 rounded-full border border-primary"
              src="/operator-profile.jpg"
            />
            <div className="flex flex-col">
              <span className="font-label-bold text-on-surface">{user?.email?.split('@')[0] || 'Usuario'}</span>
              <span className="text-[10px] text-on-surface-variant uppercase tracking-widest">Operador</span>
            </div>
          </div>
          <a className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors" href="#">
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-bold">Soporte</span>
          </a>
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high transition-colors text-error">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-bold">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* TopAppBar */}
      <header className="h-16 ml-64 px-8 flex justify-between items-center bg-surface border-b border-outline-variant sticky top-0 z-10">
        <h2 className="font-headline-sm text-headline-sm font-bold text-on-surface">Gestión de Inventario</h2>
        <div className="flex items-center gap-6">
          <div className="relative w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            <input
              className="w-full bg-surface-container-low border border-outline-variant rounded-lg py-1.5 pl-10 pr-4 text-body-md focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              placeholder="Buscar inventario..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant">
            <button className="hover:bg-surface-container-low p-2 rounded-full transition-all relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-secondary-container rounded-full"></span>
            </button>
            <button className="hover:bg-surface-container-low p-2 rounded-full transition-all">
              <span className="material-symbols-outlined">history</span>
            </button>
            <button className="hover:bg-surface-container-low p-2 rounded-full transition-all">
              <span className="material-symbols-outlined">account_circle</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="ml-64 p-8 overflow-y-auto h-[calc(100vh-64px)] scroll-smooth">
        {/* Metrics Row */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant flex flex-col gap-1">
            <span className="font-label-bold text-on-surface-variant">MÁQUINAS ACTIVAS</span>
            <div className="flex items-end justify-between">
              <span className="font-headline-lg text-headline-lg text-primary">12</span>
              <span className="material-symbols-outlined text-primary mb-1">precision_manufacturing</span>
            </div>
          </div>
          <div className="bg-surface-container p-5 rounded-xl border border-secondary-container/30 flex flex-col gap-1">
            <span className="font-label-bold text-secondary-container">STOCK BAJO</span>
            <div className="flex items-end justify-between">
              <span className="font-headline-lg text-headline-lg text-secondary-container">08</span>
              <span className="material-symbols-outlined text-secondary-container mb-1">warning</span>
            </div>
          </div>
          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant flex flex-col gap-1">
            <span className="font-label-bold text-on-surface-variant">ÓRDENES PENDIENTES</span>
            <div className="flex items-end justify-between">
              <span className="font-headline-lg text-headline-lg text-on-surface">04</span>
              <span className="material-symbols-outlined text-on-surface-variant mb-1">shopping_cart</span>
            </div>
          </div>
          <div className="bg-surface-container p-5 rounded-xl border border-outline-variant flex flex-col gap-1">
            <span className="font-label-bold text-on-surface-variant">REGISTROS RECIENTES</span>
            <div className="flex items-end justify-between">
              <span className="font-headline-lg text-headline-lg text-on-surface">24</span>
              <span className="material-symbols-outlined text-on-surface-variant mb-1">list_alt</span>
            </div>
          </div>
        </div>

        {/* Bento Grid Main Area */}
        <div className="grid grid-cols-12 gap-6">
          {/* Central Actions */}
          <div className="col-span-12 lg:col-span-8 grid grid-cols-2 gap-6">
            <button className="col-span-2 md:col-span-1 group relative h-64 bg-primary-container rounded-2xl border border-primary/20 overflow-hidden flex flex-col items-center justify-center gap-4 transition-all hover:border-primary/50">
              <div className="absolute inset-0 opacity-10 bg-gradient-radial from-primary to-transparent pointer-events-none"></div>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[40px] text-primary" style={{fontVariationSettings: "'FILL' 1"}}>qr_code_scanner</span>
              </div>
              <div className="text-center">
                <span className="font-headline-md text-headline-md text-primary block">Escanear</span>
                <span className="font-label-bold text-on-primary-container/60">Identificar y Registrar</span>
              </div>
            </button>
            
            <button className="col-span-2 md:col-span-1 group h-64 bg-surface-container-high rounded-2xl border border-outline-variant flex flex-col items-center justify-center gap-4 transition-all hover:bg-surface-container-highest">
              <div className="w-16 h-16 rounded-full bg-error-container/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-[40px] text-error">report_problem</span>
              </div>
              <div className="text-center">
                <span className="font-headline-md text-headline-md text-error block">Reportar Falla</span>
                <span className="font-label-bold text-on-surface-variant">Registrar Problema</span>
              </div>
            </button>

            {/* Lathe 02 Performance */}
            <div className="col-span-2 bg-surface-container rounded-2xl border border-outline-variant overflow-hidden">
              <div className="p-6 border-b border-outline-variant flex justify-between items-center">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">Rendimiento Torno 02</h3>
                  <p className="font-label-bold text-on-surface-variant">Telemetría en Vivo</p>
                </div>
                <span className="flex items-center gap-2 px-3 py-1 bg-green-900/30 text-green-400 rounded-full font-label-bold text-[10px]">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  OPERANDO
                </span>
              </div>
              <div className="flex flex-col md:flex-row p-6 gap-8">
                <div className="w-full md:w-1/3 aspect-square rounded-lg border border-outline-variant overflow-hidden relative">
                  <img
                    alt="CNC Lathe 02"
                    className="w-full h-full object-cover brightness-50"
                    src="/lathe-02.jpg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <span className="font-data-mono text-data-mono text-primary text-[10px]">AVANCE: 120mm/min</span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-6">
                  <div className="space-y-2">
                    <div className="flex justify-between font-label-bold">
                      <span className="text-on-surface-variant">Carga del Husillo</span>
                      <span className="text-primary font-data-mono">78%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{width: '78%'}}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between font-label-bold">
                      <span className="text-on-surface-variant">Nivel de Refrigerante</span>
                      <span className="text-on-surface font-data-mono">92%</span>
                    </div>
                    <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden">
                      <div className="h-full bg-on-surface rounded-full opacity-80" style={{width: '92%'}}></div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                      <span className="block text-[10px] font-label-bold text-on-surface-variant uppercase">Temperatura</span>
                      <span className="text-headline-sm font-data-mono text-on-surface">42.5°C</span>
                    </div>
                    <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant">
                      <span className="block text-[10px] font-label-bold text-on-surface-variant uppercase">Vibración</span>
                      <span className="text-headline-sm font-data-mono text-on-surface">0.02μm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity Panel */}
          <div className="col-span-12 lg:col-span-4 flex flex-col bg-surface-container rounded-2xl border border-outline-variant overflow-hidden">
            <div className="p-6 border-b border-outline-variant bg-surface-container-high/30">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Actividad Reciente</h3>
              <p className="font-label-bold text-on-surface-variant">Últimas 24 Horas</p>
            </div>
            <div className="flex-1 overflow-y-auto">
              <div className="even:bg-white/[0.02] p-6 flex gap-4 items-start border-b border-outline-variant/10">
                <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">outbound</span>
                </div>
                <div>
                  <p className="text-on-surface font-label-bold mb-1">Fresa 10mm removida</p>
                  <p className="text-[12px] text-on-surface-variant">Usada en CNC-04 por J. Miller</p>
                  <span className="text-[10px] font-data-mono text-on-surface-variant mt-2 block">08:42 AM</span>
                </div>
              </div>
              <div className="even:bg-white/[0.02] p-6 flex gap-4 items-start border-b border-outline-variant/10">
                <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-secondary-container text-[18px]">opacity</span>
                </div>
                <div>
                  <p className="text-on-surface font-label-bold mb-1">Refrigerante rellenado - Torno 02</p>
                  <p className="text-[12px] text-on-surface-variant">Mantenimiento programado</p>
                  <span className="text-[10px] font-data-mono text-on-surface-variant mt-2 block">07:15 AM</span>
                </div>
              </div>
              <div className="even:bg-white/[0.02] p-6 flex gap-4 items-start border-b border-outline-variant/10">
                <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-green-400 text-[18px]">download</span>
                </div>
                <div>
                  <p className="text-on-surface font-label-bold mb-1">Varilla de Acero (x5) Agregada</p>
                  <p className="text-[12px] text-on-surface-variant">Reabastecida en Bay-09 • PO #8921</p>
                  <span className="text-[10px] font-data-mono text-on-surface-variant mt-2 block">Ayer</span>
                </div>
              </div>
              <div className="even:bg-white/[0.02] p-6 flex gap-4 items-start border-b border-outline-variant/10">
                <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">person</span>
                </div>
                <div>
                  <p className="text-on-surface font-label-bold mb-1">Nuevo Turno de Operador</p>
                  <p className="text-[12px] text-on-surface-variant">Equipo C - Rotación Vespertina</p>
                  <span className="text-[10px] font-data-mono text-on-surface-variant mt-2 block">Ayer</span>
                </div>
              </div>
              <div className="even:bg-white/[0.02] p-6 flex gap-4 items-start border-b border-outline-variant/10">
                <div className="w-8 h-8 rounded bg-surface-container-highest flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-error text-[18px]">build</span>
                </div>
                <div>
                  <p className="text-on-surface font-label-bold mb-1">Alerta de Mantenimiento</p>
                  <p className="text-[12px] text-on-surface-variant">Torno 03: Deriva de tolerancia</p>
                  <span className="text-[10px] font-data-mono text-on-surface-variant mt-2 block">Ayer</span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-surface-container border-t border-outline-variant">
              <button className="w-full text-center py-2 text-primary font-label-bold hover:bg-surface-container-high transition-colors rounded-lg">
                Ver Todo el Registro
              </button>
            </div>
          </div>
        </div>

        {/* Footer Summary */}
        <div className="mt-8 bg-surface-container p-4 rounded-xl border border-outline-variant flex justify-between items-center">
          <div className="flex gap-8">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-primary rounded-sm"></span>
              <span className="text-label-bold text-on-surface-variant uppercase">Repuestos Críticos: 42</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-secondary-container rounded-sm"></span>
              <span className="text-label-bold text-on-surface-variant uppercase">Calibración Pendiente: 3</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-data-mono text-[11px] text-on-surface-variant">Latencia: 4ms</span>
            <span className="font-data-mono text-[11px] text-on-surface-variant">Última Sincr: Ahora</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
