# frozen_string_literal: true

describe Product do
  describe 'create' do
    let!(:category) { Category.create!(label: 'test label') }

    subject do
      Product.create!(
        title: 'title',
        description: 'description',
        price: 'price'
      )
    end

    it 'has no category' do
      expect(subject.categories).to be_empty
    end

    context 'with category' do
      before do
        subject.add_category(category)
      end

      it 'has a category' do
        expect(subject.categories).to eql([category.path])
      end
    end
  end
end
