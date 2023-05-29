export function createMenu() {

    let white = document.querySelector('.white-space');
    let menu = document.querySelector('.menu')

    const breakpointMenu = window.matchMedia('(min-width: 1366px)');

    let close_button = menu.querySelector('.close-button');
    var menu_button = document.querySelector('.menu-button');

    function showMenu() {
        if (breakpointMenu.matches) {
            menu.classList.remove('hidden-element');
        } else {
            closeMenu()
            menu_button.addEventListener('click', () => openMenu())

            if (close_button) {
                close_button.addEventListener('click', () => closeMenu())
    
                document.addEventListener("click", (evt) => {
                    let targetEl = evt.target;
                    if (targetEl == white) {
                        closeMenu();
                    }
                })
            }
        }
    }

    function closeMenu() {
        white.classList.add('hidden-element');
        menu.classList.add('hidden-element');
    }

    function openMenu() {
        white.classList.remove('hidden-element');
        menu.classList.remove('hidden-element');
    }

    showMenu()
    window.addEventListener('resize', showMenu)

}