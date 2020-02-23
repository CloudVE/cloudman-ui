import { Deployment } from './deployment';
import { PlacementZone } from "./cloud";

export class Cluster {
    id: number;
    name: string;
    cluster_type: string;
    connection_settings: any;
    autoscale: boolean;
    default_vm_type: string;
    default_zone: PlacementZone
}

export class ClusterNode {
    id: number;
    name: string;
    cluster: Cluster;
    vm_type: string;
    deployment: Deployment;
    autoscaler: number;
}

export class ClusterAutoScaler {
    id: number;
    name: string;
    cluster: Cluster;
    vm_type: string;
    zone: string;
    min_nodes: number;
    max_nodes: number;
}
