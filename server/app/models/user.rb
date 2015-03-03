class User < ActiveRecord::Base

  include BCrypt

  has_many :friendships, -> { uniq }
  has_many :friends, -> { uniq }, :through => :friendships
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, -> { uniq }, :through => :inverse_friendships, :source => :user

  has_many :friend_requests
  has_many :requesting_users, :through => :friend_requests # see friend_request model
  has_many :requested_users, :through => :friend_requests # see friend_request model

  has_many :skill_users
  has_many :skills, through: :skill_users

  validates :email, presence: true, uniqueness: true
  validates :name, presence: true
  validates :password_hash, presence: true

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def authenticate(password)
    self.password == password
  end
end