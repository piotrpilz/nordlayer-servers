import { render } from "@testing-library/react";
import {
  describe,
  it,
  expect,
  // vi,
} from "vitest";

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// const queryClient = new QueryClient();

import { Login } from "./Login";

// const MockData = {
//   token: 'fakeToken'
// }

// vi.mock('react-query', () => ({
//   useQuery: vi.fn().mockReturnValue(({ data: {...MockData}, isLoading: false,error:{} }))
//  }));

describe('Login', () => {
  it('is rendered', () => {
    expect(render(
      // <QueryClientProvider client={queryClient}>
        <Login/>
      // </QueryClientProvider>
    )).toBeTruthy()
  })
})
