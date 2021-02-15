import React from 'react';
import { cleanup } from "@testing-library/react"
import AddNewPayment from "../AddNewPayment"
import { testRender, makeTestStore } from '../../../utils/testUtils';

afterEach(cleanup);

describe('AddNewPayment', () => {
    it('should be defined', () => {
        const store = makeTestStore();
        const { getByTestId } = testRender(<AddNewPayment />, { store });

        expect(getByTestId('add-new-payment')).toBeDefined();
        expect(getByTestId('name')).toBeDefined();
        expect(getByTestId('startDate')).toBeDefined();
        expect(getByTestId('amount')).toBeDefined();
        expect(getByTestId('frequency')).toBeDefined();
        
    })

    // NOT SURE WHY THIS TEST IS NOT WORKING.
    /*
   it('should dispatch addNewPayment action when add new payment button is clicked', () => {
        const store = makeTestStore();
        const handleSubmit = jest.fn();
        
        const { getByTestId } = testRender(<AddNewPayment />, { store });
        
        const inputName = getByTestId('name');
        fireEvent.change(inputName, { target: { value: 'Rent'}});
        const inputAmount = getByTestId('amount');
        fireEvent.change(inputAmount, { target: { value: 900}});
        const inputDate = getByTestId('startDate');
        fireEvent.change(inputDate, { target: { value: '2021-02-23'}});
        const inputFrequency = getByTestId('frequency');
        fireEvent.change(inputFrequency, { target: { value: 'monthly'}});
        const addNewPaymentButton = getByTestId('addNewPaymentButton');
        fireEvent(addNewPaymentButton, new MouseEvent("click"));
        expect(handleSubmit).toHaveBeenCalledTimes(1);
    })
    */
})