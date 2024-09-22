import {trainingData} from "./trainingData";
export const jobTilesData = [
    {
        title: 'Job Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/job-details',
    },
    {
        title: 'Job Applicants',
        description: 'Click Me!.',
        image: '',
        route: '/admin/job-applicants',
    },
    {
        title: 'Consultant Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/contact-details',
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
