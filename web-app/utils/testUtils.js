import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../src/state/store';
import { render } from '@testing-library/react'
import {
    BrowserRouter 
  } from 'react-router-dom'

export const testRender = (jsx, { store, ...otherOpts }) => {
    return render(<Provider store={store}><BrowserRouter>{jsx}</BrowserRouter></Provider>, otherOpts);
};

export const makeTestStore = () => {
    const origDispatch = store.dispatch;
    store.dispatch = jest.fn(origDispatch);
    return store;
};