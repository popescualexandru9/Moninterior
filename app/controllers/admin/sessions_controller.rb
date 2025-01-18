# frozen_string_literal: true

module Admin
  # Controller for handling admin authentication
  class SessionsController < ApplicationController
    ADMIN_PASSWORD = ENV.fetch('ADMIN_PASSWORD', 'default_password_change_me')

    def create
      if params[:password] == ADMIN_PASSWORD
        session[:admin_signed_in] = true
        redirect_to admin_projects_path, notice: t('.success')
      else
        flash.now[:alert] = t('.invalid')
        render :new, status: :unauthorized
      end
    end

    def destroy
      session[:admin_signed_in] = false
      redirect_to root_path, notice: t('.success')
    end
  end
end
