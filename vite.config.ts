import { defineConfig } from "vite";           // Import Vite's config helper
import react from "@vitejs/plugin-react-swc";   // React plugin using SWC (faster compiler)
import path from "path";                        // Node path utility
import { componentTagger } from "arogya-mitra-ai-tagger";  // Custom component tagger plugin

// https://vitejs.dev/config/
// Export the Vite configuration
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",   // Allow external access (IPv6 / all network interfaces)
    port: 8080,   // Local dev server runs on http://localhost:8080
  },

  // Vite plugins
  plugins: [
    react(),                             // Enables React + SWC fast refresh
    mode === "development" && componentTagger(), // Enable tagger only in dev mode
  ].filter(Boolean),                      // Remove `false` values

  resolve: {
    alias: {
      // Allows imports like "@/components/Button"
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
