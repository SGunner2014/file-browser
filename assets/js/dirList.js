/*
    Directory-listing file for file browser. Interacts with angularjs elements and php at /int.php
*/
var currentPath;

var app = angular.module("mainApp", []);
app.controller("mainCont", function($scope, $http) {
    function getContents(filepath) {
        var address = "/int.php?dir=" + filepath;
        console.log(address);
        var xhttp;
        xhttp = new XMLHttpRequest();

        xhttp.open("GET", address, false);
        xhttp.send();
        console.log(xhttp.responseText);
        var response = JSON.parse(xhttp.responseText);
        return response;
    }
    
    $scope.currentPath = "/";
    currentPath = $scope.currentPath;
    $scope.files = getContents($scope.currentPath);
});