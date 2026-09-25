import React from 'react';
import { ProjectsManager } from './ProjectsManager';

/**
 * Backwards compatibility export:
 * Previously Projects and Properties were mixed into one complex file.
 * Now Mega Projects is cleanly separated into ProjectsManager, and Properties
 * is cleanly managed in PropertiesInventoryManager.
 */
export const ProjectsPropertiesManager: React.FC = () => {
  return <ProjectsManager />;
};

export default ProjectsPropertiesManager;
