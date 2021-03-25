import React from 'react';

import Label from '../../Label';
import NewsCard from '../../NewsCard';
import NewsPagination from '../../Pagination';
import { NewsModal } from '../../Modals';

export const userView = (data, isModalOpen) => (
  <>
    <Label text={data.label} />
    <div className="NewsPage__layout">
      <h2 className="NewsPage__title">{data.heading}</h2>
      <div className="NewsPage__wrapper">
        <NewsCard />
      </div>
      <NewsPagination />
    </div>
    {isModalOpen && <NewsModal />}
  </>
);
