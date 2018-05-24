import { SystemOverviewModule } from './system-overview.module';

describe('SystemOverviewModule', () => {
  let systemOverviewModule: SystemOverviewModule;

  beforeEach(() => {
    systemOverviewModule = new SystemOverviewModule();
  });

  it('should create an instance', () => {
    expect(systemOverviewModule).toBeTruthy();
  });
});
