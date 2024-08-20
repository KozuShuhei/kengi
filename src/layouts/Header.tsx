// src/components/Header.tsx
import React from 'react';
import Pulldown from '../features/pulldown/Pulldown'
import {
  CustomHeader,
  CustomSelect,
  ElementContents,
} from './style';

const Header: React.FC = () => {
  return (
    <CustomHeader>
      <ElementContents>
        {/* <CustomSelect name="example">
          <option>水系選択</option>
          <option>選択肢のサンプル2</option>
          <option>選択肢のサンプル3</option>
        </CustomSelect> */}
        <Pulldown />
      </ElementContents>
    </CustomHeader>
  );
};

export default Header;
