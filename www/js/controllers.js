angular.module('starter.controllers', ['ionic.cloud'])

.controller('FeedCtrl', function($scope) {
    $scope.items = [
        {
            name: 'Marty McFly',
            date: 'November 05, 1985',
            avatar: 'img/mcfly.jpg',
            image: 'img/delorean.jpg',
            content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.'
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
    })

    $ionicPush.register().then(function(token) {
        return $ionicPush.saveToken(token, {ignore_user:true})
    }).then(function(token) {
        console.log("Token obtenido: ", token.token)
    }, function(err) {
        console.log(JSON.stringify(err))
    })

    $scope.$on('cloud:push:notification', function(event, data) {
        var msg = data.message;
        alert(msg.title + ': ' + msg.text)
    })

}])

.controller('ChatsCtrl', function($scope, Chats) {
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
