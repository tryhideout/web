class ExpensesController < ApplicationController
  
  def create
    begin
      create_params = params.require(:expense).permit([:name, :amount, :due_date, :debtor_id, :hideout_id, :comments])
      expense = Expense.create!(create_params)
      render status: 201, json: expense.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
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
      params.require(:expense).require(%i[name amount])
      name = params[:name]
      amount = params[:amount]
      expense = Expense.find!(params[:id])    
      expense.update!(name: name, amount: amount)
      render status: 200  
    rescue ActiveRecord::RecordNotFound
      render status: 404
    rescue ActionController::ParameterMissing 
      render status: 400
    end
  end

end
