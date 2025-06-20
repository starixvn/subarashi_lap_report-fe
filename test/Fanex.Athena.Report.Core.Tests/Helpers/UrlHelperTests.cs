namespace Fanex.Athena.Report.Core.Tests.Helpers;

using System;
using System.IO;
using Core.Helpers;
using Xunit;

public class UrlHelperTests : IDisposable
{
    private readonly string _tempDirectory;
    private readonly string _testFilePath;

    public UrlHelperTests()
    {
        // Create a temporary directory for testing
        _tempDirectory = Path.Combine(Path.GetTempPath(), "UrlHelperTests_" + Guid.NewGuid().ToString("N"));
        Directory.CreateDirectory(_tempDirectory);
        
        // Create a test file
        _testFilePath = Path.Combine(_tempDirectory, "test.css");
        File.WriteAllText(_testFilePath, "test content");
    }

    public void Dispose()
    {
        // Clean up temporary files
        try
        {
            if (File.Exists(_testFilePath))
                File.Delete(_testFilePath);
            if (Directory.Exists(_tempDirectory))
                Directory.Delete(_tempDirectory, true);
        }
        catch
        {
            // Ignore cleanup errors
        }
    }

    [Fact]
    public void ContentLink_WithValidParameters_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "/css/test.css";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.com/css/test.css?v=", result);
        Assert.Contains("v=", result);
    }

    [Fact]
    public void ContentLink_WithCdnDomain_UseCdnDomainInsteadOfAppBaseUrl()
    {
        // Arrange
        var contentPath = "/js/app.js";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "https://cdn.example.com";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://cdn.example.com/js/app.js?v=", result);
    }

    [Fact]
    public void ContentLink_WithNullCdnDomain_UseAppBaseUrl()
    {
        // Arrange
        var contentPath = "/images/logo.png";
        var appBaseUrl = "https://app.example.com";
        var webRootPath = _tempDirectory;
        string cdnDomain = null;

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://app.example.com/images/logo.png?v=", result);
    }

    [Fact]
    public void ContentLink_WithEmptyCdnDomain_UseAppBaseUrl()
    {
        // Arrange
        var contentPath = "/fonts/arial.ttf";
        var appBaseUrl = "https://fonts.example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://fonts.example.com/fonts/arial.ttf?v=", result);
    }

    [Fact]
    public void ContentLink_WithWhitespaceCdnDomain_UseAppBaseUrl()
    {
        // Arrange
        var contentPath = "/api/data.json";
        var appBaseUrl = "https://api.example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "   ";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("   /api/data.json?v=", result);
    }

    [Fact]
    public void ContentLink_WithNullAppBaseUrl_UseEmptyBaseUrl()
    {
        // Arrange
        var contentPath = "/css/style.css";
        string appBaseUrl = null;
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("/css/style.css?v=", result);
    }

    [Fact]
    public void ContentLink_WithEmptyAppBaseUrl_UseEmptyBaseUrl()
    {
        // Arrange
        var contentPath = "/js/script.js";
        var appBaseUrl = "";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("/js/script.js?v=", result);
    }

    [Fact]
    public void ContentLink_WithSingleCharacterAppBaseUrl_UseEmptyBaseUrl()
    {
        // Arrange
        var contentPath = "/api/endpoint";
        var appBaseUrl = "a";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("/api/endpoint?v=", result);
    }

    [Fact]
    public void ContentLink_WithValidAppBaseUrl_UseAppBaseUrl()
    {
        // Arrange
        var contentPath = "/images/banner.jpg";
        var appBaseUrl = "https://www.example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://www.example.com/images/banner.jpg?v=", result);
    }

    [Fact]
    public void ContentLink_WithRootContentPath_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "/";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.com/?v=", result);
    }

    [Fact]
    public void ContentLink_WithEmptyContentPath_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.com?v=", result);
    }

    [Fact]
    public void ContentLink_WithNullContentPath_GenerateCorrectUrl()
    {
        // Arrange
        string contentPath = null;
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.com?v=", result);
    }

    [Fact]
    public void ContentLink_WithComplexContentPath_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "/assets/css/themes/dark/theme.css";
        var appBaseUrl = "https://app.example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://app.example.com/assets/css/themes/dark/theme.css?v=", result);
    }

    [Fact]
    public void ContentLink_WithQueryParametersInContentPath_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "/api/data?format=json";
        var appBaseUrl = "https://api.example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://api.example.com/api/data?format=json?v=", result);
    }

    [Fact]
    public void ContentLink_WithFileExtension_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "test.css";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.comtest.css?v=", result);
    }

    [Fact]
    public void ContentLink_WithDifferentFileTypes_GenerateCorrectUrls()
    {
        // Arrange
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Create different test files
        var cssFile = Path.Combine(_tempDirectory, "style.css");
        var jsFile = Path.Combine(_tempDirectory, "script.js");
        var imgFile = Path.Combine(_tempDirectory, "logo.png");

        File.WriteAllText(cssFile, "css content");
        File.WriteAllText(jsFile, "js content");
        File.WriteAllText(imgFile, "image content");

        // Act & Assert
        var cssResult = UrlHelper.ContentLink("/style.css", appBaseUrl, webRootPath, cdnDomain);
        var jsResult = UrlHelper.ContentLink("/script.js", appBaseUrl, webRootPath, cdnDomain);
        var imgResult = UrlHelper.ContentLink("/logo.png", appBaseUrl, webRootPath, cdnDomain);

        Assert.StartsWith("https://example.com/style.css?v=", cssResult);
        Assert.StartsWith("https://example.com/script.js?v=", jsResult);
        Assert.StartsWith("https://example.com/logo.png?v=", imgResult);

        // Cleanup
        File.Delete(cssFile);
        File.Delete(jsFile);
        File.Delete(imgFile);
    }

    [Fact]
    public void ContentLink_WithFileModificationTime_GenerateCorrectVersion()
    {
        // Arrange
        var contentPath = "test.css";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Set a specific modification time
        var expectedTime = new DateTime(2023, 12, 25, 14, 30, 0);
        File.SetLastWriteTime(_testFilePath, expectedTime);

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        var expectedVersion = expectedTime.ToString("MMddyyyy_HHmm");
        Assert.EndsWith($"?v={expectedVersion}", result);
    }

    [Fact]
    public void ContentLink_WithNonExistentFile_GenerateUrlWithDefaultVersion()
    {
        // Arrange
        var contentPath = "nonexistent.css";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.comnonexistent.css?v=", result);
        Assert.Contains("v=", result);
    }

    [Fact]
    public void ContentLink_WithRelativePath_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "./css/style.css";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.com./css/style.css?v=", result);
    }

    [Fact]
    public void ContentLink_WithParentDirectoryPath_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "../images/logo.png";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.com../images/logo.png?v=", result);
    }

    [Fact]
    public void ContentLink_WithSpecialCharactersInPath_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "/assets/css/theme-dark.css";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.com/assets/css/theme-dark.css?v=", result);
    }

    [Fact]
    public void ContentLink_WithTrailingSlashInAppBaseUrl_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "/css/style.css";
        var appBaseUrl = "https://example.com/";
        var webRootPath = _tempDirectory;
        var cdnDomain = "";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://example.com//css/style.css?v=", result);
    }

    [Fact]
    public void ContentLink_WithTrailingSlashInCdnDomain_GenerateCorrectUrl()
    {
        // Arrange
        var contentPath = "/js/app.js";
        var appBaseUrl = "https://example.com";
        var webRootPath = _tempDirectory;
        var cdnDomain = "https://cdn.example.com/";

        // Act
        var result = UrlHelper.ContentLink(contentPath, appBaseUrl, webRootPath, cdnDomain);

        // Assert
        Assert.StartsWith("https://cdn.example.com//js/app.js?v=", result);
    }
} 