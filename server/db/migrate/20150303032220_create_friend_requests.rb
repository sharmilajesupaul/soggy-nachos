class CreateFriendRequests < ActiveRecord::Migration
  def change
    create_table :friend_requests do |t|
      t.integer :requested_user_id
      t.integer :requesting_user_id

      t.timestamps
    end
  end
end
