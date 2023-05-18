require 'net/http'
require 'uri'
require 'json'

class AuthController < ApplicationController
  def index
  end

  def signup
    email = params[:email]
    password = params[:password]

    uri = URI('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAoNHxY5d3XLJ9gp-J4FmiVgqdywDKd1H4')

    res = Net::HTTP.post_form(uri, 'email' => email, 'password' => password)

    data = JSON.parse(res.body)

    puts data

    # if res.is_a?(Net::HTTPSuccess)
    #   redirect_to action: 'login'
    
    render status: :created

  end

  def login
    email = params[:email]
    password = params[:password]

    uri = URI('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoNHxY5d3XLJ9gp-J4FmiVgqdywDKd1H4')

    res = Net::HTTP.post_form(uri, 'email' => email, 'password' => password)

    data = JSON.parse(res.body)

    # if res.is_a?(Net::HTTPSuccess)
    #   session[:user_id] = data['localId']

    puts data

    render status: 200
  end
  
  def logout
    session.clear
    redirect_to action: 'index'
  end

end