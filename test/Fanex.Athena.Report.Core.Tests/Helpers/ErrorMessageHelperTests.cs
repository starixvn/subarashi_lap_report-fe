using System;
using System.Net;
using Fanex.Athena.Report.Core.Helpers;
using Fanex.Athena.Report.UnitTests.Common;
using Microsoft.AspNetCore.Http;
using NSubstitute;
using Xunit;

namespace Fanex.Athena.Report.Core.Tests.Helpers
{
    public class ErrorMessageHelperTests
    {
        [Fact]
        public void GenerateMessage_WithAnyException_BuildMessage()
        {
            // Arrange
            var ctx = Substitute.For<HttpContext>();
            var request = Substitute.For<HttpRequest>();
            request.Host.Returns(new HostString("Any", 8080));
            request.Path.Returns(new PathString("/Any"));
            ctx.Request.Returns(request);

            var connection = Substitute.For<ConnectionInfo>();
            connection.RemoteIpAddress.Returns(FakeHelper.Create<IPAddress>());
            ctx.Connection.Returns(connection);

            var exception = FakeHelper.Create<MockException>();

            // Act
            ErrorMessageHelper.GenerateMessage(exception, ctx);

            // Assert
            _ = request.Received().Host;
            _ = request.Received().Path;
            _ = connection.Received().RemoteIpAddress;

            Assert.True(exception.IsCallMessage);
            Assert.True(exception.IsCallSource);
            Assert.True(exception.IsCallStackTrace);
        }

        public class MockException : Exception
        {
            public bool IsCallMessage;
            public bool IsCallSource;
            public bool IsCallStackTrace;

            public override string Message
            {
                get
                {
                    IsCallMessage = true;

                    return "Any";
                }
            }

            public override string Source
            {
                get
                {
                    IsCallSource = true;

                    return "Any";
                }
            }

            public override string StackTrace
            {
                get
                {
                    IsCallStackTrace = true;

                    return "Any";
                }
            }
        }
    }
}