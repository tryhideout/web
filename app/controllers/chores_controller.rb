class ChoresController < ApplicationController
  def show
    id = params[:id]
    chore = Chore.find_by(id: id)
    return render status: 200, json: chore.to_json
  end

  def create
    begin
      params.require(%i[name description assignee_email due_date])

      payload = params[:payload]
      hideout_id = payload[:hideout_id]
      due_date = params[:due_date]

      name = params[:name]
      description = params[:description]
      assignee_email = params[:assignee_email]
      assignee = User.find_by!(id: params[:assignee_email])

      chore =
        Chore.create(name: name, description: description, hideout_id: hideout_id, assignee_id: assignee.id, due_date: due_date)
      return render status: 201, json: chore.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
    rescue ActiveRecord::RecordNotFound
      return render status: 404, body: 'Assignee Not Found'
    end
  end

  def update
    begin
      params.require(%i[name description assignee_email due_date])

      id = params[:id]
      name = params[:name]
      description = params[:description]
      assignee_email = params[:assignee_email]
      due_date = params[:due_date]

      assignee = User.find_by(id: params[:assignee_email])
      return render status: 404, body: 'Assignee Not Found' if assignee.nil?

      chore = Chore.find_by(id: id)
      chore.update(name: name, description: description, assignee_id: assignee.id, due_date: due_date)
      return render status: 200, json: chore.as_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
    end
  end

  def destroy
    id = params[:id]
    chore = Chore.find_by(id: params[:id])
    chore.destroy
    return render status: 200
  end
end
