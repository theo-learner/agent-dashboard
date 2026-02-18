import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import LogFeed from './LogFeed';

describe('LogFeed', () => {
  it('renders log entries', () => {
    const data = [
      { ts: new Date().toISOString(), from: 'dev', to: 'bus', type: 'note', text: 'Alpha msg' },
    ];
    const { container } = render(<LogFeed data={data} />);
    expect(container.textContent).toContain('Alpha msg');
  });

  it('shows empty state', () => {
    const { container } = render(<LogFeed data={[]} />);
    expect(container.textContent).toContain('로그 없음');
  });

  it('renders filter buttons', () => {
    const { container } = render(<LogFeed data={[]} />);
    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(7);
  });
});
