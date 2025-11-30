// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  // base path phải KHỚP CHÍNH XÁC với tên repository
  // Kể cả việc viết hoa/thường (case-sensitive)
  base: '/Booking-Ground/', 
});