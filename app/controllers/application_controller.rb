# frozen_string_literal: true

# Controller for handling admin authentication
class ApplicationController < ActionController::Base
  include SessionManager

  protect_from_forgery with: :exception

  rescue_from ActionController::InvalidAuthenticityToken do
    redirect_to root_path, alert: t('authentication.session_expired')
  end
end
