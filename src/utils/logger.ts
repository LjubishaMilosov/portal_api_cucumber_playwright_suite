/**
 * API Logger
 * Tracks request/response details for debugging
 * CI/CD appropriate: Can output to file or console
 */

/**
 * Logs API requests and responses
 * Useful for debugging in CI/CD environments
 */
export class APILogger {
  private recentLogs: Array<{ type: string; data: any }> = [];
  private maxLogs: number = 100; // Prevent memory issues in long test runs

  /**
   * Logs an HTTP request
   */
  logRequest(method: string, url: string, headers: Record<string, string>, body?: any) {
    const logEntry = { method, url, headers, body };
    this.addLog('Request', logEntry);
  }

  /**
   * Logs an HTTP response
   */
  logResponse(statusCode: number, body?: any) {
    const logEntry = { statusCode, body };
    this.addLog('Response', logEntry);
  }

  /**
   * Gets all recent logs
   */
  getRecentLogs(): string {
    const logs = this.recentLogs
      .map((log) => {
        return `=== ${log.type} ===\n${JSON.stringify(log.data, null, 4)}\n`;
      })
      .join('\n');
    return logs;
  }

  /**
   * Clears all logs
   */
  clearLogs(): void {
    this.recentLogs = [];
  }

  /**
   * Gets logs as JSON
   */
  getLogsAsJSON(): any[] {
    return this.recentLogs.map((log) => log.data);
  }

  /**
   * Adds a log entry (private)
   */
  private addLog(type: string, data: any): void {
    this.recentLogs.push({ type, data });

    // Prevent memory overflow in long-running tests
    if (this.recentLogs.length > this.maxLogs) {
      this.recentLogs.shift();
    }
  }
}

export default APILogger;
