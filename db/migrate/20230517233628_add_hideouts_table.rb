class AddHideoutsTable < ActiveRecord::Migration[7.0]
  def change
    create_table :hideouts do |t|
      t.string :name, null: false, index: {unique: true}
      t.references :owner, null: false, foreign_key: {to_table: :users, on_delete: :cascade}, index: {unique: true}
    end
  end
end
