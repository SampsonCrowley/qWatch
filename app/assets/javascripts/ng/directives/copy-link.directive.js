qWatch.directive('copyLink', function () {

  var flash = function flash(msg) {
    var flash = document.createElement("DIV")
    flash.classList.add("flash", msg.type);
    flash.textContent = msg.text;

    document.body.appendChild(flash);

    setTimeout(function(){ fade(flash); }, 500)
  }

  function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
  }

  //  A work around to copy text to the clipboard without displaying
  // an input / textarea element.
  // (basically insert element, copy to clipboard, remove element):
  var copyTextToClipboard = function copyTextToClipboard(text) {
    var textArea = document.createElement("textarea");

    //
    // *** This styling is an extra step which is likely not required. ***
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //

    // Place in top-left corner of screen regardless of scroll position.
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    // Ensure it has a small width and height. Setting to 1px / 1em
    // doesn't work as this gives a negative w/h on some browsers.
    textArea.style.width = '2em';
    textArea.style.height = '2em';

    // We don't need padding, reducing the size if it does flash render.
    textArea.style.padding = 0;

    // Clean up any borders.
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    // Avoid flash of white box if rendered for any reason.
    textArea.style.background = 'transparent';


    textArea.value = text;

    document.body.appendChild(textArea);

    textArea.select();

    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      console.log('Copying text command was ' + msg);
      flash({ type: "success", text: "✓ Copied to clipboard"})
    } catch (err) {
      console.log('Oops, unable to copy');
      flash({ type: "error", text: "Oops, unable to copy"})
    }

    document.body.removeChild(textArea);
  }

  var copyLink = function copyLink(text) {
    text = text || location.href;

    copyTextToClipboard(text);
  }

  return {
    restrict: 'A',
    scope: {
      linkUrl: '@'
    },
    link: function(scope, element, attrs) {
      element.on('click', function (e) {
        e.preventDefault();

        copyLink(scope.linkUrl);
      })
    }
  };
});
