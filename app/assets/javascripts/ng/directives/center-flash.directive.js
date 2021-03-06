qWatch.directive('centerFlash', function () {
  "use strict";
  
  function fade(element) {
    element.classList.add('flash-fade');
  }

  return {
    restrict: 'E',
    scope: {
      msgType: '=',
      msgText: '='
    },
    template: '<div class="flash {{ msgType }}" id="flash-content">{{ msgText }}</div>',
    link: function(scope, element, attrs) {
      element.addClass(scope.msgType);

      var content = document.getElementById('flash-content');

      element.on('flashSet', function() {
        element[0].classList.add('flash-show');

        setTimeout(function(){ fade(content); }, 1000);
      });
    },
  };
});
