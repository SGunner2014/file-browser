/*
    Directory-listing file for file browser. Interacts with angularjs elements and php at /int.php
*/

var app = angular.module("mainApp", []);
app.controller("mainCont", function($scope, $http) {
    $scope.currentPath = "/";
    $scope.files = getContents($scope.currentPath);
    
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
    
    $scope.changeDir = function(dir) {
        var changetodir;
        if (dir == "..") {
            var tbl = $scope.currentPath.split("/");
            tbl.pop();
            changetodir = tbl.join("/");
        } else if (dir.length > 0) {
            changetodir = $scope.currentPath + "/" + dir;
        } else {
            changetodir = $scope.currentPath;
        }
        
        if (changetodir.substr(0, 2) === "//") {
            changetodir = changetodir.substr(1, changetodir.length - 1);
        }
        
        $scope.currentPath = changetodir;
        $scope.files = getContents($scope.currentPath);
    }
    
    $scope.getFullFilePath = function(filename) {
        var path = $scope.currentPath + "/" + filename;
        return path;
    }
});