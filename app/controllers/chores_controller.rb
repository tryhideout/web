class ChoresController < ApplicationController
  def show
    # check that chore exists and user has adequate permissions
    begin
      params.require(:id)
      id = params[:id]
      chore = Chore.find_by(id: id)
      return render status: 200, json: chore.to_json
    rescue ActionController::ParameterMissing
      return render status: 400
    end
  end

  def create
    begin
      payload = params[:payload]
      hideout_id = params[:hideout_id]
      params.require(%i[title description hideout_id assignee_email due_date])

      title = params[:title]
      description = params[:description]
      hideout_id = params[:hideout_id]
      assignee_email = params[:assignee_email]
      assignee_id = User.find_by(id: params[:assignee_email])
      due_date = params[:due_date]

      chore = Chore.create(title: title, description: description, hideout_id: hideout_id, assignee_id: assignee_id, due_date: due_date)
      return render status: 201,  json: chore.to_json
    rescue ActionController::ParameterMissing 
      return render status: 400
    end
  end

  
  def update
    # check that chore exists and user has adequate permissions
    begin
      params.require(%i[id title description assignee_email due_date]) 
      id = params[:id] 

      title = params[:title]
      description = params[:description]
      assignee_email = params[:assignee_email]
      assignee_id = User.find_by(id: params[:assignee_email])
      due_date = params[:due_date]

      chore = Chore.find_by(id: id)    
      chore.update(title: title, description: description, assignee_id: assignee_id, due_date: due_date)
      return render status: 200
    rescue ActionController::ParameterMissing
      return render status: 400
    end
  end

  def destroy
    # check that chore exists and user has adequate permissions
    begin
      params.require(:id)
      Chore.destroy_by(id: params[:id])
      return render status: 200
    rescue ActionController::ParameterMissing
      return render status: 400
    end
  end
end
