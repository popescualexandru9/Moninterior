# frozen_string_literal: true

# Controller for admin-specific functionality
class AdminController < ApplicationController
  before_action :authenticate_admin!

  def index; end
end
