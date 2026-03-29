import { CustomWorld } from '../world';
import { config } from './config';
import type { APIResponse } from '@playwright/test';

async function parseResponseBody(response: APIResponse) {
  try {
    return await response.json();
  } catch {
    return await response.text();
  }
}

function normalizePath(url: string) {
  const path = url.startsWith('/') ? url : `/${url}`;
  return path.startsWith('/api/') ? path : `/api${path}`;
}

function getDefaultHeaders() {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (config.apiKey) {
    headers['X-API-KEY'] = config.apiKey;
  }

  return headers;
}

export async function apiGet(world: CustomWorld, url: string, params?: Record<string, any>) {
  const response = await world.apiContext.get(normalizePath(url), {
    params,
    headers: getDefaultHeaders(),
  });
  world.response = response;
  world.status = response.status();
  world.responseBody = await parseResponseBody(response);
  return response;
}

export async function apiPost(world: CustomWorld, url: string, data?: any) {
  const response = await world.apiContext.post(normalizePath(url), {
    data,
    headers: getDefaultHeaders(),
  });
  world.response = response;
  world.status = response.status();
  world.responseBody = await parseResponseBody(response);
  return response;
}
