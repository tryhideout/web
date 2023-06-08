class ExpensesController < ApplicationController
  
  def create
    begin
      expense = Expense.create(expense_params)
      render status: 201, json: expense.to_json
    rescue
      render status: 400
    end
  end

  def destroy
    begin
      Expense.destroy_by(id: params[:id])
      render status: 200
    rescue
      render status: 400
    end
  end

  def update
    begin
      id = params[:id]  
      expense = Expense.find_by(id: id)    
      expense.update(expense_params)
    rescue
      render status: 400
    end
  end

  private

  def expense_params
    params.require(:expense).require(:name, :amount, :due_date, :debtor_id, :hiedeout_id, :comments)
  end

end
