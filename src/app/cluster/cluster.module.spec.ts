import { ClusterModule } from './cluster.module';

describe('ClusterModule', () => {
  let clusterModule: ClusterModule;

  beforeEach(() => {
    clusterModule = new ClusterModule();
  });

  it('should create an instance', () => {
    expect(clusterModule).toBeTruthy();
  });
});
