qWatch.controller('SearchCtrl',[
  '$scope', '$rootScope', '$timeout',
  function($scope, $rootScope, $timeout){
    var _handler;
    $scope.search = {term: ""};
    
    var searchFor = function searchFor(term){
      if(_handler) $timeout.cancel(_handler);

      _handler = $timeout(function(){
        if(!term){
          $rootScope.$emit('searchClear')
        } else {
          $rootScope.$emit('searchSet', term)
        }
      }, 300)
    };

    $rootScope.$on('searchSet', function(event, term){
      console.log(term)
    })
    $rootScope.$on('searchClear', function(event){
      console.log("cleared")
    })

    $scope.$watch('search.term', searchFor)
  }
])