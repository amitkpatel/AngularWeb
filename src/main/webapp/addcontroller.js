var app = angular.module('mainApp',[]);

app.controller('campaignCtrl',function($scope,$http){
    $scope.showGetAllCampaignsLink=false;
    $scope.fetchAllCampaignClicked=false;
    $scope.fetchActiveCampaignClicked=false;



    $scope.fetchCampaign = function(){
                var partnerId = $scope.partnerId;

                var url = 'http://127.0.0.1:8080/ad/' + partnerId;
                $http.get(url)
                .success(function(response){
                    if(response.length>0)
                    {
                        $scope.getAllURL=response[0].link.hLink;
                    }
                    else{
                        $scope.getAllURL='http://127.0.0.1:8080/ad/getAllCampaigns/' + partnerId;
                    }
                    $scope.campaigns = response;
                    $scope.errorObj = '';
                    $scope.fetchActiveCampaignClicked=true;
                    $scope.fetchAllCampaignClicked=false;
                    $scope.showGetAllCampaignsLink=true;
                })
                .error(function(response){
                    $scope.campaigns='';
                    $scope.errorObj = response;
                    if($scope.errorObj.errorMessage == 'No Active Campaign found for Partner Id : '+$scope.partnerId){
                        $scope.getAllURL='http://127.0.0.1:8080/ad/getAllCampaigns/' + partnerId;
						$scope.showGetAllCampaignsLink=true;
                    }
                    else{
                        $scope.showGetAllCampaignsLink=false;
                        $scope.fetchAllCampaignClicked=false;
                    }
                    $scope.fetchActiveCampaignClicked=false;

                });
				$scope.currentDateTime = new Date();
    }

    $scope.fetchAllCampaigns = function(){

                 $http.get($scope.getAllURL)
                 .success(function(response){
                     $scope.fetchAllCampaignClicked=true;
                     $scope.fetchActiveCampaignClicked=false;
                     $scope.campaigns = response;
                     $scope.errorObj = '';
                 })
                 .error(function(response){
                     $scope.campaigns='';
                     $scope.errorObj = response;
                     $scope.fetchAllCampaignClicked=false;
                     $scope.fetchActiveCampaignClicked=false;

                 });
				 $scope.currentDateTime = new Date();
                 return false;
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
            .success(function (data,headers) {

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