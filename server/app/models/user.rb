class User < ActiveRecord::Base
  include BCrypt
  has_many :skill_users
  has_many :skills, through: :skill_users
  # validates :email, presence: true, uniqueness: true
  # users.password_hash in the database is a :string

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