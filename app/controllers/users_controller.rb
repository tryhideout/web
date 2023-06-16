require 'net/http'
require 'uri'
require 'json'

require_relative '../helpers/auth_helper.rb'
require_relative '../../lib/exceptions.rb'

include ActionController::Cookies

class UsersController < ApplicationController
  @@firebaseSignupURI = URI("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{ENV['FIREBASE_API_KEY']}")

  def create
    begin
      params.require(%i[first_name last_name email password])
      first_name = params[:first_name]
      last_name = params[:last_name]
      email = params[:email]
      password = params[:password]

      new_user = User.create(first_name: first_name, last_name: last_name, email: email)

      response = Net::HTTP.post_form(@@firebaseSignupURI, email: email, password: password)
      raise Exceptions::FirebaseNotUniqueError if response.code == '400'

      render status: :created, json: new_user.as_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
    rescue ActiveRecord::RecordNotUnique
      return render status: 400, body: 'Resource Already Exists'
    rescue Exceptions::FirebaseNotUniqueError
      new_user.destroy
      return render status: 400, body: 'Resource Already Exists'
    end
  end

  def join
    begin
      params.require(:join_code)
      id = params[:id]
      payload = params[:payload]
      join_code = params[:join_code]
      email = params[:email]

      return render status: 400, body: 'User Already In Hideout' if !payload[:hideout_id].nil?

      user = User.find_by(id: id)
      hideout = Hideout.find_by!(join_code: join_code)
      user.update(hideout_id: hideout.id)
      return render status: :ok
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
    rescue ActiveRecord::RecordNotFound
      return render status: 400, body: 'Invalid Join Code'
    end
  end

  def leave
    begin
      id = params[:id]
      payload = params[:payload]

      hideout_id = payload[:hideout_id]
      hideout = Hideout.find_by!(id: hideout_id)
      user = User.find_by(id: id)

      user.update(hideout_id: nil)
      Chore.where(assignee_id: id).update_all(assignee_id: nil)
      Expense.where(debtor_id: id).update_all(debtor_id: nil)
      Expense.where(creditor_id: id).update_all(creditor_id: nil)
      return render status: 200
    rescue ActiveRecord::RecordNotFound
      return render status: 400
    end
  end
end
