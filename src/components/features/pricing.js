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
        Why You Should Have Condo24
      </h2>
      <div className="text-gray-600 text-left mb-8 space-y-4">
        <h3 className="font-semibold">1. Efficient Property Management</h3>
        <p>
          Condo24 allows you to seamlessly track all your properties, from
          maintenance schedules to tenant information. Keep everything organized
          in one place and eliminate the stress of managing multiple units.
        </p>

        <h3 className="font-semibold">2. Real-Time Notifications</h3>
        <p>
          Stay updated with real-time alerts about important events like
          maintenance, payment due dates, and contract renewals. Never miss an
          important task again.
        </p>

        <h3 className="font-semibold">3. Detailed Financial Reporting</h3>
        <p>
          Easily track income, expenses, and generate detailed reports. Condo24
          helps you manage the finances of your properties with ease, giving you
          a clear overview of your investment's performance.
        </p>

        <h3 className="font-semibold">4. Secure Document Storage</h3>
        <p>
          Store all your important documents in a secure and easy-to-access
          location. Whether it’s contracts, invoices, or inspection reports,
          everything is organized and readily available.
        </p>

        <h3 className="font-semibold">5. Cost-Effective</h3>
        <p>
          For just €550 per year (around €1.50 per day), you’ll have access to
          all of Condo24’s features that make managing your properties more
          efficient, saving you time and effort.
        </p>

        <h3 className="font-semibold">
          6. Maximized Efficiency and Profitability
        </h3>
        <p>
          Whether you manage one or several properties, Condo24 is designed to
          streamline your operations, increase your productivity, and ensure
          you’re always on top of your property management game.
        </p>

        <p>
          With Condo24, you're investing in a smarter, more organized future for
          your property management. Why settle for less when you can have it all
          for a fraction of the cost?
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Basic Plan */}
        <div className="card w-96 bg-white shadow-lg p-14 border rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            €349 <span className="text-gray-500 line-through">€399</span> USD
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
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            €549 <span className="text-gray-500 line-through">€599</span> USD
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
