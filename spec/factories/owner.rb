require 'faker'

FactoryBot.define do
  factory :owner do
    user { association(:user) }
    hideout { association(:hideout) }
  end
end
