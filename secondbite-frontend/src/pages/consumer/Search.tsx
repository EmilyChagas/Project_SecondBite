import { useState } from 'react';
import ShopContainer from '../../components/consumer/search/shop/ShopContainer';
import { OrangeIcon } from '../../components/icons/OrangeIcon';
import { StoreFilledIcon } from '../../components/icons/StoreFilledIcon';

const Search = () => {
  const [activeTab, setActiveTab] = useState('produtos');

  return (
    <div className="bg-gray-50 min-h-screen relative">
      <div className="grid grid-cols-2 mb-3 bg-white border-b border-b-primary/20 text-black/80">
        <button
          onClick={() => setActiveTab('produtos')}
          className={`flex items-center cursor-pointer gap-2 justify-center py-3 ${activeTab === 'produtos' ? 'text-green-700 bg-green-50' : ''}`}
        >
          <OrangeIcon />
          <h2 className="text-center font-semibold text-lg">Produtos</h2>
        </button>
        <button
          onClick={() => setActiveTab('feirantes')}
          className={`flex items-center cursor-pointer gap-2 justify-center py-3 ${activeTab === 'feirantes' ? 'text-green-700 bg-green-50' : ''}`}
        >
          <StoreFilledIcon />
          <h2 className="text-center font-semibold text-lg">Feirantes</h2>
        </button>
      </div>
      {activeTab === 'produtos' && <ShopContainer />}
      {activeTab === 'feirantes' && <div />}
    </div>
  );
};

export default Search;
