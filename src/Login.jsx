import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';

function Login() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { signInWithEmployeeId } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const { data, error } = await signInWithEmployeeId(employeeId, password);
      
      if (error) {
        setError(error.message || 'Error al iniciar sesión');
        setLoading(false);
        return;
      }

      if (data?.user) {
        setSuccess('¡Acceso autorizado!');
        // El AuthContext actualizará el estado y App.jsx mostrará el Dashboard automáticamente
      }
    } catch (err) {
      setError('Error de conexión. Verifica tu configuración.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark min-h-screen flex flex-col overflow-hidden bg-background">
      <main className="flex-grow flex flex-row h-full">
        {/* Split Layout: Industrial Visual Side */}
        <section className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-surface-container-lowest">
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-background/80 via-background/20 to-transparent"></div>
          <img
            alt="CNC Lathe Workshop"
            className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity"
            src="/cnc-workshop.jpg"
          />
          <div className="relative z-20 flex flex-col justify-end p-margin-desktop w-full">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-primary text-4xl">
                  precision_manufacturing
                </span>
                <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                  PRECISION CNC INVENTORY
                </h1>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                Control total sobre la cadena de suministro industrial. Monitoreo en tiempo
                real de herramientas, materiales y estados de máquina para una eficiencia
                sin interrupciones.
              </p>
            </div>
          </div>
        </section>

        {/* Split Layout: Login Form Side */}
        <section className="w-full lg:w-2/5 flex items-center justify-center bg-surface-container-low border-l border-outline-variant px-margin-mobile md:px-margin-desktop">
          <div className="w-full max-w-md flex flex-col">
            {/* Branding for Mobile (Hidden on Desktop split) */}
            <div className="lg:hidden flex flex-col items-center mb-8">
              <span className="material-symbols-outlined text-primary text-5xl mb-4">
                precision_manufacturing
              </span>
              <h1 className="font-headline-md text-headline-md text-on-surface font-bold text-center">
                PRECISION CNC
              </h1>
            </div>

            {/* Login Card Structure */}
            <div className="bg-surface-container p-8 border border-outline-variant rounded shadow-2xl relative overflow-hidden">
              {/* Subtle Machined Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>

              <div className="mb-10">
                <h2 className="font-headline-md text-headline-md text-on-surface mb-2">
                  Acceso al Sistema
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Ingrese sus credenciales de operador para continuar.
                </p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-error-container border border-error rounded flex items-start gap-3">
                  <span className="material-symbols-outlined text-error text-xl flex-shrink-0">
                    error
                  </span>
                  <p className="font-body-md text-body-md text-on-error-container">
                    {error}
                  </p>
                </div>
              )}

              {/* Success Message */}
              {success && (
                <div className="mb-6 p-4 bg-primary-container border border-primary rounded flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-xl flex-shrink-0">
                    check_circle
                  </span>
                  <p className="font-body-md text-body-md text-on-primary-container">
                    {success}
                  </p>
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Employee ID Field */}
                <div className="space-y-2">
                  <label className="block font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest">
                    ID de Empleado
                  </label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">
                      badge
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant text-on-surface rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all milled-input font-data-mono text-data-mono"
                      placeholder="CNC-0000"
                      type="text"
                      value={employeeId}
                      onChange={(e) => setEmployeeId(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <label className="block font-label-bold text-label-bold text-on-surface-variant uppercase tracking-widest">
                      Contraseña
                    </label>
                    <a
                      className="text-primary font-label-bold text-label-bold hover:underline transition-all"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      ¿Olvidó su clave?
                    </a>
                  </div>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">
                      lock
                    </span>
                    <input
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant text-on-surface rounded focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all milled-input font-data-mono text-data-mono"
                      placeholder="••••••••"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                {/* Options */}
                <div className="flex items-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      className="sr-only peer"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    <span className="ms-3 font-label-bold text-label-bold text-on-surface-variant uppercase">
                      Recordarme
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  className="w-full py-4 bg-secondary-container text-on-secondary-container font-headline-sm text-headline-sm rounded flex items-center justify-center gap-3 hover:opacity-90 active:scale-[0.98] transition-all group disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="material-symbols-outlined animate-spin">
                        progress_activity
                      </span>
                      <span className="font-bold tracking-tight">VERIFICANDO...</span>
                    </>
                  ) : (
                    <>
                      <span className="font-bold tracking-tight">INGRESAR AL SISTEMA</span>
                      <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </>
                  )}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-outline-variant flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-on-surface-variant text-sm">
                  shield
                </span>
                <span className="font-label-bold text-label-bold text-on-surface-variant">
                  CONEXIÓN CIFRADA DE ALTA SEGURIDAD
                </span>
              </div>
            </div>

            {/* Footer Info */}
            <div className="mt-12 flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-on-surface-variant opacity-50">
                <span className="material-symbols-outlined text-sm">smart_toy</span>
                <span className="font-data-mono text-data-mono">Industrial Core v4.2.0</span>
              </div>
              <div className="text-on-surface-variant/30 font-label-bold text-label-bold">
                © 2024 PRECISION CNC SYSTEMS
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
