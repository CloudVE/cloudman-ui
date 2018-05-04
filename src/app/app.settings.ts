export class AppSettings {
    public static get CLOUDMAN_SERVER_ROOT(): string { return ''; }
    public static get CLOUDMAN_API_ENDPOINT(): string { return `${AppSettings.CLOUDMAN_SERVER_ROOT}/api/v1`; }
    public static get CLOUDMAN_SUPPORT_LINK(): string { return 'mailto:help@cloudve.org'; }
}
