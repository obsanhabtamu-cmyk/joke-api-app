
const jokeBtn = document.getElementById('jokeBtn');
const setup = document.getElementById('setup');
const punchline = document.getElementById('punchline');

jokeBtn.addEventListener('click', async () => {
    try {
        setup.textContent = 'Loading joke...';
        punchline.textContent = '';

        const response = await fetch('/api/joke');

        if (!response.ok) {
            throw new Error('Failed to fetch joke');
        }

        const joke = await response.json();

        setup.textContent = joke.setup;
        punchline.textContent = joke.punchline;
    } catch (error) {
        console.error(error);
        setup.textContent = 'Could not load a joke.';
        punchline.textContent = '';
    }
});
