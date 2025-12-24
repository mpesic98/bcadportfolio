function Preview() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Floating Back Button */}
      <button
        onClick={() => window.history.back()}
        className="
          fixed top-6 left-6 z-[9999]
          bg-black text-white px-5 py-2 
          rounded-full shadow-lg 
          hover:bg-gray-900 
          transition
        "
      >
        ← Back
      </button>

      <header className="bg-gray-100 py-4 text-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Top Bar */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700"></div>
            </div>
            <div className="flex space-x-4">
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>

          {/* Main Navigation */}
          <nav className="flex flex-col items-center justify-between sm:flex-row">
            <div className="mb-4 h-12 w-40 bg-gray-300 dark:bg-gray-700 sm:mb-0"></div>
            <div className="hidden space-x-6 sm:flex">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-24 rounded bg-gray-300 dark:bg-gray-700"
                ></div>
              ))}
            </div>
            <div className="h-10 w-10 bg-gray-300 dark:bg-gray-700 sm:hidden"></div>
          </nav>
        </div>
      </header>

      <div className="container mx-auto flex flex-col gap-8 p-0 py-8">
        <main className="flex flex-col gap-8 lg:mb-0 lg:flex-row">
          <div className="flex flex-grow flex-col gap-12">
            <section>
              <div className="mb-4 h-10 w-3/4 bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-4 h-96 w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2 h-6 w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-6 w-5/6 bg-gray-200 dark:bg-gray-700"></div>
            </section>

            {/* Latest News */}
            <section className="flex flex-col gap-6">
              <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700"></div>
              {[...Array(3)].map((_, i) => (
                <article className="flex flex-col gap-8" key={i}>
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="mb-4 h-48 w-full bg-gray-200 dark:bg-gray-700 sm:mb-0 sm:w-64"></div>
                    <div className="flex-grow">
                      <div className="mb-2 h-6 w-3/4 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="mb-2 h-4 w-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="mb-2 h-4 w-5/6 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Latest News (duplicate) */}
            <section className="flex flex-col gap-6">
              <div className="h-8 w-1/2 bg-gray-200 dark:bg-gray-700"></div>
              {[...Array(3)].map((_, i) => (
                <article key={i} className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="mb-4 h-48 w-full bg-gray-200 dark:bg-gray-700 sm:mb-0 sm:w-64"></div>
                    <div className="flex-grow">
                      <div className="mb-2 h-6 w-3/4 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="mb-2 h-4 w-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="mb-2 h-4 w-5/6 bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </article>
              ))}
            </section>

            {/* Categories */}
            <section>
              <div className="mb-6 h-8 w-1/3 bg-gray-200 dark:bg-gray-700"></div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-lg border p-4">
                    <div className="mb-2 h-6 w-3/4 bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-2 h-4 w-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <aside className="flex w-full flex-col gap-8 lg:w-80">
            {/* Search Bar */}
            <div className="flex flex-col gap-2">
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex flex-col gap-2">
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>

            {/* Popular Articles */}
            <section>
              {[...Array(7)].map((_, i) => (
                <div key={i} className="mb-4 flex items-center">
                  <div className="mr-4 h-16 w-16 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="flex-grow">
                    <div className="mb-2 h-4 w-full bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              ))}
            </section>

            {/* Newsletter */}
            <section>
              <div className="mb-4 h-8 w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mb-2 h-10 w-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-10 w-full bg-gray-200 dark:bg-gray-700"></div>
            </section>

            {/* Social Media */}
            <section>
              <div className="mb-4 h-8 w-2/3 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex justify-between">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700"
                  ></div>
                ))}
              </div>
            </section>

            {/* Tags */}
            <section>
              <div className="mb-4 h-8 w-1/2 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex flex-wrap gap-2">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-8 w-20 rounded-full bg-gray-200 dark:bg-gray-700"
                  ></div>
                ))}
              </div>
            </section>
          </aside>
        </main>
      </div>

      <footer className="mt-auto bg-gray-100 py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-12 flex flex-wrap justify-between gap-8">
            {[...Array(3)].map((_, section) => (
              <div key={section} className="w-full sm:w-1/2 md:w-1/4">
                <div className="mb-6 h-8 w-32 bg-gray-300 dark:bg-gray-700"></div>
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="mb-4 h-6 w-full bg-gray-300 dark:bg-gray-700"
                  ></div>
                ))}
              </div>
            ))}

            <div className="w-full sm:w-1/2 md:w-1/4">
              <div className="mb-6 h-8 w-32 bg-gray-300 dark:bg-gray-700"></div>
              <div className="h-32 w-full bg-gray-300 dark:bg-gray-700"></div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between border-t border-gray-300 pt-8 dark:border-gray-700 sm:flex-row">
            <div className="mb-4 h-6 w-48 bg-gray-300 dark:bg-gray-700 sm:mb-0"></div>
            <div className="flex space-x-6">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Preview;
