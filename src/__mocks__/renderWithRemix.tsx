import type { LoaderFunction } from '@remix-run/server-runtime';
import { createRemixStub } from '@remix-run/testing';
import { render } from '@testing-library/react';
import { ReactElement } from 'react';

export const renderWithRemix = (Component: ReactElement, path = '', loader?: LoaderFunction) => {
  const RemixStub = createRemixStub([{ path, Component: () => Component, loader }]);

  return render(<RemixStub />);
};
