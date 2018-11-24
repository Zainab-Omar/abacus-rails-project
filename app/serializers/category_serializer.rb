class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :expenses, serializer: ExpenseSerializer
end
