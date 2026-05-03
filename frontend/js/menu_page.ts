/* 
Файл с логикой для страницы меню
*/

import MyAgentsPage from './my_agents_page.js';
import ReadyEmployeesPage from './ready_agents_page.js';
import SettingsPage from './settings_page.js';
import { getMyEmployees, getReadyEmployees } from './api_client.js';

export default class MenuPage {
    render(): void {
        const template = document.getElementById('menu-template') as HTMLTemplateElement;
        const app = document.getElementById('app') as HTMLElement;

        app.innerHTML = '';
        const clone = template.content.cloneNode(true) as DocumentFragment;
        app.appendChild(clone);

        this.attachEvents();
        this.updateBadges();
    }

    private attachEvents(): void {
        const containerMenu = document.querySelector('.container-for-menu');
        if (!containerMenu) return;

        containerMenu.addEventListener('click', (event: Event) => {
            const buttonMenu = (event.target as HTMLElement).closest('.menu-button, .menu-button-settings');
            if (!buttonMenu) return;

            const action = buttonMenu.getAttribute('data-action');

            switch (action) {
            case 'my-employees':
                console.log('Переход на страницу "Мои нейросотрудники"');
                new MyAgentsPage().render();
                break;
            case 'ready-employees':
                console.log('Переход на страницу "Готовые нейросотрудники"');
                new ReadyEmployeesPage().render();
                break;
            case 'settings':
                console.log('Переход на страницу "Настройки"');
                new SettingsPage().render();
                break;
            default:
                console.warn(`Неизвестное действие: ${action}`);
        }
        });
    }

    private async updateBadges(): Promise<void> {
        try {
            const [myData, readyData] = await Promise.all([
                getMyEmployees(),
                getReadyEmployees()
            ]);

            const myUnread = (myData.employees || []).reduce((sum: number, emp: any) => sum + (emp.count_message || 0), 0);
            const readyUnread = (readyData.employees || []).reduce((sum: number, emp: any) => sum + (emp.count_message || 0), 0);

            this.updateBadge('my-employees', myUnread);
            this.updateBadge('ready-employees', readyUnread);
        } catch (error) {
            console.error('Ошибка загрузки бейджей:', error);
        }
    }

    private updateBadge(action: string, count: number): void {
        const button = document.querySelector(`.menu-button[data-action="${action}"]`);
        if (!button) return;

        const badge = button.querySelector('.badge') as HTMLElement | null;
        const dot = button.querySelector('.indicator-dot') as HTMLElement | null;
        
        if (badge) {
            if (count > 0) {
                badge.textContent = String(count);
                badge.style.display = 'inline-block';
                if (dot) dot.style.display = 'inline-block';
            } else {
                badge.style.display = 'none';
                if (dot) dot.style.display = 'none';
            }
        }
    }

}