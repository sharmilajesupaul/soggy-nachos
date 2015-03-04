angular.module('dashFactory', [])

.factory('friends', ['$http', function($http){
	return {
		sendRequest: function(requesting_id, requested_id){
			return $http.post('http://localhost:3000/friend_requests', {requesting_user_id: requesting_id, requested_user_id: requested_id})
		},
		getRequests: function(requested_id){
			return $http.get('http://localhost:3000/friend_requests/'+requested_id)
		},
		getSentRequests: function(requesting_id){
			return $http.get('http://localhost:3000/friend_requests_sent/'+requesting_id)
		},
		getFriends: function(user_id){
			return $http.get('http://localhost:3000/friendships/'+user_id)
		},
		createFriendship: function(user_id, friend_id){
			return $http.post('http://localhost:3000/friendships', {user_id: user_id, friend_id: friend_id})
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

