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
    rescue ActionController::ParameterMissing
      render status: 400
    rescue ActiveRecord::RecordNotUnique
      render status: 400, body: 'Resource Already Exists'
    rescue Exceptions::FirebaseNotUniqueError
      new_user.destroy
      render status: 400, body: 'Resource Already Exists'
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
      hideout = Hideout.find_by(join_code: join_code)
      user.update(hideout_id: hideout.id)
      render status: :ok
    rescue ActionController::ParameterMissing
      render status: 400
    rescue ActiveRecord::RecordNotFound
      return render status: 400, body: 'Invalid Join Code'
    end
  end

  def leave
    id = params[:id]
    payload = params[:payload]

    # TODO: check if user is in hideout
    # TODO: if so, retrieve hideout_id
    # TODO: finish migration AllowNullDebtorId
    # TODO: delete set assignee_id / debtor_id to nil for all expenses / chores related to user
  end
end
