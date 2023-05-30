class ExpensesController < ApplicationController
  def create
    name = params[:name]
    amount = params[:amount]
    due_date = params[:due_date]  # format: DD-MM-YYYY
    debtor_email = params[:debtor_email]
    hideout_id = params[:hideout_id]
    comments = params[:comments]

    # TODO: add middleware for hideout must exist, user must exist, and user must be in the hideout

    if name.nil? || amount.nil? || debtor_id.nil? || hideout_id.nil?
      render status: 400
    else
      debtor_id = User.find_by(email: debtor_email).id
      expense = Expense.new(name: name, amount: amount, due_date: due_date.to_date, debtor_id: debtor_id, hideout_id: hideout_id, comments: comments)
      expense.save
      render status: :created, :json => {name: name, amount: amount, due_date: due_date, debtor_id: debtor_id, hideout_id: hideout_id, comments: comments}
    end

  end

  def destroy
    # TODO: add middleware to check if expense exists
    id = params[:id] 
    Expense.destroy_by(id: id)
    render status: :ok
  end

  def update
    id = params[:id]  

    # TODO: add middleware for checking if user exists and expense exists 

    expense = Expense.find_by(id: id)    
    if params.has_key?(:name)
      expense.update(name: params[:name])
    end
    if params.has_key?(:amount)
      expense.update(amount: params[:amount])
    end
    if params.has_key?(:due_date)  # format: DD-MM-YYYY
      expense.update(due_date: params[:due_date].to_date)
    end
    if params.has_key?(:debtor_email)
      debtor_id = User.find_by(debtor_email).id
      expense.update(debtor_id: debtor_id)
    end
    if params.has_key?(:comments)
      expense.update(comments: params[:comments])
    end

    render status: :ok
  end

end
