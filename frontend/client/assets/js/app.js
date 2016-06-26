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

  app.controller('myController',['$http','$scope',($http, $scope)=>{
    var baseUrl = 'http://localhost:3000';

    $scope.userInput = {
      note_title: '',
      note_food_nmae: ''
    };
    //temprorarily storing array of get data
    $scope.dataFromDb;

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
        console.log('response array',res);
        $scope.dataFromDb = res;
      });
    };
  }]);

})();
