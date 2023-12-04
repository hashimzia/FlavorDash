const buttons = document.getElementsByClassName("delete-btn");


for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        const obj = { id: buttons[i].getAttribute("id") };
        // eslint-disable-next-line no-undef
        fetch(window.location.href + "-add", {
            method: 'DELETE',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        buttons[i].parentElement.parentElement.remove();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const flashMessages = document.querySelectorAll('.flash-message');
    flashMessages.forEach(message => {
        setTimeout(() => {
            message.style.display = 'none'; // Hides the message
        }, 5000); // Time in milliseconds (5000ms = 5s)
    });
});