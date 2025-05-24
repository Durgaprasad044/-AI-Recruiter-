import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Brain, 
  UserCheck, 
  BarChart, 
  Calendar, 
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react';
import Logo from '../components/ui/Logo';

const LandingPage = () => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-900 to-primary-800 py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
                <span className="text-primary-300">AI-Powered</span> Recruitment Platform
              </h1>
              <p className="mt-6 text-xl text-primary-100">
                Find the perfect candidates faster with our AI-powered recruitment solution that automates screening, analyzes resumes, and matches candidates to your job requirements.
              </p>
              <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/signup" className="btn bg-white px-6 py-3 text-primary-800 hover:bg-primary-50">
                  Get Started
                </Link>
                <a href="#features" className="btn border border-primary-300 px-6 py-3 text-primary-100 hover:bg-primary-800">
                  Learn More
                </a>
              </div>
            </div>
            <div className="hidden md:flex md:items-center md:justify-center">
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Recruitment team working together" 
                className="rounded-lg object-cover shadow-2xl"
                width="500"
                height="400"
              />
            </div>
          </div>
        </div>
        
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            className="relative block h-16 w-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
          >
            <path
              fill="#f9fafb"
              fillOpacity="1"
              d="M0,0 C240,80 480,100 720,80 C960,60 1200,20 1440,40 L1440,100 L0,100 Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">85%</p>
              <p className="mt-2 text-sm text-gray-600">Faster Hiring</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">95%</p>
              <p className="mt-2 text-sm text-gray-600">Screening Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">60%</p>
              <p className="mt-2 text-sm text-gray-600">Cost Reduction</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-primary">1000+</p>
              <p className="mt-2 text-sm text-gray-600">Companies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Powerful Features to Streamline Your Recruitment
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our AI-powered platform helps you find, screen and hire the best candidates faster.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="animate-slide-in-up rounded-lg bg-white p-8 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Search size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">AI Resume Parsing</h3>
              <p className="text-gray-600">
                Our AI instantly extracts and analyzes candidate information from resumes, making screening faster and more accurate.
              </p>
            </div>

            <div className="animate-slide-in-up rounded-lg bg-white p-8 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Brain size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Intelligent Matching</h3>
              <p className="text-gray-600">
                Match candidates to job requirements automatically using advanced AI algorithms that understand both technical and soft skills.
              </p>
            </div>

            <div className="animate-slide-in-up rounded-lg bg-white p-8 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <UserCheck size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Automated Screening</h3>
              <p className="text-gray-600">
                Pre-screen candidates with custom AI chatbots that ask relevant questions and evaluate responses in real-time.
              </p>
            </div>

            <div className="animate-slide-in-up rounded-lg bg-white p-8 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Calendar size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Smart Scheduling</h3>
              <p className="text-gray-600">
                Eliminate scheduling hassles with our AI assistant that coordinates interviews between candidates and hiring teams.
              </p>
            </div>

            <div className="animate-slide-in-up rounded-lg bg-white p-8 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <BarChart size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Advanced Analytics</h3>
              <p className="text-gray-600">
                Gain insights into your recruitment process with detailed analytics and recommendations for improvement.
              </p>
            </div>

            <div className="animate-slide-in-up rounded-lg bg-white p-8 shadow-md transition-transform hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 text-primary">
                <CheckCircle size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900">Bias Reduction</h3>
              <p className="text-gray-600">
                Our AI is designed to help reduce unconscious bias in the hiring process, promoting diversity and inclusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              How RecruitAI Works
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Our platform simplifies every step of the recruitment process
            </p>
          </div>

          <div className="mt-16">
            <div className="relative">
              <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-primary-100 md:block"></div>
              
              <div className="space-y-12 md:space-y-24">
                <div className="relative">
                  <div className="flex flex-col items-center md:flex-row">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white md:absolute md:left-1/2 md:-translate-x-1/2">
                      <span className="text-lg font-bold">1</span>
                    </div>
                    <div className="mt-4 rounded-lg bg-white p-6 shadow-md md:mt-0 md:w-5/12 md:pr-12">
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">Create Job Posting</h3>
                      <p className="text-gray-600">
                        Create detailed job descriptions with our AI assistant that suggests relevant skills and qualifications based on industry standards.
                      </p>
                    </div>
                    <div className="hidden w-2/12 md:block"></div>
                    <div className="mt-4 md:mt-0 md:w-5/12">
                      <img 
                        src="https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Creating job posting" 
                        className="rounded-lg shadow-md"
                        width="400"
                        height="250"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col items-center md:flex-row">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white md:absolute md:left-1/2 md:-translate-x-1/2">
                      <span className="text-lg font-bold">2</span>
                    </div>
                    <div className="hidden md:block md:w-5/12">
                      <img 
                        src="https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="AI screening candidates" 
                        className="rounded-lg shadow-md"
                        width="400"
                        height="250"
                      />
                    </div>
                    <div className="hidden w-2/12 md:block"></div>
                    <div className="mt-4 rounded-lg bg-white p-6 shadow-md md:mt-0 md:w-5/12 md:pl-12">
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">AI Screening</h3>
                      <p className="text-gray-600">
                        Our AI automatically screens candidates, evaluating resumes and applications against job requirements to identify the best matches.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col items-center md:flex-row">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white md:absolute md:left-1/2 md:-translate-x-1/2">
                      <span className="text-lg font-bold">3</span>
                    </div>
                    <div className="mt-4 rounded-lg bg-white p-6 shadow-md md:mt-0 md:w-5/12 md:pr-12">
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">Interview Coordination</h3>
                      <p className="text-gray-600">
                        Schedule and manage interviews effortlessly with our AI assistant handling all the coordination between candidates and hiring teams.
                      </p>
                    </div>
                    <div className="hidden w-2/12 md:block"></div>
                    <div className="mt-4 md:mt-0 md:w-5/12">
                      <img 
                        src="https://images.pexels.com/photos/3205568/pexels-photo-3205568.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Interview scheduling" 
                        className="rounded-lg shadow-md"
                        width="400"
                        height="250"
                      />
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <div className="flex flex-col items-center md:flex-row">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white md:absolute md:left-1/2 md:-translate-x-1/2">
                      <span className="text-lg font-bold">4</span>
                    </div>
                    <div className="hidden md:block md:w-5/12">
                      <img 
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                        alt="Hiring decision" 
                        className="rounded-lg shadow-md"
                        width="400"
                        height="250"
                      />
                    </div>
                    <div className="hidden w-2/12 md:block"></div>
                    <div className="mt-4 rounded-lg bg-white p-6 shadow-md md:mt-0 md:w-5/12 md:pl-12">
                      <h3 className="mb-2 text-xl font-semibold text-gray-900">Make Hiring Decision</h3>
                      <p className="text-gray-600">
                        Get AI-powered insights and recommendations to help you make the best hiring decisions based on all candidate data and interactions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that fits your recruitment needs
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-2xl font-bold text-gray-900">Starter</h3>
              <p className="mt-4 text-sm text-gray-500">Perfect for small businesses</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-gray-900">$99</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Up to 5 job postings</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">AI resume parsing</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Basic candidate screening</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Email support</span>
                </li>
              </ul>
              <Link to="/signup" className="mt-8 block w-full btn btn-outline">
                Get Started
              </Link>
            </div>

            <div className="relative rounded-lg border-2 border-primary bg-white p-8 shadow-md transition-all hover:shadow-lg">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-white">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Professional</h3>
              <p className="mt-4 text-sm text-gray-500">Ideal for growing companies</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-gray-900">$199</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Up to 15 job postings</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Advanced AI matching</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Interview scheduling</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Priority support</span>
                </li>
              </ul>
              <Link to="/signup" className="mt-8 block w-full btn btn-primary">
                Get Started
              </Link>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-md">
              <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
              <p className="mt-4 text-sm text-gray-500">For large organizations</p>
              <div className="mt-6">
                <span className="text-5xl font-bold text-gray-900">$399</span>
                <span className="text-gray-500">/month</span>
              </div>
              <ul className="mt-8 space-y-4">
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Unlimited job postings</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Custom AI screening</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">API access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-success" />
                  <span className="text-gray-600">Dedicated support</span>
                </li>
              </ul>
              <Link to="/signup" className="mt-8 block w-full btn btn-outline">
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
              What Our Customers Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Join thousands of companies already using RecruitAI
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="flex items-center">
                <div className="flex text-warning">
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "RecruitAI has transformed our hiring process. We've reduced time-to-hire by 70% and found better candidates for our technical roles."
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-200 text-center">
                  <span className="text-lg font-semibold leading-10 text-primary-700">JS</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Jennifer Smith</p>
                  <p className="text-xs text-gray-500">HR Director, TechCorp</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="flex items-center">
                <div className="flex text-warning">
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "The AI-powered screening saved my team countless hours. We now focus on interviewing pre-qualified candidates rather than sorting through resumes."
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-200 text-center">
                  <span className="text-lg font-semibold leading-10 text-primary-700">DM</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">David Miller</p>
                  <p className="text-xs text-gray-500">Talent Acquisition, GrowthCo</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-white p-8 shadow-md">
              <div className="flex items-center">
                <div className="flex text-warning">
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                  <Star size={20} fill="#EAAA08" />
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "As a startup, we needed to hire quickly without sacrificing quality. RecruitAI helped us build our engineering team with perfect-fit candidates in record time."
              </p>
              <div className="mt-6 flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-200 text-center">
                  <span className="text-lg font-semibold leading-10 text-primary-700">AL</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Amy Lee</p>
                  <p className="text-xs text-gray-500">CEO, InnovateLab</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 shadow-xl">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:py-20">
              <div className="lg:w-0 lg:flex-1">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to transform your recruitment process?
                </h2>
                <p className="mt-4 max-w-3xl text-lg text-indigo-100">
                  Start finding the best talent faster with our AI-powered platform. Sign up today for a free demo.
                </p>
              </div>
              <div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
                <form className="space-y-4 sm:mx-auto sm:max-w-xl lg:mx-0">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="block w-full rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-primary-600 shadow hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-500"
                    >
                      Request Demo <ArrowRight className="ml-2 inline-block h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-xs text-indigo-100">
                    We care about your data. Read our{" "}
                    <a href="#" className="font-medium text-white underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base hover:text-white">Features</a></li>
                <li><a href="#" className="text-base hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-base hover:text-white">Case Studies</a></li>
                <li><a href="#" className="text-base hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base hover:text-white">About</a></li>
                <li><a href="#" className="text-base hover:text-white">Blog</a></li>
                <li><a href="#" className="text-base hover:text-white">Careers</a></li>
                <li><a href="#" className="text-base hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Support</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base hover:text-white">Help Center</a></li>
                <li><a href="#" className="text-base hover:text-white">API Documentation</a></li>
                <li><a href="#" className="text-base hover:text-white">Status</a></li>
                <li><a href="#" className="text-base hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-base hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-base hover:text-white">Terms</a></li>
                <li><a href="#" className="text-base hover:text-white">Cookies</a></li>
                <li><a href="#" className="text-base hover:text-white">GDPR</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 pb-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Logo />
                <span className="ml-2 text-xl font-bold text-white">RecruitAI</span>
              </div>
              <p className="text-base">
                &copy; {new Date().getFullYear()} RecruitAI, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;