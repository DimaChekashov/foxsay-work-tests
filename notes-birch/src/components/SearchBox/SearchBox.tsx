import React, { useContext } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { Context } from '../../context';
import "./SearchBox.css";

const SearchBox: React.FC = () => {
  const {searchQuery, setSearchQuery} = useContext(Context);

  return (
    <Input 
      value={searchQuery}
      onChange={e => setSearchQuery(e.target.value)}
      className="search-box" 
      size="large" 
      placeholder="Search note..." 
      prefix={<SearchOutlined />} 
    />
  )
}

export default SearchBox;
