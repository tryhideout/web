require 'net/http'
require 'uri'
require 'json'

class AuthController < ApplicationController
  @@firebaseLoginURI = URI("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=#{ENV['FIREBASE_API_KEY']}")

  def create
    email = params[:email]
    password = params[:password]

    return render status: 400 if email.nil? || password.nil?

    res = Net::HTTP.post_form(@@firebaseLoginURI, email: email, password: password)
    data = JSON.parse(res.body)

    if data.member?(:error)
      render status: 401, body: :Unauthorized
    else
      render status: 200
    end
  end
end
