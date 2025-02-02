export default function Section() {
  return (
    <div className="min-h-screen p-8" data-theme="nord">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold p-10">Your Subtitle Here</h2>
      </div>
      <div className="max-w-6xl mx-auto flex gap-8" id="section">
        {/* Left Side */}
        <div className="w-1/2 rounded-lg p-8">
          <div className="collapse collapse-plus bg-base-100">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title font-semibold">
              How do I create an account?
            </div>
            <hr></hr>
            <div className="collapse-content text-sm">
              Click the "Sign Up" button in the top right corner and follow the
              registration process.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              I forgot my password. What should I do?
            </div>
            <hr></hr>
            <div className="collapse-content text-sm">
              Click on "Forgot Password" on the login page and follow the
              instructions sent to your email.
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-100">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title font-semibold">
              How do I update my profile information?
            </div>
            <div className="collapse-content text-sm">
              Go to "My Account" settings and select "Edit Profile" to make
              changes.
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-1/2 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-xl font-bold mb-4">Boostrapper</h2>
          <ul className="space-y-2">
            <li>App1</li>
            <li>App2</li>
            <li>App3</li>
          </ul>
          <button className="mt-4 btn btn-primary">Add new account</button>
          <div className="mt-8">
            <div className="flex items-center space-x-2">
              <span className="text-yellow-400">★ ★ ★ ★ ★</span>
            </div>
            <p className="mt-4">
              Added the ZenVoice link in the welcome email. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat. I deploy it once and I don’t need to care
              anymore.
            </p>
            <p className="mt-2 font-bold">Marko Rrokaj</p>
            <p className="text-sm">Followers on X</p>
          </div>
        </div>
      </div>
    </div>
  );
}
