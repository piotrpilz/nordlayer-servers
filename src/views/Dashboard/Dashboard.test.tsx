import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {Dashboard} from "./Dashboard";

vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn().mockReturnValue({
    data: [
      { name: 'Server 1', distance: 100 },
      { name: 'Server 2', distance: 200 },
      { name: 'Server 3', distance: 300 },
    ]
  })
}))

describe('Dashboard', () => {
  describe('Rendering', () => {
    it('Should render server list', () => {
      render(<Dashboard/>)

      const element = screen.getByTestId('servers-list')
      expect(element.childNodes.length).toBe(3)
    })
  })
})
