# frozen_string_literal: true

# Controller for handling admin authentication
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  rescue_from ActionController::InvalidAuthenticityToken do
    redirect_to root_path, alert: t('authentication.session_expired')
  end

  private

  def check_session_timeout
    if session[:last_seen_at] && session[:last_seen_at] < 30.minutes.ago
      reset_session
      redirect_to admin_session_path, alert: t('authentication.session_expired')
    else
      session[:last_seen_at] = Time.current
    end
  end

  def require_admin
    return if session[:admin_signed_in]

    redirect_to admin_session_path, alert: t('authentication.login_required')
  end
end
