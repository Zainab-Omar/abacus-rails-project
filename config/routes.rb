Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'application#home'

  #new user sign up page
  get '/signup' => 'users#new'

  #Routes for user login form, logging user in, and logging user out
  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'

  #omniauth login
  get '/auth/:provider/callback' => 'sessions#create'

  resources :users, only: [:create, :show]

  #route for most_popular group list
  get '/groups/most_popular' => 'groups#most_popular'
  #route for just group expense list for jquery
  get '/groups/:id/lists' => 'groups#list'

  get '/allgrouplist' => 'groups#index'


  resources :groups, except: [:show]  do
    resources :expenses
  end

  resources :groups, only: [:show]

  resources :memberships, only: [:new, :create] #-> domain.com/2/memberships/new
end
