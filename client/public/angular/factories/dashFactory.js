angular.module('dashFactory', [])

.factory('friendRequests', ['$http', function($http){
	return {
		sendRequest: function(requesting_id, requested_id){
			return $http.post('http://localhost:3000/friend_requests', {requesting_user_id: requesting_id, requested_user_id: requested_id})
		},
		getRequests: function(requested_id){
			return $http.get('http://localhost:3000/friend_requests/'+requested_id)
		},
		getSentRequests: function(requesting_id){
			return $http.get('http://localhost:3000/friend_requests_sent/'+requesting_id)
		}
	}
}])

.factory('userData', ['$http', function($http){
	return {
		getAllUsers: function(){
			return $http.get('http://localhost:3000/users')
		}
	}
}])

