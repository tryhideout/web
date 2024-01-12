require 'exceptions'

class ExpensesController < ApplicationController
  def show
    id = params[:id]
    expense = Expense.find_by(id: id)
    return render status: :ok, json: expense.to_json
  end

  def create
    begin
      params.require(%i[name amount active])
      name, amount, due_date, debtor_id, creditor_id, comments, active, hideout_id =
        params[:name],
        params[:amount],
        params[:due_date],
        params[:debtor_id],
        params[:creditor_id],
        params[:comments],
        params[:active],
        params[:payload][:hideout_id]

      expense =
        Expense.new_expense(
          name: name,
          amount: amount,
          due_date: due_date,
          debtor_id: debtor_id,
          creditor_id: creditor_id,
          comments: comments,
          active: active,
          hideout_id: hideout_id,
        )

      expense_resource_location = ResponseHelper.generate_resource_location_url('expenses', expense.id)
      response.set_header('Location', expense_resource_location)

      return render status: 201, json: expense.jsonify
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('Debtor or creditor not found.')
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    end
  end

  def update
    begin
      params.require(%i[name amount hideout_id active])
      name, amount, due_date, debtor_id, creditor_id, comments, active =
        params[:name],
        params[:amount],
        params[:due_date],
        params[:debtor_id],
        params[:creditor_id],
        params[:comments],
        params[:active]

      expense = Expense.find_by(id: id)
      expense.update_expense(
        name: name,
        amount: amount,
        due_date: due_date,
        debtor_id: debtor_id,
        creditor_id: creditor_id,
        comments: comments,
        active: active,
      )
      return render status: :ok
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('Debtor or creditor not found.')
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed, Exceptions::ModelException => error
      return render status: :bad_request, json: ResponseHelper.generate_error_response(error.message)
    end
  end

  def destroy
    id = params[:id]
    expense = Expense.find_by(id: id)
    expense.destroy
    return render status: :no_content
  end
end
