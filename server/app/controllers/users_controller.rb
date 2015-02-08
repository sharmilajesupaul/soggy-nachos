class UsersController < ApplicationController
	def index
		render json: User.first
	end

	def create
		user = User.new(user_params)
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

	private

	def user_params
	  params.require(:user).permit(:name, :email, :password)
	end
end
