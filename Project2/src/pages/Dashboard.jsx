import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, MessageSquare, HelpCircle, Code, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const features = [
    {
      title: 'Resume Screening',
      description: 'Automatically rank candidate CVs against job descriptions',
      icon: <FileText className="h-10 w-10 text-blue-600" />,
      path: '/resume-screening',
      color: 'bg-blue-50',
    },
    {
      title: 'Interview Agent',
      description: 'Conduct adaptive text interviews and summarize responses',
      icon: <MessageSquare className="h-10 w-10 text-teal-600" />,
      path: '/interview-agent',
      color: 'bg-teal-50',
    },
    {
      title: 'Candidate Messaging',
      description: 'Generate personalized emails for candidates',
      icon: <MessageSquare className="h-10 w-10 text-indigo-600" />,
      path: '/candidate-messaging',
      color: 'bg-indigo-50',
    },
    {
      title: 'Support Bot',
      description: 'Answer FAQs using a knowledge base of HR policies and JDs',
      icon: <HelpCircle className="h-10 w-10 text-violet-600" />,
      path: '/support-bot',
      color: 'bg-violet-50',
    },
    {
      title: 'Coding Evaluator',
      description: 'Evaluate coding challenges and provide feedback',
      icon: <Code className="h-10 w-10 text-emerald-600" />,
      path: '/coding-evaluator',
      color: 'bg-emerald-50',
    },
  ];

  const stats = [
    { label: 'Time Saved', value: '72%' },
    { label: 'Hire Quality', value: '35%' },
    { label: 'Candidate Experience', value: '91%' },
    { label: 'Cost Reduction', value: '48%' },
  ];

  return (
    <div>
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl py-12 px-8 text-white mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">AI-Powered Recruiting Assistant</h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl opacity-90">
            Streamline your hiring process with our GenAI-powered HR assistant. From screening resumes to conducting interviews and communicating with candidates.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/resume-screening" className="inline-flex items-center bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors">
              Start Screening
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link to="/interview-agent" className="inline-flex items-center bg-blue-500 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors">
              Conduct Interviews
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.path}
              className="block group"
            >
              <div className={`${feature.color} p-6 rounded-lg border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md h-full`}>
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-1 transition-transform">
                  Explore <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;