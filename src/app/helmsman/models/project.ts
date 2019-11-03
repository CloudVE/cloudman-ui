import { Chart } from './chart';

export interface ProjectPermissions {
    add_project: boolean;
    change_project: boolean;
    delete_project: boolean;
}

export class Project {
    id: string;
    name: string;
    permissions: ProjectPermissions;
}

export interface ProjectChartPermissions {
    add_chart: boolean;
    change_chart: boolean;
    delete_chart: boolean;
}

export class ProjectChart extends Chart {
    project: Project;
    permissions: ProjectChartPermissions;
}
