import React from 'react';

import { CONSTANTS } from '../../constants';

const generateCourseWorkTitle = (year) => {
  switch (year) {
    case 4:
      return CONSTANTS.COURSE_WORK;
    case 5:
      return CONSTANTS.GRADUATION_WORK;
    default:
      '';
  }
};

const generateMastersTitle = (year) => {
  return year === 1 ? CONSTANTS.MASTERS_TITLE : '';
};

const renderUrls = (urls, isExam) => {
  return (
    <>
      {urls.main && !isExam ? (
        <a target="_blank" href={urls.main}>
          {CONSTANTS.MATERIAL_INFO}
        </a>
      ) : null}
      {urls.example ? (
        <a target="_blank" href={urls.example}>
          {CONSTANTS.EXAMPLE}
        </a>
      ) : null}
      {urls.instructions ? (
        <a target="_blank" href={urls.instructions}>
          {CONSTANTS.INSTRUCTIONS}
        </a>
      ) : null}
    </>
  );
};

export const renderExamMaterials = (path, arr, year) => {
  const filteredArrayByYear = arr.filter((obj) => obj.year === year);
  let isExam = false;

  switch (path) {
    case 'exam':
      isExam = true;

      return (
        <div className="Materials__data">
          <h4 className="Materials__title">{`Курс ${year}:`}</h4>
          {filteredArrayByYear.map(({ urls, name, specialization }) => {
            return (
              <p className="Materials__item" key={name}>
                <a target="_blank" href={urls.main}>{`${name}`}</a>
                {renderUrls(urls, isExam)}
                <span>{` ${specialization}`}</span>
              </p>
            );
          })}
        </div>
      );
    case 'diplomas':
      return (
        <div className="Materials__data">
          <h4 className="Materials__title">{generateCourseWorkTitle(year)}</h4>
          {filteredArrayByYear.map(({ urls, name, specialization }, index) => {
            return (
              <p className="Materials__item" key={name}>
                <span className="Materials__name">{`${
                  index + 1
                }. ${name}`}</span>
                {renderUrls(urls, isExam)}
                <span>{` ${specialization}`}</span>
              </p>
            );
          })}
        </div>
      );
    case 'masters':
      return (
        <div className="Materials__data">
          <h4 className="Materials__title">{generateMastersTitle(year)}</h4>
          {filteredArrayByYear.map(({ urls, name, specialization }, index) => {
            return (
              <p className="Materials__item" key={name}>
                <span className="Materials__name">{`${
                  index + 1
                }. ${name}`}</span>
                {renderUrls(urls, isExam)}
                <span>{` ${specialization}`}</span>
              </p>
            );
          })}
        </div>
      );
    case 'books':
      return (
        <div className="Materials__data">
          <h4 className="Materials__title">{`Курс ${year}:`}</h4>
          {filteredArrayByYear.map(({ urls, name, specialization }) => {
            return (
              <p className="Materials__item" key={name}>
                <a target="_blank" href={urls.main}>{`${name}`}</a>
                <span>{` ${specialization}`}</span>
              </p>
            );
          })}
        </div>
      );
    case 'documents':
      return (
        <div className="Materials__data">
          <h4 className="Materials__title">{`Курс ${year}:`}</h4>
          {filteredArrayByYear.map(({ urls, name, specialization }, index) => {
            return (
              <p className="Materials__item" key={`${name}-${index}`}>
                <a target="_blank" href={urls.main}>{`${name}`}</a>
                <span>{` ${specialization}`}</span>
              </p>
            );
          })}
        </div>
      );
    default:
      '';
  }
};
