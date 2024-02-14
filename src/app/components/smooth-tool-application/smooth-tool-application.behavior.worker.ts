/// <reference lib="webworker" />
import {
    ApplicationBehaviors,
    ApplicationNode, OptionalPromise,
    registerApplicationBehavior,
    ScriptBuilder
} from '@universal-robots/contribution-api';
import { SmoothToolApplicationNode } from './smooth-tool-application.node';

// factory is required
const createApplicationNode = (): OptionalPromise<SmoothToolApplicationNode> => ({
    type: 'smooth-robotics-smooth-tools-smooth-tool-application',    // type is required
    version: '1.0.0'     // version is required
});

// generatePreamble is optional
const generatePreambleScriptCode = (node: SmoothToolApplicationNode): OptionalPromise<ScriptBuilder> => {
    const builder = new ScriptBuilder();
    return builder;
};

// upgradeNode is optional
const upgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: SmoothToolApplicationNode): SmoothToolApplicationNode =>
      defaultNode;

// downgradeNode is optional
const downgradeApplicationNode
  = (loadedNode: ApplicationNode, defaultNode: SmoothToolApplicationNode): SmoothToolApplicationNode =>
      defaultNode;

const behaviors: ApplicationBehaviors = {
    factory: createApplicationNode,
    generatePreamble: generatePreambleScriptCode,
    upgradeNode: upgradeApplicationNode,
    downgradeNode: downgradeApplicationNode
};

registerApplicationBehavior(behaviors);
