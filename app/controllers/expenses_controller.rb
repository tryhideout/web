class ExpensesController < ApplicationController
  def create
    name = params[:name]
    amount = params[:amount]
    due_date = params[:due_date]  # format: DD-MM-YYYY
    debtor_id = params[:debtor_id]
    hideout_id = params[:hideout_id]
    comments = params[:comments]

    # TODO: add middleware for hideout must exist, user must exist, and user must be in the hideout

    if name.nil? || amount.nil? || debtor_id.nil? || hideout_id.nil?
      render status: 400
    else
      expense = Expense.new(name: name, amount: amount, due_date: due_date.to_date, debtor_id: debtor_id, hideout_id: hideout_id, comments: comments)
      expense.save
      render status: :created, :json => {name: name, amount: amount, due_date: due_date, debtor_id: debtor_id, hideout_id: hideout_id, comments: comments}
    end

  end

  def destroy
  end
end
