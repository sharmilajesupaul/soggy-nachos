class FriendshipsController < ApplicationController
	def create
		friendship = Friendship.new(user_id: params[:user_id], friend_id: params[:friend_id])
		friendship1 = Friendship.new(friend_id: params[:user_id], user_id: params[:friend_id])
		if friendship.save and friendship1.save
			request = FriendRequest.where(requested_user_id: params[:user_id], requesting_user_id: params[:friend_id]).first.destroy
			p "success"
		else
			p "failure when both friendships save" 
		end
	end

	def show
		friends = User.find(params[:id]).friends
		if friends.length > 0
			render json: friends
		end
	end
end
