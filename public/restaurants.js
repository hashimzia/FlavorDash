const buttons = document.getElementsByClassName("delete-btn");



for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        const obj = { id: buttons[i].getAttribute("id") };
        fetch("http://localhost:3000/restaurants-add", {
            method: 'DELETE',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        buttons[i].parentElement.parentElement.remove();
    });
}