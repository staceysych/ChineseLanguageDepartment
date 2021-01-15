import React from 'react';

export const renderExamMaterials = (path, arr, year) => {
  if (path === 'exam') {
    const filteredArrayByYear = arr.filter((obj) => obj.year === year);
    return (
      <div className="Materials__data">
        <h4 className="Materials__title">{`Курс ${year}:`}</h4>
        {filteredArrayByYear.map(({ urls, name, specialization }) => {
          return (
            <p className="Materials__item" key={name}>
              <a target="_blank" href={urls.main}>{`${name}`}</a>
              {urls.example ? (
                <a target="_blank" href={urls.example}>
                  {' '}
                  - Образец задания
                </a>
              ) : null}
              {urls.instructions ? (
                <a target="_blank" href={urls.instructions}>
                  {' '}
                  - Памятка
                </a>
              ) : null}
              <span>{` ${specialization}`}</span>
            </p>
          );
        })}
      </div>
    );
  }

  if (path === 'diplomas') {
    const filteredArrayByYear = arr.filter((obj) => obj.year === year);
    const generateTitle = (year) => {
      switch (year) {
        case 4:
          return 'Курсовые работы';
        case 5:
          return 'Дипломные работы';
        default:
          '';
      }
    };
    return (
      <div className="Materials__data">
        <h4 className="Materials__title">{generateTitle(year)}</h4>
        {filteredArrayByYear.map(({ urls, name, specialization }) => {
          return (
            <p className="Materials__item" key={name}>
              <span className="Materials__name">{`${name}`}</span>
              {urls.main ? (
                <a target="_blank" href={urls.main}>
                  {' '}
                  - Информация
                </a>
              ) : null}
              {urls.examples ? (
                <a target="_blank" href={urls.instructions}>
                  {' '}
                  - Образцы заданий
                </a>
              ) : null}
              {urls.instructions ? (
                <a target="_blank" href={urls.instructions}>
                  {' '}
                  - Памятка
                </a>
              ) : null}
              <span>{` ${specialization}`}</span>
            </p>
          );
        })}
      </div>
    );
  }
};
