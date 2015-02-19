class Skill < ActiveRecord::Base
	has_many :skill_users
	has_many :users, through: :skill_users

	def increase_frequency
		self.frequency += 1
		self.save
	end

	def decrease_frequency
		self.frequency -= 1
		self.save
	end
end
