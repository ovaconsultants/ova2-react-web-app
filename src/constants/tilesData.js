import {trainingData} from "./trainingData";
export const jobTilesData = [
    {
        title: 'Job Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/job-details',
        roleId: '2',
    },
    {
        title: 'Job Applicants',
        description: 'Click Me!.',
        image: '',
        route: '/admin/job-applicants',
        roleId: '2',
    },
    {
        title: 'Consultant Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/contact-details',
        role : 'admin'
    },
    {
        title: 'User Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/users',
        role : 'admin'
    },
    {
        title: 'profile',
        description: 'Click Me!.',
        image: '',
        route: '/admin/profile',
        roleId: 'admin ,subadm,3,4,5',
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
    },
    {
        title: 'Power BI',
        description: 'Click Me!.',
        image: '',
        route: '/training/power-bi',
        data:trainingData?.powerBiTraining,
    },   
    {
        title: 'UI / UX',
        description: 'Click Me!.',
        image: '',
        route: '/training/ui-ux',
        data:trainingData?.uiTraining,
    },
    {
        title: 'Java',
        description: 'Click Me!.',
        image: '',
        route: '/training/java',
        data:trainingData?.javaTraining,
    },
    {
        title: 'SQL/PLSQL',
        description: 'Click Me!.',
        image: '',
        route: '/training/sql',
        data:trainingData?.sqlTraining,
    },
   
   

    // Add more tiles as needed
];
