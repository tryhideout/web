require 'exceptions'

class ExpensesController < ApplicationController
  def show
    id = params[:id]
    expense = Expense.find_by(id:)
    render status: :ok, json: expense.to_json
  end

  def create
    params.require(%i[name amount active])
    name = params[:name]
    amount = params[:amount]
    due_date = params[:due_date]
    debtor_id = params[:debtor_id]
    creditor_id = params[:creditor_id]
    comments = params[:comments]
    active = params[:active]
    hideout_id = params[:payload][:hideout_id]

    expense =
      Expense.new_expense(
        name:,
        amount:,
        due_date:,
        debtor_id:,
        creditor_id:,
        comments:,
        active:,
        hideout_id:
      )

    expense_resource_location = ResponseHelper.generate_resource_location_url('expenses', expense.id)
    response.set_header('Location', expense_resource_location)

    render status: :created, json: expense.jsonify
  rescue ActiveRecord::RecordNotFound
    render status: :not_found, json: ResponseHelper.generate_error_response('Debtor or creditor not found.')
  rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  end

  def update
    params.require(%i[name amount hideout_id active])
    name = params[:name]
    amount = params[:amount]
    due_date = params[:due_date]
    debtor_id = params[:debtor_id]
    creditor_id = params[:creditor_id]
    comments = params[:comments]
    active = params[:active]

    expense = Expense.find_by(id:)
    expense.update_expense(
      name:,
      amount:,
      due_date:,
      debtor_id:,
      creditor_id:,
      comments:,
      active:
    )
    render status: :ok
  rescue ActiveRecord::RecordNotFound
    render status: :not_found, json: ResponseHelper.generate_error_response('Debtor or creditor not found.')
  rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => e
    render status: :bad_request, json: ResponseHelper.generate_error_response(e.message)
  end

  def destroy
    id = params[:id]
    expense = Expense.find_by(id:)
    expense.destroy
    render status: :no_content
  end
end
