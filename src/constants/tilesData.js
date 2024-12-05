import {trainingData} from "./trainingData";
export const jobTilesData = [
    {
        title: 'Job Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/job-details',
        roleName: 'admin',
    },
    {
        title: 'Job Applicants',
        description: 'Click Me!.',
        image: '',
        route: '/admin/job-applicants',
        roleName: 'admin',
    },
    {
        title: 'Consultant Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/contact-details',
        roleName : 'admin',
    },
    {
        title: 'User Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/users',
        roleName : 'admin',
    },
    {
        title: 'Profile',
        description: 'Click Me!.',
        image: '',
        route: '/admin/profile',
        roleName: 'user,admin,sub-admin,manager,sales_team',
    },
    {
        title: 'Vendor Management',
        description: 'Click Me!.',
        image: '',
        route: '/admin/vendor',
        roleName: 'admin',
    },
    {
        title: 'Generate Pay Slip',
        description: 'Click Me!.',
        image: '',
        route: '/admin/pay-slip',
        roleName: 'admin',
    },
    {
        title: 'Contact Query Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/contact-query-details',
        roleName: 'admin',
    },
    // Add more tiles as needed
];
export const trainingTilesData = [
    {
        title: 'React-Redux',
        description: 'Click Me!.',
        image: '',
        route: '/training/react-redux',
        data:trainingData?.reactReduxTraining,
         roleName: 'user,admin,sub-admin,manager,sales_team'
    },
    {
        title: 'Power BI',
        description: 'Click Me!.',
        image: '',
        route: '/training/power-bi',
        data:trainingData?.powerBiTraining,
        roleName: 'user,admin,sub-admin,manager,sales_team',
    },   
    {
        title: 'UI / UX',
        description: 'Click Me!.',
        image: '',
        route: '/training/ui-ux',
        data:trainingData?.uiTraining,
        roleName: 'user,admin,sub-admin,manager,sales_team',
    },
    {
        title: 'Java',
        description: 'Click Me!.',
        image: '',
        route: '/training/java',
        data:trainingData?.javaTraining,
        roleName: 'user,admin,sub-admin,manager,sales_team',
    },
    {
        title: 'SQL/PLSQL',
        description: 'Click Me!.',
        image: '',
        route: '/training/sql',
        data:trainingData?.sqlTraining,
        roleName: 'user,admin,sub-admin,manager,sales_team',
    },
     {
     title: 'Power BI',
     description: 'Click Me!.',
     image: '',
     route: '/training/power-bi',
     data:trainingData?.powerBiTraining,
     roleName: 'user,admin,sub-admin,manager,sales_team',
 },   
   
   

    // Add more tiles as needed
];
