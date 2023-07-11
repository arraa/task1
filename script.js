    var apiUrl = 'https://sistech-api.vercel.app/blog/';
    var token = '81f2ff83-f5b6-40de-ad99-fb1ff1878ebf';
      
    function createBlog() {
        var title = document.getElementById('title').value;
        var content = document.getElementById('content').value;
        
        if (title.trim() === '' || content.trim() === '') {
            alert('Title and content cannot be empty!');
            return;
        }
        
        var blog = {
            title: title,
            content: content
        };
        
        fetch(apiUrl, {
            method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(blog)
      })
      .then(response => response.json())
      .then(data => {
        // Clear input fields
        document.getElementById('title').value = '';
        document.getElementById('content').value = '';
        
        displayBlogs(); // Update the blog list
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function displayBlogs() {
    fetch(apiUrl, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => response.json())
      .then(data => {
          var blogList = document.getElementById('blogList');
          blogList.innerHTML = ''; // Clear existing blog list
          
          data.forEach(blog => {
              var blogItem = document.createElement('li');
              blogItem.className = 'blog-item';
              
              var blogTitle = document.createElement('h2');
              blogTitle.className = 'blog-title';
              blogTitle.textContent = blog.title;
          
          var blogContent = document.createElement('p');
          blogContent.className = 'blog-content';
          blogContent.textContent = blog.content;
          
          var editButton = document.createElement('button');
          editButton.className = 'like-button';
          editButton.textContent = 'Edit';
          editButton.onclick = function() {
              editBlog(blog.id); // Call the editBlog function with the blog ID
          };
            var likeButton = document.createElement('button');
            likeButton.className = 'like-button';
            likeButton.textContent = 'Like';
            likeButton.onclick = function() {
              increaseLike(blog.id); // Call the increaseLike function with the blog ID
            };
            
            var likeCount = document.createElement('span');
            likeCount.className = 'like-count';
            likeCount.textContent = blog.likes;
          
          blogItem.appendChild(blogTitle);
          blogItem.appendChild(blogContent);
          blogItem.appendChild(editButton);
          blogItem.appendChild(likeButton);
          blogItem.appendChild(likeCount);

          blogList.appendChild(blogItem);
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    
    function editBlog(id) {
      fetch(`${apiUrl}/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
      .then(response => response.json())
      .then(blog => {
        var editFormContainer = document.getElementById('editFormContainer');
        editFormContainer.innerHTML = ''; // Clear existing edit form
        
        var editForm = document.createElement('div');
        editForm.className = 'edit-form';
        
        var titleLabel = document.createElement('label');
        titleLabel.textContent = 'Title:';
        
        var titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = blog.title;
        
        var contentLabel = document.createElement('label');
        contentLabel.textContent = 'Content:';
        
        var contentTextarea = document.createElement('textarea');
        contentTextarea.value = blog.content;
        
        var updateButton = document.createElement('button');
        updateButton.textContent = 'Update';
        updateButton.onclick = function() {
          updateBlog(blog.id); // Call the updateBlog function with the blog ID
        };

        
        editForm.appendChild(titleLabel);
        editForm.appendChild(titleInput);
        editForm.appendChild(contentLabel);
        editForm.appendChild(contentTextarea);
        editForm.appendChild(updateButton);
        
        editFormContainer.appendChild(editForm);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    
    function updateBlog(id) {
      var titleInput = document.querySelector('#editFormContainer input[type="text"]');
      var contentTextarea = document.querySelector('#editFormContainer textarea');
      
      var title = titleInput.value;
      var content = contentTextarea.value;
      
      if (title.trim() === '' || content.trim() === '') {
        alert('Title and content cannot be empty!');
        return;
      }
      
      var updatedBlog = {
        title: title,
        content: content
      };
      
      fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(updatedBlog)
      })
      .then(response => response.json())
      .then(data => {
        displayBlogs(); // Update the blog list
        document.getElementById('editFormContainer').innerHTML = ''; // Clear the edit form
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }
    
    function increaseLike(id) {
      fetch(`${apiUrl}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ like: true }) // Increment the like count
      })
      .then(response => response.json())
      .then(data => {
        displayBlogs(); // Update the blog list
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    displayBlogs(); // Initial display of blogs