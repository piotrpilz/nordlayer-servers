import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {Login} from "./Login";

describe('Login', () => {
  it('is rendered', () => {
    expect(render(<Login/>)).toBeTruthy()
  })
})
