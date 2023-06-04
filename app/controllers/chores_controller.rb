class ChoresController < ApplicationController
  def create
    begin
      chore = Chore.create(chore_params)
      render status: 201,  json: chore.to_json
    rescue
      render status: 400
    end
  end

  def destroy
    begin
      params.require(:id)
      Chore.destroy_by(id: params[:id])
      render status: 200
    rescue
      render status: 400
    end
  end

  def update
    begin
      id = params[:id]  
      chore = Chore.find_by(id: id)    
      chore.update(chore_params)
    rescue
      render status: :bad_request
    end
  end

  private

  def chore_params
    params.require(:chore).permit(:title, :description, :hideout_id, :assignee_id, :due_date)
  end
end