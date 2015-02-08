class CreateProfileSkills < ActiveRecord::Migration
  def change
    create_table :profile_skills do |t|
  	  t.belongs_to :profile 
  	  t.belongs_to :skill
  	  
      t.timestamps
    end
  end
end
