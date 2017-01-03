angular.module('app', [ngResource, ngRoute]);

angular.module().config(function($routeProvider, $locationProvider){
    $locationProvider.html5Mode(true);
});