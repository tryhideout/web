class ExpensesController < ApplicationController
  
  def create
    begin
      expense = Expense.create(expense_params)
      render status: :created, json: expense.to_json
    rescue
      render status: 400
    end
  end

  def destroy
    begin
      params.require(:id)
      Expense.destroy_by(id: params[:id])
      render status: :ok
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
    params.require(:expense).permit(:name, :amount, :due_date, :debtor_id, :hideout_id, :comments)
  end

end
