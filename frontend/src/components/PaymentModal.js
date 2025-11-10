import React, { useState } from 'react';

const PaymentModal = ({ plan, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [upiData, setUpiData] = useState({
    upiId: ''
  });
  const [processing, setProcessing] = useState(false);
  const [upiError, setUpiError] = useState('');
  const [cardErrors, setCardErrors] = useState({});

  const validateCardNumber = (number) => {
    const cardNumber = number.replace(/\s/g, '');
    if (!/^\d+$/.test(cardNumber)) return false;
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i));
      if (shouldDouble) {
        if ((digit *= 2) > 9) digit -= 9;
      }
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
  };

  const validateExpiryDate = (expiry) => {
    if (!/^\d{2}\/\d{2}$/.test(expiry)) return false;
    const [month, year] = expiry.split('/');
    const expiryMonth = parseInt(month, 10);
    const expiryYear = parseInt(year, 10) + 2000;
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
      return false;
    }
    return expiryMonth > 0 && expiryMonth <= 12;
  };

  const validateCvv = (cvv) => {
    return /^\d{3,4}$/.test(cvv);
  };

  const validateCardForm = () => {
    const errors = {};
    if (!validateCardNumber(cardData.number)) {
      errors.number = 'Invalid card number';
    }
    if (!validateExpiryDate(cardData.expiry)) {
      errors.expiry = 'Invalid expiry date';
    }
    if (!validateCvv(cardData.cvv)) {
      errors.cvv = 'Invalid CVV';
    }
    if (!cardData.name.trim()) {
      errors.name = 'Cardholder name is required';
    }
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCardChange = (e) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
    if (cardErrors[name]) {
      setCardErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleUpiChange = (e) => {
    setUpiData({
      upiId: e.target.value
    });
    if (upiError) {
      setUpiError('');
    }
  };

  const validateUpiId = (upiId) => {
    const upiRegex = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$/;
    return upiRegex.test(upiId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === 'card') {
      if (!validateCardForm()) {
        return;
      }
    }

    if (paymentMethod === 'upi') {
      if (!validateUpiId(upiData.upiId)) {
        setUpiError('Please enter a valid UPI ID (e.g., username@upi)');
        return;
      }
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      onSuccess();
    }, 2000);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5 z-50 animate-fade-in">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white mr-3">
              <span className="text-lg">💳</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Complete Payment</h2>
          </div>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold transition-colors duration-300 hover:scale-110"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-secondary-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h3>
              <p className="text-gray-600 text-sm">Subscription Plan</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-primary-600">₹{plan.price}</div>
              <div className="text-gray-600 text-sm">/{plan.duration}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Choose Payment Method</h4>
            <div className="space-y-3">
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 transition-colors duration-300">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 text-primary-500 focus:ring-primary-500"
                />
                <div className="flex items-center">
                  <span className="text-2xl mr-3">💳</span>
                  <div>
                    <div className="text-gray-700 font-medium">Credit/Debit Card</div>
                    <div className="text-gray-500 text-sm">Visa, Mastercard, RuPay</div>
                  </div>
                </div>
              </label>
              <label className="flex items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-primary-300 transition-colors duration-300">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3 text-primary-500 focus:ring-primary-500"
                />
                <div className="flex items-center">
                  <span className="text-2xl mr-3">📱</span>
                  <div>
                    <div className="text-gray-700 font-medium">UPI</div>
                    <div className="text-gray-500 text-sm">Google Pay, PhonePe, Paytm</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-gray-700 font-semibold mb-2">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    name="number"
                    value={cardData.number}
                    onChange={(e) => setCardData(prev => ({
                      ...prev,
                      number: formatCardNumber(e.target.value)
                    }))}
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 pr-12 ${cardErrors.number ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                </div>
                {cardErrors.number && <p className="text-red-500 text-sm mt-2">{cardErrors.number}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="block text-gray-700 font-semibold mb-2">Expiry Date</label>
                  <input
                    type="text"
                    name="expiry"
                    value={cardData.expiry}
                    onChange={(e) => setCardData(prev => ({
                      ...prev,
                      expiry: formatExpiry(e.target.value)
                    }))}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 ${cardErrors.expiry ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {cardErrors.expiry && <p className="text-red-500 text-sm mt-2">{cardErrors.expiry}</p>}
                </div>
                <div className="form-group">
                  <label className="block text-gray-700 font-semibold mb-2">CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={cardData.cvv}
                    onChange={handleCardChange}
                    placeholder="123"
                    maxLength="4"
                    required
                    className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 ${cardErrors.cvv ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {cardErrors.cvv && <p className="text-red-500 text-sm mt-2">{cardErrors.cvv}</p>}
                </div>
              </div>
              <div className="form-group">
                <label className="block text-gray-700 font-semibold mb-2">Cardholder Name</label>
                <input
                  type="text"
                  name="name"
                  value={cardData.name}
                  onChange={handleCardChange}
                  placeholder="John Doe"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 ${cardErrors.name ? 'border-red-500' : 'border-gray-200'}`}
                />
                {cardErrors.name && <p className="text-red-500 text-sm mt-2">{cardErrors.name}</p>}
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="form-group">
              <label className="block text-gray-700 font-semibold mb-2">UPI ID</label>
              <div className="relative">
                <input
                  type="text"
                  value={upiData.upiId}
                  onChange={handleUpiChange}
                  placeholder="username@upi"
                  required
                  className={`w-full px-4 py-3 border-2 rounded-lg text-base transition-colors duration-300 focus:outline-none focus:border-primary-500 focus:shadow-lg focus:shadow-primary-500/10 pr-12 ${upiError ? 'border-red-500' : 'border-gray-200'}`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              {upiError && <p className="text-red-500 text-sm mt-2">{upiError}</p>}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/30 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              disabled={processing}
            >
              {processing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <span className="mr-2">💳</span>
                  Pay ₹{plan.price}
                </>
              )}
            </button>
            <button
              type="button"
              className="flex-1 bg-gray-300 text-gray-700 py-3 px-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-400"
              onClick={onClose}
              disabled={processing}
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-b-3xl">
          <div className="flex justify-center gap-3 mb-3">
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <span className="mr-1">🔒</span>
              Secure
            </span>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <span className="mr-1">🛡️</span>
              Protected
            </span>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
              <span className="mr-1">✅</span>
              Verified
            </span>
          </div>
          <p className="text-gray-600 text-sm text-center">
            Your payment information is encrypted and secure. We never store your card details.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;