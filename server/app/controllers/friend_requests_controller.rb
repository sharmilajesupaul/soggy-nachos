class FriendRequestsController < ApplicationController
	def create
	  friendrequest = FriendRequest.new(requesting_user_id: params[:requesting_user_id], requested_user_id: params[:requested_user_id])
	  if friendrequest.save
	    p "success"
	  else
	    p "fail"
	  end
	end

	def show
		requests_received = FriendRequest.where(requested_user_id: params[:id])
		if requests_received.length > 0
			users = []
			requests_received.each do |request| 
				p request.requesting_user_id
				users << User.find(request.requesting_user_id)
			end
			render json: users
		end
	end


	def sent
		requests_sent = FriendRequest.where(requesting_user_id: params[:id])
		if requests_sent.length > 0
			users = []
			requests_sent.map do |request| 
				p request.requested_user_id
				users << User.find(request.requested_user_id)
			end
			render json: users
		end
	end

	def destroy

	end
end
