class HideoutsController < ApplicationController
  @@hideout_colors = %w[red blue purple yellow green orange]

  def show
    id = params[:id]
    hideout = Hideout.find_by(id: id)
    hideout_json = hideout.as_json
    owner = Owner.find_by(hideout_id: id)
    hideout_json[:owner_id] = owner.user_id
    return render status: :ok, json: hideout_json.to_json
  end

  def users
    id = params[:id]
    users = User.where(hideout_id: id)
    return render status: :ok, json: users.to_json
  end

  def chores
    id = params[:id]
    chores = Chore.where(hideout_id: id)
    return render status: :ok, json: chores.to_json
  end

  def expenses
    id = params[:id]
    expenses = Expense.where(hideout_id: id)
    return render status: :ok, json: expenses.to_json
  end

  def create
    begin
      params.require(%i[name owner_id])

      payload = params[:payload]
      name = params[:name]
      owner_id = params[:owner_id]

      return render status: :bad_request if name.length > 20 or name.length < 3
      if !payload[:hideout_id].nil?
        return render status: :bad_request, json: ResponseHelper.generate_error_response('User already in a hideout')
      end

      hideout = Hideout.create(name: name)
      join_code = HideoutHelper.generate_join_code(hideout.id)
      hideout.update(join_code: join_code)

      owner = Owner.create(hideout_id: hideout.id, user_id: owner_id)

      owner = User.find_by(id: owner_id)
      owner.update(hideout_id: hideout.id)
      owner.update(color: @@hideout_colors.sample)

      hideout_resource_location = ResponseHelper.generate_resource_location_url('hideouts', hideout.id)
      response.set_header('Location', hideout_resource_location)

      return render status: 201, json: hideout.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: :bad_request
    end
  end

  def join
    begin
      params.require(:join_code)
      payload = params[:payload]
      user_id = payload[:id]
      join_code = params[:join_code]
      email = params[:email]

      if !payload[:hideout_id].nil?
        return render status: :bad_request, json: ResponseHelper.generate_error_response('User already in a hideout')
      end

      user = User.find_by(id: user_id)
      hideout = Hideout.find_by!(join_code: join_code)

      roommates = User.select(:color).where(['hideout_id = :hideout_id', { hideout_id: hideout.id }])
      if roommates.length() == 6
        return render status: :bad_request, json: ResponseHelper.generate_error_response('Hideout member limit reached')
      end

      user.update(hideout_id: hideout.id)
      used_colors = roommates.collect { |user| user.color }
      usable_colors = @@hideout_colors - used_colors
      user.update(color: usable_colors.sample)

      return render status: :ok
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: :bad_request
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found, json: ResponseHelper.generate_error_response('Invalid join code')
    end
  end

  def update
    begin
      params.require(%i[name owner_id])
      id = params[:id]
      name = params[:name]
      owner_id = payload[:id]

      hideout = Hideout.find_by(id: id)
      owner = Owner.find_by(hideout_id: id)
      hideout.update(name: name)

      return render status: :ok, json: hideout.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: :bad_request
    rescue ActiveRecord::RecordNotUnique
      return render status: :bad_request, json: ResponseHelper.generate_error_response('Owner already exists')
    end
  end

  def leave
    begin
      id = params[:id]
      payload = params[:payload]
      user_id = payload[:id]

      hideout = Hideout.find_by(id: id)
      user = User.find_by(id: user_id)

      user.update(hideout_id: nil, color: nil)
      Chore.where(assignee_id: user.id).update_all(assignee_id: nil)
      Expense.where(debtor_id: user.id).update_all(debtor_id: nil)
      Expense.where(creditor_id: user.id).update_all(creditor_id: nil)
      return render status: :ok
    rescue ActiveRecord::RecordNotFound
      return render status: :not_found
    end
  end

  def destroy
    id = params[:id]
    payload = params[:payload]
    user_id = payload[:id]

    user = User.find_by(id: user_id)
    user.update(color: nil)

    hideout = Hideout.find_by(id: id)
    hideout.destroy
    return render status: :ok
  end
end
