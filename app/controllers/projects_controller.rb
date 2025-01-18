# frozen_string_literal: true

# Projects controller
class ProjectsController < ApplicationController
  before_action :set_project, only: %i[show]

  def index # rubocop:disable Metrics/MethodLength
    @projects = Project.all.map do |project|
      {
        id: project.id,
        name: project.name,
        brief: project.brief,
        cover_image: project.project_images.find_by(tag: 'cover'),
        blueprint_images: project.project_images.blueprint.map do |image|
          {
            name: image.name,
            src: rails_blob_path(image.image, only_path: true)
          }
        end,
        details_images: project.project_images.details.map do |image|
          {
            name: image.name,
            src: rails_blob_path(image.image, only_path: true)
          }
        end
      }
    end
  end

  # GET /projects/1 or /projects/1.json
  def show
    @project = Project.find(params[:id])
    render partial: 'project_content', locals: { project: @project }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_project
    @project = Project.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def project_params
    params.require(:project).permit(:name, :brief)
  end
end
