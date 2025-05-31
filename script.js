// Fetch departments from Cleveland Museum API
fetch('https://openaccess-api.clevelandart.org/api/departments')
  .then(response => response.json())
  .then(data => {
    const departmentsList = document.getElementById('departments-list');
    data.data.forEach(department => {
      const li = document.createElement('li');
      li.textContent = department.name;
      departmentsList.appendChild(li);
    });
  });

// Fetch 10 artworks
fetch('https://openaccess-api.clevelandart.org/api/artworks?limit=10')
  .then(response => response.json())
  .then(data => {
    const artworksTable = document.getElementById('artworks-table');
    data.data.forEach(artwork => {
      const tr = document.createElement('tr');

      const nameTd = document.createElement('td');
      nameTd.textContent = artwork.title || 'Χωρίς τίτλο';
      tr.appendChild(nameTd);

      const creatorTd = document.createElement('td');
      creatorTd.textContent = artwork.creators?.[0]?.description || 'Άγνωστος';
      tr.appendChild(creatorTd);

      const imageTd = document.createElement('td');
      const button = document.createElement('button');
      button.textContent = 'Δες Εικόνα';
      button.addEventListener('click', () => {
        const img = document.createElement('img');
        img.src = artwork.images?.web?.url || '';
        imageTd.innerHTML = '';
        imageTd.appendChild(button);
        imageTd.appendChild(img);
      });
      imageTd.appendChild(button);
      tr.appendChild(imageTd);

      artworksTable.appendChild(tr);
    });
  });