class PagesController < ApplicationController
  def home
    @jobs = Job.all
  end
end
