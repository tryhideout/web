Rails.application.routes.draw do
  post "/sessions", to: "auth#login"
  post "/users", to: "auth#signup"
  delete "/sessions", to: "auth#logout"

  post '/hideout', to: "hideouts#create"
  delete 'hideout', to: "hideouts#destroy"
  put 'hideout/rename', to: "hideouts#rename"
  put "/hideout/users", to: "hideouts#add"
  delete "/hideout/users", to: "hideouts#leave"
  delete "/hideout/destroy", to: "hideouts#destroy"

end




