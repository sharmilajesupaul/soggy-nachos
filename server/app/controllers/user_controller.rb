class UserController < ApplicationController
	def index
		render json: User.first
	end

	def create
		user = User.new(params[:user])
		if user.save
			render json: user
		else
			session[:errors] = "invalid user data"
		end
	end

	def new
	end

	def edit
	end

	def show
	end

	def destroy
	end
end
