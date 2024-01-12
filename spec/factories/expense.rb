require 'faker'

FactoryBot.define do
  factory :expense do
    name { Faker::Lorem.sentence }
    amount { Faker::Number.decimal(l_digits: 3, r_digits: 2) }
    due_date { Faker::Time.forward(days: 14) }
    hideout { association(:hideout) }
    comments { Faker::Lorem.characters(number: 100) }
    active { true }
  end
end
