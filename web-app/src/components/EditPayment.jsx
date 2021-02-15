import React, { useState } from 'react';
import "./EditPayment.css";
import { useSelector, useDispatch } from 'react-redux';
import { selectPaymentById, editPaymentDetails, deletePaymentDetails } from '../state/payments';
import { unwrapResult } from '@reduxjs/toolkit';

const EditPayment = ({ match }) => {
    const paymentId = match && match.params? match.params.paymentId: null;
    const payment = useSelector((state) => selectPaymentById(state,paymentId ));

    const [name, setName] = useState(payment? payment.name: '');
    const [amount, setAmount] = useState(payment? payment.amount: '');
    const [frequency, setFrequency] = useState(payment? payment.frequency: '');
    const [startDate, setStartDate] = useState(payment? payment.startDate: '');
    const [id, setId] = useState(payment? payment.id: '');
    const [editPaymentStatus, setEditPaymentStatus] = useState('idle');
    const [deletePaymentStatus, setDeletePaymentStatus] = useState('idle');
    const dispatch = useDispatch();

    const canSave = [name, amount, startDate, frequency].every(Boolean) && editPaymentStatus === 'idle';
    const canDelete = [name, amount, startDate, frequency].every(Boolean) && deletePaymentStatus === 'idle';

    const onNameChange = (e) => setName(e.target.value);
    const onAmountChange = (e) => setAmount(e.target.value);
    const onFrequencyChange = (e) => setFrequency(e.target.value);
    const onStartDateChange = (e) => setStartDate(e.target.value);

    const editPayment = async () => {
        try {
            setEditPaymentStatus('pending');
            const editPaymentAction = await dispatch(editPaymentDetails({ name, amount, frequency, startDate, id}));
            setEditPaymentStatus('success');
            unwrapResult(editPaymentAction);
        } catch(error) {
            setEditPaymentStatus('error');
            console.log('Error occured while updating payment');
        } finally {
            setTimeout(() => setEditPaymentStatus('idle'), 2000);
        }
    };

    const deletePayment = async () => {
        try {
            setDeletePaymentStatus('pending');
            const deletePaymentAction = await dispatch(deletePaymentDetails(id));
            setDeletePaymentStatus('success');
            setName('');
            setAmount('');
            setStartDate('');
            setFrequency('');
            unwrapResult(deletePaymentAction);
        } catch(error) {
            setDeletePaymentStatus('error');
            console.log('Error occured while deleting payment');
        } finally {
            setTimeout(() => setDeletePaymentStatus('idle'), 2000);
        }
    };
    return (
        <div data-testid="edit-payment" className="edit-payment">
            <header>Edit A Bill</header>
            <main className="edit-payment-main">
                <div className="edit-payments-title">Enter your details</div>
                <div className="edit-payments-info">If you'd like to edit your bill you can change the details below</div>
                <form className="edit-payment-form">
                    <input data-testid="name" className="payment-field edit-payment-form-field" type="text" placeholder="Name" value={name} onChange={onNameChange} />
                    <input data-testid="amount" className="payment-field edit-payment-form-field" type="number" step="0.01" placeholder="Amount" value={amount} onChange={onAmountChange} />
                    <input data-testid="startDate" className="payment-field edit-payment-form-field" type="date" placeholder="Start date" value={startDate} onChange={onStartDateChange} />
                    <select data-testid="frequency" className="payment-field edit-payment-form-field" onChange={onFrequencyChange}>
                        <option value="" disabled selected>Frequency</option>
                        <option>Yearly</option>
                        <option>Monthly</option>
                        <option>Weekly</option>
                    </select>
                    <div className="buttons-container">
                        <button className="button primary-button" onClick={editPayment} disabled={!canSave}>Save</button>
                        <button className="button secondary-button" onClick={deletePayment} disabled={!canDelete}>Delete</button>
                    </div>
                    {editPaymentStatus === 'success'? <div className="success">Payment edited successfully</div>: null}
                    {editPaymentStatus === 'pending'? <div className="loading">Updating payment...</div>: null}
                    {editPaymentStatus === 'error'? <div className="error">Error occured while updating payment</div>: null}
                    {deletePaymentStatus === 'success'? <div className="success">Payment deleted successfully</div>: null}
                    {deletePaymentStatus === 'pending'? <div className="loading">Deleting payment...</div>: null}
                    {deletePaymentStatus === 'error'? <div className="error">Error occured while deleting payment</div>: null}
                </form>
            </main>
        </div>
    );
};

export default EditPayment;