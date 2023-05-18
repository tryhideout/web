class AddChoresTable < ActiveRecord::Migration[7.0]
  def change
    create_table :chores do |t|
      t.string :title, null: false
      t.string :description, null: true
      t.datetime :due_date, null: true
    end
  end
end
