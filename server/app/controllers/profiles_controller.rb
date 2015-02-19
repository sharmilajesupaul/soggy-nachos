class ProfilesController < ApplicationController
	,
	def index
		user = User.find(params[:user_id])
		profile = Profile.find_by(user: user)
		render json: profile
	end

	def create
		user = User.find(params[:user_id])
		profle = Profile.new(user: user)
		if profile.save
			render json: profile
		else
			session[:errors] = "invalid profile data"
		end
	end

	def edit
		profile = Profile.find(params[:id])
	end

	def show
		profile = Profile.find(params[:id])
	end

	def update
		profile = Profile.find(params[:id])
	end

	def destroy
		Profile.destroy(params[:id])
	end

end
