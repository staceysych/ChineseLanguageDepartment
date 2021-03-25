import React from 'react';

import { EllipseText, generateRandomId, getFormattedDate } from '../../../utils';


export const generateScienceMaterials = (docs, value) => (
  <>
    {docs.map((obj) => {
      switch (value) {
        case 'author':
          return <span key={generateRandomId()}>{obj.author}</span>;
        case 'place':
          return <span key={generateRandomId()}>{EllipseText(obj.place)}</span>;
        case 'published':
          return (
            <span key={generateRandomId()}>{EllipseText(obj.published)}</span>
          );
        case 'date':
          return (
            <span key={generateRandomId()}>{getFormattedDate(obj.date)}</span>
          );
        default:
          return (
            <span key={generateRandomId()}>
              <a className="TableView__link" href={obj.url} target="_blank">
                {EllipseText(obj.name)}
              </a>
            </span>
          );
      }
    })}
  </>
);
