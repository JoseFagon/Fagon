import { cameraTypes, userRoles } from '../constants';

type UserRoles = (typeof userRoles)[number]['value'];
type CameraTypes = (typeof cameraTypes)[number]['value'];

export interface userProps {
    id: string;
    name: string;
    email: string;
    password: string;
    role: UserRoles;
    status: boolean;
    cameraType?: CameraTypes;
}
