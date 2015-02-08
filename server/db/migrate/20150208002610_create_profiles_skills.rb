class CreateProfilesSkills < ActiveRecord::Migration
  def change
    create_table :profiles_skills do |t|
  	  t.belongs_to :profile 
  	  t.belongs_to :skill
  	  
      t.timestamps
    end
  end
end
