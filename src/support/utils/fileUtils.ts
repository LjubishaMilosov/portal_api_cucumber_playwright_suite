/**
 * File Utilities
 * Handles file operations for test data output
 * CI/CD appropriate: Uses relative paths and creates directories as needed
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Writes data to a JSON file
 * Creates directories if they don't exist
 *
 * @param filePath - Relative file path
 * @param data - Data to write (will be JSON stringified)
 */
export function writeDataToFile(filePath: string, data: any): void {
  try {
    const dir = path.dirname(filePath);

    // Create directory if it doesn't exist
    if (dir && !fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error: any) {
    console.error(`Failed to write file ${filePath}:`, error.message);
    throw error;
  }
}

/**
 * Reads JSON file synchronously
 *
 * @param filePath - Relative file path
 * @returns Parsed JSON data
 */
export function readDataFromFile(filePath: string): any {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    console.error(`Failed to read file ${filePath}:`, error.message);
    throw error;
  }
}

/**
 * Ensures a directory exists
 *
 * @param dirPath - Directory path
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

export default {
  writeDataToFile,
  readDataFromFile,
  ensureDirectoryExists,
};
