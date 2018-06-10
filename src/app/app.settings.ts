export class AppSettings {
    public static get CLOUDLAUNCH_API_ENDPOINT(): string { return '/cloudlaunch/api/v1'; }
    public static get CLOUDMAN_SERVER_ROOT(): string { return '/cloudman'; }
    public static get CLOUDMAN_API_ENDPOINT(): string { return `${AppSettings.CLOUDMAN_SERVER_ROOT}/api/v1`; }
    public static get CLOUDMAN_SUPPORT_LINK(): string { return 'mailto:help@cloudve.org'; }
    public static get HELMSMAN_SERVER_ROOT(): string { return '/cloudman'; }
    public static get HELMSMAN_API_ENDPOINT(): string { return `${AppSettings.HELMSMAN_SERVER_ROOT}/api/v1`; }
}
