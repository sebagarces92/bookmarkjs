// Listener for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Save bookmark
function saveBookmark(e){
	//Get form values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	
	if(!validateForm(siteName,siteUrl)){
		return false;
	}




	var bookmark = {
		name: siteName,
		url: siteUrl
	}

	// Test if bookmarks is null
	if(localStorage.getItem('bookmarks')===null){
		var bookmarks = [];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	} else {
		//Get bookmarks from local storage
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

		//adding bookmark to array
		bookmarks.push(bookmark);
		//reseting back to local storage
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	//clear form
	document.getElementById('myForm').reset();

	fetchBookmarks();

	e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
  // Loop throught bookmarks
  for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
      // Remove from array
      bookmarks.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  // Re-fetch bookmarks
  fetchBookmarks();
}
		

//fetch bookmarks
function fetchBookmarks(){

	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));

	//get output id
	var bookmarksResults = document.getElementById('bookmarksResults');

	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++){
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		 bookmarksResults.innerHTML += '<div class="jumbotron">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
                                  ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                  '</h3>'+
                                  '</div>';
	}

}

// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}