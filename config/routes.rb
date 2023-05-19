Rails.application.routes.draw do
  post "/sessions", to: "auth#login"
  post "/users", to: "auth#signup"
  delete "/sessions", to: "auth#logout"

  post 'hideout/create'
  delete 'hideout/destroy'
  put 'hideout/rename'

end
