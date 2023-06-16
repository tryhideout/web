class ApplicationController < ActionController::API
  def health
    render status: 200
  end
end
