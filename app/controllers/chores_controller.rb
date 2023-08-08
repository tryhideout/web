class ChoresController < ApplicationController
  def show
    id = params[:id]
    chore = Chore.find_by(id: id)
    return render status: 200, json: chore.as_json
  end

  def create
    begin
      params.require(%i[name description hideout_id status])

      name = params[:name]
      description = params[:description]
      assignee_id = params[:assignee_id]
      hideout_id = params[:hideout_id]
      due_date = params[:due_date]
      status = params[:status]

      if !assignee_id.nil?
        assignee = User.find_by!(id: params[:assignee_id])
        return render status: 400, body: 'Assignee Not In Hideout' if assignee.hideout_id != hideout_id
      end

      chore =
        Chore.create(
          name: name,
          description: description,
          hideout_id: hideout_id,
          assignee_id: assignee_id,
          due_date: due_date,
          status: status,
        )
      return render status: 201, json: chore.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
    rescue ActiveRecord::RecordNotFound
      return render status: 404, body: 'Assignee Not Found'
    end
  end

  def update
    begin
      params.require(%i[name description hideout_id status])

      id = params[:id]
      name = params[:name]
      hideout_id = params[:hideout_id]
      description = params[:description]
      assignee_id = params[:assignee_id]
      due_date = params[:due_date]
      status = params[:status]

      if !assignee_id.nil?
        assignee = User.find_by!(id: assignee_id)
        return render status: 400, body: 'Assignee Not In Hideout' if assignee.hideout_id != hideout_id
      end

      chore = Chore.find_by(id: id)
      chore.update(name: name, description: description, assignee_id: assignee_id, due_date: due_date, status: status)
      return render status: 200, json: chore.as_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
    rescue ActiveRecord::RecordNotFound
      return render status: 404, body: 'Assignee Not Found'
    end
  end

  def destroy
    id = params[:id]
    chore = Chore.find_by(id: params[:id])
    chore.destroy
    return render status: 200
  end
end
