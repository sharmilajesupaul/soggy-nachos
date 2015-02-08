class Profile < ActiveRecord::Base
	belongs_to :user
	has_many :skills, through: :profiles_skills
end
