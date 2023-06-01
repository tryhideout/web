class ChoresController < ApplicationController
  def create
    params.require(:chore).permit(:title, :hideout_id)

    title = params[:title]
    description = params[:description]
    due_date = params[:due_date]
    assignee_email = params[:assignee_email]
    hideout_id = params[:hideout_id]
   
    if assignee_email.nil?
      assignee_id = nil
    else
      assignee_id = User.find_by(email: assignee_email).id
    end
    
    chore = Chore.create(title: title, description: description, due_date: due_date, assignee_id: assignee_id, hideout_id: hideout_id)
    chore.save
    render status: 201, :json => {title: title, description: description, due_date: due_date, assignee_email: assignee_email, hideout_id: hideout_id}
    
  end

  def update
    params.require(:id)
    id = params[:id]
  
    # TODO: add middleware for checking if user exists and chore exists
  
    chore = Chore.find_by(id: id)
  
    if chore.update(params.require(:chore).permit(:title, :description, :due_date, :assignee_email, :hideout_id))
      render status: 200
    end
  end
  

  def destroy
    params.require(:id)
    id = params[:id]

    Chore.find_by(id: id).destroy

    render status: 200
  end
end
