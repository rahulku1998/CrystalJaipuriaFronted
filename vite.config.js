import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/product-images': {
        target: 'https://res.cloudinary.com/dd6akzezt/images',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/product-images/, ''),
      },
    },
  },
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('fallbackData') || id.includes('fallbackResolver')) {
            return 'catalog-fallback-data';
          }
          if (id.includes('fallbackBlogs')) {
            return 'blog-fallback-data';
          }
          if (id.includes('node_modules')) {
            if (id.includes('react-icons')) {
              return 'vendor-icons';
            }
            if (id.includes('swiper')) {
              return 'vendor-swiper';
            }
            if (id.includes('react-router-dom') || id.includes('react-router') || id.includes('@remix-run')) {
              return 'vendor-router';
            }
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('scheduler') || id.includes('\\react\\') || id.includes('\\react-dom\\')) {
              return 'vendor-react';
            }
            return 'vendor';
          }
        },
      },
    },
  },
})
