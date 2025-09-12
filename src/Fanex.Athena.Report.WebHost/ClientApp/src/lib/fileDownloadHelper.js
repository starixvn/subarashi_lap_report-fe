import Site from '@/lib/site';
import LangHelper from '@/helpers/langHelper';

/**
 * Shared utility for handling file downloads across different report services
 */
export default class FileDownloadHelper {
    /**
     * Simple Excel file download
     * @param {Object} response - HTTP response object
     * @param {string} fileName - Base filename without extension
     */
    static downloadExcelFile(response, fileName) {
        Site.downloadFile(response.data, `${fileName}.xls`);
    }

    /**
     * Advanced Excel file download with error handling and file type detection
     * @param {Object} params - Request parameters
     * @param {Object} response - HTTP response object
     * @param {string} baseFileName - Base filename for the download
     * @returns {boolean} - Success status
     */
    static async downloadExcelFileAdvanced(params, response, baseFileName) {
        try {
            const contentType = response.headers['content-type'];

            // Handle JSON error responses
            if (contentType && contentType.indexOf('application/json') > -1) {
                const RowsExceedLimitErrorCode = 1001;
                Site.readAsJson(response.data, result => {
                    if (result.ErrorCode === RowsExceedLimitErrorCode) {
                        this._showExportWarning();
                    } else {
                        const msg = result.ErrorMsg || LangHelper.getSingleResource('ErrorProcessingMsg');
                        alert(msg);
                    }
                });
                return false;
            }

            // Handle no content response
            const NoContentStatusCode = 204;
            if (response.status === NoContentStatusCode) {
                alert(LangHelper.getSingleResource('NoInfo'));
                return false;
            }

            // Determine file extension based on content type
            const isZipFile = response.headers['content-type'] === 'application/zip';
            const pageSuffix = isZipFile && params?.PageIndex ? `_${params.PageIndex}` : '';
            const fileExtension = isZipFile ? 'zip' : 'xls';
            const fileNameWithExt = `${baseFileName}${pageSuffix}.${fileExtension}`;

            Site.downloadFile(response.data, fileNameWithExt);
            return true;
        } catch (error) {
            alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
            return false;
        }
    }

    /**
     * Private method to show export warning (placeholder for actual implementation)
     */
    static _showExportWarning() {
        // This should be implemented based on the specific warning logic needed
        alert(LangHelper.getSingleResource('ExportWarning') || 'Export limit exceeded');
    }
}
