# frozen_string_literal: true

require 'bcrypt'

module Admin
  # Controller for handling admin authentication
  class SessionsController < ApplicationController
    ADMIN_PASSWORD_HASH = ENV.fetch('ADMIN_PASSWORD', BCrypt::Password.create('default_password_change_me'))

    before_action :require_admin, only: :destroy

    def create
      if BCrypt::Password.new(ADMIN_PASSWORD_HASH) == params[:password]
        session[:admin_signed_in] = true
        redirect_to admin_projects_path, notice: t('.success')
      else
        flash.now[:alert] = t('.invalid')
        render :new, status: :unauthorized
      end
    end

    def destroy
      reset_session
      session[:admin_signed_in] = false
      redirect_to root_path, notice: t('.success')
    end
  end
end
