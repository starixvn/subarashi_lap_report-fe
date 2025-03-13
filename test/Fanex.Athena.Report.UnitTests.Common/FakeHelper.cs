namespace Fanex.Athena.Report.UnitTests.Common;

using AutoFixture;

public static class FakeHelper
{
    private static readonly Fixture Fixture = new();

    public static T Create<T>() => Fixture.Create<T>();
}