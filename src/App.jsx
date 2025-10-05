import { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import DeveloperDashboard from './components/Dashboard/DeveloperDashboard';
import TeamLeadDashboard from './components/Dashboard/TeamLeadDashboard';
import { AuthContext } from './context/AuthProvider';
import { getLocalStorage } from './utils/localStorage';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInDeveloperData, setLoggedInDeveloperData] = useState(null);
  const [userData, setUserData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInDeveloperData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    const { teamLeads } = getLocalStorage();
    const teamLead = teamLeads.find((lead) => email === lead.email && password === lead.password);

    if (teamLead) {
      setUser('teamLead');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'teamLead' }));
    } else if (userData) {
      const developer = userData.find((dev) => email === dev.email && password === dev.password);
      if (developer) {
        setUser('developer');
        setLoggedInDeveloperData(developer);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'developer', data: developer }));
      } else {
        alert("Invalid Credentials");
      }
    } else {
      alert("Invalid Credentials");
    }
  };

  const addSnippet = (newSnippetData) => {
    const newSnippet = { ...newSnippetData, id: `snip${Date.now()}` };
    const updatedUserData = userData.map(dev => 
      dev.id === loggedInDeveloperData.id ? { ...dev, snippets: [...dev.snippets, newSnippet] } : dev
    );
    const updatedLoggedInDeveloper = updatedUserData.find(dev => dev.id === loggedInDeveloperData.id);
    setLoggedInDeveloperData(updatedLoggedInDeveloper);
    setUserData(updatedUserData);
    localStorage.setItem('developers', JSON.stringify(updatedUserData));
  };

  const updateSnippet = (updatedSnippetData) => {
    const updatedUserData = userData.map(dev => {
      const updatedSnippets = dev.snippets.map(snippet => 
        snippet.id === updatedSnippetData.id ? updatedSnippetData : snippet
      );
      return { ...dev, snippets: updatedSnippets };
    });
    const updatedLoggedInDeveloper = updatedUserData.find(dev => dev.id === loggedInDeveloperData?.id);
    if(updatedLoggedInDeveloper) setLoggedInDeveloperData(updatedLoggedInDeveloper);
    setUserData(updatedUserData);
    localStorage.setItem('developers', JSON.stringify(updatedUserData));
  };

  const deleteSnippet = (snippetIdToDelete) => {
    const updatedUserData = userData.map(dev => {
      const updatedSnippets = dev.snippets.filter(snippet => snippet.id !== snippetIdToDelete);
      return { ...dev, snippets: updatedSnippets };
    });
    const updatedLoggedInDeveloper = updatedUserData.find(dev => dev.id === loggedInDeveloperData?.id);
    if(updatedLoggedInDeveloper) setLoggedInDeveloperData(updatedLoggedInDeveloper);
    setUserData(updatedUserData);
    localStorage.setItem('developers', JSON.stringify(updatedUserData));
  };

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ''}
      {user === 'teamLead' ? <TeamLeadDashboard changeUser={setUser} allUserData={userData} updateSnippet={updateSnippet} deleteSnippet={deleteSnippet} /> : (user === 'developer' ? <DeveloperDashboard changeUser={setUser} data={loggedInDeveloperData} addSnippet={addSnippet} updateSnippet={updateSnippet} deleteSnippet={deleteSnippet} allUserData={userData} /> : null)}
    </>
  );
};

export default App;