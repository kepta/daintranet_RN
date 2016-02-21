import localStorage from './localStorage';

export function getCachedState() {
  const id = localStorage.getItem('id');
  const pass = localStorage.getItem('pass');
  const token = localStorage.getItem('token');
  const appState = localStorage.getItem('appState');
  return Promise.all([id, pass, token, appState]).then(data => {
    for (let i = 0; i < data.length; i++) {
      if (!data[i]) {
        return null;
      }
    }
    return { id: data[0], pass: data[1], token: data[2], appState: JSON.parse(data[3] || '') };
  });
}

export function saveState(data) {
  // these two are for login screen, they will show up there when user is logged out
  localStorage.setItem('id_login', data.id);
  localStorage.setItem('pass_login', data.pass);

  const id =localStorage.setItem('id', data.id);
  const pass =localStorage.setItem('pass', data.pass);
  const token = localStorage.setItem('token', data.token);
  let appState;
  appState = localStorage.setItem('appState', data.appState && JSON.stringify(data.appState));
  return Promise.all([id, pass, token, appState]).then(o => data);
}
