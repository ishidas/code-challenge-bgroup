(function() {
  'use strict';
  var app = angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
  ;

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }


//my controller
  app.controller('myController',['$http','$scope',($http, $scope)=>{
    var baseUrl = 'http://localhost:3000';

    $scope.userInput = {
      note_title: '',
      note_user_name: '',
      note_food_name: ''
    };
    //temprorarily storing array of get data
    $scope.dataFromDb;
    $scope.dataFromDbById;
    $scope.resInfo;

    //http post request to /new end point
    $scope.postUserInput = function(){
      $http.post(baseUrl +'/new', this.userInput)
      .then((res)=>{
        console.log('res back', res);
      });
    };

    //getting back all the data from db
    $scope.getAllData = function(){
      $http.get(baseUrl + '/')
      .then((res)=>{
        $scope.dataFromDb = res.data;
        console.log('response array',res.data);
      });
    };

    //seach by user
    $scope.getItemByUser = function(input){
      var user = input.note_user_name;
      console.log('here is user name', user);
      $http.get(baseUrl + '/user/' + user)
      .then((res)=>{
        $scope.dataFromDbById = res.data;
        console.log('getItemById function', res.data);
      });
    };

    //deleting all data
    $scope.deleteById = function(input){
      var id = input.note_id;
      $http.delete(baseUrl + '/delete/' + id)
      .then((res)=>{
        console.log('delete res cli', res);
        $scope.resInfo = res.data;
        $scope.dataFromDbById = {};
        $scope.dataFromDb.filter((data)=>{
          return data.note_id === id;
        });
      });
    };
  }]);

})();
