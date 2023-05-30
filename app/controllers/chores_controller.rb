class ChoresController < ApplicationController
  def create
    title = params[:title]
    description = params[:description]
    due_date = params[:due_date]
    assignee_email = params[:assignee_email]
    hideout_id = params[:hideout_id]

    if title.nil? || hideout_id.nil?
      render status: 400
    else
      if assignee_email.nil?
        assignee_id = nil
      else
        assignee_id = User.find_by(email: assignee_email).id
      end
      chore = Chore.create(title: title, description: description, due_date: due_date, assignee_id: assignee_id, hideout_id: hideout_id)
      chore.save
      render status: :created, :json => {title: title, description: description, due_date: due_date, assignee_email: assignee_email, hideout_id: hideout_id}
    end
  end

  def update
    params.require(:id)
    id = params[:id]

    chore = Chore.find_by(id: id)

    if params.has_key?(:title)
      chore.title = params[:title]
    end
    if params.has_key?(:description)
      chore.description = params[:description]
    end
    if params.has_key?(:due_date)
      chore.due_date = params[:due_date]
    end
    if params.has_key?(:assignee_email)
      chore.assignee_id = User.find_by(email: params[:assignee_email]).id
    end

    chore.save

    render status: :ok

  end

  def destroy
  end
end
