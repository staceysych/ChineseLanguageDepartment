import React from 'react';

import { Empty } from 'antd';

import { generateRandomId } from '../../../utils';


export const generateNewsPhotos = (photos, isCoverPhoto) => {
  if (isCoverPhoto) {
    return photos.length ? (
      <img className="TableView__img" src={photos[0]} />
    ) : (
      <Empty description="Нет фото" />
    );
  } else {
    return (
      <>
        {photos.map((url, index) => {
          return (
            <p key={generateRandomId()}>
              <a className="TableView__link" href={url} target="_blank">
                {`${index + 1}`}
              </a>
            </p>
          );
        })}
      </>
    );
  }
};
