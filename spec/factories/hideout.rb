require 'faker'

FactoryBot.define do
  factory :hideout do
    name { Faker::Lorem.word }
    join_code { Faker::Alphanumeric.alphanumeric(number: 8).upcase }
  end
end
