import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {Dashboard} from "./Dashboard";

describe('Dashboard', () => {
  it('is rendered', () => {
    expect(render(<Dashboard/>)).toBeTruthy()
  })
})
