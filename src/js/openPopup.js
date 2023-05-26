export function openPopup(src) {

    let white = document.querySelector('.white-space');
    
    let menu = document.querySelector('.menu')
    if (!menu.classList.contains('hidden-element')) {
        menu.classList.add('hidden-element');
    }

    white.classList.remove('hidden-element');
    src.classList.remove('hidden-element');

    let btn = src.querySelector('.close-button')

    btn.addEventListener('click', () => closePopup())
    document.addEventListener("click", (evt) => {
        let targetEl = evt.target;
        if (targetEl == white) {
            closePopup();
        }
    })

    function closePopup() {    
        white.classList.add('hidden-element');
        src.classList.add('hidden-element');
    }
}