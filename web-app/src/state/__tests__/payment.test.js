import reducer, { fetchPayments, addNewPayment, editPaymentDetails, deletePaymentDetails } from "../payments";

describe('payment', () => {
    describe('paymentThunks', () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ payments: [{
                    name: 'Rent',
                    amount: '900',
                    startDate: '2021-02-23',
                    frequency: 'monthly'
                }]})
            })
        );
        let dispatch;
        let getState;


        beforeEach(() => {
            dispatch = jest.fn();
            getState = jest.fn();
            fetch.mockClear();
        });

        it('should fetch the payments', async() => {
            let action = fetchPayments();
            await action(dispatch,getState, undefined );
            expect(fetch).toHaveBeenCalledWith("http://localhost:8080/payments", {
                method: 'GET'
            });
        })

        it('should add new payment', async() => {
            const paymentInfo = {
                name: 'Rent',
                amount: '900',
                startDate: '2021-02-23',
                frequency: 'monthly'
            };
            let action = addNewPayment(paymentInfo);
            await action(dispatch, getState, undefined);
            expect(fetch).toHaveBeenCalledWith("http://localhost:8080/payments", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(paymentInfo)
            });
        })

        it('should edit the payment details', async() => {
            const paymentInfo = {
                name: 'Rent',
                amount: '1000',
                startDate: '2021-02-23',
                frequency: 'monthly',
                id: "1234"
            };
            let action = editPaymentDetails(paymentInfo);
            await action(dispatch, getState, undefined);
            expect(fetch).toHaveBeenCalledWith("http://localhost:8080/payments/1234", {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(paymentInfo)
            });
        })

        it('should delete the payment details', async() => {
            const paymentId="1234";
            let action = deletePaymentDetails(paymentId);
            await action(dispatch, getState, undefined);
            expect(fetch).toHaveBeenCalledWith("http://localhost:8080/payments/1234", {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json'}
            });
        })
    })
    describe("reducers", () => {
        const initialState = {
            payments: [],
            status: 'idle',
            error: null
          };
        it("should update fetchPayments status to loading on pending state", () => {
            const nextState = reducer(initialState, fetchPayments.pending());
            expect(nextState.status).toEqual('loading');
        })

        it("should update fetchPayments status to suceeded and payments on fulfilled state", () => {
            const paymentInfo = {
                name: 'Rent',
                amount: '900',
                startDate: '2021-02-23',
                frequency: 'monthly'
            };
            const nextState = reducer(initialState, fetchPayments.fulfilled(paymentInfo));
            expect(nextState.status).toEqual('succeeded');
            expect(nextState.payments).toEqual([paymentInfo]);
        })

        it("should update fetchPayments status to failed on rejected state", () => {
            const errorInfo =  'invalid payments';

            const nextState = reducer(initialState, fetchPayments.rejected(errorInfo));
            expect(nextState.status).toEqual('failed');
            expect(nextState.error).toEqual(errorInfo);
        })

        it("should add payment on fulfilled state for addNewPayment action", () => {
            const paymentInfo = {
                name: 'Rent',
                amount: '900',
                startDate: '2021-02-23',
                frequency: 'monthly'
            };
            const nextState = reducer(initialState, addNewPayment.fulfilled(paymentInfo));
            expect(nextState.payments).toEqual([paymentInfo]);
        })
    })
})