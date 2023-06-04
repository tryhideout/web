class ChoresController < ApplicationController
  def create
    begin
      #hideout_id = params[:payload]
      params.require(%i[title description hideout_id assignee_email due_date])
      assignee_id = User.find_by(id: params[:assignee_email])
      chore = Chore.create(title: params[:title], description: params[:description], hideout_id: params[:hideout_id], assignee_id: params[:assignee_id], due_date: params[:due_date])
      render status: 201,  json: chore.to_json
    rescue ActionController::ParameterMissing => e
      puts e
      render status: 400
    end
  end

  
  def update
    #Assume that user, chore and hideout exist

    begin
      #hideout_id = params[:payload]
      id = params[:id] 
      params.require(%i[title description hideout_id assignee_email due_date]) 
      assignee_id = User.find_by(id: params[:assignee_email])
      chore = Chore.find_by(id: id)    
      chore.update(title: params[:title], description: params[:description], hideout_id: params[:hideout_id], assignee_id: params[:assignee_id], due_date: params[:due_date])
      render status: 200
    rescue
      render status: 400
    end
  end

def destroy
  #Assume that user, chore and hideout exist
  begin
    params.require(:id)
    Chore.destroy_by(id: params[:id])
    render status: 200
  rescue
    render status: 400
  end
end
end