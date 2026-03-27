import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig(({ mode }) => {
  // Load env vars based on current mode
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      host: env.VITE_HOST || '0.0.0.0',
      port: parseInt(env.VITE_PORT) || 5175,
      allowedHosts: ['notakita.web.id'], // 👈 allow your domain
    },
    preview: {
      allowedHosts: ['notakita.web.id'], // 👈 also allow for `vite preview`
      host: true,
      port: 5700,
    },
    define: {
      'process.env': env,
    },
    plugins: [react(), tailwindcss()],
    compilerOptions: {
      types: ['vite/client', 'node'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
