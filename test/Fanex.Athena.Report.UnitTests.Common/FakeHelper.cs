using AutoFixture;

namespace Fanex.Athena.Report.UnitTests.Common;

public static class FakeHelper
{
    private static readonly Fixture Fixture = new();

    public static T Create<T>()
    {
        return Fixture.Create<T>();
    }
}