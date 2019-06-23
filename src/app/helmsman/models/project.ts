import { Chart } from './chart';

export class Project {
    id: string;
    name: string;
}

export class ProjectChart extends Chart {
    project: Project;
}
