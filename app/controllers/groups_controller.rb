class GroupsController < ApplicationController
  before_action :authenticate_user #Rails runs a check before any controller action
  before_action :set_group, only: [:show, :edit, :update, :destroy, :list]

  def index
    @groups = Group.search(params[:term])
  end

  def new
    @group = Group.new
    render :layout => false
  end

  def show
    # @group = Group.find_by(id: params[:id])
    @expense = Expense.new
    @expenses = @group.expenses
    respond_to do |format|
      format.html {render :show}
      format.json {render json: @group}
    end
    # render json: @group, :layout => false
    if @group.nil?
      redirect_to groups_path
      flash[:error] = "Group Not Found"
    end
  end

  def create
    @group = current_user.groups.build(group_params)
    if @group.valid?
      @group.save
      @membership = current_user.memberships.build(:group_id => @group.id)
      if @membership.valid?
        @membership.save
      end
      flash[:notice] = "Successfully Created A Group"
      render json: @group
    else
      flash[:error] = "Group Name Can't Be Blank"
    end
  end

  def update
    if @group.update(group_params)
      flash[:notice] = "Successfully Updated Group"
      redirect_to group_expenses_path(@group)
    else
      flash[:error] = "Group name can't be blank"
      render 'edit'
    end
  end

  def edit
    # @group = Group.find_by(id: params[:id])
    render :layout => false
    if @group.nil?
      redirect_to groups_path
      flash[:error] = "Group Not Found"
    elsif
      !@group.users.ids.include?(current_user.id)
      redirect_to groups_path
      flash[:error] = "You do not have permission to edit this group"
    end
  end

  def destroy
    @group.destroy
    flash[:notice] = "Successfully Deleted Group"
    redirect_to current_user
  end

  def most_popular
    @groups = if params[:term]
      Group.where('name LIKE ?', "%#{params[:term]}%")
    else
      Group.all
    end
  end

  private

  def set_group
    @group = Group.find_by(id: params[:id])
  end

#strong params
  def group_params
    params.require(:group).permit(:name, :status, :memberships_count ,:term)
  end
  #params that get passed mist conatin a key called group

end
