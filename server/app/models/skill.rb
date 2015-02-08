class Skill < ActiveRecord::Base
	has_many :profile_skills
	has_many :profiles, through: :profile_skills
end
