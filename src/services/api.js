const BASE_URL = import.meta.env.VITE_API_URL;
const DEMO = import.meta.env.VITE_DEMO_MODE === 'true';
let session = JSON.parse(sessionStorage.getItem('academy_session') || 'null');
export const getSession = () => session;
export const setSession = (value) => { session = value; value ? sessionStorage.setItem('academy_session', JSON.stringify(value)) : sessionStorage.removeItem('academy_session'); };
const demo = { boss: { id:'demo-boss', name:'Demo Boss', role:'BOSS' }, admin: { id:'demo-admin', name:'Demo Admin', role:'ADMIN' }, teacher: { id:'demo-teacher', name:"Demo O'qituvchi", role:'TEACHER' } };
async function request(action, data = {}) {
  if (DEMO && action === 'login') { const user = demo[data.email?.split('@')[0]]; if (!user || data.password !== 'demo123') throw new Error('Demo login: boss/admin/teacher@demo.uz, parol demo123'); return { sessionId:'demo-session', user }; }
  if (!BASE_URL) throw new Error('API URL sozlanmagan. .env da VITE_API_URL kiriting.');
  // Apps Script web apps do not reliably expose request headers; the opaque server-issued
  // session token is carried in the JSON body and validated server-side on every request.
  const response = await fetch(BASE_URL, { method:'POST', headers:{ 'Content-Type':'text/plain;charset=utf-8' }, body: JSON.stringify({ action, data, sessionToken: session?.sessionId || '' }) });
  const payload = await response.json();
  if (!payload.ok) throw new Error(payload.error?.message || 'Server xatosi');
  return payload.data;
}
export const api = {
  login: (email,password) => request('login',{email,password}), logout: () => request('logout'), me: () => request('session'),
  dashboard: () => request('dashboard'), listStudents: q => request('students.list',{q}), createStudent: x => request('students.create',x), updateStudent: x => request('students.update',x), archiveStudent: id => request('students.archive',{id}),
  groups: () => request('groups.list'), attendance: x => request('attendance.list',x), saveAttendance: x => request('attendance.save',x), payments: x => request('payments.list',x), createPayment: x => request('payments.create',x), debtors: () => request('payments.debtors'), notifications: () => request('notifications.list'), markRead: id => request('notifications.read',{id}), reports: () => request('reports.dashboard')
};
