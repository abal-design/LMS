
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const ESEWA_MERCHANT_CODE = 'JB0BBQ4aD0UqIThFJwAKBgAXEUkEGQUBBAwdOgABHD4DChwUAB0R';
const ESEWA_PAYMENT_URL = 'https://rc-epay.esewa.com.np/api/epay/main/v2/form';
const SUCCESS_URL = 'http://localhost:5173/payment-success';
const FAILURE_URL = 'http://localhost:5173/payment-fail';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fine, borrowId } = location.state || {};

//   React.useEffect(() => {
//     if (!fine || !borrowId) {
//       navigate('/');
//     }
//   }, [fine, borrowId, navigate]);

  return (
  <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 bg-amber-50">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center px-2 py-10">
        <div className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-0 md:p-8 flex flex-col md:flex-row gap-0 md:gap-8 items-stretch">
          {/* Left: Summary Card */}
          <div className="w-full md:w-1/2 flex flex-col justify-center bg-emerald-50 dark:bg-gray-800 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none p-8 border-b md:border-b-0 md:border-r border-emerald-100 dark:border-gray-700">
            <img src="https://cdn.esewa.com.np/ui/images/esewa-icon-large.png" alt="eSewa Logo" className="h-16 mb-4 mx-auto" />
            <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mb-2 text-center">eSewa Payment</h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300 text-center">Pay your library fine securely using eSewa.</p>
            <div className="w-full bg-white dark:bg-gray-900 rounded-lg p-4 mb-6 flex flex-col items-center border border-emerald-100 dark:border-gray-700">
              <span className="text-gray-600 dark:text-gray-300">Total Amount</span>
              <span className="text-3xl font-bold text-red-600 dark:text-red-400">Rs. {fine}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">Transaction ID: <span className="font-mono">{borrowId}</span></span>
            </div>
            <div className="hidden md:block mt-8">
              <img src="https://cdn.esewa.com.np/ui/images/slider/deH0vD2AlVmf9Kokg1yPkhaanpin-slider-banner-min.jpg" alt="eSewa Banner" className="rounded-lg shadow" />
            </div>
          </div>
          {/* Right: Payment Form */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <form
              id="esewaPayForm"
              action={ESEWA_PAYMENT_URL}
              method="POST"
              className="w-full flex flex-col gap-3"
            >
              <div className="flex flex-col">
              <label htmlFor="esewa_id" className="text-sm text-gray-600 dark:text-gray-300 mb-1">eSewa ID</label>
              <input type="text" id="esewa_id" name="esewa_id" placeholder="eSewa ID" className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white input input-bordered border-gray-300 dark:border-gray-700" required />
              </div>
              <div className="flex flex-col">
              <label htmlFor="esewa_password" className="text-sm text-gray-600 dark:text-gray-300 mb-1">Password</label>
              <input type="password" id="esewa_password" name="esewa_password" placeholder="Password" className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white input input-bordered border-gray-300 dark:border-gray-700" required />
              </div>
            <div className="flex flex-col">
              <label htmlFor="esewa_mpin" className="text-sm text-gray-600 dark:text-gray-300 mb-1">MPIN</label>
              <input type="password" id="esewa_mpin" name="esewa_mpin" placeholder="MPIN" className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white input input-bordered border-gray-300 dark:border-gray-700" />
            </div>
              <div className="flex flex-col">
              <label htmlFor="amount" className="text-sm text-gray-600 dark:text-gray-300 mb-1">Amount</label>
              <input type="number" id="amount" name="amount" value={fine}  className="w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white input input-bordered border-gray-300 dark:border-gray-700" />
              </div>
              {/* Hidden fields for eSewa integration */}
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
                className="mt-4 bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 font-semibold text-lg shadow dark:bg-emerald-700 dark:hover:bg-emerald-800"
              >
                Pay with eSewa
              </button>
            </form>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">You will be redirected to eSewa to complete your payment. Please do not refresh or close this page until payment is complete.</p>
            <div className="block md:hidden mt-8">
              <img src="https://cdn.esewa.com.np/ui/images/slider/deH0vD2AlVmf9Kokg1yPkhaanpin-slider-banner-min.jpg" alt="eSewa Banner" className="rounded-lg shadow" />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Payment;
