import Site from '../lib/site';

const GetAppSettings = () => process.env.APP_SETTING;

export const BetTicketEventBuilderUrl = GetAppSettings().BetTicketEventBuilderUrl;

export const TokenScriptLink = Site.resolveClientUrl(GetAppSettings().HomeToken);
