var app = angular.module('mainApp',[]);

app.controller('campaignCtrl',function($scope,$http){

    $scope.fetchCampaign = function(){
            var partnerId = $scope.partnerId;

            //$http.get('http://127.0.0.1:8080/AngularJsWebApp/database.json')
            var url = 'http://127.0.0.1:8080/ad/' + partnerId;
            $http.get(url)
            .success(function(response){
                $scope.campaigns = response;
                $scope.errorObj = '';
            })
            .error(function(response){
                $scope.campaigns='';
                $scope.errorObj = response;
            });
    }


    $scope.saveCampaign = function(){

            if ($scope.addDuration == 'undefined' || $scope.addDuration == '' )
            {
                $scope.addDuration = 0;
            }

            var data = {
                partnerId: $scope.addPartnerId,
                duration: $scope.addDuration,
                adContent: $scope.addCampaign
            }

            var config = {
                            headers : {
                                'Content-Type': 'application/json'
                            }
                         }

            $http.post('http://127.0.0.1:8080/ad/', data, config)
            .success(function (data) {

                $scope.addPartnerId = '';
                $scope.addDuration='';
                $scope.addCampaign='';
                $scope.saveObjMessage='Campaign Added Successfully.';
                $scope.saveErrorObj = '';
            })
            .error(function(response){
                 $scope.saveObjMessage='';
                 $scope.saveErrorObj = response;
            });

    }

});
