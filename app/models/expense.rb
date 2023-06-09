class Expense < ActiveRecord::Base 
    validates :name, :amount, :hideout_id, presence: {strict: true}
    
    self.table_name = "expenses"
end
