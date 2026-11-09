declare module '*.css';
declare module '*.module.css';
declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}

interface ImportMetaEnv {
    readonly VITE_MAIN_API_URL: string;
    readonly VITE_MAIN_STAGE: string;
    readonly VITE_COOK_G4: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}