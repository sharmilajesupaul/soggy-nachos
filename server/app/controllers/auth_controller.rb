class AuthController < ApplicationController
	def login
		user = User.find_by(email: params[:email])
		if user.authenticate(params[:password])
			puts 'asmakdmae'
		end
	end

	private

	def user_params
	  params.permit(:email, :password)
	end
end
