#= require spec_helper

describe 'NavController', ->
  beforeEach ->

    @controller 'NavCtrl',
      $scope: @scope,
      $state: @state,
      $window: @windowStub,
      $root: @root,
      $timeout: @timeout,
      _: @_

    user = @model('userService')

    @http
      .whenGET '/api/v1/users'
      .respond 200,
        authentications:
          created_at: "2017-02-22T18:56:30.392Z"
          id: 3
          params:
            credentials:
              expires_at: "2017-02-22T20:00:03.234Z"
              expires_in:"3813"
              token: "EAARt23Q6Wi4BAKmHr6ehbnhhkPccf21"
              info:
                email: "user@gmail.com"
                name: "Test User"
                friends:
                  data: [id: 0]
          provider: "facebook"
          token: "EAARt23Q6Wi4BAKmHr6ehbnhhkPccf21"
          token_expires_at: "2017-02-22T20:00:03.234Z"
          uid: "1851928751686748"
          updated_at:"2017-02-22T18:56:30.392Z"
          user_id:13
        created_at: "2017-02-22T18:56:30.381Z"
        email: "user@gmail.com"
        id: 1
        name: "Test User"
        updated_at: "2017-02-23T15:52:42.465Z"


  describe 'load', ->
    it 'sets an empty user object', ->
      expect @scope.userData
        .toEqualData {}

    it 'initializes the sidebar var to not be shown', ->
      expect @root.showSideBar
        .toEqual false

    it 'sets a function for navigating to the list index', ->
      expect @scope.goToIndex
        .toEqual jasmine.any Function

    it 'sets a function for checking the signed in user', ->
      expect @scope.signedInUser
        .toEqual jasmine.any Function

    it 'sets functions for signing in users with different OAuth providers', ->
      expect @scope.signIn
        .toEqual jasmine.any Function
      expect @scope.fbSignIn
        .toEqual jasmine.any Function

    it 'sets a function for signing out', ->
      expect @scope.signOut
        .toEqual jasmine.any Function

    it 'sets a function to check if a user is connected with facebook', ->
      expect @scope.facebookConnected
        .toEqual jasmine.any Function

    it 'sets a way to show and hide the navbar', ->
      expect @scope.toggleSideBar
        .toEqual jasmine.any Function

    it 'sets devise listeners', ->
      expect @scope.$$listeners["devise:login"]
        .toEqual jasmine.any Array
      expect @scope.$$listeners["devise:logout"]
        .toEqual jasmine.any Array

  describe 'goToIndex', ->
    it 'does a full redirect to the index', ->
      @scope.goToIndex()
      expect @windowStub.location.href
        .toEqual '/'

  describe 'signedInUser', ->
    it 'returns a boolean of whether the user is signed in', ->
      expect @scope.signedInUser()
        .toBeA('boolean')
