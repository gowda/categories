# frozen_string_literal: true

describe Category, type: :model do
  describe 'create' do
    context 'with label' do
      subject { Category.create!(label: 'test label') }

      it 'sets parent and path' do
        expect(subject.parent).to eql('/')
        expect(subject.path).to eql('/test label')
      end
    end

    context 'with label and parent' do
      subject do
        Category.create!(
          label: 'test label',
          parent: '/parent test label'
        )
      end

      it 'sets path' do
        expect(subject.parent).to eql('/parent test label')
        expect(subject.path).to eql('/parent test label/test label')
      end
    end

    context 'with label, parent & path' do
      subject do
        Category.create!(
          label: 'test label',
          parent: '/random-1',
          path: '/random-2'
        )
      end

      it 'sets path' do
        expect(subject.parent).to eql('/random-1')
        expect(subject.path).to eql('/random-2')
      end
    end

    context 'child' do
      let!(:category) { Category.create!(label: 'root') }
      let!(:category_level_1) do
        category.create_child(label: 'level 1 label')
      end

      it 'sets path & parent for child category' do
        expect(category_level_1.parent).to eql("/#{category.label}")
        expect(category_level_1.path).to eql(
          "/#{category.label}/#{category_level_1.label}"
        )
      end

      context 'grandchild' do
        let!(:category_level_2) do
          category_level_1.create_child(label: 'level 2 label')
        end

        it 'sets path & parent for child category' do
          expect(category_level_2.parent).to eql(category_level_1.path)
          expect(category_level_2.path).to eql(
            "/#{category.label}/#{category_level_1.label}/level 2 label"
          )
        end
      end
    end
  end

  context 'query children' do
    let!(:category) { Category.create!(label: 'test category') }
    let!(:other_category) do
      Category.create!(label: 'other test category')
    end

    context 'when none present' do
      it 'returns an empty array' do
        expect(category.children.to_a).to eql([])
      end
    end

    context 'when present' do
      let!(:category_children) do
        (1..5).map do |n|
          category.create_child(label: "child label #{n}")
        end
      end
      let!(:other_category_children) do
        (1..5).map do |n|
          other_category.create_child(label: "other child label #{n}")
        end
      end

      it 'returns all children' do
        expect(category.children.to_a).to eql(category_children)
        expect(other_category.children.to_a).to eql(other_category_children)
      end

      context 'with grandchildren' do
        let!(:category_grandchildren) do
          (1..5).map do |n|
            category_children.sample
                             .create_child(label: "grandchild label #{n}")
          end
        end
        let!(:other_category_grandchildren) do
          (1..5).map do |n|
            other_category_children.sample
                                   .create_child(label: "other grandchild label #{n}")
          end
        end

        it 'still returns all children only' do
          expect(category.children.to_a).to eql(category_children)
          expect(other_category.children.to_a).to eql(other_category_children)
        end

        describe 'query descendants' do
          it 'returns all descendants only' do
            expect(category.descendants.to_a).to eql(
              category_children.concat(category_grandchildren)
            )
            expect(other_category.descendants.to_a).to eql(
              other_category_children.concat(other_category_grandchildren)
            )
          end
        end
      end
    end
  end

  describe 'create_product' do
    let!(:category) { Category.create!(label: 'test label') }
    let!(:product) do
      category.create_product(
        title: 'title',
        description: 'description',
        price: 'price'
      )
    end

    it 'returns the product when queried for' do
      expect(category.products.to_a).to eql([product])
    end
  end
end
