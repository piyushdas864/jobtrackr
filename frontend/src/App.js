import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`max-width:800px;margin:20px auto;font-family:Arial,Helvetica,sans-serif;`;
const Title = styled.h1`text-align:center;`;
const Form = styled.form`display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;`;
const Input = styled.input`padding:8px;flex:1;`;
const Select = styled.select`padding:8px;`;
const Button = styled.button`padding:8px 12px;`;
const Card = styled.div`border:1px solid #eee;padding:10px;margin-bottom:8px;border-radius:6px;`;

function App(){
  const [token, setToken] = useState(localStorage.getItem('token')||'');
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({company:'',role:'',status:'applied'});
  const base = process.env.REACT_APP_API_URL || 'http://localhost:4000';

  useEffect(()=>{ if(token) fetchJobs(); },[token]);

  async function registerDemo(){ // quick demo user
    try { await axios.post(base + '/api/auth/register',{email:'demo@example.com',password:'pass123'}).catch(()=>{}); } catch(e) {}
    const r = await axios.post(base + '/api/auth/login',{email:'demo@example.com',password:'pass123'});
    localStorage.setItem('token', r.data.token); setToken(r.data.token);
  }

  async function fetchJobs(){
    try{
      const res = await axios.get(base + '/api/jobs', { headers: { Authorization: 'Bearer '+token } });
      setJobs(res.data);
    }catch(e){ console.error(e); }
  }

  async function addJob(e){
    e.preventDefault();
    await axios.post(base + '/api/jobs', form, { headers: { Authorization: 'Bearer '+token }});
    setForm({company:'',role:'',status:'applied'});
    fetchJobs();
  }

  async function updateStatus(id, status){
    await axios.patch(base + '/api/jobs/' + id, {status}, { headers: { Authorization: 'Bearer '+token }});
    fetchJobs();
  }

  async function removeJob(id){
    await axios.delete(base + '/api/jobs/' + id, { headers: { Authorization: 'Bearer '+token }});
    fetchJobs();
  }

  return (
    <Container>
      <Title>JobTrackr</Title>
      {!token ? (
        <div style={{textAlign:'center'}}>
          <p>Press demo to create a demo account and login</p>
          <Button onClick={registerDemo}>Demo account</Button>
        </div>
      ):(
        <div>
          <Form onSubmit={addJob}>
            <Input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder='Company' required />
            <Input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder='Role' required />
            <Select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
              <option value='applied'>Applied</option>
              <option value='interview'>Interview</option>
              <option value='offer'>Offer</option>
              <option value='rejected'>Rejected</option>
            </Select>
            <Button type='submit'>Add</Button>
          </Form>

          {jobs.map(j=>(
            <Card key={j._id}>
              <div><strong>{j.company}</strong> — {j.role}</div>
              <div>Status: <em>{j.status}</em></div>
              <div style={{marginTop:6}}>
                <Button onClick={()=>updateStatus(j._id,'interview')}>Mark Interview</Button>{' '}
                <Button onClick={()=>updateStatus(j._id,'offer')}>Offer</Button>{' '}
                <Button onClick={()=>updateStatus(j._id,'rejected')}>Reject</Button>{' '}
                <Button onClick={()=>removeJob(j._id)}>Delete</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}

export default App;
