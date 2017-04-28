(function() {
  tinymce.create('tinymce.plugins.fgi_plugin', {
    init: function(editor, url) {
      editor.addButton('fgi_button', {
        title: 'Add a group of images',
        image: url + '/assets/button-group-images.png',
        cmd: 'fgi_command',
      });

      editor.addCommand('fgi_command', function() {
        editor.windowManager.open({
          title: 'Add a group of images',
          file: url + '/tinymce-dialog.html',
          width: 700,
          height: 600,
          inline: 1,
          popup_css: '/assets/dialog-default.css'
        },
        {
          editor: editor,
          plugin_url : url,
          wp: wp
        });
      });
    },
  });

  tinymce.PluginManager.add('fgi_plugin', tinymce.plugins.fgi_plugin);
})();
