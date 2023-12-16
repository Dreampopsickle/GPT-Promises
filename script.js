function fetchUsers() {
    return fetch('https://jsonplaceholder.typicode.com/users/1')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            throw error;
        });
}

function fetchPosts(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
            throw error;
        });
}

function displayData(user, posts) {
    const displayEl = document.getElementById('display');
    console.log('User:', user);
    console.log('Posts', posts);

    let postsHtml = posts.map(posts => `
        <div>
            <h3>${posts.title}</h3>
            <p>${posts.body}</p>
        </div>
        `).join('');
    displayEl.innerHTML = `
        <div><strong>Name:</strong> ${user.name}</div>
        <div><strong>Address:</strong> ${user.address.street}, ${user.address.city}</div>
        <h2>User's Posts:</h2>
        ${postsHtml}`
}

fetchUsers()
    .then(user => {
        return fetchPosts(user.id).then(posts => {
            return { user, posts };
        });
    })
    .then(data => displayData(data.user, data.posts))
    .catch(error => console.error('Error:', error));