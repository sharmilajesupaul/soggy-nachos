class SkillsController < ApplicationController

	def index
		user = User.find(params[:user_id])
		profile = Profile.find(params[:profile_id])
		profile_skills = profile.profile_skills
		skills = profile_skills.map{ |profile_skill| profile_skill.skill }
		render json: skills
	end

	def create
		user = User.find(params[:user_id])
		profile = Profile.find(params[:profile_id])
		skills = params[:skills] # receiving array of skill ids from user signup?
		skills.each do |skill_id|
			skill.find(skill_id)
			profile_skill = Profile_Skill.new(profile: profile, skill: skill_id)
			if profile_skill.save
				
			else
				session[:errors] = "invalid profile data"
			end
		end
	end

	def edit
		user = User.find(params[:user_id])
		profile = Profile.find(params[:profile_id])
		profile_skills = profile.profile_skills
	end

	def show
		user = User.find(params[:user_id])
		profile = Profile.find(params[:profile_id])
		skill = Skill.find(params[:id])
	end

	def update
		user = User.find(params[:user_id])
		profile = Profile.find(params[:profile_id])
		skill = Skill.find(params[:id])
	end

	def destroy
		user = User.find(params[:user_id])
		profile = Profile.find(params[:profile_id])
		skill = Skill.find(params[:id])
	end


end
