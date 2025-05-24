import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase,
  Users,
  Calendar,
  ChevronRight,
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { 
      name: 'Active Jobs', 
      value: '12', 
      change: '+2', 
      changeType: 'increase', 
      icon: <Briefcase className="h-6 w-6 text-primary" /> 
    },
    { 
      name: 'Candidates', 
      value: '253', 
      change: '+19', 
      changeType: 'increase', 
      icon: <Users className="h-6 w-6 text-primary" /> 
    },
    { 
      name: 'Interviews', 
      value: '28', 
      change: '+4', 
      changeType: 'increase', 
      icon: <Calendar className="h-6 w-6 text-primary" /> 
    },
    { 
      name: 'Time to Hire', 
      value: '18d', 
      change: '-3', 
      changeType: 'decrease', 
      icon: <Clock className="h-6 w-6 text-primary" /> 
    },
  ];

  const recentJobs = [
    {
      id: '1',
      title: 'Senior Frontend Developer',
      location: 'San Francisco, CA (Remote)',
      applicants: 42,
      status: 'active',
      posted: '2 days ago',
    },
    {
      id: '2',
      title: 'Product Manager',
      location: 'New York, NY',
      applicants: 23,
      status: 'active',
      posted: '4 days ago',
    },
    {
      id: '3',
      title: 'UX/UI Designer',
      location: 'Remote',
      applicants: 18,
      status: 'active',
      posted: '1 week ago',
    },
  ];

  const upcomingInterviews = [
    {
      id: '1',
      candidate: 'Alex Johnson',
      position: 'Senior Frontend Developer',
      date: 'Today',
      time: '2:00 PM',
      status: 'confirmed',
    },
    {
      id: '2',
      candidate: 'Emma Davis',
      position: 'UX/UI Designer',
      date: 'Tomorrow',
      time: '10:30 AM',
      status: 'pending',
    },
    {
      id: '3',
      candidate: 'Michael Chen',
      position: 'Product Manager',
      date: 'Sep 15, 2025',
      time: '1:15 PM',
      status: 'confirmed',
    },
  ];

  const topCandidates = [
    {
      id: '1',
      name: 'Sarah Miller',
      position: 'Senior Frontend Developer',
      matchScore: 98,
      status: 'review',
    },
    {
      id: '2',
      name: 'David Wilson',
      position: 'Product Manager',
      matchScore: 95,
      status: 'interview',
    },
    {
      id: '3',
      name: 'Jessica Taylor',
      position: 'UX/UI Designer',
      matchScore: 92,
      status: 'applied',
    },
  ];

  return (
    <div className="animate-fade-in px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>
        <div className="mt-4 flex sm:mt-0">
          <Link
            to="/jobs/new"
            className="btn btn-primary"
          >
            Post New Job
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">{stat.icon}</div>
              <div className="ml-5 w-0 flex-1">
                <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
                <dd className="flex items-baseline">
                  <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                  <div
                    className={`ml-2 flex items-baseline text-sm font-semibold ${
                      stat.changeType === 'increase' ? 'text-success' : 'text-error'
                    }`}
                  >
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="h-4 w-4 flex-shrink-0 self-center" />
                    ) : (
                      <TrendingUp className="h-4 w-4 flex-shrink-0 self-center transform rotate-180" />
                    )}
                    <span className="ml-1">{stat.change}</span>
                  </div>
                </dd>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Jobs */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900">Recent Jobs</h2>
            <Link to="/jobs" className="text-sm font-medium text-primary hover:text-primary-700">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-gray-200">
            {recentJobs.map((job) => (
              <li key={job.id}>
                <Link to={`/jobs/${job.id}`} className="block hover:bg-gray-50">
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-100 text-primary">
                            <Briefcase size={20} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{job.title}</p>
                          <p className="text-sm text-gray-500">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                          {job.applicants} applicants
                        </span>
                        <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Posted {job.posted}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Upcoming Interviews */}
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Interviews</h2>
            <Link to="/schedule" className="text-sm font-medium text-primary hover:text-primary-700">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-gray-200">
            {upcomingInterviews.map((interview) => (
              <li key={interview.id}>
                <Link to={`/schedule/${interview.id}`} className="block hover:bg-gray-50">
                  <div className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary">
                            <span className="text-sm font-medium">
                              {interview.candidate.split(' ').map((n) => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{interview.candidate}</p>
                          <p className="text-sm text-gray-500">{interview.position}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          interview.status === 'confirmed' 
                            ? 'bg-success/10 text-success'
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {interview.status === 'confirmed' ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <Clock className="mr-1 h-3 w-3" />
                          )}
                          {interview.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                        </span>
                        <ChevronRight className="ml-2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {interview.date} at {interview.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top Candidates */}
      <div className="mt-8 overflow-hidden rounded-lg bg-white shadow">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <h2 className="text-lg font-medium text-gray-900">Top AI-Matched Candidates</h2>
          <Link to="/candidates" className="text-sm font-medium text-primary hover:text-primary-700">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Candidate
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Position
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Match Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {topCandidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary">
                        <span className="text-sm font-medium">
                          {candidate.name.split(' ').map((n) => n[0]).join('')}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{candidate.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm text-gray-900">{candidate.position}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center">
                      <div 
                        className={`h-2 w-16 rounded-full ${
                          candidate.matchScore >= 95 ? 'bg-success' : 
                          candidate.matchScore >= 90 ? 'bg-success-500' : 'bg-warning-500'
                        }`}
                      >
                        <div 
                          className="h-2 rounded-full bg-success-600" 
                          style={{ width: `${candidate.matchScore}%` }} 
                        />
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">{candidate.matchScore}%</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      candidate.status === 'review' 
                        ? 'bg-primary/10 text-primary'
                        : candidate.status === 'interview'
                        ? 'bg-secondary/10 text-secondary'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {candidate.status === 'review' 
                        ? 'In Review' 
                        : candidate.status === 'interview'
                        ? 'Interview Scheduled'
                        : 'Applied'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                    <Link to={`/candidates/${candidate.id}`} className="text-primary hover:text-primary-900">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;