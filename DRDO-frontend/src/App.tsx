import './App.css'

function App() {
  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-primary-700 text-white py-4">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-white">DRDO Portal</h1>
          <p className="text-primary-100 mt-1">Defence Research and Development Organisation</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 section-spacing">
        <div className="container-custom">
          {/* Design System Demo Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-bold text-primary-800 mb-6">
              Design System Demo
            </h2>
            <p className="text-lg text-neutral-700 mb-8 max-w-3xl">
              This is a demonstration of the DRDO Portal design system. All design tokens,
              colors, typography, and utilities are now configured and ready to use.
            </p>
          </section>

          {/* Color Palette Section */}
          <section className="mb-16">
            <h3 className="text-2xl font-semibold text-primary-700 mb-6">Color Palette</h3>
            
            {/* Primary Colors */}
            <div className="mb-8">
              <h4 className="text-xl font-medium text-neutral-800 mb-4">Primary (Navy)</h4>
              <div className="flex flex-wrap gap-3">
                {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`w-20 h-20 rounded-lg shadow-md bg-primary-${shade} mb-2`}
                    />
                    <span className="text-sm text-neutral-600">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accent Colors */}
            <div className="mb-8">
              <h4 className="text-xl font-medium text-neutral-800 mb-4">Accent (Orange)</h4>
              <div className="flex flex-wrap gap-3">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`w-20 h-20 rounded-lg shadow-md bg-accent-${shade} mb-2`}
                    />
                    <span className="text-sm text-neutral-600">{shade}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Teal Colors */}
            <div className="mb-8">
              <h4 className="text-xl font-medium text-neutral-800 mb-4">Teal (Secondary)</h4>
              <div className="flex flex-wrap gap-3">
                {[50, 100, 200, 300, 400, 500, 600].map((shade) => (
                  <div key={shade} className="text-center">
                    <div
                      className={`w-20 h-20 rounded-lg shadow-md bg-teal-${shade} mb-2`}
                    />
                    <span className="text-sm text-neutral-600">{shade}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Typography Section */}
          <section className="mb-16">
            <h3 className="text-2xl font-semibold text-primary-700 mb-6">Typography</h3>
            <div className="space-y-4 max-w-4xl">
              <div>
                <h1 className="text-6xl font-bold text-primary-800">Display 1 - Heading</h1>
                <p className="text-sm text-neutral-500 mt-1">56px / Bold / Poppins</p>
              </div>
              <div>
                <h2 className="text-5xl font-bold text-primary-800">Display 2 - Heading</h2>
                <p className="text-sm text-neutral-500 mt-1">48px / Bold / Poppins</p>
              </div>
              <div>
                <h1>Heading 1</h1>
                <p className="text-sm text-neutral-500 mt-1">36px / Semibold / Poppins</p>
              </div>
              <div>
                <h2>Heading 2</h2>
                <p className="text-sm text-neutral-500 mt-1">30px / Semibold / Poppins</p>
              </div>
              <div>
                <h3>Heading 3</h3>
                <p className="text-sm text-neutral-500 mt-1">24px / Semibold / Poppins</p>
              </div>
              <div>
                <p className="text-lg">
                  Body Large - This is a lead paragraph with larger text for emphasis and
                  improved readability in hero sections.
                </p>
                <p className="text-sm text-neutral-500 mt-1">18px / Regular / Poppins</p>
              </div>
              <div>
                <p>
                  Body Text - This is the default body text used throughout the portal. It
                  provides comfortable reading with proper line height.
                </p>
                <p className="text-sm text-neutral-500 mt-1">16px / Regular / Poppins</p>
              </div>
              <div>
                <p className="text-sm text-neutral-600">
                  Small Text - Used for secondary information and captions.
                </p>
                <p className="text-sm text-neutral-500 mt-1">14px / Regular / Poppins</p>
              </div>
            </div>
          </section>

          {/* Buttons & Components Demo */}
          <section className="mb-16">
            <h3 className="text-2xl font-semibold text-primary-700 mb-6">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-md">
                Primary Button
              </button>
              <button className="px-6 py-3 bg-accent-400 text-white rounded-lg font-medium hover:bg-accent-500 transition-colors shadow-md">
                Accent Button
              </button>
              <button className="px-6 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg font-medium hover:bg-primary-50 transition-colors">
                Secondary Button
              </button>
              <button className="px-6 py-3 bg-neutral-200 text-neutral-700 rounded-lg font-medium hover:bg-neutral-300 transition-colors">
                Neutral Button
              </button>
            </div>
          </section>

          {/* Card Demo with Hover Effect */}
          <section className="mb-16">
            <h3 className="text-2xl font-semibold text-primary-700 mb-6">Card Component</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md card-hover border border-neutral-200">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-primary-600">🔬</span>
                </div>
                <h4 className="text-xl font-semibold text-primary-800 mb-2">Research</h4>
                <p className="text-neutral-600">
                  Cutting-edge defense research and development initiatives.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md card-hover border border-neutral-200">
                <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-accent-600">🎯</span>
                </div>
                <h4 className="text-xl font-semibold text-primary-800 mb-2">Innovation</h4>
                <p className="text-neutral-600">
                  Advanced technology solutions for national security.
                </p>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md card-hover border border-neutral-200">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl text-teal-600">🛡️</span>
                </div>
                <h4 className="text-xl font-semibold text-primary-800 mb-2">Defense</h4>
                <p className="text-neutral-600">
                  Comprehensive defense systems and technologies.
                </p>
              </div>
            </div>
          </section>

          {/* Success Message */}
          <section className="mb-16">
            <div className="bg-success-50 border-l-4 border-success-500 rounded-lg p-6 max-w-3xl">
              <h4 className="text-lg font-semibold text-success-600 mb-2">
                ✓ Design System Ready
              </h4>
              <p className="text-success-700">
                The DRDO Portal design system has been successfully implemented. All design
                tokens, color palette, typography, spacing, and utilities are configured and
                ready for component development.
              </p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-800 text-white py-8">
        <div className="container-custom text-center">
          <p className="text-primary-200">
            © 2026 DRDO Portal - Design System Phase 1
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
