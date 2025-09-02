import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ESEWA_MERCHANT_CODE = 'EPAYTEST'; // eSewa test merchant code
const ESEWA_PAYMENT_URL = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
const SUCCESS_URL = 'http://localhost:5173/payment-success'; // Change to your deployed client URL
const FAILURE_URL = 'http://localhost:5173/payment-fail';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fine, borrowId } = location.state || {};

  // If no fine or borrowId, redirect back
  React.useEffect(() => {
    if (!fine || !borrowId) {
      navigate('/');
    }
  }, [fine, borrowId, navigate]);

  // eSewa form submit handler
  const handleEsewaPay = (e) => {
    e.preventDefault();
    document.getElementById('esewaPayForm').submit();
  };

  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <Navbar />
      <main className="flex-grow max-w-xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Pay Fine with eSewa</h2>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="mb-4 text-lg">You need to pay a fine of <span className="font-bold text-red-600">Rs. {fine}</span> for overdue book return.</p>
          <form
            id="esewaPayForm"
            action={ESEWA_PAYMENT_URL}
            method="POST"
            className="flex flex-col gap-4"
          >
            <input type="hidden" name="amount" value={fine} />
            <input type="hidden" name="tax_amount" value="0" />
            <input type="hidden" name="total_amount" value={fine} />
            <input type="hidden" name="transaction_uuid" value={borrowId} />
            <input type="hidden" name="product_code" value="LIBRARY_FINE" />
            <input type="hidden" name="product_service_charge" value="0" />
            <input type="hidden" name="product_delivery_charge" value="0" />
            <input type="hidden" name="success_url" value={SUCCESS_URL + `?borrowId=${borrowId}&fine=${fine}`} />
            <input type="hidden" name="failure_url" value={FAILURE_URL} />
            <input type="hidden" name="signed_field_names" value="total_amount,amount,tax_amount,transaction_uuid,product_code,product_service_charge,product_delivery_charge,success_url,failure_url" />
            <input type="hidden" name="signature" value="" />
            <input type="hidden" name="merchant_code" value={ESEWA_MERCHANT_CODE} />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              onClick={handleEsewaPay}
            >
              Pay with eSewa
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2">You will be redirected to eSewa to complete your payment.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
