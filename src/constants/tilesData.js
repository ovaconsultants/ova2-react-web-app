import {trainingData} from "./trainingData";
import { clientsData } from "../components/clientsData/clientData";
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
    {
        title: ' Course Enrollment Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/enrollment-details',
        roleName: 'admin',
    },
    {
        title: 'Exception Logs Details',
        description: 'Click Me!.',
        image: '',
        route: '/admin/exception-logs-details',
        roleName: 'admin',
    },
    {
        title: 'Letter Head',
        description: 'Click Me!.',
        image: '',
        route: '/   ',
        roleName: 'admin',
    },
   
    // Add more tiles as needed
];

export const ova2EtokenMainTile = [
    {
      title: "Ova2-Etoken",
      description: "Manage Etoken Features",
      route: "/admin/ova2-etoken",
      roleName: "admin,sub-admin,manager,sales_team",
    },
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
   
];

export const ClientsTilesData = [
    {
      title: "Vaanya Finserv Consultancy Pvt Ltd",
      description: "",
      image: "",
      route: "/clients/vaanya", 
      data: clientsData?.client1, 
      roleName: "user,admin,sub-admin,manager,sales_team",
    },
    {
      title: "Somvanshi Solar & Power Consultancy Pvt Ltd",
      description: "",
      image: "",
      route: "/clients/somvanshi",
      data: clientsData?.client2, 
      roleName: "user,admin,sub-admin,manager,sales_team",
    },
    {
        title: "Grand Dream Resort",
        description: "",
        image: "",
        route: "/clients/grand-dream-resort", 
        data: clientsData?.client3, 
        roleName: "user,admin,sub-admin,manager,sales_team",
      },
      {
        title: "OMK And Sons",
        description: "",
        image: "",
        route: "/clients/omk-and-sons", 
        data: clientsData?.client4, 
        roleName: "user,admin,sub-admin,manager,sales_team",
      },
  ];
  
  

  
  export const EtokenTilesData = [
    // {
    //   title: "Etoken Advertisement",
    //   description: "Manage etoken advertisements",
    //   route: "/admin/ova2-etoken/etoken-advertisement",
    //   roleName: "admin,sub-admin,manager,sales_team",
    // },
    {
      title: "Active Advertisement",
      description: "View active advertisements",
      route: "/admin/ova2-etoken/active-advertisement",
      roleName: "admin,sub-admin,manager,sales_team",
    },
    {
        title: "Doctor Details",
        description: "View active advertisements",
        route: "/admin/ova2-etoken/doctor-details",
        roleName: "admin,sub-admin,manager,sales_team",
      },
      {
        title: " Payment Advertisement",
        description: "View Payment advertisements",
        route: "/admin/ova2-etoken/fetch-payment-advertisement",
        roleName: "admin,sub-admin,manager,sales_team",
      },
      {
        title: "Exception Logs",
        description: "View Exception Logs",
        route: "/admin/ova2-etoken/exception-logs",
        roleName: "admin,sub-admin,manager,sales_team",
      },
  ];
  
