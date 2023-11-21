namespace Fanex.Athena.Report.Core.Services.Interfaces
{
    public interface IContextService
    {
        string IdentityName { get; }

        byte AppMode { get; }

        public bool IsAdministrator { get; }

        public IEnumerable<string> GetFunctionKeys();
    }
}