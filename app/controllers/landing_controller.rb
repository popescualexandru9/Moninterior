class LandingController < ApplicationController

  def index
    @project_landing_cover = 'https://moninterior.s3.us-east-1.amazonaws.com/landing.jpeg'
  end
end
