angular.module('dashFactory', [])

.factory('collaborators', ['$http', function($http) {
  return {
    sendRequest: function(sender_id, recipient_id) {
      return $http.post('http://localhost:8080/requests', {
        senderId: sender_id,
        recipientId: recipient_id
      });
    },
    getRequests: function(recipient_id) {
      return $http.get('http://localhost:8080/requests/' + recipient_id);
    },
    getSentRequests: function(sender_id) {
      return $http.get('http://localhost:8080/requests_sent/' + sender_id);
    },
    getCollaborations: function(user_id) {
      return $http.get('http://localhost:8080/collaborators/' + user_id);
    },
    createCollaboration: function(user_id, sender_id) {
      return $http.post('http://localhost:8080/collaborators', {
        recipientId: user_id,
        senderId: sender_id
      });
    },
    declineCollaboration: function(user_id, sender_id) {
      return $http.delete('http://localhost:8080/collaborators', {
        recipientId: user_id,
        senderId: sender_id
      });
    }
  };
}])

.factory('userData', ['$http', function($http) {
  return {
    getAllUsers: function(user) {
      return $http.get('http://localhost:8080/users/' + user);
    }
  };
}]);
