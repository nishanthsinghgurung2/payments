import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import "./AddNewPayment.css";
import { addNewPayment } from '../state/payments';

const AddNewPayment = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [frequency, setFrequency] = useState('');
    const [addPaymentStatus, setAddPaymentStatus] = useState('idle');

    const onNameChanged = (e) => setName(e.target.value);
    const onAmountChanged = (e) => setAmount(e.target.value);
    const onStartDateChange = (e) => setStartDate(e.target.value);
    const onFrequencyChanged = (e) => setFrequency(e.target.value);

    const canSave = [name, amount, startDate, frequency].every(Boolean) && addPaymentStatus === 'idle';

    const handleSubmit = async() => {
        if(canSave) {
            try {
                setAddPaymentStatus('pending');
                const resultAction = await dispatch(
                    addNewPayment({ name, amount, startDate, frequency })
                );
                unwrapResult(resultAction);
                setName('');
                setAmount('');
                setStartDate('');
                setFrequency('');
                setAddPaymentStatus('success');
            } catch(error) {
                setAddPaymentStatus('error');
                console.log('Error occured while adding payment');
            } finally {
                setTimeout(() => setAddPaymentStatus('idle'), 2000);
            }
        }
        
    };
    
    return (
        <div data-testid="add-new-payment" className="add-new-payment">
            <header>Add A Bill</header>
            <main className="add-new-payment-main">
                <div className="add-new-payments-title">Enter your details</div>
                <div className="add-new-payments-info">Keep track of your household spending by adding your bills</div>
                <form className="add-new-payment-form">
                    <input data-testid="name" className="payment-field add-new-payment-form-field" type="text" value={name} placeholder="Name" onChange={onNameChanged} />
                    <input data-testid="amount" className="payment-field add-new-payment-form-field" type="number" value={amount} step="0.01" min="0.00" placeholder="Amount" onChange={onAmountChanged} />
                    <input data-testid="startDate" className="payment-field add-new-payment-form-field" type="date" value={startDate} placeholder="Start date" onChange={onStartDateChange}/>
                    <select data-testid="frequency" className="payment-field add-new-payment-form-field" onChange={onFrequencyChanged}>
                        <option value="" disabled selected>Frequency</option>
                        <option>Yearly</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                    </select>
                    <div className="buttons-container">
                        <button data-testid="addNewPaymentButton" className="button margin-top-40 primary-button" onClick={handleSubmit} disabled={!canSave}>
                            Add new payment
                        </button>
                    </div>
                    {addPaymentStatus === 'success'? <div className="success">New payment added successfully</div>: null}
                    {addPaymentStatus === 'pending'? <div className="loading">Adding new payment...</div>: null}
                    {addPaymentStatus === 'error'? <div className="error">Error occured while adding a new payment</div>: null}
                </form>
            </main>
        </div>
    );
};

export default AddNewPayment;