class CreateDefinitions < ActiveRecord::Migration
  def change
    create_table :definitions do |t|
      t.string :term
      t.string :content
      t.timestamps
    end
  end
end
