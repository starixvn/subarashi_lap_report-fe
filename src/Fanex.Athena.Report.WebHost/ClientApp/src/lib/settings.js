import Site from './site';

export const AppSetting = {
    BetTicketEventBuilderUrl: window.appSettings.BetTicketEventBuilderUrl,
    TokenScriptLink: Site.resolveClientUrl(window.appSettings.HomeToken),
};

export const SentrySetting = {
    dsn: window.sentrySettings.FrontEndDsn,
    environment: window.sentrySettings.Environment,
    attachStacktrace: true,
    maxBreadcrumbs: window.sentrySettings.MaxBreadcrumbs,
    integrations: [],
};
