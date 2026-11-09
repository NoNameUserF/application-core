import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';

export default defineConfig({
    plugins: [
        react(),
        libInjectCss(),
        dts({
            entryRoot: 'src',
            outDir: 'dist/types',
        }),
    ],
    build: {
        lib: {
            entry: {
                main: path.resolve(__dirname, 'src/index.ts'),
            },
            name: 'gsu-ui-core',
            formats: ['es', 'cjs'],
            fileName: (format, entryName) => `gsu-ui-core.${entryName}.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'react-router', 'react-router-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router': 'ReactRouter',
                    'react-router-dom': 'ReactRouterDOM'
                },
            },
        },
        sourcemap: true,
    },
});