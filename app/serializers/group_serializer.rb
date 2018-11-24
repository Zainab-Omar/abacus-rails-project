class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :status
  has_many :expenses, serializer: ExpenseSerializer
end
