class AuthController < ApplicationController
	def login
		user = User.find_by(email: params[:email])
		if user.authenticate(params[:password])
			render json: {user: user, token: create_token(user)}
		end
	end

	private

	def validate_token
	    secret = 'secret' # must be an environment variable
	    begin
	      token = request.headers['Authorization'].split(' ').last
	      JWT.decode(token, 'secret')
	    rescue JWT::DecodeError
	      head :unauthorized
	    end
	end

	def create_token(user)
	  secret = 'secret'
	  JWT.encode({user: user}, secret)
	end

	def user_params
	  params.permit(:email, :password)
	end
end
