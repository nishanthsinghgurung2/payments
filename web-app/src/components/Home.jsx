import React from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments, selectAllPayments } from '../state/payments';

const Home = () => {
    const dispatch = useDispatch();
    const payments = useSelector(selectAllPayments);
    const paymentsStatus = useSelector(state => state.payments.status);
    const error = useSelector(state => state.payments.error);


    useEffect(() => {
        if(paymentsStatus === 'idle') {
            dispatch(fetchPayments());
        }
    }, [paymentsStatus, dispatch]);
    
    let content;
    
    if(paymentsStatus === 'loading') {
        content =  <div className="loading">Loading...</div>
    } else if(paymentsStatus === 'failed') {
        content = <div className="error">{error}</div>
    } else {
        content = (
            <>
                <div className="payments-main-container">
                    {payments.length > 0? payments.map(payment => (
                        <Link to={`/edit-payment/${payment.id}`} key={payment.id} className="payment">
                            <div className="payment-details name-frequency">
                                <p className="payment-heading">{payment.name}</p>
                                <p className="payment-content">{payment.frequency}</p>
                            </div>
                            <div className="payment-details amount-start-date">
                                <p className="payment-heading">£{payment.amount}</p>
                                <p className="payment-content">Next: {payment.startDate}</p>
                            </div>
                        </Link>
                    )): <div className="no-payments">No payments added</div>}
                </div>
                <div className="buttons-container">
                    <button className="button margin-top-40 primary-button">
                        <Link to="/add-new-payment">Add a bill</Link>
                    </button>
                </div>
            </>
        );
    };
    
    return (
        <div data-testid="payments-container" className="payments-container">
            <header>Regular Payments</header>
            <main className="payments-main">
                {content}
            </main>
        </div>
    );
};

export default Home;