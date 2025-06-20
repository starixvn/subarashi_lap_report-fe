namespace Fanex.Athena.Report.Core.Tests.Helpers;

using System;
using System.Net;
using Core.Helpers;
using Microsoft.AspNetCore.Http;
using NSubstitute;
using UnitTests.Common;
using Xunit;

public class ErrorMessageHelperTests
{
    [Fact]
    public void GenerateMessage_WithExceptionAndContext_BuildCompleteMessage()
    {
        // Arrange
        var ctx = Substitute.For<HttpContext>();
        var request = Substitute.For<HttpRequest>();
        request.Host.Returns(new HostString("test.com", 8080));
        request.Path.Returns(new PathString("/api/test"));
        ctx.Request.Returns(request);

        var connection = Substitute.For<ConnectionInfo>();
        connection.RemoteIpAddress.Returns(IPAddress.Parse("192.168.1.1"));
        ctx.Connection.Returns(connection);

        var exception = new InvalidOperationException("Test error message");

        // Act
        var result = ErrorMessageHelper.GenerateMessage(exception, ctx);

        // Assert
        Assert.Contains("ErrMsg: Test error message", result);
        Assert.Contains("REQUEST INFO", result);
        Assert.Contains("Host: test.com:8080", result);
        Assert.Contains("Path: /api/test", result);
        Assert.Contains("Remote IP: 192.168.1.1", result);
        Assert.Contains("EXCEPTION INFO", result);
        Assert.Contains("Message: Test error message", result);
        Assert.Contains("Source: ", result);
        Assert.Contains("TargetSite: ", result);
        Assert.Contains("StackTrace: ", result);
    }

    [Fact]
    public void GenerateMessage_WithExceptionOnly_BuildMessageWithoutRequestInfo()
    {
        // Arrange
        var exception = new ArgumentException("Invalid argument");

        // Act
        var result = ErrorMessageHelper.GenerateMessage(exception);

        // Assert
        Assert.Contains("ErrMsg: Invalid argument", result);
        Assert.DoesNotContain("REQUEST INFO", result);
        Assert.Contains("EXCEPTION INFO", result);
        Assert.Contains("Message: Invalid argument", result);
    }

    [Fact]
    public void GenerateMessage_WithNullContext_BuildMessageWithoutRequestInfo()
    {
        // Arrange
        var exception = new DivideByZeroException("Division by zero");

        // Act
        var result = ErrorMessageHelper.GenerateMessage(exception, null);

        // Assert
        Assert.Contains("ErrMsg: Division by zero", result);
        Assert.DoesNotContain("REQUEST INFO", result);
        Assert.Contains("EXCEPTION INFO", result);
    }

    [Fact]
    public void GenerateMessage_WithInnerException_BuildMessageWithLimitedInnerExceptions()
    {
        // Arrange
        var innerException3 = new Exception("Inner 3");
        var innerException2 = new Exception("Inner 2", innerException3);
        var innerException1 = new Exception("Inner 1", innerException2);
        var outerException = new Exception("Outer", innerException1);

        // Act
        var result = ErrorMessageHelper.GenerateMessage(outerException);

        // Assert
        Assert.Contains("ErrMsg: Outer", result);
        Assert.Contains("Message: Outer", result);
        Assert.Contains("Message: Inner 1", result);
        Assert.Contains("Message: Inner 2", result);
        Assert.Contains("Message: Inner 3", result);
        
        // Should not include more than 3 inner exceptions
        var messageOccurrences = result.Split("Message: ").Length - 1;
        Assert.Equal(4, messageOccurrences); // Outer + 3 inner exceptions
    }

    [Fact]
    public void GenerateMessage_WithManyInnerExceptions_LimitToThreeLevels()
    {
        // Arrange
        var innerException4 = new Exception("Inner 4");
        var innerException3 = new Exception("Inner 3", innerException4);
        var innerException2 = new Exception("Inner 2", innerException3);
        var innerException1 = new Exception("Inner 1", innerException2);
        var outerException = new Exception("Outer", innerException1);

        // Act
        var result = ErrorMessageHelper.GenerateMessage(outerException);

        // Assert
        Assert.Contains("Message: Outer", result);
        Assert.Contains("Message: Inner 1", result);
        Assert.Contains("Message: Inner 2", result);
        Assert.Contains("Message: Inner 3", result);
        Assert.DoesNotContain("Message: Inner 4", result);
    }

    [Fact]
    public void GenerateMessage_WithNullRequest_HandleGracefully()
    {
        // Arrange
        var ctx = Substitute.For<HttpContext>();
        ctx.Request.Returns((HttpRequest)null);
        var exception = new Exception("Test");

        // Act
        var result = ErrorMessageHelper.GenerateMessage(exception, ctx);

        // Assert
        Assert.Contains("ErrMsg: Test", result);
        Assert.Contains("REQUEST INFO", result);
        Assert.DoesNotContain("Host:", result);
        Assert.DoesNotContain("Path:", result);
        Assert.DoesNotContain("Remote IP:", result);
    }

    [Fact]
    public void GenerateMessage_WithNullConnection_HandleGracefully()
    {
        // Arrange
        var ctx = Substitute.For<HttpContext>();
        var request = Substitute.For<HttpRequest>();
        request.Host.Returns(new HostString("test.com"));
        request.Path.Returns(new PathString("/test"));
        ctx.Request.Returns(request);
        ctx.Connection.Returns((ConnectionInfo)null);

        var exception = new Exception("Test");

        // Act
        var result = ErrorMessageHelper.GenerateMessage(exception, ctx);

        // Assert
        Assert.Contains("ErrMsg: Test", result);
        Assert.Contains("REQUEST INFO", result);
        Assert.Contains("Host: test.com", result);
        Assert.Contains("Path: /test", result);
        Assert.Contains("Remote IP: ", result);
    }

    [Fact]
    public void GenerateMessage_WithExceptionHavingNullProperties_HandleGracefully()
    {
        // Arrange
        var exception = new CustomExceptionWithNullProperties();

        // Act
        var result = ErrorMessageHelper.GenerateMessage(exception);

        // Assert
        Assert.Contains("ErrMsg: Custom message", result);
        Assert.Contains("EXCEPTION INFO", result);
        Assert.Contains("Message: Custom message", result);
        Assert.Contains("Source: ", result);
        Assert.Contains("TargetSite: ", result);
        Assert.Contains("StackTrace: ", result);
    }

    [Fact]
    public void GenerateMessage_WithComplexExceptionStructure_GenerateCompleteMessage()
    {
        // Arrange
        var ctx = Substitute.For<HttpContext>();
        var request = Substitute.For<HttpRequest>();
        request.Host.Returns(new HostString("api.example.com", 443));
        request.Path.Returns(new PathString("/v1/users/123"));
        ctx.Request.Returns(request);

        var connection = Substitute.For<ConnectionInfo>();
        connection.RemoteIpAddress.Returns(IPAddress.Parse("10.0.0.1"));
        ctx.Connection.Returns(connection);

        var innerException = new InvalidOperationException("Database connection failed");
        var exception = new ApplicationException("User operation failed", innerException);

        // Act
        var result = ErrorMessageHelper.GenerateMessage(exception, ctx);

        // Assert
        Assert.Contains("ErrMsg: User operation failed", result);
        Assert.Contains("REQUEST INFO", result);
        Assert.Contains("Host: api.example.com:443", result);
        Assert.Contains("Path: /v1/users/123", result);
        Assert.Contains("Remote IP: 10.0.0.1", result);
        Assert.Contains("EXCEPTION INFO", result);
        Assert.Contains("Message: User operation failed", result);
        Assert.Contains("Message: Database connection failed", result);
    }

    [Fact]
    public void GenerateMessage_VerifyMessageFormat_ContainsAllRequiredSections()
    {
        // Arrange
        var exception = new Exception("Test exception");

        // Act
        var result = ErrorMessageHelper.GenerateMessage(exception);

        // Assert
        var lines = result.Split('\n', StringSplitOptions.RemoveEmptyEntries);
        
        // Should start with ErrMsg
        Assert.StartsWith("ErrMsg:", lines[0]);
        
        // Should contain EXCEPTION INFO section
        Assert.Contains(lines, line => line.Trim() == "EXCEPTION INFO");
        
        // Should contain Message, Source, TargetSite, StackTrace
        Assert.Contains(lines, line => line.StartsWith("Message:"));
        Assert.Contains(lines, line => line.StartsWith("Source:"));
        Assert.Contains(lines, line => line.StartsWith("TargetSite:"));
        Assert.Contains(lines, line => line.StartsWith("StackTrace:"));
    }

    public class CustomExceptionWithNullProperties : Exception
    {
        public override string Source
        {
            get => null;
        }

        public override string StackTrace
        {
            get => null;
        }

        public override string Message => "Custom message";
    }
}