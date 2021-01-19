import React from 'react';

import { CONSTANTS } from '../../constants';
import { getFormattedDate } from '../../utils';

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

export const renderStudyMaterials = (path, arr, year, index) => {
  const filteredArrayByYear = arr.filter((obj) => obj.year === year);
  let isExam = false;

  switch (path) {
    case 'exam':
      isExam = true;

      return (
        <div className="Materials__data" key={`${path + index}`}>
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
        <div className="Materials__data" key={`${path + index}`}>
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
        <div className="Materials__data" key={`${path + index}`}>
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
        <div className="Materials__data" key={`${path + index}`}>
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
        <div className="Materials__data" key={`${path + index}`}>
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

export const renderScienceMaterials = (path, arr) => {
  switch (path) {
    case 'publication':
      return (
        <div className="Materials__data">
          <h4 className="Materials__title">Публикации:</h4>
          {arr.map(({ date, published, name, author, place, url }, index) => {
            return (
              <div className="Materials__item" key={name}>
                <a target="_blank" href={url}>{`${index + 1}. ${name}`}</a>
                <p>{`${published}`}</p>
                <p>{`Год издания: ${getFormattedDate(date, path)}`}</p>
                <p>{`Место издания: ${place}`}</p>
                <p>{`Автор/ы статьи: ${author}`}</p>
              </div>
            );
          })}
        </div>
      );
    case 'conference':
      return (
        <div className="Materials__data">
          <h4 className="Materials__title">Конференции:</h4>
          {arr.map(({ date, name, place, url }) => {
            return (
              <div className="Materials__item" key={name}>
                <a target="_blank" href={url}>{`${name}`}</a>
                <p>{`Дата проведения: ${getFormattedDate(date)}`}</p>
                <p>{`Место проведения: ${place}`}</p>
              </div>
            );
          })}
        </div>
      );
    case 'collection':
      return (
        <div className="Materials__data">
          <h4 className="Materials__title">Сборники:</h4>
          {arr.map(({ date, published, name, author, place, url }, index) => {
            return (
              <div className="Materials__item" key={name}>
                <a target="_blank" href={url}>{`${index + 1}. ${name}`}</a>
                <p>{`${published}`}</p>
                <p>{`Год издания: ${getFormattedDate(date, path)}`}</p>
                <p>{`Место издания: ${place}`}</p>
                <p>{`Автор/ы: ${author}`}</p>
              </div>
            );
          })}
        </div>
      );
    default:
      '';
  }
};

export const isStudyPage = (page) => page === 'study';
export const isSciencePage = (page) => page === 'science';
