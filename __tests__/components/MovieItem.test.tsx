import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react-native';

import {
  MovieItem,
  MovieItemProps,
} from '../../src/components/shared/MovieItem';
import { formatDate } from '../../src/utils/date';

const onPressMock = jest.fn();

describe('MovieItem', () => {
  let props: MovieItemProps;
  beforeEach(() => {
    props = {
      film: undefined,
      onPress: onPressMock,
    };
  });

  afterAll(() => {
    cleanup();
  });

  it('Director and Release Date is not rendered when no data is passed', () => {
    const { queryByText, queryByTestId } = render(<MovieItem {...props} />);

    expect(queryByText('Director')).toBeNull();
    expect(queryByText('Release date')).toBeNull();
    expect(queryByTestId('film-title')).toBeNull();
  });

  it('Data should be displayed when a valid object is passed', () => {
    const newProps = {
      ...props,
      film: {
        id: 'Test ID',
        title: 'Test title',
        director: 'Test director',
        releaseDate: '1980-05-17',
      },
    };
    const { queryByText, queryByTestId } = render(<MovieItem {...newProps} />);

    expect(queryByText('Director')).not.toBeNull();
    expect(queryByText('Test director')).not.toBeNull();
    expect(queryByText('Release date')).not.toBeNull();
    expect(queryByText(formatDate('1980-05-17') || '')).not.toBeNull();
    expect(queryByTestId('film-title')).not.toBeNull();
    expect(queryByText('Test title')).not.toBeNull();
  });

  it('Director should not be displayed if data is missing', () => {
    const newProps = {
      ...props,
      film: {
        id: 'Test ID',
        title: 'Test title',
        releaseDate: '1980-05-17',
      },
    };
    const { queryByText, queryByTestId } = render(<MovieItem {...newProps} />);

    expect(queryByText('Director')).toBeNull();
    expect(queryByText('Test director')).toBeNull();
    expect(queryByText('Release date')).not.toBeNull();
    expect(queryByText(formatDate('1980-05-17') || '')).not.toBeNull();
    expect(queryByTestId('film-title')).not.toBeNull();
    expect(queryByText('Test title')).not.toBeNull();
  });

  it('Release date should not be displayed if data is missing', () => {
    const newProps = {
      ...props,
      film: {
        id: 'Test ID',
        title: 'Test title',
        director: 'Test director',
      },
    };
    const { queryByText, queryByTestId } = render(<MovieItem {...newProps} />);

    expect(queryByText('Director')).not.toBeNull();
    expect(queryByText('Test director')).not.toBeNull();
    expect(queryByText('Release date')).toBeNull();
    expect(queryByText(formatDate('1980-05-17') || '')).toBeNull();
    expect(queryByTestId('film-title')).not.toBeNull();
    expect(queryByText('Test title')).not.toBeNull();
  });

  it('should call onPress when button is pressed', () => {
    const newProps = {
      ...props,
      film: {
        id: 'Test ID',
        title: 'Test title',
        director: 'Test director',
        releaseDate: '1980-05-17',
      },
    };
    const { getByTestId } = render(<MovieItem {...newProps} />);

    fireEvent(getByTestId('see-details'), 'onPress');
    expect(onPressMock).toHaveBeenCalledWith('Test ID', 'Test title');
  });
});
