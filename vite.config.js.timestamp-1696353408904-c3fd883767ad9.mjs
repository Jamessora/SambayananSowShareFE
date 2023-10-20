// vite.config.js
import { defineConfig } from "file:///mnt/c/Users/James/Documents/Avion/SSS/SambayananSowShare/SambayananSowShareFE/SambayananSowShareFE/node_modules/vite/dist/node/index.js";
import react from "file:///mnt/c/Users/James/Documents/Avion/SSS/SambayananSowShare/SambayananSowShareFE/SambayananSowShareFE/node_modules/@vitejs/plugin-react/dist/index.mjs";
var apiBaseUrl = process.env.VITE_API_BASE_URL_LOCAL || "http://localhost:3000";
var vite_config_default = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: apiBaseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvbW50L2MvVXNlcnMvSmFtZXMvRG9jdW1lbnRzL0F2aW9uL1NTUy9TYW1iYXlhbmFuU293U2hhcmUvU2FtYmF5YW5hblNvd1NoYXJlRkUvU2FtYmF5YW5hblNvd1NoYXJlRkVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9tbnQvYy9Vc2Vycy9KYW1lcy9Eb2N1bWVudHMvQXZpb24vU1NTL1NhbWJheWFuYW5Tb3dTaGFyZS9TYW1iYXlhbmFuU293U2hhcmVGRS9TYW1iYXlhbmFuU293U2hhcmVGRS92aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vbW50L2MvVXNlcnMvSmFtZXMvRG9jdW1lbnRzL0F2aW9uL1NTUy9TYW1iYXlhbmFuU293U2hhcmUvU2FtYmF5YW5hblNvd1NoYXJlRkUvU2FtYmF5YW5hblNvd1NoYXJlRkUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuLy8gUmVhZCBlbnZpcm9ubWVudCB2YXJpYWJsZXNcbmNvbnN0IGFwaUJhc2VVcmwgPSBwcm9jZXNzLmVudi5WSVRFX0FQSV9CQVNFX1VSTF9MT0NBTCB8fCAnaHR0cDovL2xvY2FsaG9zdDozMDAwJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogYXBpQmFzZVVybCxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXG4gICAgICB9XG4gICAgfVxuICB9XG59KSJdLAogICJtYXBwaW5ncyI6ICI7QUFBMmQsU0FBUyxvQkFBb0I7QUFDeGYsT0FBTyxXQUFXO0FBSWxCLElBQU0sYUFBYSxRQUFRLElBQUksMkJBQTJCO0FBRTFELElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsUUFDZCxTQUFTLENBQUMsU0FBUyxLQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsTUFDOUM7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
