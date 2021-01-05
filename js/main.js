// Columns Height Comparison
var column_left = document.querySelector('.hourly-content');

var column_right = document.getElementById('news-column');

const mainPage = document.getElementById('home-page');

// Adding news cards to right if column right is shorter
if (mainPage) {
  column_left.addEventListener('click', function () {
    var first_element = column_right.childElementCount;

    setTimeout(function () {
      for (let index = first_element; index > 0; index--) {
        var last_element = column_right.childNodes[4 * index - 1];
        if (column_left.scrollHeight <= column_right.scrollHeight) {
          last_element.style.display = 'none';
          console.log('REMOVE ITEM: ' + index);
          // Add Card in right column if it is less than the left column
        } else if (column_left.scrollHeight > column_right.scrollHeight + 400) {
          last_element.style.display = 'block';
          console.log('ADD ITEM: ' + index);
        }
      }
    }, 500);
  });
}

// Google Maps API
var map;
function initMap() {
  var myLocation = { lat: 29.726839, lng: -95.527893 };

  map = new google.maps.Map(document.getElementById('map'), {
    center: myLocation,
    zoom: 8,
  });

  var marker = new google.maps.Marker({
    position: myLocation,
    map: map,
    title: 'Click to zoom',
  });

  map.addListener('center_changed', function () {
    // 3 seconds after the center of the map has changed, pan back to the
    // marker.
    window.setTimeout(function () {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  marker.addListener('click', function () {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}

// NEWS PAGE Adding Reply to Comments

var userName = 'Leonardo Chica';

const commentSection = document.querySelector('.comments__section');

function ReplytoComment(comment, index) {
  if (comment.value != '') {
    console.log('Reply to comment');
    const collectionComment = document.querySelectorAll(
      '.collection__add-comment'
    );

    var commentContainer = document.createElement('div');
    var commentName = document.createElement('span');
    var commentText = document.createElement('span');
    var commentIcon = document.createElement('i');
    var commentDate = document.createElement('p');

    collectionComment[index].appendChild(commentContainer);
    commentContainer.appendChild(commentName);
    commentContainer.appendChild(commentText);
    commentContainer.appendChild(commentIcon);
    commentContainer.appendChild(commentDate);

    // Classes
    commentContainer.classList.add('comment__container');
    commentName.classList.add('comment__name');
    commentName.classList.add('green-text');
    commentText.classList.add('comment__text');
    commentIcon.classList.add('material-icons');
    commentIcon.classList.add('green-text');
    commentIcon.classList.add('delete');
    commentDate.classList.add('comment__date');
    commentDate.classList.add('grey-text');

    // Add info
    commentName.innerHTML = userName + ':';
    commentText.innerHTML = ' ' + comment.value;
    commentIcon.innerHTML = 'close';

    // Current date
    var currentdate = new Date();
    var month = new Array();
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';

    commentDate.innerHTML =
      month[currentdate.getMonth()] +
      ' ' +
      currentdate.getDate() +
      ', ' +
      currentdate.getFullYear();

    // Reset input text
    comment.value = '';

    Materialize.toast('Comment Added', 2000, 'green darken-3 yellow-text');
  }
}

// Press Enter to reply to comment
commentSection.addEventListener('keyup', function (event) {
  if (event.target && event.target.matches('.input-text')) {
    if (event.keyCode == 13) {
      const inputs = document.querySelectorAll('.input-text');

      var index = 0;

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] == event.target) {
          index = i;
          console.log('Input Identified Index ' + i);
        }
      }
      ReplytoComment(event.target, index);
    }
  }
});

// Click on REPLY to reply to comment
commentSection.addEventListener('click', function (event) {
  if (event.target && event.target.matches('.collection__button')) {
    const buttons = document.querySelectorAll('.collection__button');

    const inputs = document.querySelectorAll('.input-text');

    var index = 0;

    for (let i = 0; i < buttons.length; i++) {
      if (buttons[i] == event.target) {
        index = i;
        console.log('Button Index ' + i);
      }
    }
    console.log('Button Identified');
    ReplytoComment(inputs[index], index);
  }
});

// Delete response to Comment
commentSection.addEventListener('click', function (e) {
  if (e.target && e.target.matches('.delete')) {
    e.target.parentNode.remove();
    Materialize.toast('Comment Deleted', 2000, 'green darken-3 yellow-text');
  }
});

// Add a comment
const postButton = document.getElementById('collection__addpost-btn');

const inputComment = document.getElementById('addPost');

const uploadImageInput = document.getElementById('image-input');

const imagesContainerPreview = document.querySelector(
  '.collection__images-preview'
);

function AddComment() {
  if (inputComment.value != '' || imagesContainerPreview.innerHTML != '') {
    console.log('Added comment');

    var uploadedImages = document.querySelectorAll(
      '.collection__uploaded-image'
    );

    var inputFieldComments = document.querySelectorAll('.collection__input');

    var collectionItem = document.createElement('li');
    var collectionAvatar = document.createElement('img');
    var collectionTitle = document.createElement('span');
    var collectionDate = document.createElement('p');
    var collectionCommentContainer = document.createElement('p');
    var collectionDeleteButton = document.createElement('div');
    var collectionAddComment = document.createElement('div');
    var collectionInputFieldContainer = document.createElement('div');
    var collectionInput = document.createElement('input');
    var collectionLabel = document.createElement('label');
    var collectionButton = document.createElement('button');

    commentSection.insertBefore(
      collectionItem,
      commentSection.childNodes[commentSection.childNodes.length - 2]
    );
    collectionItem.appendChild(collectionAvatar);
    collectionItem.appendChild(collectionTitle);
    collectionItem.appendChild(collectionDate);
    collectionItem.appendChild(collectionCommentContainer);

    // Create elements for images
    for (let img = 0; img < uploadedImages.length; img++) {
      var collectionImage = document.createElement('img');
      collectionItem.appendChild(collectionImage);
      collectionImage.classList.add('collection__image');
      collectionImage.setAttribute('src', uploadedImages[img].src);
    }

    collectionItem.appendChild(collectionDeleteButton);
    collectionItem.appendChild(collectionAddComment);
    collectionItem.appendChild(collectionInputFieldContainer);
    collectionInputFieldContainer.appendChild(collectionInput);
    collectionInputFieldContainer.appendChild(collectionLabel);
    collectionItem.appendChild(collectionButton);

    // Classes
    collectionItem.classList.add('collection-item');
    collectionItem.classList.add('avatar');
    collectionAvatar.classList.add('circle');
    collectionTitle.classList.add('title');
    collectionTitle.classList.add('blue-text');
    collectionTitle.classList.add('text-darken-4');
    collectionDate.classList.add('date');
    collectionDate.classList.add('grey-text');
    collectionCommentContainer.classList.add('collection__comment');
    collectionDeleteButton.classList.add('collection__button-delete');
    collectionDeleteButton.classList.add('chip');
    collectionDeleteButton.classList.add('waves-effect');
    collectionDeleteButton.classList.add('waves-light');
    collectionDeleteButton.classList.add('blue');
    collectionDeleteButton.classList.add('darken-4');
    collectionDeleteButton.classList.add('yellow-text');
    collectionDeleteButton.classList.add('text-darken-1');
    collectionAddComment.classList.add('collection__add-comment');
    collectionInputFieldContainer.classList.add('input-field');
    collectionInputFieldContainer.classList.add('collection__input');
    collectionInput.classList.add('input-text');
    collectionButton.classList.add('collection__button');
    collectionButton.classList.add('btn');
    collectionButton.classList.add('btn-small');
    collectionButton.classList.add('waves-effect');
    collectionButton.classList.add('waves-light');
    collectionButton.classList.add('green');
    collectionButton.classList.add('darken-2');

    // Attributes to images and Source
    collectionAvatar.setAttribute('src', 'img/news/comments/myavatar.jpg');
    collectionAvatar.setAttribute('alt', 'My Profile Picture');
    collectionInput.setAttribute('type', 'text');
    collectionInput.setAttribute(
      'id',
      'comment' + (inputFieldComments.length + 1)
    );
    collectionLabel.setAttribute(
      'for',
      'comment' + (inputFieldComments.length + 1)
    );
    collectionButton.setAttribute(
      'id',
      'collection__btn' + (inputFieldComments.length + 1)
    );

    // Add info
    collectionTitle.innerHTML = userName;

    // Current date
    var currentdate = new Date();
    var month = new Array();
    month[0] = 'January';
    month[1] = 'February';
    month[2] = 'March';
    month[3] = 'April';
    month[4] = 'May';
    month[5] = 'June';
    month[6] = 'July';
    month[7] = 'August';
    month[8] = 'September';
    month[9] = 'October';
    month[10] = 'November';
    month[11] = 'December';

    collectionDate.innerHTML =
      'posted on ' +
      month[currentdate.getMonth()] +
      ' ' +
      currentdate.getDate() +
      ', ' +
      currentdate.getFullYear();

    // Content for comment
    collectionCommentContainer.innerHTML = inputComment.value;

    // Content for Delete Button
    collectionDeleteButton.innerHTML = 'Delete';

    // Content for label input
    collectionLabel.innerHTML = 'Reply to Comment';

    // Content for button
    collectionButton.innerHTML = 'Reply';

    // Reset input text and image
    inputComment.value = '';
    imagesContainerPreview.innerHTML = '';
    Materialize.toast('Comment Added', 2000, 'green darken-3 yellow-text');
  }
}

// Add comment when pressed Enter
inputComment.addEventListener('keyup', function (event) {
  if (event.keyCode == 13) {
    AddComment();
  }
});

// Add comment when clicked button
postButton.addEventListener('click', function () {
  AddComment();
});

// Delete comment
commentSection.addEventListener('click', function (e) {
  if (e.target && e.target.matches('.collection__button-delete')) {
    e.target.parentNode.remove();
    Materialize.toast('Post Deleted', 2000, 'green darken-3 yellow-text');
  }
});

// Uploading Image
uploadImageInput.addEventListener('change', function (image) {
  imagesContainerPreview.innerHTML = '';
  for (let num = 0; num < image.target.files.length; num++) {
    var imageuploaded = document.createElement('img');
    imagesContainerPreview.appendChild(imageuploaded);
    imageuploaded.classList.add('collection__uploaded-image');
    imageuploaded.setAttribute(
      'src',
      URL.createObjectURL(image.target.files[num])
    );
  }
});

// Star Rating Article
const stars = document.querySelectorAll('.star');

const ratingContainer = document.querySelectorAll('.rating');

ratingContainer.forEach(function (rating) {
  var children = [].slice.call(rating.children);

  children.forEach((star, index) =>
    star.addEventListener('mouseover', function () {
      console.log(star);
      console.log(index);
      for (let i = 0; i < children.length; i++) {
        children[i].innerHTML = 'star_outline';
      }
      for (let i = 0; i <= index; i++) {
        children[i].innerHTML = 'star';
      }
    })
  );
});
