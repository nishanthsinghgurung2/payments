import React from 'react';
import { Provider } from 'react-redux';
import store from '../src/state/store';
import { createStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react'
import {
    BrowserRouter 
  } from 'react-router-dom'
import reducer from '../src/state/payments';

export const testRender = (jsx, { store, ...otherOpts }) => {
    return render(<Provider store={store}><BrowserRouter>{jsx}</BrowserRouter></Provider>, otherOpts);
};


// export const render = (
//     ui,
//     { 
//         initialState,
//         store = createStore(reducer, initialState),
//         ...renderOptions
//     } = {}
//  ) => {
//     const Wrapper = ({ children }) => {
//         return <Provider store={store}>{children}</Provider>
//     }
//     return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
// };

export const makeTestStore = () => {
    const origDispatch = store.dispatch;
    store.dispatch = jest.fn(origDispatch);
    return store;
};

// export const create = () => {
//     const store = {
//       dispatch: jest.fn(),
//       subscribe: jest.fn()
//     }
//     const next = jest.fn()
  
//     const invoke = action => thunk(store)(next)(action)
  
//     return { store, next, invoke }
// }

// // re-export everything
// export * from '@testing-library/react'
// // override render method
// export { render }