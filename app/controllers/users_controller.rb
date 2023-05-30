require 'net/http'
require 'uri'
require 'json'

class UsersController < ApplicationController
  @@firebaseSignupURI = URI("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=#{ENV['FIREBASE_API_KEY']}")

  def create
    first_name = params[:first_name]
    last_name = params[:last_name]
    email = params[:email]
    password = params[:password]

    return render status: 400 if first_name.nil? || last_name.nil? || email.nil? || password.nil?

    res = Net::HTTP.post_form(@@firebaseSignupURI, email: email, password: password)
    data = JSON.parse(res.body)

    if data.member?(:error)
      render status: 400, body: :'Resource Already Exists'
    else
      new_user = User.new(first_name: first_name, last_name: last_name, email: email)
      new_user.save
      render status: :created, json: { first_name: first_name, last_name: last_name, email: email }
    end
  end
end
