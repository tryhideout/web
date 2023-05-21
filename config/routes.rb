Rails.application.routes.draw do
  post "/sessions", to: "auth#login"
  post "/users", to: "auth#signup"
  delete "/sessions", to: "auth#logout"

  post 'hideout/create'
  delete 'hideout/destroy'
  put 'hideout/rename'
  post "/hideout/add", to: "hideout#add"
  post "/hideout/leave", to: "hideout#leave"



end
