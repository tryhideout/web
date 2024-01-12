require_relative 'rails_helper'

RSpec.describe 'Factories' do
  it 'creates a valid owner' do
    owner = FactoryBot.build(:owner)
    expect(owner).to be_valid
  end

  it 'creates a valid user' do
    user = FactoryBot.build(:user)
    expect(user).to be_valid
  end

  it 'creates a valid hideout' do
    hideout = FactoryBot.build(:hideout)
    expect(hideout).to be_valid
  end

  it 'creates a valid chore' do
    chore = FactoryBot.build(:chore)
    expect(chore).to be_valid
  end

  it 'creates a valid expense' do
    expense = FactoryBot.build(:expense)
    expect(expense).to be_valid
  end
end
