import React from 'react';
import renderer, {
  ReactTestInstance,
  ReactTestRenderer,
} from 'react-test-renderer';

import useStepsHistory from '../App/Utils/hooks/useStepsHistory';
import { StepData } from '../App/Utils/types/types';

import Calendar from '../App/Components/Calendar';

jest.mock('../App/Utils/hooks/useStepsHistory');

describe('Calendar', () => {
  const mockedUseStepsHistory = useStepsHistory as jest.MockedFunction<
    typeof useStepsHistory
  >;
  const data: StepData = {
    months: '2022 04',
    weeks: [],
  };
  test('renders correctly an error message if hook returned one', async () => {
    mockedUseStepsHistory.mockReturnValue({
      data,
      loading: false,
      error: 'An error occured',
    });

    const tree: ReactTestRenderer = renderer.create(<Calendar />);
    const instance: ReactTestInstance = tree.root;
    expect(
      instance.findByProps({ testID: 'error-message' }).children,
    ).toBeTruthy();
    expect(tree).toMatchSnapshot();
  });
  test('renders correctly with loader, data being fetched', async () => {
    mockedUseStepsHistory.mockReturnValue({
      data,
      loading: true,
      error: '',
    });

    const tree: ReactTestRenderer = renderer.create(<Calendar />);
    const instance: ReactTestInstance = tree.root;
    expect(() =>
      instance.findByProps({ testID: 'error-message' }),
    ).toThrowError('No instances found with props: {"testID":"error-message"}');
    expect(() => instance.findByProps({ testID: 'loader' })).toBeTruthy();
    expect(
      instance.findByProps({ testID: 'calendar-controls' }).children,
    ).toBeTruthy();

    expect(tree).toMatchSnapshot();
  });
  test('renders correctly with data having been fetched and no loader displayed', async () => {
    mockedUseStepsHistory.mockReturnValue({
      data: {
        months: '2023 03',
        weeks: [],
      },
      loading: false,
      error: '',
    });

    const tree: ReactTestRenderer = renderer.create(<Calendar />);
    const instance: ReactTestInstance = tree.root;

    expect(() =>
      instance.findByProps({ testID: 'error-message' }),
    ).toThrowError('No instances found with props: {"testID":"error-message"}');
    expect(
      instance.findByProps({ testID: 'calendar-controls' }).children,
    ).toBeTruthy();
    expect(
      instance.findByProps({ testID: 'calendar-controls' }).props.month,
    ).toEqual('2023 03');
    expect(
      instance.findByProps({ testID: 'week-days-data' }).children,
    ).toBeTruthy();

    expect(tree).toMatchSnapshot();
  });
});
