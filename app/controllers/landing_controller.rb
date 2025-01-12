# frozen_string_literal: true

# Controller for the landing page
class LandingController < ApplicationController
  def index
    project_image = Project.find(1).project_images.where(tag: 'cover').first
    @project_landing_cover = rails_blob_path(project_image.image, only_path: true)
  end
end
