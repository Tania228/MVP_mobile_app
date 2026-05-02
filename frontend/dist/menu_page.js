/*
Файл с логикой для страницы меню
*/
export default class MenuPage {
    render() {
        const template = document.getElementById('menu-template');
        const app = document.getElementById('app');
        app.innerHTML = '';
        const clone = template.content.cloneNode(true);
        app.appendChild(clone);
        this.attachEvents();
    }
    attachEvents() {
        const containerMenu = document.querySelector('.container-for-menu');
        if (!containerMenu)
            return;
        containerMenu.addEventListener('click', (event) => {
            const buttonMenu = event.target.closest('.menu-button');
            if (!buttonMenu)
                return;
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
        });
    }
}
