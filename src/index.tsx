import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { StoreProvider } from '@/app/providers/StoreProvider';
import App from './app/App';
import '@/app/styles/index.scss';
import './shared/config/i18n/i18n';
import { ErrorBoundary } from './app/providers/ErrorBoundary';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';
import { ToolbarProvider } from '@/app/providers/ToolbarProvider';
import i18n from 'i18next';
import { I18N_STORAGE_KEY } from '@/shared/const/localstorage';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Контейнер root не найден. НЕ удалось вмонтировать реакт приложение',
    );
}

const root = createRoot(container);

const i18nextLng = localStorage.getItem(I18N_STORAGE_KEY);
if (!i18nextLng) {
    const browserLanguage = window.navigator.language;
    i18n.changeLanguage(browserLanguage);
}

root.render(
    <BrowserRouter>
        <StoreProvider>
            <ToolbarProvider>
                <ErrorBoundary>
                    <ForceUpdateProvider>
                        <ThemeProvider>
                            <App />
                        </ThemeProvider>
                    </ForceUpdateProvider>
                </ErrorBoundary>
            </ToolbarProvider>
        </StoreProvider>
    </BrowserRouter>,
);
export { Theme } from '@/shared/const/theme';
