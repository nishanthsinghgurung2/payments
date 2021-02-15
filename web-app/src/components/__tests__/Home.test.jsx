import React from 'react';
import { cleanup } from "@testing-library/react"
import { testRender, makeTestStore } from '../../../utils/testUtils';
import Home from '../Home';

afterEach(cleanup);

describe('Home', () => {
    it('should be defined', () => {

        const store = makeTestStore();
        
        const { getByTestId } = testRender(<Home />, { store });
 
        expect(getByTestId('payments-container')).toBeDefined();
        
    })
})