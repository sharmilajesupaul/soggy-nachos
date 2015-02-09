class Profile < ActiveRecord::Base
	belongs_to :user
	has_many :profile_skills
	has_many :skills, through: :profile_skills
end
