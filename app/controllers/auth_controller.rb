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

    if res.is_a?(Net::HTTPSuccess)
      redirect_to action: 'login'
    end

  end

  def login
    email = params[:email]
    password = params[:password]

    uri = URI('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAoNHxY5d3XLJ9gp-J4FmiVgqdywDKd1H4')

    res = Net::HTTP.post_form(uri, 'email' => email, 'password' => password)

    data = JSON.parse(res.body)

    if res.is_a?(Net::HTTPSuccess)
      session[:user_id] = data['localId']

      redirect_to action: 'home'
    end
  end
  
  def logout
    session.clear
    redirect_to action: 'index'
  end

end
