require 'test_helper'

class UsersControllerTest < ActionController::TestCase
  test "post route" do
    post(:create, user: {name: 'a', email: 'e', password: 'p'})

    assert_not_nil User.find_by(email: 'e')
  end
end
