Rails.application.routes.draw do
  post "/sessions", to: "auth#login"
  post "/users", to: "auth#signup"
  delete "/sessions", to: "auth#logout"

  post '/hideout', to: "hideout#create"
  delete 'hideout', to: "hideout#destroy"
  put 'hideout/rename', to: "hideout#rename"
  put "/hideout/users", to: "hideout#add"
  delete "/hideout/users", to: "hideout#leave"
  delete "/hideout/destroy", to: "hideout#destroy"

end




