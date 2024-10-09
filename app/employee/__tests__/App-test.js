import React from 'react';
import App from '../App';
import TestRenderer  from 'react-test-renderer';

it('renders correctly', () => {
  TestRenderer.create(<App />);
});

/*

const ReactTestRenderer = require('react-test-renderer');

const renderer = ReactTestRenderer.create(
    <App />
);

console.log(renderer.toJSON());*/