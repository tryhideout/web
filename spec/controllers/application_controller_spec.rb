require 'rails_helper'

RSpec.describe ApplicationController, type: :controller do
  describe 'GET #health' do
    it 'returns a 200 status' do
      get :health
      expect(response).to have_http_status(:ok)
    end
  end
end
