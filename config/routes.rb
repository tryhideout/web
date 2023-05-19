Rails.application.routes.draw do
  root "auth#signup"

  post "/sessions", to: "auth#login"
  post "/users", to: "auth#signup"
  delete "/sessions", to: "auth#logout"
end
