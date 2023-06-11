class ExpensesController < ApplicationController
  
  def create
    begin
      params.require(:expense).require(%i[name amount due_date debtor_id comments])
      name = params[:name]
      amount = params[:amount]
      due_date = params[:due_date]
      debtor_id = params[:debtor_id]
      comments = params[:comments]
      hideout_id = params[:payload][:hideout_id]

      expense = Expense.create!(name: name, amount: amount, due_date: due_date, debtor_id: debtor_id, comments: comments, hideout_id: hideout_id)
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
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      render status: 400
    end
  end

end
