# frozen_string_literal: true

describe Category, type: :model do
  context 'descendants' do
    context 'when not present' do
      subject { described_class.create!(label: 'test category') }

      it 'returns nil' do
        expect(subject.descendants).to be_empty
      end
    end

    context 'when present' do
      let!(:category) { described_class.create!(label: 'test category') }
      let!(:sub_category) { described_class.create!(label: 'test sub-category') }

      before do
        category.descendants.create!(label: 'test sub-category')
        category.descendants.push(sub_category)
      end

      subject { category }

      it 'returns descendants' do
        expect(subject.descendants).not_to be_empty
        expect(subject.descendants.length).to eql(2)
      end
    end
  end
end
