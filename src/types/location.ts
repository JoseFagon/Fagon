import { locationTypes, pavements, surfaceTypes } from '../constants';

export type LocationTypes = (typeof locationTypes)[number]['value'];
export type SurfaceTypes = (typeof surfaceTypes)[number]['value'];
export type pavementsTypes = (typeof pavements)[number]['value'];
