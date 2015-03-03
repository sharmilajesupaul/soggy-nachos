class FriendRequest < ActiveRecord::Base
	belongs_to :requesting_user, :class_name => "User" # one of these may need to just belong to user
	belongs_to :requested_user, :class_name => "User" # one of these may need to just belong to user

	validates :requesting_user_id, presence: true
	validates :requested_user_id, presence: true
	validate :check_not_friending_self

	private

	def check_not_friending_self
		errors.add('no friending yourself') if self.requesting_user_id == self.requested_user_id
	end
end
