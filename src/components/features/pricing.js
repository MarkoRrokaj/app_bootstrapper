export default function Pricing() {
  return (
    <div
      className="flex flex-col items-center bg-gray-100 min-h-screen p-8"
      id="pricing"
    >
      <div className="badge badge-primary mb-4 m-8">
        ✨ Launch discount — $50 OFF ✨
      </div>
      <h2 className="text-3xl font-bold text-center mb-4 pt-10">
        Stop wasting hours managing Stripe invoices
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Ditch the Stripe Invoicing fee, reduce customer support, and focus on
        your startup. 1-minute no-code setup.
      </p>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Basic Plan */}
        <div className="card w-96 bg-white shadow-lg p-14 border rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            $49 <span className="text-gray-500 line-through">$99</span> USD
          </h3>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>✅ ZenVoice link</li>
            <li>✅ Unlimited self-serve invoices</li>
            <li>✅ 1 Stripe account</li>
          </ul>
          <button className="btn btn-success w-full">Get Zenvoice ➜</button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            One-time payment, then{" "}
            <span className="font-bold">it's yours forever</span>
          </p>
        </div>
        {/* Pro Plan */}
        <div className="card w-96 bg-white shadow-lg p-14 border rounded-lg border-green-500 relative">
          {/* <div className="badge badge-success absolute top-[-10px] left-1/2 transform -translate-x-1/2">
            BUSY FOUNDERS' CHOICE
          </div> */}
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            $69 <span className="text-gray-500 line-through">$119</span> USD
          </h3>
          <ul className="text-gray-700 space-y-2 mb-4">
            <li>✅ ZenVoice link</li>
            <li>✅ Unlimited self-serve invoices</li>
            <li>
              ✅ <span className="font-bold text-green-500">Unlimited</span>{" "}
              Stripe accounts
            </li>
          </ul>
          <button className="btn btn-success w-full">Get Zenvoice ➜</button>
          <p className="text-sm text-gray-500 mt-2 text-center">
            One-time payment, then{" "}
            <span className="font-bold">it's yours forever</span>
          </p>
        </div>
      </div>
    </div>
  );
}
