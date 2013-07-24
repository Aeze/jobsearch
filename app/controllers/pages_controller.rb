class PagesController < ApplicationController
  def home
    @jobs = Job.all
  end

  def admin
    @jobs = Job.all
    @users = User.all
  end
end
