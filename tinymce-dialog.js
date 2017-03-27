var passed_arguments = top.tinymce.activeEditor.windowManager.getParams();
var wp = passed_arguments.wp;
var images = [];
var caption = null;
var custom_uploader;

function uploadImage() {
  //Extend the wp.media object
  custom_uploader = wp.media.frames.file_frame = wp.media({
    title: 'Choose Image',
    button: {
      text: 'Choose Image'
    },
    multiple: false
  });

  //When a file is selected, grab the URL and set it as the text field's value
  custom_uploader.on('select', function() {
    removeEmptyState();
    var attachment = custom_uploader.state().get('selection').first().toJSON();
    var imageObj = {
      url: attachment.url
    };

    images.push(imageObj);

    var preview = document.createElement('div');
    preview.classList.add('image-preview');

    var deletePreview = document.createElement('div');
    deletePreview.classList.add('preview-delete');
    var deleteButton = document.createElement('div');
    deleteButton.classList.add('delete', 'icon');
    deletePreview.appendChild(deleteButton);

    var image = document.createElement('img');
    image.setAttribute('src', imageObj.url);
    preview.appendChild(image);
    preview.appendChild(deletePreview);
    document.getElementById('images-list').appendChild(preview);

    deletePreview.addEventListener('click', function(e) {
      removeImageEvent(imageObj, preview);
    });
  });

  //Open the uploader dialog
  custom_uploader.open();
}

document.getElementById('upload_image').addEventListener('click', function(e) {
  e.preventDefault();
  uploadImage();
});

document.getElementById('cancel-action').addEventListener('click', function() {
  passed_arguments.editor.windowManager.close();
});

document.getElementById('submit-action').addEventListener('click', function() {
  var captionText = document.getElementById('group_caption').value;
  var shortcode = '<div class="image-group frame size-large">';
  shortcode += `<div class="list-images">`;
  if (images.length > 0) {
    images.forEach(function(image) {
      shortcode += `<div class="image-group-item"><img src="${image.url}" /></div>`;
    });
    shortcode += `</div>`;

    if (captionText && captionText !== '') {
      shortcode += `<div class="caption">${captionText}</div>`;
    }

    shortcode += '</div>';

    passed_arguments.editor.selection.setContent(shortcode);
  }

  passed_arguments.editor.windowManager.close();
});

function removeEmptyState() {
  var emptyState = document.getElementById('empty-state');
  if (emptyState) {
    emptyState.parentNode.removeChild(emptyState);
  }
}

function removeImageEvent(imageToRemove, preview) {
  for (key in images) {
    if (images[key].url === imageToRemove.url) {
      images.splice(key, 1);
      preview.parentNode.removeChild(preview);
    }
  }
}
