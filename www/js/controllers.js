angular.module('starter.controllers', ['ionic.cloud'])

.controller('FeedCtrl', function($scope) {
    $scope.items = [
        {
            name: 'Marty McFly',
            date: 'November 05, 2023',
            avatar: 'img/mcfly.jpg',
            image: 'img/delorean.jpg',
            content: 'Hola Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.'
        }
    ]
})

.controller('mainCtrl', ['$scope', '$ionicDeploy', '$ionicPush', '$ionicAuth', '$ionicUser',
function(                 $scope,   $ionicDeploy,   $ionicPush,   $ionicAuth,   $ionicUser) {

    $ionicDeploy.channel = 'dev'
    $ionicDeploy.check().then(function(snapshotAvailable) {
        if (snapshotAvailable) {
            alert("Nuevo snapshot! dale en Ok y espera")
            $ionicDeploy.download().then(function() {
                return $ionicDeploy.extract().then(function() {
                    $ionicDeploy.load()
                })
            })
        }
        else{
            $ionicPush.register().then(function(token) {
                alert(JSON.strigify(token))
                return $ionicPush.saveToken(token, {ignore_user:true})
            }).then(function(token) {
                alert('Token guardado')
            })
        }
    })

}])

.controller('ChatsCtrl', function($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //})

    $scope.chats = Chats.all()
    $scope.remove = function(chat) {
        Chats.remove(chat)
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId)
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    }
})
