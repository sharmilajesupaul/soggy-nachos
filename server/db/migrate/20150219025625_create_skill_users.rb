class CreateSkillUsers < ActiveRecord::Migration
  def change
    create_table :skill_users do |t|
      t.belongs_to :skill 
      t.belongs_to :user 
      
      t.timestamps
    end
  end
end
