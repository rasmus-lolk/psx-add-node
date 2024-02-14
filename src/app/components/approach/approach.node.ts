import { ProgramNode } from '@universal-robots/contribution-api';

export interface ApproachNode extends ProgramNode {
    type: "smooth-robotics-smooth-tools-approach";
    parameters?: {
        [key: string]: unknown;
    };
    lockChildren?: boolean;
    allowsChildren?: boolean;
}
