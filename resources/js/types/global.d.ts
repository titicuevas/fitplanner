/// <reference types="vite/client" />

interface ZiggyRoute {
    current: (name?: string) => boolean | string | undefined;
}

declare function route(): ZiggyRoute;
declare function route(name: string, params?: unknown, absolute?: boolean): string;

interface ImportMetaEnv {
    readonly VITE_APP_NAME?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
    readonly glob: (
        pattern: string | string[],
        options?: { eager?: boolean },
    ) => Record<string, () => Promise<unknown>>;
}

declare module 'nprogress';
