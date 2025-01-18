# frozen_string_literal: true

# Controller for handling admin authentication
class ApplicationController < ActionController::Base
  helper_method :admin_signed_in?

  private

  def authenticate_admin!
    return if admin_signed_in?

    redirect_to admin_session_path, notice: t('authentication.login_required')
  end

  def admin_signed_in?
    session[:admin_signed_in] == true
  end
end
