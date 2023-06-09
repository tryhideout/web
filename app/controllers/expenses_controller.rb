class ExpensesController < ApplicationController
  
  def create
    begin
      create_params = params.require(:expense).permit([:name, :amount, :due_date, :debtor_id, :hideout_id, :comments])
      expense = Expense.create!(create_params)
      render status: 201, json: expense.to_json
    rescue
      render status: 400
    end
  end

  def destroy
    begin
      expense = Expense.find!(params[:id])
      expense.destroy
      render status: 200
    rescue ActiveRecord::RecordNotFound
      render status: 404
    end
  end

  def update
    begin
      update_params = params.require(:expense).permit([:name, :amount, :due_date, :debtor_id, :hideout_id, :comments])
      expense = Expense.find!(params[:id])    
      expense.update!(expense_params)
      render status: 200
    rescue
      render status: 400
    end
  end

end
