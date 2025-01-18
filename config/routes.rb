# frozen_string_literal: true

Rails.application.routes.draw do
  root 'landing#index'

  namespace :admin do
    get 'login', to: 'sessions#new', as: :new_session
    post 'login', to: 'sessions#create', as: :session
    delete 'session', to: 'sessions#destroy', as: :destroy_session

    resources :projects do
      resources :project_images, only: %i[create destroy]
    end
  end

  # Public routes
  resources :projects, only: %i[index]
end
