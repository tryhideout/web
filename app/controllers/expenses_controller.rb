require_relative '../helpers/hideout_helper.rb'
class ExpensesController < ApplicationController
  def show
    id = params[:id]
    expense = Expense.find_by(id: id)
    return render status: :ok, json: expense.to_json
  end

  def create
    begin
      params.require(%i[name amount active])
      name = params[:name]
      amount = params[:amount]
      due_date = params[:due_date]
      debtor_id = params[:debtor_id]
      creditor_id = params[:creditor_id]
      comments = params[:comments]
      active = params[:active]
      hideout_id = params[:payload][:hideout_id]

      if !debtor_id.nil?
        debtor = User.find_by!(id: debtor_id)
        if debtor.hideout_id != hideout_id
          return render status: :bad_request, json: ResponseHelper.generate_error_response('Debtor not found')
        end
      end

      if !creditor_id.nil?
        creditor = User.find_by!(id: creditor_id)
        if creditor.hideout_id != hideout_id
          return render status: :bad_request, json: ResponseHelper.generate_error_response('Creditor not found')
        end
      end

      expense =
        Expense.create(
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

      return render status: 201, json: expense.to_json
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: :bad_request
    end
  end

  def update
    begin
      params.require(%i[name amount hideout_id active])
      name = params[:name]
      amount = params[:amount]
      due_date = params[:due_date]
      debtor_id = params[:debtor_id]
      creditor_id = params[:creditor_id]
      comments = params[:comments]
      active = params[:active]

      if !debtor_id.nil?
        debtor = User.find_by!(id: debtor_id)
        if debtor.hideout_id != hideout_id
          return render status: :bad_request, json: ResponseHelper.generate_error_response('Debtor not in hideout')
        end
      end

      if !creditor_id.nil?
        creditor = User.find_by!(id: creditor_id)
        if creditor.hideout_id != hideout_id
          return render status: :bad_request, json: ResponseHelper.generate_error_response('Creditor not in hideout')
        end
      end

      expense = Expense.find_by(id: id)
      expense.update(
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
      return render status: :not_found
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: :bad_request
    end
  end

  def destroy
    id = params[:id]
    expense = Expense.find_by(id: id)
    expense.destroy
    return render status: :ok
  end
end
