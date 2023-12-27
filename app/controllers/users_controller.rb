require 'net/http'
require 'uri'
require 'json'

require_relative '../helpers/auth_helper.rb'
require_relative '../helpers/response_helper.rb'
require_relative '../../lib/exceptions.rb'

include ActionController::Cookies

class UsersController < ApplicationController
  @@firebase_signup_URI =
    URI("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{ENV['FIREBASE_API_KEY']}")
  @@hideout_colors = %w[red blue purple yellow green orange]

  def show
    id = params[:id]
    user = User.find_by(id: id)
    return render status: 200, json: user.to_json
  end

  def create
    begin
      params.require(%i[first_name last_name email password])
      first_name = params[:first_name]
      last_name = params[:last_name]
      email = params[:email]
      password = params[:password]

      new_user = User.create!(first_name: first_name, last_name: last_name, email: email)

      firebase_response = Net::HTTP.post_form(@@firebase_signup_URI, email: email, password: password)
      raise Exceptions::FirebaseNotUniqueError if firebase_response.code == '400'

      user_resource_location = ResponseHelper.generate_resource_location_url('users', new_user.id)
      response.set_header('Location', user_resource_location)

      render status: :created, json: new_user.to_json
    rescue ActionController::ParameterMissing, ActiveModel::StrictValidationFailed
      return render status: 400
    rescue ActiveRecord::RecordNotUnique
      return render status: 400, json: ResponseHelper.generate_error_response('User already exists')
    rescue Exceptions::FirebaseNotUniqueError
      new_user.destroy
      return render status: 400, json: ResponseHelper.generate_error_response('User already exists')
    end
  end
end
