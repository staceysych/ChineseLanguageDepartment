
import { MAP_CONSTANTS } from '../../constants';

export default async function getCoordinatesFromAddress(address) {
  const response = await fetch(`${MAP_CONSTANTS.YANDEX_TOKEN}${address}`);
  const data = await response.json();
  const { featureMember } = data.response.GeoObjectCollection;

  if (featureMember.length) {
    return featureMember[0].GeoObject.Point.pos;
  }

  return false;
}
