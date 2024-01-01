class AddSocialTokenColumnToUsers < ActiveRecord::Migration[7.0]
  def change
    change_column_null :users, :password, true
  end
end
