# frozen_string_literal: true

module Admin
  # Controller for managing projects
  class ProjectsController < ApplicationController
    before_action :require_login
    before_action :check_session_timeout
    before_action :set_project, only: %i[show update destroy]
    rescue_from ActiveRecord::RecordNotFound, with: :handle_not_found

    def index
      @projects = Project.all
    end

    def show
      @project_images = @project.project_images
      @project_image = ProjectImage.new
    end

    def new
      @project = Project.new
    end

    def create
      @project = Project.new(project_params)

      if @project.save
        redirect_to admin_project_path(@project), notice: t('.success')
      else
        render :new, status: :unprocessable_entity
      end
    end

    def update
      if @project.update(project_params)
        redirect_to admin_project_path(@project), notice: t('.success')
      else
        render :edit, status: :unprocessable_entity
      end
    end

    def destroy
      @project.destroy
      redirect_to admin_projects_path, notice: t('.success')
    end

    def update_positions
      PositionManager.new(Project, params[:project_ids]).update_positions
      head :ok, notice: t('.updated_positions')
    end

    private

    def set_project
      @project = Project.find(params[:id])
    end

    def project_params
      params.require(:project).permit(:name, :brief)
    end

    def handle_not_found
      redirect_to admin_projects_path, alert: t('.not_found')
    end
  end
end
