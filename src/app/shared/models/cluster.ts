import { Deployment } from './deployment';

export class Cluster {
    id: number;
    name: string;
    cluster_type: string;
    connection_settings: any;
}

export class ClusterNode {
    id: number;
    name: string;
    cluster: Cluster;
    instance_type: string;
    deployment: Deployment;
}
