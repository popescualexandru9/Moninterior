# frozen_string_literal: true

# Projects controller
class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show]

  def index
    @projects = Project.includes(:project_images).all.map do |project|
      {
        id: project.id,
        name: project.name,
        brief: project.brief,
        cover_image: project.project_images.find_by(tag: 'cover')
      }
    end
  end

  def show
    render partial: 'project_content', locals: { project: project_data }
  end

  private

  def project_data
    {
      blueprint_images: fetch_images_by_tag(TagType::BLUEPRINT),
      details_images: fetch_images_by_tag(TagType::DETAILS)
    }
  end

  def fetch_images_by_tag(tag)
    @project.project_images.where(tag: tag).map do |image|
      image_representation(image)
    end
  end

  def image_representation(image)
    {
      name: image.name,
      src: rails_blob_path(image.image, only_path: true)
    }
  end

  def set_project
    @project = Project.includes(:project_images).find(params[:id])
  end
end
