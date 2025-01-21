# Module for handling session management
module SessionManager
  def check_session_timeout
    if session_expired?
      reset_user_session
    else
      session[:last_seen_at] = Time.current
    end
  end

  def require_login
    return if session[:admin_signed_in]

    redirect_to admin_session_path, alert: t('authentication.login_required')
  end

  private

  def reset_user_session
    reset_session
    redirect_to admin_session_path, alert: t('authentication.session_expired')
  end

  def session_expired?
    session[:last_seen_at] && session[:last_seen_at] < 30.minutes.ago
  end
end
