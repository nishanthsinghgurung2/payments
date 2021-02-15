import React from 'react';
import { cleanup } from "@testing-library/react"
import { testRender, makeTestStore } from '../../../utils/testUtils';
import EditPayment from '../EditPayment';

afterEach(cleanup);

describe('AddNewPayment', () => {
    it('should be defined', () => {
        const store = makeTestStore();
        const { getByTestId } = testRender(<EditPayment />, { store });
        expect(getByTestId('edit-payment')).toBeDefined();
        expect(getByTestId('name')).toBeDefined();
        expect(getByTestId('startDate')).toBeDefined();
        expect(getByTestId('amount')).toBeDefined();
        expect(getByTestId('frequency')).toBeDefined();
        
    })
})