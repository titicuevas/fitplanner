import { useCallback, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'fitplanner-theme';

function getSystemPreference(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'system';
    return (localStorage.getItem(STORAGE_KEY) as Theme) ?? 'system';
}

function resolveTheme(theme: Theme): 'light' | 'dark' {
    return theme === 'system' ? getSystemPreference() : theme;
}

export function useTheme() {
    const [theme, setThemeState] = useState<Theme>(getStoredTheme);
    const resolved = resolveTheme(theme);

    const setTheme = useCallback((newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem(STORAGE_KEY, newTheme);
    }, []);

    const toggle = useCallback(() => {
        setTheme(resolved === 'dark' ? 'light' : 'dark');
    }, [resolved, setTheme]);

    useEffect(() => {
        const root = document.documentElement;
        if (resolved === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [resolved]);

    useEffect(() => {
        if (theme !== 'system') return;

        const mq = window.matchMedia('(prefers-color-scheme: dark)');
        const handler = () => setThemeState('system');
        mq.addEventListener('change', handler);
        return () => mq.removeEventListener('change', handler);
    }, [theme]);

    return { theme, resolved, setTheme, toggle, isDark: resolved === 'dark' };
}
