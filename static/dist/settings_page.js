/*
Файл с логикой для страницы с настройками
*/
import MenuPage from './menu_page.js';
import LoginPage from './login_page.js';
export default class SettingsPage {
    render() {
        const template = document.getElementById('settings-template');
        const app = document.getElementById('app');
        app.innerHTML = '';
        const clone = template.content.cloneNode(true);
        app.appendChild(clone);
        this.fillUserInfo();
        this.initThemeSwitcher();
        const backBtn = document.querySelector('.chat-back-btn');
        backBtn?.addEventListener('click', () => {
            new MenuPage().render();
        });
        const clearCacheBtn = document.querySelector('.clear-cache');
        clearCacheBtn?.addEventListener('click', () => {
            const userData = localStorage.getItem('user');
            const theme = localStorage.getItem('theme');
            localStorage.clear();
            if (userData)
                localStorage.setItem('user', userData);
            if (theme)
                localStorage.setItem('theme', theme);
            this.clearAppData();
            this.showNotification('Кэш очищен');
            this.refreshCurrentPage();
        });
        const logoutBtn = document.querySelector('.log-out');
        logoutBtn?.addEventListener('click', () => {
            localStorage.removeItem('user');
            new LoginPage().render();
        });
    }
    clearAppData() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('chat_')) {
                localStorage.removeItem(key);
            }
        });
    }
    refreshCurrentPage() {
        new SettingsPage().render();
    }
    fillUserInfo() {
        const user = localStorage.getItem('user');
        const nameSpan = document.getElementById('user-name');
        const emailSpan = document.getElementById('user-email');
        if (user) {
            const userData = JSON.parse(user);
            if (nameSpan)
                nameSpan.textContent = userData.name || 'Не указано';
            if (emailSpan)
                emailSpan.textContent = userData.email || 'Не указано';
        }
        else {
            if (nameSpan)
                nameSpan.textContent = 'Гость';
            if (emailSpan)
                emailSpan.textContent = 'Не авторизован';
        }
    }
    showNotification(message) {
        const existing = document.querySelector('.notification');
        if (existing)
            existing.remove();
        const notif = document.createElement('div');
        notif.className = 'notification';
        notif.textContent = message;
        document.body.appendChild(notif);
        setTimeout(() => notif.style.opacity = '1', 10);
        setTimeout(() => {
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 300);
        }, 2000);
    }
    initThemeSwitcher() {
        const themeBtn = document.querySelector('.theme-swicher');
        if (!themeBtn)
            return;
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
            themeBtn.textContent = '☀️ Светлая тема';
        }
        else {
            themeBtn.textContent = '🌙 Тёмная тема';
        }
        themeBtn.addEventListener('click', () => {
            const isDark = document.documentElement.classList.contains('dark-theme');
            if (isDark) {
                document.documentElement.classList.remove('dark-theme');
                themeBtn.textContent = '🌙 Тёмная тема';
                localStorage.setItem('theme', 'light');
            }
            else {
                document.documentElement.classList.add('dark-theme');
                themeBtn.textContent = '☀️ Светлая тема';
                localStorage.setItem('theme', 'dark');
            }
        });
    }
}
