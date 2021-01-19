import React from 'react';
import { Card } from 'antd';

import './NewsCard.scss';

import Button from '../Button';

const NewsCard = () => {
  const { Meta } = Card;

  return (
    <div className="NewsCard">
      <Card
        hoverable
        cover={
          <img
            className="NewsCard__photo"
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
        <Button text="Подробнее" />
      </Card>
    </div>
  );
};

export default NewsCard;
