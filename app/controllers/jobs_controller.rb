class JobsController < ApplicationController
  def index
    @jobs = Job.all
  end

  def create
    @job = Job.create!(job_params)
    redirect_to jobs_url
  end

  def job_params
    params.require(:job).permit(:name, :city, :country, :latitude, :longitude)
  end
end
