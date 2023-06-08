class ChoresController < ApplicationController
  def show
    # check that user has adequate permissions
    begin
      params.require(:id)
      id = params[:id]
      chore = Chore.find_by!(id: id)
      return render status: 200, json: chore.to_json
    rescue ActiveRecord::RecordNotFound
      return render status: 404
    end
  end

  def create
    # check that user has adequate permissions
    begin
      params.require(%i[title description assignee_email due_date])

      payload = params[:payload]
      hideout_id = payload[:hideout_id]
      due_date = params[:due_date]

      title = params[:title]
      description = params[:description]
      assignee_email = params[:assignee_email]
      assignee = User.find_by!(id: params[:assignee_email])

      chore =
        Chore.create(title: title, description: description, hideout_id: hideout_id, assignee_id: assignee.id, due_date: due_date)
      return render status: 201, json: chore.to_json
    rescue ActionController::ParameterMissing
      return render status: 400
    rescue ActiveRecord::RecordNotFound
      return render status: 404, body: 'Assignee Not Found'
    end
  end

  def update
    # check that user has adequate permissions
    begin
      params.require(%i[title description assignee_email due_date])

      id = params[:id]
      title = params[:title]
      description = params[:description]
      assignee_email = params[:assignee_email]
      due_date = params[:due_date]

      assignee = User.find_by(id: params[:assignee_email])
      return render status: 404, body: 'Assignee Not Found' if assignee.nil?

      chore = Chore.find_by!(id: id)
      chore.update(title: title, description: description, assignee_id: assignee.id, due_date: due_date)
      return render status: 200, json: chore.as_json
    rescue ActionController::ParameterMissing
      return render status: 400
    rescue ActiveRecord::RecordNotFound
      return render status: 404
    end
  end

  def destroy
    # check that user has adequate permissions
    begin
      id = params[:id]
      chore = Chore.find_by!(id: params[:id])
      chore.destroy
      return render status: 200
    rescue ActiveRecord::RecordNotFound
      return render status: 404
    end
  end
end
