window.onload = function() {
    const psalmsCount = 150;
    const psalmsSelect = document.getElementById('psalms-select');

    for (let i = 1; i <= psalmsCount; i++) {
        let option = document.createElement('option');
        option.value = `psalm${i}`;
        option.text = `Psalm ${i}`;
        psalmsSelect.appendChild(option);
    }
};

function openPsalmFolder() {
    var selectedPsalm = document.getElementById('psalms-select').value;
    var path = 'psalms/' + selectedPsalm + '/'; // Path to the Psalm directory
    fetchPsalmContents(path);
}

function fetchPsalmContents(path) {
    const username = 'ronaldbenun';
    const repo = 'ronaldbenun.github.io';

    fetch(`https://api.github.com/repos/${username}/${repo}/contents/${path}`)
        .then(response => response.json())
        .then(data => {
            const contentDiv = document.getElementById('content');
            contentDiv.innerHTML = ''; // Clear previous content
            data.forEach(item => {
                const link = document.createElement('a');
                link.href = item.html_url;
                link.textContent = item.name;
                contentDiv.appendChild(link);
                contentDiv.appendChild(document.createElement('br'));
            });
        })
        .catch(error => console.error('Error fetching Psalm contents:', error));
}
