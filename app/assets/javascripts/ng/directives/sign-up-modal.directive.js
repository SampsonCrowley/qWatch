qWatch.directive('signUpModal',
  [ '$q', 'userService',
    function($q, user) {
      "use strict";

      var fbSignUp = function fbSignUp() {
        return user.fbSignUp();
      }

      var submit = function submit(form, formData) {
        if (form.$valid) {
          return user.signUp(formData)
        } else {
          return $q.reject();
        }
      }

      var passwordMatch = function passwordMatch(data, form){
        if(data.password !== data.password_confirmation){
          form.password_confirmation.$setValidity('pwdmatch', false)
        } else {
          form.password_confirmation.$setValidity('pwdmatch', true)
        }
      }

      return {
        restrict: 'E',
        scope: {},
        templateUrl: 'ng/directives/sign-up-modal.html',
        link: function(scope, element, attrs) {
          scope.userData = {};

          scope.submit = function (form, formData) {
            if(!scope.disableButtons){
              scope.disableButtons = true;
              submit(form, formData).then(function(){
                dismissModal();
                scope.disableButtons = false;
              })
              .catch(function(e){
                scope.disableButtons = false;
              })
            }
          };

          scope.passwordMatch = passwordMatch;

          scope.fbSignUp = function (form, formData) {

            if(!scope.disableButtons){
              scope.disableButtons = true;
              fbSignUp().then(function(){
                dismissModal();
              })
              .catch(function(){
                scope.disableButtons = false;
              });
            }
          };


          var dismissModal = function () {
            angular.element(element).children('#signUpModal').modal('hide');
          }
        }
      };
}]);