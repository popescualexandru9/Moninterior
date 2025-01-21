# frozen_string_literal: true

require 'bcrypt'

ADMIN_PASSWORD_HASH = ENV.fetch('ADMIN_PASSWORD', BCrypt::Password.create('default_password_change_me'))
