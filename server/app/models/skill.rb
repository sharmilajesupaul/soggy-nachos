class Skill < ActiveRecord::Base
	has_many :users, through: :profiles_skills
end
