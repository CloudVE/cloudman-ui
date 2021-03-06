export class Chart {
    id: string;
    name: string;
    display_name: string;
    app_version: string;
    namespace: string;
    state: string;
    updated: string;
    access_address: string;
    values: any;
    install_template: InstallTemplate;
    use_install_template: string;
    app_healthy: boolean = false;
}

export class InstallTemplate {
    name: string;
    repo: string;
    chart: string;
    chart_version: string;
    template: string;
    display_name: string;
    summary: string;
    maintainers: string;
    description: string;
    info_url: string;
    icon_url: string;
    screenshot_url: string;
}
