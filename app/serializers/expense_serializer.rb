class ExpenseSerializer < ActiveModel::Serializer
  attributes :id, :description, :amount, :created_at
  belongs_to :category
end
