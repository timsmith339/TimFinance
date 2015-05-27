alert('test');

var categoriesApp = angular.module("CategoriesModule", []);

categoriesApp.controller("CategoriesController", ['$scope', '$http', function ($scope, $http) {
    $scope.edit = function (data) {
        data.previousName = data.Name;
        data.InEdit = true;
        data.Updating = true;
    }
    $scope.cancelEdit = function (data) {
        if (data.previousName)
            data.Name = data.previousName;
        data.InEdit = false;
        data.Updating = false;
    }
    $scope.add = function (data) {
        data.Nodes.push({
            Nodes: [],
            InEdit: true,
            Parent: data
        });
    };
    $scope.delete = function (category) {
        if (!category.Id) {
            category.Parent.Nodes = category.Parent.Nodes.filter(function (node) {
                return (node.$$hashKey != category.$$hashKey);
            });
        } else {
            $http({
                url: '/api/categories/' + category.Id,
                method: "DELETE"
            }).success(function (data, status, headers, config) {
                category.Parent.Nodes = category.Parent.Nodes.filter(function (node) {
                    return (node.Id != category.Id);
                });
            }).error(function (data, status, headers, config) {
                alert('Error: ' + data.error);
            });
        }
    };
    $scope.post = function (category) {
        var postData = {
            name: category.Name,
            parentId: category.Parent.Id
        };
        $http({
            url: '/api/categories',
            method: "POST",
            data: $.param(postData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status, headers, config) {
            category.InEdit = false;
            category.Id = data.Id;
        }).error(function (data, status, headers, config) {
            alert('Error: ' + data.error);
        });
    }
    $scope.put = function (category) {
        var postData = {
            name: category.Name,
        };
        $http({
            url: '/api/categories/' + category.Id,
            method: "PUT",
            data: $.param(postData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status, headers, config) {
            category.InEdit = false;
            category.Updating = false;
        }).error(function (data, status, headers, config) {
            alert('Error: ' + data.error);
        });
    }

    $scope.tree = [];

    function init() {
        $http.get("/api/categories")
            .success(function (data) {
                var Nodes = [];
                var items = data.sort(function (a, b) {
                    return (a.ParentId - b.ParentId);
                });
                var firstNode = items[0];
                Nodes.push(firstNode);
                var getChildNodes = function (node) {
                    if (node.Nodes == null || node.Nodes != typeof ('array'))
                        node.Nodes = [];
                    var children = items.filter(function (obj) {
                        return (obj.ParentId == node.Id);
                    })
                    for (var x = 0; x < children.length; x++) {
                        children[x].Parent = node;
                        node.Nodes.push(children[x]);
                        getChildNodes(children[x]);
                    }
                }
                getChildNodes(firstNode);
                $scope.tree = [{
                    Name: "Head",
                    Nodes: Nodes
                }];
            })
    }
    init();
}]);