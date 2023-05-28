require 'uri'
require 'json'

class ApplicationController < ActionController::API
  def health
    render status: :ok
  end
end
