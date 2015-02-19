class UsersController < ApplicationController

	def index
		render json: User.all
	end

	def create
		user = User.new(user_params)
		
		params[:skills].each do |skill|
			user.skills << Skill.find_or_create_by(name: skill.name)
		end
		
		if user.save
			session[:user_id] = user.id
		else
			session[:errors] = "invalid user data"
		end
	end

	def edit
		user = User.find(params[:id])
		user.update_attributes(params[:user])
	end

	def show
		user = User.find(params[:id])
		render json: user
	end

	def destroy
		User.destroy(params[:id])
	end

	# def login
	# 	user = User.find_by(email: params[:email])
	# 	if user.authenticate(params[:password])

	# 	end
	# end

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
	  JWT.encode(user, secret)
	end

	def user_params
	  params.require(:user).permit(:name, :email, :password)
	end

	def skill_params
	  params.require(:skills)
	end

end
