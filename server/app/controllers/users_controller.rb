class UsersController < ApplicationController

	def index
		render json: User.all
	end

	def create
		user = User.new(user_params)

		skill_params.each do |skill, value|
			if value == true
				current_skill = Skill.find_or_create_by(name: skill)
				user.skills << current_skill 
				current_skill.increase_frequency
			end
		end

		if user.save
			render json: {user: user, token: create_token(user)}
			session[:user_id] = user.id
		else
			session[:errors] = "invalid user data"
		end
	end

	def update
		user = User.find(params[:id])

		user.update_attributes(user_params)

		skill_params.each do |skill, value|
			current_skill = Skill.find_or_create_by(name: skill)
			if value == true and !user.skills.include?(current_skill)
				user.skills << current_skill
				current_skill.increase_frequency
			elsif value == false and user.skills.include?(current_skill)
				user.skills.delete(current_skill)
				current_skill.decrease_frequency
			end
		end
	end

	def show
		user = User.find(params[:id])
		render json: user
	end

	def destroy
		User.destroy(params[:id])
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
	  params.require(:user).permit(:name, :email, :password)
	end

	def skill_params
	  params.require(:skills)
	end

end
