'use strict';

(function(){
    angular.module('contact', [])
    .controller('contactCtrl', function($scope, $http){
        $scope.sendMsg = function(isValid) {
         $http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
        
        // Delete the Requested With Header
        delete $http.defaults.headers.common['X-Requested-With'];
            var data = $.param({
                    message: $scope.vmsg,
                    name: $scope.vname,
                    email: $scope.vemail
            });

            if(isValid)
                $http.post('http://localhost:4000/api/dnh', data).success(function(res){
                    console.log(res);
                });
        };
    })

})();

