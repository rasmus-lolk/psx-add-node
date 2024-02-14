import { ApplicationNode } from '@universal-robots/contribution-api';

export interface SmoothToolApplicationNode extends ApplicationNode {
  type: string;
  version: string;
}
