require 'rails_helper'

RSpec.describe ResponseHelper, type: :helper do
  describe '.generate_error_response' do
    it 'adds a period if message does not end with one' do
      response = ResponseHelper.generate_error_response('Error occurred')
      expect(response).to eq({ error: 'Error occurred.' }.to_json)
    end

    it 'keeps the message as is if it ends with a period' do
      response = ResponseHelper.generate_error_response('Error occurred.')
      expect(response).to eq({ error: 'Error occurred.' }.to_json)
    end
  end

  describe '.generate_resource_location_url' do
    it 'generates the correct resource location URL' do
      resource_name = 'users'
      object_id = 1
      allow(ENV).to receive(:[]).with('API_BASE_URL').and_return('http://example.com')
      url = ResponseHelper.generate_resource_location_url(resource_name, object_id)
      expect(url).to eq('http://example.com/users/1')
    end
  end
end
