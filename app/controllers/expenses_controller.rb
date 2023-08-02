class ExpensesController < ApplicationController
  def create
    begin
      params.require(%i[name amount hideout_id active])
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
        return render status: 400, body: 'Debtor Not In Hideout' if debtor.hideout_id != hideout_id
      end

      if !creditor_id.nil?
        creditor = User.find_by!(id: creditor_id)
        return render status: 400, body: 'Creditor Not In Hideout' if creditor.hideout_id != hideout_id
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
      return render status: 201, json: expense.to_json
    rescue ActiveRecord::RecordNotFound
      return render status: 404
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
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
        return render status: 400, body: 'Debtor Not In Hideout' if debtor.hideout_id != hideout_id
      end

      if !creditor_id.nil?
        creditor = User.find_by!(id: creditor_id)
        return render status: 400, body: 'Creditor Not In Hideout' if creditor.hideout_id != hideout_id
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
      return render status: 200
    rescue ActiveRecord::RecordNotFound
      return render status: 404
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
    end
  end

  def destroy
    id = params[:id]
    expense = Expense.find_by(id: id)
    expense.destroy
    return render status: 200
  end
end
