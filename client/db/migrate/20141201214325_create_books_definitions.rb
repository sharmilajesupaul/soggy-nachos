class CreateBooksDefinitions < ActiveRecord::Migration
  def change
    create_table :books_definitions do |t|
      t.references :book
      t.references :definition
    end
  end
end
