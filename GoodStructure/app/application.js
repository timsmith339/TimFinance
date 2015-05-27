var mainApp = angular.module("Application", []);
mainApp.config(['$routeProvider',
   function ($routeProvider) {
        $routeProvider.when('/categories', {
            templateUrl: 'partials/phone-list.html',
            controller: 'PhoneListCtrl'
        });
    }
]);