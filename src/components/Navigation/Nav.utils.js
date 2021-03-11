export const setMobileClassName = (isMobile) => {
  return isMobile ? 'mobile' : '';
};

const linkStyle = {
  fontWeight: 'normal',
  textDecoration: 'none',
  color: '#fff4de',
};

export const isActive = ({ isPartiallyCurrent }) => {
  return isPartiallyCurrent
    ? { style: linkStyle, className: 'Nav__link Nav__link_active' }
    : { style: linkStyle };
};
