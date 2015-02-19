class SkillsController < ApplicationController

	def index
		user = User.find(params[:user_id])
		skills = user.skills
		
		render json: skills
	end

	def edit
		user = User.find(params[:user_id])
	end

	def show
		user = User.find(params[:user_id])
		skill = Skill.find(params[:id])
	end

	def update
		user = User.find(params[:user_id])
		skill = Skill.find(params[:id])
	end

	def destroy
		user = User.find(params[:user_id])
		skill = Skill.find(params[:id])
	end

end
