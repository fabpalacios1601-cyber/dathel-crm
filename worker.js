
const HTML = `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>DATHEL CRM</title><style>
*{box-sizing:border-box}body{margin:0;background:#f4f6fa;color:#172033;font-family:Arial,sans-serif}header{background:#101827;color:#fff;padding:16px 5%;display:flex;justify-content:space-between;align-items:center}.logo{font-size:24px;font-weight:800}.logo span{font-weight:400;opacity:.8}nav button{background:transparent;color:#fff;border:0;margin-left:10px;cursor:pointer}main{max-width:1250px;margin:28px auto;padding:0 18px}.panel{background:#fff;border-radius:14px;padding:20px;margin:16px 0;box-shadow:0 3px 14px #0001}.cards{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}.card{background:#fff;padding:18px;border-radius:12px}.card b{display:block;font-size:11px;color:#77839a}.card strong{font-size:28px;display:block;margin-top:7px}.grid{display:grid;grid-template-columns:1.1fr .9fr;gap:16px}.form{display:grid;grid-template-columns:1fr 1fr;gap:12px}.form label{display:grid;gap:5px;font-size:13px;font-weight:700}.wide{grid-column:1/-1}input,select,textarea{width:100%;padding:10px;border:1px solid #d5dbe5;border-radius:8px;font:inherit}button,.btn{background:#2056d7;color:white;border:0;border-radius:8px;padding:10px 15px;font-weight:700;cursor:pointer;text-decoration:none}table{width:100%;border-collapse:collapse}th,td{padding:10px;border-bottom:1px solid #e9edf2;text-align:left;font-size:13px}th{font-size:11px;color:#77839a}.hidden{display:none}.login{min-height:100vh;display:grid;place-items:center;background:#101827}.loginbox{width:min(410px,92vw);background:#fff;padding:34px;border-radius:18px}.loginbox form{display:grid;gap:12px}.loginbox label{display:grid;gap:6px;font-weight:700}.muted{color:#77839a}.flash{padding:11px;border-radius:8px;margin-bottom:12px;background:#fff1f1}.ok{background:#eaf8ef}.actions{display:flex;gap:8px;flex-wrap:wrap}.bar{height:8px;background:#e9edf2;border-radius:9px}.bar i{display:block;height:100%;background:#2056d7;border-radius:9px}@media(max-width:850px){.cards{grid-template-columns:repeat(2,1fr)}.grid,.form{grid-template-columns:1fr}.wide{grid-column:auto}}
</style></head><body><div id="app"></div><script>
const A=document.getElementById('app');
let state={me:null, sales:[], users:[], dash:null};
async function api(url,opt={}){let r=await fetch(url,{headers:{'Content-Type':'application/json',...(opt.headers||{})},...opt});let d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.error||'Error');return d}
function login(){A.innerHTML='<div class="login"><div class="loginbox"><div class="logo">DATHEL <span>CRM</span></div><p class="muted">Gestión de ventas de luz y gas</p><form onsubmit="doLogin(event)"><label>Usuario<input id="u" required></label><label>Contraseña<input id="p" type="password" required></label><button>INICIAR SESIÓN</button></form></div></div>'}
async function doLogin(e){e.preventDefault();try{state.me=await api('/api/login',{method:'POST',body:JSON.stringify({username:u.value,password:p.value})});dashboard()}catch(x){alert(x.message)}}
function shell(body){
A.innerHTML=`
<div class="crm-layout">

  <aside class="sidebar">

    <div class="sidebar-brand">
      <div class="logo-circle">D</div>
      <div class="brand-name">DATHEL</div>
      <div class="brand-connect">CONNECT</div>
      <div class="brand-line"></div>
      <div class="brand-slogan">
        CONECTAMOS PERSONAS,<br>
        IMPULSAMOS SOLUCIONES
      </div>
    </div>

    <nav class="sidebar-nav">

      <button class="side-link active" onclick="dashboard()">
        <span>⌂</span>
        <b>Dashboard</b>
      </button>

      ${state.me.role==='COMERCIAL'?`
      <button class="side-link" onclick="newSale()">
        <span>＋</span>
        <b>Nueva venta</b>
      </button>`:''}

      <button class="side-link" onclick="dashboard()">
        <span>▤</span>
        <b>Ventas</b>
      </button>

      ${['ADMIN','DIRECTOR','JEFE','SUPERVISOR'].includes(state.me.role)?`
      <button class="side-link" onclick="users()">
        <span>♙</span>
        <b>Usuarios</b>
      </button>`:''}

      ${state.me.role==='ADMIN'?`
      <button class="side-link" onclick="settings()">
        <span>⚙</span>
        <b>Administración</b>
      </button>`:''}

    </nav>

    <div class="sidebar-bottom">

      <div class="support-box">
        <div class="support-title">◉ Soporte</div>
        <div class="support-text">¿Necesitas ayuda?</div>
        <div class="support-link">Contáctanos →</div>
      </div>

      <div class="sidebar-footer">
        © 2026 DATHEL CONNECT<br>
        Todos los derechos reservados.
      </div>

    </div>

  </aside>

  <div class="main-area">

    <header class="main-topbar">

      <div class="top-title">
        <span>DATHEL</span> CRM
      </div>

      <div class="topbar-right">

        <div class="notification">🔔</div>

        <div class="user-profile">

          <div class="avatar">
            ${state.me.full_name.substring(0,2).toUpperCase()}
          </div>

          <div class="user-info">
            <strong>${state.me.full_name}</strong>
            <small>${state.me.role}</small>
          </div>

        </div>

        <button class="logout-button" onclick="logout()">
          Salir
        </button>

      </div>

    </header>

    <main class="main-content">

      ${body}

    </main>

  </div>

</div>`;
}'<header><div class="logo">DATHEL <span>CRM</span></div><nav><span>'+state.me.full_name+' · '+state.me.role+'</span> <button onclick="dashboard()">Dashboard</button> '+(state.me.role==='COMERCIAL'?'<button onclick="newSale()">+ Nueva venta</button>':'')+(['ADMIN','DIRECTOR','JEFE','SUPERVISOR'].includes(state.me.role)?'<button onclick="users()">Usuarios</button>':'')+(state.me.role==='ADMIN'?'<button onclick="settings()">Administración</button>':'')+'<button onclick="logout()">Salir</button></nav></header><main>'+body+'</main>'}
async function dashboard(){let d=await api('/api/dashboard');state.dash=d;let cards=[['VENTAS',d.total],['ACTIVAS',d.active],['PENDIENTES',d.pending],['KO',d.ko],['BAJA/CANCEL.',d.cancelled]];shell('<div class="actions"><div><h1>Dashboard</h1><p class="muted">Resumen general de ventas</p></div><a class="btn" href="/api/export">Exportar CSV</a></div><div class="cards">'+cards.map(x=>'<div class="card"><b>'+x[0]+'</b><strong>'+x[1]+'</strong></div>').join('')+'</div><div class="grid"><section class="panel"><h2>Compañías</h2>'+(d.companies||[]).map(x=>'<p><b>'+x.name+'</b> <span class="muted"> '+x.total+' ventas · '+x.active+' activas</span></p><div class="bar"><i style="width:'+(d.total?x.total/d.total*100:0)+'%"></i></div>').join('')+'</section><section class="panel"><h2>Ranking</h2>'+(d.ranking||[]).map((x,i)=>'<p><b>#'+(i+1)+' '+x.name+'</b><br>'+x.total+' ventas · '+x.active+' activas</p>').join('')+'</section></div><section class="panel"><h2>Últimas ventas</h2><table><tr><th>ID</th><th>Cliente</th><th>Comercial</th><th>Compañía</th><th>Producto</th><th>Estado</th></tr>'+(d.sales||[]).slice(0,30).map(s=>'<tr><td><a href="#" onclick="sale('+s.id+');return false">#'+s.id+'</a></td><td>'+s.full_name+'</td><td>'+s.commercial_name+'</td><td>'+s.company+'</td><td>'+s.product+'</td><td>'+s.status+'</td></tr>').join('')+'</table></section>')}
function newSale(){let f=['full_name','dni','mobile','fixed_phone','email','iban','address','postal_code','population','province','cups_light','cups_gas'];shell('<h1>Nueva venta</h1><form class="panel form" onsubmit="saveSale(event)">'+f.map(k=>'<label>'+k.replaceAll('_',' ').toUpperCase()+'<input name="'+k+'" '+(k==='full_name'||k==='dni'?'required':'')+'></label>').join('')+'<label>COMPAÑÍA<select name="company">'+['ENDESA','REPSOL','NATURGY','NORDY'].map(x=>'<option>'+x+'</option>').join('')+'</select></label><label>PRODUCTO<select name="product"><option>LUZ</option><option>GAS</option><option>LUZ + GAS</option></select></label><div class="wide"><button>GUARDAR VENTA</button></div></form>')}
async function saveSale(e){e.preventDefault();let o=Object.fromEntries(new FormData(e.target));try{let x=await api('/api/sales',{method:'POST',body:JSON.stringify(o)});sale(x.id)}catch(x){alert(x.message)}}
async function sale(id){let s=await api('/api/sales/'+id);let edit=state.me.role!=='COMERCIAL';let fields=['full_name','dni','mobile','fixed_phone','email','iban','address','postal_code','population','province','cups_light','cups_gas'];shell('<div class="actions"><h1>Venta #'+s.sale.id+'</h1><span>'+s.sale.status+'</span></div><form class="panel form" onsubmit="updateSale(event,'+id+')" >'+fields.map(k=>'<label>'+k.replaceAll('_',' ').toUpperCase()+'<input name="'+k+'" value="'+(s.sale[k]||'')+'" '+(edit?'':'readonly')+'></label>').join('')+'<label>COMPAÑÍA<select name="company" '+(edit?'':'disabled')+'>'+['ENDESA','REPSOL','NATURGY','NORDY'].map(x=>'<option '+(s.sale.company===x?'selected':'')+'>'+x+'</option>').join('')+'</select></label><label>PRODUCTO<select name="product" '+(edit?'':'disabled')+'>'+['LUZ','GAS','LUZ + GAS'].map(x=>'<option '+(s.sale.product===x?'selected':'')+'>'+x+'</option>').join('')+'</select></label><label>ESTADO<select name="status" '+(edit?'':'disabled')+'>'+['NUEVO','PTE VALIDACIÓN','EN ACTIVACIÓN','ACTIVO','KO','BAJA','CANCELADO'].map(x=>'<option '+(s.sale.status===x?'selected':'')+'>'+x+'</option>').join('')+'</select></label>'+(edit?'<label class="wide">COMENTARIO<textarea name="comment"></textarea></label><div class="wide"><button>GUARDAR CAMBIOS</button></div>':'')+'</form><div class="grid"><section class="panel"><h2>Comentarios</h2>'+s.comments.map(x=>'<p><b>'+x.full_name+'</b> · '+x.created_at+'<br>'+x.comment+'</p>').join('')+'</section><section class="panel"><h2>Historial</h2>'+s.history.map(x=>'<p><b>'+x.action+'</b> · '+x.created_at+'<br>'+x.details+'</p>').join('')+'</section></div>')}
async function updateSale(e,id){e.preventDefault();let o=Object.fromEntries(new FormData(e.target));try{await api('/api/sales/'+id,{method:'PUT',body:JSON.stringify(o)});sale(id)}catch(x){alert(x.message)}}
async function users(){let d=await api('/api/users');shell('<h1>Usuarios</h1><div class="panel"><h2>Agregar usuario</h2><form class="userform" onsubmit="createUser(event)"><input name="full_name" placeholder="Nombre" required><input name="username" placeholder="Usuario" required><input name="password" placeholder="Contraseña" required><select name="role"><option>COMERCIAL</option><option>BO</option><option>SUPERVISOR</option><option>JEFE</option><option>DIRECTOR</option><option>ADMIN</option></select><button>CREAR</button></form></div><div class="panel"><table><tr><th>Usuario</th><th>Nombre</th><th>Rol</th><th>Estado</th></tr>'+d.map(x=>'<tr><td>'+x.username+'</td><td>'+x.full_name+'</td><td>'+x.role+'</td><td>'+(x.active?'Activo':'Inactivo')+'</td></tr>').join('')+'</table></div>')}
async function createUser(e){e.preventDefault();try{await api('/api/users',{method:'POST',body:JSON.stringify(Object.fromEntries(new FormData(e.target)))});users()}catch(x){alert(x.message)}}
async function settings(){let d=await api('/api/settings');shell('<h1>Administración</h1><div class="panel"><h2>Objetivo mensual</h2><form onsubmit="saveSettings(event)"><input type="number" name="target" value="'+d.target+'"><button>GUARDAR</button></form></div>')}
async function saveSettings(e){e.preventDefault();await api('/api/settings',{method:'PUT',body:JSON.stringify(Object.fromEntries(new FormData(e.target)))});settings()}
async function logout(){await api('/api/logout',{method:'POST'});state.me=null;login()}
login()
</script></body></html>`;

async function sha(text){
  const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(text));
  return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("");
}
function cookie(name,val,max=86400){return `${name}=${val}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${max}`}

async function getUser(req,env){
  const m=(req.headers.get("Cookie")||"").match(/dathel_session=([^;]+)/); if(!m)return null;
  return await env.DB.prepare("SELECT u.id,u.username,u.full_name,u.role,u.active FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token=? AND s.expires_at>? AND u.active=1").bind(m[1],Date.now()).first();
}
function ok(data,headers={}){return Response.json(data,{headers})}
function fail(msg,code=400){return ok({error:msg},{status:code})}
const now=()=>new Date().toISOString();

export default {
 async fetch(req,env){
  const url=new URL(req.url), path=url.pathname;
  if(req.method==="GET"&&path==="/")return new Response(HTML,{headers:{"content-type":"text/html;charset=UTF-8"}});
  if(path==="/api/login"&&req.method==="POST"){
    const b=await req.json(); const u=await env.DB.prepare("SELECT * FROM users WHERE username=? AND active=1").bind(b.username).first();
    if(!u||u.password_hash!==(await sha(b.password)))return fail("Usuario o contraseña incorrectos",401);
    const token=crypto.randomUUID();await env.DB.prepare("INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)").bind(token,u.id,Date.now()+86400000).run();
    return ok({id:u.id,username:u.username,full_name:u.full_name,role:u.role},{ "Set-Cookie":cookie("dathel_session",token)});
  }
  if(path==="/api/logout"&&req.method==="POST")return ok({ok:true},{"Set-Cookie":cookie("dathel_session","",0)});
  const me=await getUser(req,env); if(path==="/api/me")return me?ok(me):fail("No autenticado",401); if(!me)return fail("No autenticado",401);

  if(path==="/api/dashboard"&&req.method==="GET"){
    let q="SELECT s.*,u.full_name commercial_name FROM sales s JOIN users u ON u.id=s.commercial_id";let args=[];
    if(me.role==="COMERCIAL"){q+=" WHERE s.commercial_id=?";args=[me.id]}q+=" ORDER BY s.id DESC";
    const sales=await env.DB.prepare(q).bind(...args).all();const a=sales.results;
    const total=a.length,active=a.filter(x=>x.status==="ACTIVO").length,pending=a.filter(x=>["NUEVO","PTE VALIDACIÓN","EN ACTIVACIÓN"].includes(x.status)).length,ko=a.filter(x=>x.status==="KO").length,cancelled=a.filter(x=>["BAJA","CANCELADO"].includes(x.status)).length;
    const companies=["ENDESA","REPSOL","NATURGY","NORDY"].map(name=>({name,total:a.filter(x=>x.company===name).length,active:a.filter(x=>x.company===name&&x.status==="ACTIVO").length}));
    const us=await env.DB.prepare("SELECT id,full_name FROM users WHERE role='COMERCIAL' AND active=1").all();
    const ranking=us.results.map(u=>({name:u.full_name,total:a.filter(x=>x.commercial_id===u.id).length,active:a.filter(x=>x.commercial_id===u.id&&x.status==="ACTIVO").length})).sort((x,y)=>y.total-x.total);
    return ok({total,active,pending,ko,cancelled,companies,ranking,sales:a});
  }
  if(path==="/api/sales"&&req.method==="POST"){
    if(me.role!=="COMERCIAL")return fail("Solo los comerciales pueden crear ventas",403);const b=await req.json(),t=now();
    const r=await env.DB.prepare(`INSERT INTO sales(full_name,dni,mobile,fixed_phone,email,iban,address,postal_code,population,province,cups_light,cups_gas,company,product,status,commercial_id,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,'NUEVO',?,?,?,?)`).bind(b.full_name,b.dni,b.mobile||"",b.fixed_phone||"",b.email||"",b.iban||"",b.address||"",b.postal_code||"",b.population||"",b.province||"",b.cups_light||"",b.cups_gas||"",b.company,b.product,me.id,t,t).run();
    await env.DB.prepare("INSERT INTO history(sale_id,user_id,action,details,created_at) VALUES(?,?,?,?,?)").bind(r.meta.last_row_id,me.id,"CREACIÓN","Venta registrada.",t).run();return ok({id:r.meta.last_row_id});
  }
  const sm=path.match(/^\/api\/sales\/(\d+)$/);
  if(sm){
    const id=Number(sm[1]);const s=await env.DB.prepare("SELECT s.*,u.full_name commercial_name FROM sales s JOIN users u ON u.id=s.commercial_id WHERE s.id=?").bind(id).first();if(!s)return fail("Venta no encontrada",404);
    if(me.role==="COMERCIAL"&&s.commercial_id!==me.id)return fail("Sin permiso",403);
    if(req.method==="GET"){const comments=await env.DB.prepare("SELECT c.*,u.full_name FROM comments c JOIN users u ON u.id=c.user_id WHERE sale_id=? ORDER BY c.id DESC").bind(id).all();const history=await env.DB.prepare("SELECT h.*,u.full_name FROM history h JOIN users u ON u.id=h.user_id WHERE sale_id=? ORDER BY h.id DESC").bind(id).all();return ok({sale:s,comments:comments.results,history:history.results})}
    if(req.method==="PUT"){if(me.role==="COMERCIAL")return fail("No puedes modificar una venta",403);const b=await req.json(),t=now();await env.DB.prepare(`UPDATE sales SET full_name=?,dni=?,mobile=?,fixed_phone=?,email=?,iban=?,address=?,postal_code=?,population=?,province=?,cups_light=?,cups_gas=?,company=?,product=?,status=?,updated_at=? WHERE id=?`).bind(b.full_name,b.dni,b.mobile,b.fixed_phone,b.email,b.iban,b.address,b.postal_code,b.population,b.province,b.cups_light,b.cups_gas,b.company,b.product,b.status,t,id).run();await env.DB.prepare("INSERT INTO history(sale_id,user_id,action,details,created_at) VALUES(?,?,?,?,?)").bind(id,me.id,"MODIFICACIÓN",`Actualizado por ${me.full_name}.`,t).run();if(b.comment?.trim())await env.DB.prepare("INSERT INTO comments(sale_id,user_id,comment,created_at) VALUES(?,?,?,?)").bind(id,me.id,b.comment.trim(),t).run();return ok({ok:true})}
  }
  if(path==="/api/users"){
    if(!["ADMIN","DIRECTOR","JEFE","SUPERVISOR"].includes(me.role))return fail("Sin permiso",403);
    if(req.method==="GET"){const x=await env.DB.prepare("SELECT id,username,full_name,role,active FROM users ORDER BY role,full_name").all();return ok(x.results)}
    if(req.method==="POST"){const b=await req.json();if(!b.full_name||!b.username||!b.password)return fail("Completa todos los campos");try{await env.DB.prepare("INSERT INTO users(username,full_name,password_hash,role,active,created_at) VALUES(?,?,?,?,1,?)").bind(b.username,b.full_name,await sha(b.password),b.role,now()).run();return ok({ok:true})}catch(e){return fail("El usuario ya existe")}}
  }
  if(path==="/api/settings"){
    if(me.role!=="ADMIN")return fail("Sin permiso",403);
    if(req.method==="GET"){const x=await env.DB.prepare("SELECT value FROM settings WHERE key='monthly_target'").first();return ok({target:x?.value||0})}
    const b=await req.json();await env.DB.prepare("INSERT INTO settings(key,value) VALUES('monthly_target',?) ON CONFLICT(key) DO UPDATE SET value=excluded.value").bind(String(b.target||0)).run();return ok({ok:true})
  }
  if(path==="/api/export"&&req.method==="GET"){
    const x=await env.DB.prepare("SELECT s.*,u.full_name commercial_name FROM sales s JOIN users u ON u.id=s.commercial_id ORDER BY s.id DESC").all();
    let csv="ID,Cliente,DNI,Móvil,Email,Compañía,Producto,Estado,Comercial,Creada\n";for(const s of x.results)csv+= [s.id,s.full_name,s.dni,s.mobile,s.email,s.company,s.product,s.status,s.commercial_name,s.created_at].map(v=>`"${String(v??"").replaceAll('"','""')}"`).join(",")+"\n";
    return new Response(csv,{headers:{"content-type":"text/csv;charset=utf-8","content-disposition":"attachment; filename=DATHEL_CRM_ventas.csv"}});
  }
  return fail("No encontrado",404);
 }
};
