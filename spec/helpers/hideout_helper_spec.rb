require 'rails_helper'

RSpec.describe HideoutHelper, type: :helper do
  describe '.generate_join_code' do
    it 'returns the id as a string if its hex length is >= 8' do
      id = 0x12345678
      code = HideoutHelper.generate_join_code(id)
      expect(code).to eq('12345678')
    end

    it 'generates a code with a prefix if the hex length of id is < 8' do
      id = 0x1234
      allow(Time).to receive_message_chain(:now, :nsec).and_return(123_456_789)
      code = HideoutHelper.generate_join_code(id)
      expect(code.length).to eq(8)
      expect(code).to start_with('75bc')
      expect(code).to end_with('1234')
    end
  end
end
