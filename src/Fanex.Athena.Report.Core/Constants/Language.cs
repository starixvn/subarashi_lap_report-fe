namespace Fanex.Athena.Report.Core.Constants
{
    public static class Languages
    {
        public static IDictionary<string, string> MapLanguages => new Dictionary<string, string>
        {
            { "en-US", "en" },
            { "zh-CN", "cs" },
            //{ "ja-JP", "jp" },
            //{ "th-TH", "th" },
            { "vi-VN", "vn" }
        };

        public static IReadOnlyDictionary<string, string> MapIetfLanguageCodes => new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase)
        {
            { "en", "en-US" },
            { "cs", "zh-CN" },
            //{ "jp", "ja-JP" },
            //{ "th", "th-TH" },
            { "vn", "vi-VN" }
        };

        public static IReadOnlyDictionary<string, string> SupportedLanguages => new Dictionary<string, string>(StringComparer.InvariantCultureIgnoreCase)
        {
            { "en", "en-US" },
            { "cs", "zh-CN" },
            { "zhcn", "zh-Hans" },
            { "ch", "zh-TW" },
            { "vn", "vi-VN" }
        };
    }
}