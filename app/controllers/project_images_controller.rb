# frozen_string_literal: true

# Controller for managing project images
class ProjectImagesController < ApplicationController
  before_action :set_project
  before_action :set_project_image, only: [:destroy]

  def index
    @project_images = @project.project_images
    @project_image = ProjectImage.new
  end

  def create
    @project_image = @project.project_images.build(project_image_params)

    if @project_image.save
      flash[:notice] = t('.success')
      redirect_to project_project_images_path(@project)
    else
      @project_images = @project.project_images
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    @project_image.destroy
    flash[:notice] = t('.deleted')
    redirect_to project_project_images_path(@project)
  end

  private

  def set_project
    @project = Project.find(params[:project_id])
  end

  def set_project_image
    @project_image = @project.project_images.find(params[:id])
  end

  def project_image_params
    params.require(:project_image).permit(:name, :tag, :image)
  end
end
