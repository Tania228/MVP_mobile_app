/* 
Файл с логикой для страницы меню
*/

export default class MenuPage {
    render(): void {
        const template = document.getElementById('menu-template') as HTMLTemplateElement;
        const app = document.getElementById('app') as HTMLElement;

        app.innerHTML = '';
        const clone = template.content.cloneNode(true) as DocumentFragment;
        app.appendChild(clone);

        this.attachEvents();
    }

    private attachEvents(): void {
        const containerMenu = document.querySelector('.container-for-menu');
        if (!containerMenu) return;

        containerMenu.addEventListener('click', (event: Event) => {
            const buttonMenu = (event.target as HTMLElement).closest('.menu-button');
            if (!buttonMenu) return;

            const action = buttonMenu.getAttribute('data-action');

            switch (action) {
            case 'my-employees':
                console.log('Переход на страницу "Мои нейросотрудники"');
                // new MyEmployeesPage().render();
                break;
            case 'ready-employees':
                console.log('Переход на страницу "Готовые нейросотрудники"');
                // new ReadyEmployeesPage().render();
                break;
            case 'settings':
                console.log('Переход на страницу "Настройки"');
                // new SettingsPage().render();
                break;
            default:
                console.warn(`Неизвестное действие: ${action}`);
        }
        })
    }
}