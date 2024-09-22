export const trainingData = {
  reactReduxTraining: {
    title: "React and Redux Training",
    weeks: [
      {
        title: 'Introduction to React and Setting Up Development Environment',
        objective: 'Familiarize participants with React and set up the development environment.',
        description: [
          'Introduction to React',
          'Setting Up the Development Environment',
          'Introduction to JSX',
          'Virtual DOM',
        ],
        assignments: [
          'Create a simple "Hello World" React application.',
          'Modify JSX and observe real-time changes.',
        ],
      },
      {
        title: 'Components, Props, and State Management',
        objective: 'Understand how to build components and manage state.',
        description: [
          'Functional vs. Class Components',
          'Props and State',
          'Event Handling',
        ],
        assignments: [
          'Build a to-do list component.',
          'Create a form using props and state.',
        ],
      },
      {
        title: 'React Lifecycle Methods and Hooks',
        objective: 'Learn lifecycle methods and React Hooks.',
        description: [
          'React Lifecycle Methods',
          'Introduction to React Hooks',
          'useState and useEffect',
          'Custom Hooks',
        ],
        assignments: [
          'Convert class components to functional ones using hooks.',
          'Build a timer or counter using useEffect.',
        ],
      },
      {
        title: 'Routing, Forms, and Validation',
        objective: 'Master routing, forms, and form validation in React.',
        description: [
          'React Router',
          'Forms in React',
          'Form Validation',
        ],
        assignments: [
          'Implement multi-page navigation using React Router.',
          'Build a signup form with validation.',
        ],
      },
      {
        title: 'Introduction to Redux and State Management',
        objective: 'Learn the basics of Redux and integrate it into React.',
        description: [
          'Introduction to Redux',
          'Redux Store, Actions, and Reducers',
          'Connecting Redux to React',
        ],
        assignments: [
          'Create a Redux store and manage state in a React app.',
          'Implement a shopping cart using Redux.',
        ],
      },
      {
        title: 'Advanced Redux and Final Project',
        objective: 'Dive into advanced Redux concepts and complete a final project.',
        description: [
          'Redux DevTools',
          'Combining Reducers',
          'Immutable Updates in Redux',
        ],
        assignments: [
          'Build a final project integrating React and Redux (e.g., e-commerce, blog).',
        ],
      },
    ],
  },
  powerBiTraining: {
    title: "Power BI Training",
    weeks: [
      {
        title: "Introduction to Power BI and Data Sources",
        objective: "Understand the basics of Power BI and connecting to various data sources.",
        description: [
          "Overview of Power BI",
          "Understanding Power BI Desktop",
          "Connecting to Data Sources",
          "Introduction to Power Query Editor"
        ],
        assignments: [
          "Install Power BI Desktop and connect to a sample dataset.",
          "Explore Power Query Editor to clean and transform data."
        ]
      },
      {
        title: "Data Transformation and Modeling",
        objective: "Learn to transform and model data in Power BI.",
        description: [
          "Data Transformation Techniques",
          "Data Modeling in Power BI",
          "Relationships between tables",
          "Creating Calculated Columns and Measures"
        ],
        assignments: [
          "Transform raw data using Power Query Editor.",
          "Create a data model with relationships between tables."
        ]
      },
      {
        title: "Visualizing Data in Power BI",
        objective: "Create interactive visualizations and dashboards.",
        description: [
          "Introduction to Visualizations in Power BI",
          "Bar Charts, Line Charts, and Pie Charts",
          "Using Slicers and Filters",
          "Creating Interactive Dashboards"
        ],
        assignments: [
          "Create basic visualizations using sample data.",
          "Build an interactive dashboard with slicers and filters."
        ]
      },
      {
        title: "DAX and Advanced Analytics in Power BI",
        objective: "Master DAX and use advanced analytics in Power BI.",
        description: [
          "Introduction to Data Analysis Expressions (DAX)",
          "Common DAX Functions (SUM, AVERAGE, COUNT, etc.)",
          "Advanced DAX Calculations",
          "Time Intelligence in DAX"
        ],
        assignments: [
          "Write DAX queries to perform calculations on data.",
          "Use DAX to create time intelligence reports (e.g., year-over-year comparisons)."
        ]
      },
      {
        title: "Sharing and Collaborating in Power BI",
        objective: "Learn how to share reports and collaborate with others in Power BI.",
        description: [
          "Publishing Reports to Power BI Service",
          "Creating and Managing Workspaces",
          "Power BI Pro vs. Free",
          "Sharing Reports and Dashboards"
        ],
        assignments: [
          "Publish a report to Power BI Service.",
          "Share your report with a colleague for review."
        ]
      },
      {
        title: "Power BI Advanced Features and Final Project",
        objective: "Explore advanced features and complete the final project.",
        description: [
          "Using Power BI Mobile",
          "Row-Level Security (RLS)",
          "Paginated Reports",
          "Power BI Integration with Other Tools"
        ],
        assignments: [
          "Implement Row-Level Security (RLS) in a report.",
          "Build a final project combining all Power BI skills (e.g., sales dashboard, financial report)."
        ]
      }
    ]
  },
  sqlTraining: {
    title: "SQL and PL/SQL Training",
    weeks: [
      {
        title: "Introduction to SQL and Database Basics",
        objective: "Understand the fundamentals of SQL and relational databases.",
        description: [
          "Introduction to Databases and SQL",
          "Basic SELECT Statements",
          "Filtering Data with WHERE",
          "Sorting Data with ORDER BY"
        ],
        assignments: [
          "Write SQL queries to retrieve data from a sample database.",
          "Use WHERE clause to filter data based on conditions."
        ]
      },
      {
        title: "SQL Joins and Aggregations",
        objective: "Learn to join tables and use aggregate functions in SQL.",
        description: [
          "Understanding SQL Joins (INNER, LEFT, RIGHT, FULL)",
          "Using GROUP BY and Aggregate Functions (SUM, COUNT, AVG)",
          "HAVING Clause for Aggregates",
          "Combining Data from Multiple Tables"
        ],
        assignments: [
          "Write SQL queries using different types of JOINs.",
          "Use GROUP BY and aggregate functions to summarize data."
        ]
      },
      {
        title: "Advanced SQL Queries",
        objective: "Write complex SQL queries using subqueries, set operations, and case statements.",
        description: [
          "Subqueries and Nested Queries",
          "Set Operations (UNION, INTERSECT, EXCEPT)",
          "Using CASE Statements for Conditional Logic",
          "Common Table Expressions (CTEs)"
        ],
        assignments: [
          "Write complex queries using subqueries and CTEs.",
          "Use CASE statements to create conditional columns in your result set."
        ]
      },
      {
        title: "PL/SQL Basics and Stored Procedures",
        objective: "Understand the basics of PL/SQL and creating stored procedures.",
        description: [
          "Introduction to PL/SQL",
          "Variables, Data Types, and Control Structures",
          "Creating Stored Procedures and Functions",
          "Cursors in PL/SQL"
        ],
        assignments: [
          "Write a simple PL/SQL block to perform calculations.",
          "Create a stored procedure that updates a table."
        ]
      },
      {
        title: "Triggers, Views, and Transactions",
        objective: "Learn about triggers, views, and handling transactions in SQL.",
        description: [
          "Creating and Managing Views",
          "Understanding SQL Transactions and ACID Properties",
          "Introduction to SQL Triggers",
          "Error Handling in PL/SQL"
        ],
        assignments: [
          "Create a view for summarizing data.",
          "Write a trigger that logs changes to a table."
        ]
      },
      {
        title: "Advanced PL/SQL and Final Project",
        objective: "Master advanced PL/SQL concepts and complete the final project.",
        description: [
          "Dynamic SQL in PL/SQL",
          "Using Bulk Collect and FORALL",
          "Performance Optimization in PL/SQL",
          "Final Project: Real-World Database Application"
        ],
        assignments: [
          "Optimize a slow query using advanced PL/SQL techniques.",
          "Build a final project involving a real-world database application (e.g., inventory management, employee records)."
        ]
      }
    ]
  },
  javaTraining: {
    title: "Java Programming Training",
    weeks: [
      {
        title: "Introduction to Java and Setup",
        objective: "Get familiar with Java basics and set up the development environment.",
        description: [
          "Introduction to Java",
          "Setting Up Java Development Environment (JDK, IDE)",
          "Understanding JVM, JRE, and JDK",
          "Basic Java Syntax (Data Types, Variables, Operators)"
        ],
        assignments: [
          "Install JDK and set up IntelliJ or Eclipse IDE.",
          "Write a simple Java program to print 'Hello, World!'"
        ]
      },
      {
        title: "Control Flow and Loops",
        objective: "Learn about control flow statements and looping in Java.",
        description: [
          "Conditional Statements (if-else, switch)",
          "Loops in Java (for, while, do-while)",
          "Break and Continue Statements",
          "Nested Loops and Labels"
        ],
        assignments: [
          "Write a program using loops to print numbers from 1 to 100.",
          "Create a simple calculator using switch statements."
        ]
      },
      {
        title: "Object-Oriented Programming (OOP) Basics",
        objective: "Understand the basics of OOP and how to implement it in Java.",
        description: [
          "Introduction to Object-Oriented Programming",
          "Classes and Objects",
          "Methods and Constructors",
          "Encapsulation, Inheritance, Polymorphism"
        ],
        assignments: [
          "Create a class to represent a student with fields for name, age, and grade.",
          "Write a program to demonstrate inheritance and method overriding."
        ]
      },
      {
        title: "Exception Handling and File I/O",
        objective: "Learn how to handle exceptions and perform file input/output operations in Java.",
        description: [
          "Exception Handling (try, catch, finally, throw, throws)",
          "Built-in Exceptions and Custom Exceptions",
          "File Handling in Java (FileReader, FileWriter)",
          "Working with Files and Directories"
        ],
        assignments: [
          "Write a program to handle multiple exceptions and display appropriate messages.",
          "Create a program that reads from and writes to a text file."
        ]
      },
      {
        title: "Collections and Generics",
        objective: "Master collections and generics in Java.",
        description: [
          "Introduction to Java Collections Framework",
          "List, Set, Map, and Queue Interfaces",
          "Using Generics with Collections",
          "Iterating through Collections"
        ],
        assignments: [
          "Write a program that uses a HashMap to store and retrieve data.",
          "Create a program that uses an ArrayList to manage a list of tasks."
        ]
      },
      {
        title: "Multithreading and Final Project",
        objective: "Learn multithreading concepts and complete the final project.",
        description: [
          "Introduction to Multithreading",
          "Creating and Managing Threads in Java",
          "Thread Synchronization and Communication",
          "Final Project: Real-World Java Application"
        ],
        assignments: [
          "Write a program to demonstrate thread creation and synchronization.",
          "Build a final project combining all Java concepts (e.g., banking system, student management)."
        ]
      }
    ]
  },
  uiTraining: {
    title: "UI Development Training (HTML, CSS, Bootstrap, JavaScript)",
    weeks: [
      {
        title: "Introduction to HTML",
        objective: "Learn the basics of HTML and how to structure web pages.",
        description: [
          "Introduction to HTML and Document Structure",
          "HTML Tags, Elements, and Attributes",
          "Headings, Paragraphs, and Lists",
          "Links, Images, and Tables"
        ],
        assignments: [
          "Create a simple webpage with headings, paragraphs, and images.",
          "Build a basic HTML table to display data."
        ]
      },
      {
        title: "Introduction to CSS",
        objective: "Understand how to style web pages using CSS.",
        description: [
          "Introduction to CSS (Selectors, Properties, and Values)",
          "CSS Box Model (Margins, Padding, Borders)",
          "Styling Text, Fonts, and Colors",
          "Positioning Elements (Static, Relative, Absolute, Fixed)"
        ],
        assignments: [
          "Apply different styles to an HTML page using CSS.",
          "Create a responsive layout using CSS positioning techniques."
        ]
      },
      {
        title: "Responsive Design with Bootstrap",
        objective: "Learn how to create responsive web pages using Bootstrap.",
        description: [
          "Introduction to Bootstrap Framework",
          "Bootstrap Grid System",
          "Using Bootstrap Components (Navbars, Buttons, Forms)",
          "Responsive Design and Media Queries"
        ],
        assignments: [
          "Create a responsive webpage using Bootstrap’s grid system.",
          "Build a form with Bootstrap components and make it mobile-friendly."
        ]
      },
      {
        title: "Introduction to JavaScript",
        objective: "Learn JavaScript and how to add interactivity to web pages.",
        description: [
          "Introduction to JavaScript",
          "Variables, Data Types, and Operators",
          "Functions and Events",
          "DOM Manipulation with JavaScript"
        ],
        assignments: [
          "Write a JavaScript function to validate a form.",
          "Create an interactive webpage where a button changes the content dynamically."
        ]
      },
      {
        title: "Advanced JavaScript (ES6+)",
        objective: "Master modern JavaScript concepts and syntax.",
        description: [
          "Introduction to ES6 Features (let, const, arrow functions)",
          "Promises and Async/Await",
          "JavaScript Modules and Import/Export",
          "Event Bubbling, Capturing, and Delegation"
        ],
        assignments: [
          "Refactor an existing JavaScript project using ES6 syntax.",
          "Write a program using async/await to fetch data from an API."
        ]
      },
      {
        title: "Final Project: Building a Complete Web Application",
        objective: "Apply your knowledge to build a fully functional web application.",
        description: [
          "Integrating HTML, CSS, Bootstrap, and JavaScript",
          "Building a User-Friendly Web Interface",
          "Using JavaScript to Handle Events and Data",
          "Final Project: Develop a Real-World Web Application"
        ],
        assignments: [
          "Build a final project (e.g., a portfolio website, a task manager) using HTML, CSS, Bootstrap, and JavaScript.",
          "Ensure the final project is responsive and interactive."
        ]
      }
    ]
  }


};
