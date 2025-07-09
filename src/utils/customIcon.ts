import L from 'leaflet';
import MapPin from '../assets/mappin.svg';
import QuestionMark from '../assets/question.svg';

export const customIcon = L.icon({
  iconUrl: MapPin,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});

export const questionIcon = L.icon({
  iconUrl: QuestionMark,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
});
