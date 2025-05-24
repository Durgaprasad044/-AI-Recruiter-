export const mockResumes = [
  {
    name: "Emily Chen",
    experience: 5,
    skills: ["React", "TypeScript", "Node.js", "AWS", "GraphQL"],
    strengths: ["Frontend Development", "System Design", "UI/UX"]
  },
  {
    name: "Michael Johnson",
    experience: 8,
    skills: ["JavaScript", "React", "Redux", "REST APIs", "Agile"],
    strengths: ["Technical Leadership", "Component Design", "Performance Optimization"]
  },
  {
    name: "Sarah Williams",
    experience: 3,
    skills: ["Angular", "JavaScript", "CSS", "HTML5", "Bootstrap"],
    strengths: ["Responsive Design", "Cross-browser Compatibility", "Web Accessibility"]
  },
  {
    name: "David Rodriguez",
    experience: 6,
    skills: ["Vue.js", "Vuex", "JavaScript", "Tailwind CSS", "Firebase"],
    strengths: ["State Management", "Real-time Applications", "Frontend Architecture"]
  },
  {
    name: "Priya Patel",
    experience: 4,
    skills: ["React Native", "JavaScript", "TypeScript", "Redux", "Mobile UI"],
    strengths: ["Mobile Development", "Cross-platform Solutions", "UI Animation"]
  }
];

export const mockKnowledgeBase = [
  {
    question: "What is your remote work policy?",
    answer: "Our company offers a hybrid work model. Employees can work remotely up to 3 days per week, with 2 days in the office for team collaboration. Fully remote positions are available for certain roles based on team and business needs."
  },
  {
    question: "What benefits do you offer?",
    answer: "We provide comprehensive benefits including health, dental, and vision insurance, 401(k) matching, generous PTO (20 days per year), paid parental leave (16 weeks), professional development budget ($2,000/year), and wellness stipend ($100/month)."
  },
  {
    question: "What is the interview process like?",
    answer: "Our interview process typically includes: 1) Initial recruiter screening call (30 min), 2) Technical assessment or take-home assignment, 3) Technical interview with team members (1 hour), 4) Final interview with hiring manager and cross-functional stakeholders (1 hour). The entire process usually takes 2-3 weeks."
  },
  {
    question: "Do you sponsor work visas?",
    answer: "Yes, we do sponsor work visas for qualified candidates, including H-1B, TN, and other employment-based visas. Our company has a dedicated immigration team to support international candidates throughout the visa process."
  },
  {
    question: "What is your salary range for this position?",
    answer: "Our salary ranges are based on skills, experience, and location. We're committed to fair and competitive compensation. The specific range for this position is typically $X-$Y, depending on the factors mentioned. We also offer equity as part of our total compensation package."
  }
];

export const mockCodingChallenges = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      }
    ]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets. Open brackets must be closed in the correct order. Every close bracket has a corresponding open bracket of the same type.",
    examples: [
      {
        input: "s = \"()\"",
        output: "true"
      },
      {
        input: "s = \"()[]{}\"",
        output: "true"
      },
      {
        input: "s = \"(]\"",
        output: "false"
      }
    ]
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    difficulty: "Medium",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      }
    ]
  }
];