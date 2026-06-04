import type { APIRoute } from 'astro';
import brandKitHtml from '../brand-kit/index.html?raw';

export const prerender = true;

export const GET: APIRoute = () => {
  return new Response(brandKitHtml, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
