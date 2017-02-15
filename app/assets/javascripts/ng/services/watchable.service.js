qWatch.factory('watchableService', [
  'Restangular', 'showItemService',
  function(restangular, showItem){
    var _watchables = [],
        _watchable = {},
        _searchResults = [],
        _page = 1,
        _limit = 10;

    var _denormalize = function _denormalize(arr, newArr, offset){
      offset = offset || 0;
      for(var i = 0; i < arr.length; i++){
        arr[i].show = _show;
        newArr.push(arr[i]);
      }
    }

    var _complete = function _complete(watchable, result){
      angular.copy(result, watchable);
      showItem.combineUrls(watchable);
      watchable.complete = true;

      angular.copy(watchable, _watchable);
      return _watchable;
    }

    var _offset = function _offset(){
      return (_page - 1) * _limit
    }

    var index = function index(next_page){
      if(!_watchables.length || next_page){
        return restangular
          .all('watch')
          .getList({page: _page, limit: _limit})
          .then(function(results){
            _denormalize(results, _watchables, _offset());
            _page += results.length;
            return _watchables;
          })
          .catch(function(err){
            console.log(err)
          });
      }
      return $q.resolve(_watchables)
    }

    var _show = function _show(){
      if(!this.complete){
        return restangular
          .one('watch', this.id)
          .get()
          .then(function(result){
            return _complete(this, result)
          })
      }
      angular.copy(this, _watchable)
      return $q.resolve(_watchable);
    }

    var get = function get(id){
      if(!_watchable.id || _watchable.id !== id){
        return restangular
          .one('watch', id)
          .get()
          .then(function(result){
            showItem.combineUrls(result)
            angular.copy(result, _watchable);
            return _watchable;
          })
      }
      return $q.resolve(_watchable);
    }

    var search = function search(term){
      _searchResults.length = 0;
      return restangular
        .all('search')
        .getList({search: term})
        .then(function(results){
          _denormalize(results, _searchResults)
          return _searchResults;
        })
    }

    return {
      index: index,
      show: get
    }
  }
]);
