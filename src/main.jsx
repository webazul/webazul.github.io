import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Error handler para debug em produção
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error || e.message);
  // Mostrar erro visível na tela
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:#ff0000;color:#fff;padding:20px;z-index:999999;font-size:14px;';
  errorDiv.innerHTML = `<strong>Erro:</strong> ${e.message || e.error}<br><small>${e.filename}:${e.lineno}</small>`;
  document.body.appendChild(errorDiv);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled rejection:', e.reason);
});

try {
  console.log('Iniciando WebAzul...');
  const root = document.getElementById('root');

  if (!root) {
    throw new Error('Root element not found');
  }

  console.log('Creating React root...');
  const reactRoot = createRoot(root);

  console.log('Rendering App...');
  reactRoot.render(
    <StrictMode>
      <App />
    </StrictMode>
  );

  console.log('React montado com sucesso!');
} catch (error) {
  console.error('Erro ao montar React:', error);

  // Fallback visual
  document.getElementById('root').innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;padding:20px;font-family:system-ui,sans-serif;background:#000;color:#fff;text-align:center;">
      <h1 style="color:#ef4444;margin-bottom:20px;">⚠️ Erro ao Carregar</h1>
      <p style="color:#888;margin-bottom:10px;">Ocorreu um erro ao inicializar o site:</p>
      <pre style="background:#1a1a1a;padding:15px;border-radius:8px;color:#2563eb;max-width:90%;overflow-x:auto;">${error.message || error}</pre>
      <p style="margin-top:20px;"><a href="/test.html" style="color:#2563eb;">Ir para página de teste</a></p>
      <p style="margin-top:10px;"><a href="https://wa.me/351910084099" style="color:#10b981;">Contactar Suporte</a></p>
    </div>
  `;
}