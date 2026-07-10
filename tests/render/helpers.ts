import { experimental_AstroContainer as AstroContainer } from 'astro/container';

export async function renderComponent(
  Component: any,
  options: { props?: Record<string, unknown>; params?: Record<string, string> } = {}
): Promise<string> {
  const container = await AstroContainer.create();
  return container.renderToString(Component, options);
}
