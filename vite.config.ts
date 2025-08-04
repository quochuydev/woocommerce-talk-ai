import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const isWidget = mode === 'widget'
  
  return {
    plugins: [react()],
    base: isWidget ? './' : '/woocommerce-talk-ai/',
    build: {
      outDir: isWidget ? 'widget-dist' : 'dist',
      assetsDir: isWidget ? '' : 'assets',
      sourcemap: false,
      ...(isWidget && {
        lib: {
          entry: './src/widget.tsx',
          name: 'TalkAIWidget',
          formats: ['iife'],
          fileName: 'widget'
        },
        rollupOptions: {
          external: [],
          output: {
            inlineDynamicImports: true,
            manualChunks: undefined,
            name: 'TalkAIWidget'
          }
        },
        target: 'es2015'
      })
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode === 'widget' ? 'production' : 'development')
    }
  }
})
