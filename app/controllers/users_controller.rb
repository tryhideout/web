require 'net/http'
require 'uri'
require 'json'

require_relative '../helpers/auth_helper.rb'
require_relative '../../lib/exceptions.rb'

include ActionController::Cookies

class UsersController < ApplicationController
  @@firebaseSignupURI = URI("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{ENV['FIREBASE_API_KEY']}")

  def create
    first_name = params[:first_name]
    last_name = params[:last_name]
    email = params[:email]
    password = params[:password]

    return render status: 400 if first_name.nil? || last_name.nil? || email.nil? || password.nil?

    begin
      new_user = User.new(first_name: first_name, last_name: last_name, email: email)
      new_user.save

      response = Net::HTTP.post_form(@@firebaseSignupURI, email: email, password: password)
      raise Exceptions::FirebaseNotUniqueError if response.code == '400'

      render status: :created, json: new_user.as_json
    rescue ActiveRecord::RecordNotUnique
      render status: 400, body: 'Resource Already Exists'
    rescue Exceptions::FirebaseNotUniqueError
      new_user.destroy
      render status: 400, body: 'Resource Already Exists'
    end
  end
end
