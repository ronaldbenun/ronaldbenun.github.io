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
    var path = 'psalms/' + selectedPsalm + '/'; 
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
                const rawUrl = `https://docs.google.com/viewer?url=${item.download_url}&embedded=true`;
                link.href = rawUrl;
                link.textContent = item.name;
                link.target = '_blank'; // Open in a new tab
                contentDiv.appendChild(link);
                contentDiv.appendChild(document.createElement('br'));
            });
        })
        .catch(error => console.error('Error fetching Psalm contents:', error));
}
