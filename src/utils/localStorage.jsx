const developers = [
    {
        "id": 1,
        "name": "Shreyash",
        "email": "shreyash@me.com",
        "password": "123",
        "snippets": [
            {
                "id": "snip101",
                "title": "React Functional Component Boilerplate",
                "language": "JavaScript",
                "codeBlock": "import React from 'react';\n\nconst ComponentName = () => {\n  return (\n    <div>\n      {/* JSX here */}\n    </div>\n  );\n};\n\nexport default ComponentName;",
                "tags": ["react", "boilerplate", "jsx"]
            },
            {
                "id": "snip102",
                "title": "Fetch API GET Request",
                "language": "JavaScript",
                "codeBlock": "fetch('https://api.example.com/data')\n  .then(response => response.json())\n  .then(data => console.log(data))\n  .catch(error => console.error('Error:', error));",
                "tags": ["fetch", "api", "async"]
            }
        ]
    },
    {
        "id": 2,
        "name": "Sneha",
        "email": "sneha@example.com",
        "password": "123",
        "snippets": [
            {
                "id": "snip201",
                "title": "Center a Div with Flexbox",
                "language": "CSS",
                "codeBlock": ".parent-container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}",
                "tags": ["css", "flexbox", "layout"]
            }
        ]
    }
];


const teamLeads = [{
    "id": 1,
    "email": "lead@me.com", 
    "password": "123"
}];

export const setLocalStorage = () => {
    
    if (!localStorage.getItem('developers')) {
        localStorage.setItem('developers', JSON.stringify(developers));
    }
    if (!localStorage.getItem('teamLeads')) {
        localStorage.setItem('teamLeads', JSON.stringify(teamLeads));
    }
};

export const getLocalStorage = () => {
    const developers = JSON.parse(localStorage.getItem('developers'));
    const teamLeads = JSON.parse(localStorage.getItem('teamLeads'));

    return { developers, teamLeads };
};