require 'rails_helper'

RSpec.describe MiddlewareHelper, type: :helper do
  describe '.retrieve_request_details' do
    let(:request) { double('request', method: 'GET', path: '/users/1', params: { payload: 'data' }) }

    it 'retrieves request details' do
      details = MiddlewareHelper.retrieve_request_details(request)
      expect(details).to eq([%w[GET /users/1], 1, 'data'])
    end
  end
end
