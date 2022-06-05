import { defineConfig } from 'vite'
// import compress from 'vite-plugin-compress'
import banner from 'vite-plugin-banner'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 8080,
  },
  plugins: [
    react(),
    // compress({ verbose: true }),
    banner("  ____                            _______             _              \n |  _ \\                          |__   __|           | |             \n | |_) |_   _  __ _  __ _ _   _     | |_ __ __ _  ___| | __ ___ _ __ \n |  _ <| | | |/ _` |/ _` | | | |    | | \'__/ _` |/ __| |/ // _ \\ \'__|\n | |_) | |_| | (_| | (_| | |_| |    | | | | (_| | (__|   <|  __/ |   \n |____/ \\__,_|\\__, |\\__, |\\__, |    |_|_|  \\__,_|\\___|_|\\_\\\\___|_|   \n               __/ | __/ | __/ |                                     \n              |___/ |___/ |___/                                      \n")
  ]
})
