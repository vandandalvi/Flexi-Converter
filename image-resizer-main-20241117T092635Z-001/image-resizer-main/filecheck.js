document.getElementById('fileInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const fileDetailsDiv = document.getElementById('fileDetails');
    fileDetailsDiv.innerHTML = '';

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileInfo = document.createElement('div');
        fileInfo.classList.add('file-info');

        fileInfo.innerHTML = `
            <div><strong>Name:</strong> ${file.name}</div>
            <div><strong>Size:</strong> ${(file.size / 1024).toFixed(2)} KB</div>
            <div><strong>Type:</strong> ${file.type || 'N/A'}</div>
            <div><strong>Last Modified:</strong> ${new Date(file.lastModified).toLocaleDateString()}</div>
        `;

        fileDetailsDiv.appendChild(fileInfo);
    }
});