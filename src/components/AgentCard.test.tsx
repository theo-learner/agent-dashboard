import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AgentCard from './AgentCard';

describe('AgentCard', () => {
  it('renders agent name', () => {
    render(<AgentCard name="dev" />);
    expect(screen.getByText(/dev/)).toBeDefined();
  });

  it('renders with data', () => {
    render(
      <AgentCard
        name="qa"
        data={{
          status: 'green',
          lastActivity: new Date().toISOString(),
          confidence: 95,
          lastMessage: 'test',
          counts: {},
        }}
      />
    );
    expect(screen.getAllByText(/95%/).length).toBeGreaterThan(0);
  });

  it('shows default confidence when no data', () => {
    render(<AgentCard name="pm" />);
    expect(screen.getAllByText(/100%/).length).toBeGreaterThan(0);
  });

  it('renders emoji for known agents', () => {
    render(<AgentCard name="main" />);
    expect(screen.getByText(/👑/)).toBeDefined();
  });
});
