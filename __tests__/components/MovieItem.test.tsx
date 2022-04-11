import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import {
  MovieItem,
  MovieItemProps,
} from '../../src/components/shared/MovieItem';

const onPressMock = jest.fn();

describe('MovieItem', () => {
  let props: MovieItemProps;
  beforeEach(() => {
    props = {
      film: undefined,
      onPress: onPressMock,
    };
  });

  it('renders correctly', () => {
    renderer.create(<MovieItem {...props} />);
  });
});
