const HTML = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>DATHEL CRM</title>

<style>
*{box-sizing:border-box}

:root{
  --navy:#071a45;
  --blue:#1455d9;
  --blue2:#2467ed;
  --gold:#d9a62e;
  --gold2:#f1c75b;
  --bg:#f4f7fb;
  --white:#fff;
  --text:#17233d;
  --muted:#71809a;
  --border:#e4e9f2;
  --shadow:0 8px 25px rgba(7,26,69,.08);
}

html,body{
  margin:0;
  padding:0;
  font-family:Arial,Helvetica,sans-serif;
  background:var(--bg);
  color:var(--text);
}

.crm-layout{
  min-height:100vh;
  display:flex;
}

.sidebar{
  width:250px;
  min-height:100vh;
  position:fixed;
  left:0;
  top:0;
  bottom:0;
  background:var(--navy);
  color:#fff;
  padding:25px 18px;
  box-shadow:4px 0 20px rgba(0,0,0,.12);
  z-index:100;
}

.sidebar-brand{
  text-align:center;
  padding:10px 5px 28px;
  border-bottom:1px solid rgba(255,255,255,.12);
  margin-bottom:20px;
}

.logo-placeholder{
  font-size:30px;
  font-weight:900;
  letter-spacing:2px;
  color:#fff;
}

.brand-connect{
  color:var(--gold2);
  font-size:18px;
  font-weight:700;
  letter-spacing:3px;
  margin-top:4px;
}

.brand-slogan{
  font-size:9px;
  line-height:1.5;
  color:rgba(255,255,255,.7);
  margin-top:9px;
  letter-spacing:.5px;
}

.sidebar-nav{
  display:flex;
  flex-direction:column;
  gap:7px;
}

.sidebar-link{
  display:flex;
  align-items:center;
  gap:12px;
  padding:13px 15px;
  color:rgba(255,255,255,.82);
  text-decoration:none;
  border-radius:10px;
  font-size:14px;
  font-weight:600;
  transition:.2s;
}

.sidebar-link:hover{
  background:rgba(255,255,255,.1);
  color:#fff;
  transform:translateX(3px);
}

.sidebar-link.active{
  background:var(--blue);
  color:#fff;
  box-shadow:0 5px 15px rgba(20,85,217,.35);
}

.logout-link{
  margin-top:auto;
  color:#ffb8b8;
}

.main-area{
  width:calc(100% - 250px);
  margin-left:250px;
  min-height:100vh;
}

.main-topbar{
  height:72px;
  background:#fff;
  border-bottom:1px solid var(--border);
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 35px;
}

.top-title{
  font-size:20px;
  font-weight:700;
  color:var(--navy);
}

.top-title span{
  font-weight:900;
}

.topbar-right{
  display:flex;
  align-items:center;
  gap:18px;
}

.notification{
  font-size:18px;
}

.user-profile{
  display:flex;
  align-items:center;
  gap:10px;
}

.avatar{
  width:38px;
  height:38px;
  border-radius:50%;
  background:var(--blue);
  color:#fff;
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:800;
}

.user-info{
  display:flex;
  flex-direction:column;
}

.user-info strong{
  font-size:13px;
  color:var(--navy);
}

.user-info small{
  font-size:11px;
  color:var(--muted);
}

.logout-button{
  background:#e9eef7;
  color:var(--navy);
  box-shadow:none;
}

.menu-button{
  display:none;
}

.main-content{
  width:100%;
}

.container,
.main-container{
  max-width:1400px;
  margin:0 auto;
  padding:32px;
}

.actions{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  margin-bottom:25px;
}

h1{
  margin:0 0 7px;
  font-size:32px;
  color:var(--navy);
}

h2{
  margin-top:0;
  color:var(--navy);
}

.muted{
  color:var(--muted);
}

button,
.button,
.btn{
  border:0;
  background:linear-gradient(135deg,var(--blue),var(--blue2));
  color:#fff;
  padding:12px 18px;
  border-radius:9px;
  font-weight:700;
  cursor:pointer;
  text-decoration:none;
  display:inline-block;
  box-shadow:0 5px 12px rgba(20,85,217,.2);
  transition:.2s;
}

button:hover,
.button:hover,
.btn:hover{
  transform:translateY(-1px);
  box-shadow:0 7px 16px rgba(20,85,217,.28);
}

.secondary{
  background:#e9eef7;
  color:var(--navy);
  box-shadow:none;
}

.cards{
  display:grid;
  grid-template-columns:repeat(5,1fr);
  gap:16px;
  margin-bottom:25px;
}

.card{
  background:#fff;
  border-radius:14px;
  padding:21px;
  box-shadow:var(--shadow);
  border:1px solid var(--border);
  position:relative;
  overflow:hidden;
}

.card::before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:4px;
  background:linear-gradient(90deg,var(--blue),var(--gold));
}

.card b{
  font-size:11px;
  color:var(--muted);
  font-weight:700;
  letter-spacing:.5px;
}

.card strong{
  display:block;
  font-size:30px;
  margin-top:9px;
  color:var(--navy);
}

.panel{
  background:#fff;
  border-radius:15px;
  padding:25px;
  box-shadow:var(--shadow);
  border:1px solid var(--border);
  margin-bottom:22px;
}

.grid{
  display:grid;
  grid-template-columns:1.2fr .8fr;
  gap:22px;
}

.form{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
}

.form label{
  display:flex;
  flex-direction:column;
  gap:7px;
  font-size:13px;
  font-weight:700;
  color:#455064;
}

.wide{
  grid-column:1/-1;
}

input,
select,
textarea{
  font:inherit;
  border:1px solid #d8dde6;
  border-radius:9px;
  padding:12px;
  background:#fff;
  outline:none;
  transition:.2s;
}

input:focus,
select:focus,
textarea:focus{
  border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(20,85,217,.1);
}

textarea{
  min-height:110px;
  resize:vertical;
}

table{
  width:100%;
  border-collapse:collapse;
}

th,
td{
  text-align:left;
  padding:14px;
  border-bottom:1px solid var(--border);
  font-size:14px;
}

th{
  color:#65738b;
  font-size:11px;
  text-transform:uppercase;
  letter-spacing:.5px;
  background:#f8faff;
}

tbody tr:hover{
  background:#f8faff;
}

a{
  color:var(--blue);
}

.status{
  display:inline-block;
  padding:6px 10px;
  border-radius:999px;
  background:#eef2f7;
  font-size:11px;
  font-weight:700;
}

.status-nuevo{
  background:#eef2f7;
}

.status-pte-validacion{
  background:#d1d5db;
}

.status-en-activacion{
  background:#e8d3c0;
}

.status-activo{
  background:#b7e4c7;
}

.status-ko{
  background:#ffe08a;
}

.status-baja,
.status-cancelado{
  background:#f4a6a6;
}
.bar{
  height:8px;
  background:#e9edf2;
  border-radius:9px;
}

.bar i{
  display:block;
  height:100%;
  background:var(--blue);
  border-radius:9px;
}

.login{
  min-height:100vh;
  display:grid;
  place-items:center;
  background:
    radial-gradient(circle at top right,rgba(20,85,217,.25),transparent 35%),
    linear-gradient(135deg,#071a45,#0d244f);
}

.loginbox{
  width:min(450px,92vw);
  background:#fff;
  border-radius:20px;
  padding:38px;
  box-shadow:0 25px 70px rgba(0,0,0,.35);
}

.loginbox form{
  display:grid;
  gap:10px;
}

.loginbox label{
  display:grid;
  gap:7px;
  font-weight:700;
}

.loginbox button{
  margin-top:8px;
  width:100%;
}

.userform{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:10px;
}

.support-box{
  margin-top:25px;
  padding:15px;
  border-radius:10px;
  background:rgba(255,255,255,.06);
  display:flex;
  flex-direction:column;
  gap:5px;
}

.support-box strong{
  color:#fff;
}

.support-box small,
.support-box span{
  color:rgba(255,255,255,.7);
}

.sidebar-footer{
  margin-top:18px;
  font-size:9px;
  line-height:1.6;
  color:rgba(255,255,255,.5);
  text-align:center;
}

.sidebar-bottom{
  margin-top:25px;
}

@media(max-width:1000px){
  .cards{
    grid-template-columns:repeat(2,1fr);
  }

  .grid{
    grid-template-columns:1fr;
  }

  .userform{
    grid-template-columns:1fr 1fr;
  }
}

@media(max-width:850px){
  .sidebar{
    width:210px;
  }

  .main-area{
    width:calc(100% - 210px);
    margin-left:210px;
  }

  .form{
    grid-template-columns:1fr;
  }

  .wide{
    grid-column:auto;
  }

  .menu-button{
    display:block;
  }
}

@media(max-width:600px){
  .sidebar{
    width:70px;
    padding:15px 8px;
  }

  .sidebar.open{
    width:250px;
  }

  .logo-placeholder{
    font-size:18px;
  }

  .brand-connect,
  .brand-slogan,
  .sidebar-footer,
  .support-box{
    display:none;
  }

  .sidebar.open .brand-connect,
  .sidebar.open .brand-slogan,
  .sidebar.open .sidebar-footer,
  .sidebar.open .support-box{
    display:block;
  }

  .sidebar-link{
    justify-content:center;
    padding:12px 5px;
    font-size:0;
  }

  .sidebar.open .sidebar-link{
    justify-content:flex-start;
    font-size:14px;
  }

  .main-area{
    width:calc(100% - 70px);
    margin-left:70px;
  }

  .main-topbar{
    padding:0 15px;
  }

  .top-title{
    display:none;
  }

  .user-info{
    display:none;
  }

  .container,
  .main-container{
    padding:20px 14px;
  }

  .cards{
    grid-template-columns:1fr;
  }

  .userform{
    grid-template-columns:1fr;
  }

  .actions{
    align-items:flex-start;
    flex-direction:column;
  }
}
</style>
</head>

<body>

<div id="app"></div>

<script>

const A=document.getElementById('app');

let state={
  me:null,
  sales:[],
  users:[],
  dash:null
};

async function api(url,opt={}){
  let r=await fetch(
    url,
    {
      headers:{
        'Content-Type':'application/json',
        ...(opt.headers||{})
      },
      ...opt
    }
  );

  let d=await r.json().catch(()=>({}));

  if(!r.ok){
    throw Error(d.error||'Error');
  }

  return d;
}

function login(){

  A.innerHTML=
    '<div class="login">'+
      '<div class="loginbox">'+
        '<div class="logo-placeholder" style="color:#071a45;text-align:left">DATHEL</div>'+
        '<h2>CRM</h2>'+
        '<p class="muted">Gestión de ventas de luz y gas</p>'+
        '<form onsubmit="doLogin(event)">'+
          '<label>Usuario'+
            '<input id="u" required>'+
          '</label>'+
          '<label>Contraseña'+
            '<input id="p" type="password" required>'+
          '</label>'+
          '<button>INICIAR SESIÓN</button>'+
        '</form>'+
      '</div>'+
    '</div>';
}

async function doLogin(e){

  e.preventDefault();

  try{

    state.me=await api(
      '/api/login',
      {
        method:'POST',
        body:JSON.stringify({
          username:document.getElementById('u').value,
          password:document.getElementById('p').value
        })
      }
    );

    dashboard();

  }catch(x){

    alert(x.message);

  }
}

function shell(body,active){

  let canUsers=[
    'ADMIN',
    'DIRECTOR',
    'JEFE',
    'SUPERVISOR'
  ].includes(state.me.role);

  let navSale=
    state.me.role==='COMERCIAL'
      ?
      '<a href="#" class="sidebar-link '+(active==='sale'?'active':'')+'" onclick="newSale();return false;">'+
        '<span class="nav-icon">＋</span>'+
        '<span>Nueva venta</span>'+
      '</a>'
      :
      '';

  let navUsers=
    canUsers
      ?
      '<a href="#" class="sidebar-link '+(active==='users'?'active':'')+'" onclick="users();return false;">'+
        '<span class="nav-icon">♙</span>'+
        '<span>Usuarios</span>'+
      '</a>'
      :
      '';

  let navSettings=
    state.me.role==='ADMIN'
      ?
      '<a href="#" class="sidebar-link '+(active==='settings'?'active':'')+'" onclick="settings();return false;">'+
        '<span class="nav-icon">⚙</span>'+
        '<span>Administración</span>'+
      '</a>'
      :
      '';

  A.innerHTML=
    '<div class="crm-layout">'+

      '<aside class="sidebar">'+

        '<div class="sidebar-brand">'+
          '<div class="logo-placeholder">DATHEL</div>'+
          '<div class="brand-connect">CONNECT</div>'+
          '<div class="brand-slogan">CONECTAMOS PERSONAS,<br>IMPULSAMOS SOLUCIONES</div>'+
        '</div>'+

        '<nav class="sidebar-nav">'+

          '<a href="#" class="sidebar-link '+(active==='dashboard'?'active':'')+'" onclick="dashboard();return false;">'+
            '<span class="nav-icon">⌂</span>'+
            '<span>Dashboard</span>'+
          '</a>'+

          navSale+

          '<a href="#" class="sidebar-link '+(active==='sales'?'active':'')+'" onclick="dashboard();return false;">'+
            '<span class="nav-icon">▤</span>'+
            '<span>Ventas</span>'+
          '</a>'+

          navUsers+

          navSettings+

        '</nav>'+

        '<div class="sidebar-bottom">'+

          '<div class="support-box">'+
            '<strong>◉ Soporte</strong>'+
            '<small>¿Necesitas ayuda?</small>'+
            '<span>Contáctanos →</span>'+
          '</div>'+

          '<div class="sidebar-footer">'+
            '© 2026 DATHEL CONNECT<br>'+
            'Todos los derechos reservados.'+
          '</div>'+

        '</div>'+

      '</aside>'+

      '<div class="main-area">'+

        '<header class="main-topbar">'+

          '<button class="menu-button" type="button" onclick="document.querySelector(\\'.sidebar\\').classList.toggle(\\'open\\')">☰</button>'+

          '<div class="top-title">'+
            '<span>DATHEL</span> CRM'+
          '</div>'+

          '<div class="topbar-right">'+

            '<div class="notification">🔔</div>'+

            '<div class="user-profile">'+

              '<div class="avatar">'+
                state.me.full_name.slice(0,2).toUpperCase()+
              '</div>'+

              '<div class="user-info">'+
                '<strong>'+state.me.full_name+'</strong>'+
                '<small>'+state.me.role+'</small>'+
              '</div>'+

            '</div>'+

            '<button class="logout-button" onclick="logout()">Salir</button>'+

          '</div>'+

        '</header>'+

        '<main class="main-content">'+
          body+
        '</main>'+

      '</div>'+

    '</div>';
}

async function dashboard(){

  let d=await api('/api/dashboard');

  state.dash=d;

  let cards=[
    ['VENTAS',d.total],
    ['ACTIVAS',d.active],
    ['PENDIENTES',d.pending],
    ['KO',d.ko],
    ['BAJA/CANCEL.',d.cancelled]
  ];

  shell(

    '<div class="container">'+

      '<div class="actions">'+

        '<div>'+
          '<h1>Dashboard</h1>'+
          '<p class="muted">Resumen general de ventas</p>'+
        '</div>'+

        '<a class="btn" href="/api/export">Exportar CSV</a>'+

      '</div>'+

      '<div class="cards">'+

        cards.map(x=>
          '<div class="card">'+
            '<b>'+x[0]+'</b>'+
            '<strong>'+x[1]+'</strong>'+
          '</div>'
        ).join('')+

      '</div>'+

      '<div class="grid">'+

        '<section class="panel">'+
          '<h2>Compañías</h2>'+

          (d.companies||[]).map(x=>
            '<p>'+
              '<b>'+x.name+'</b>'+
              ' <span class="muted">'+
                x.total+' ventas · '+x.active+' activas'+
              '</span>'+
            '</p>'+

            '<div class="bar">'+
              '<i style="width:'+
                (d.total?x.total/d.total*100:0)+
              '%"></i>'+
            '</div>'

          ).join('')+

        '</section>'+

        '<section class="panel">'+
          '<h2>Ranking</h2>'+

          (d.ranking||[]).map((x,i)=>
            '<p>'+
              '<b>#'+(i+1)+' '+x.name+'</b>'+
              '<br>'+
              x.total+' ventas · '+x.active+' activas'+
            '</p>'
          ).join('')+

        '</section>'+

      '</div>'+

      '<section class="panel">'+

        '<h2>Filtrar ventas</h2>'+

'<div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px">'+

  '<label>MES'+
    '<input id="filterMonth" type="month">'+
  '</label>'+

  '<label>DESDE'+
    '<input id="filterFrom" type="date">'+
  '</label>'+

  '<label>HASTA'+
    '<input id="filterTo" type="date">'+
  '</label>'+

  '<button type="button" onclick="applySaleFilter()">'+
    'FILTRAR'+
  '</button>'+

  '<button type="button" onclick="clearSaleFilter()">'+
    'LIMPIAR'+
  '</button>'+

'</div>'+

'<h2>Ventas del período</h2>'+

        '<table>'+
          '<thead>'+
            '<tr>'+
              '<th>ID</th>'+
              '<th>Cliente</th>'+
              '<th>Comercial</th>'+
              '<th>Compañía</th>'+
              '<th>Producto</th>'+
              '<th>Estado</th>'+
            '</tr>'+
          '</thead>'+

          '<tbody>'+

            (d.filteredSales||d.sales||[]).slice(0,30).map(s=>
              '<tr data-sale-date="'+String(s.created_at||"").slice(0,10)+'">'+
                '<td>'+
                  '<a href="#" onclick="sale('+s.id+');return false">'+
                    '#'+s.id+
                  '</a>'+
                '</td>'+
                '<td>'+s.full_name+'</td>'+
                '<td>'+s.commercial_name+'</td>'+
                '<td>'+s.company+'</td>'+
                '<td>'+s.product+'</td>'+
                '<td><span class="status status-'+
String(s.status||'')
  .toLowerCase()
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g,'')
  .replaceAll(' ','-')+
'">'+s.status+'</span></td>'+
              '</tr>'
            ).join('')+

          '</tbody>'+

        '</table>'+

      '</section>'+

    '</div>',

    'dashboard'

  );
}
function applySaleFilter(){

  let month=
    document.getElementById('filterMonth')?.value||'';

  let from=
    document.getElementById('filterFrom')?.value||'';

  let to=
    document.getElementById('filterTo')?.value||'';

  document.querySelectorAll('tr[data-sale-date]').forEach(row=>{

    let date=row.dataset.saleDate||'';
    let show=true;

    if(month && date.slice(0,7)!==month){
      show=false;
    }

    if(from && date<from){
      show=false;
    }

    if(to && date>to){
      show=false;
    }

    row.style.display=show?'':'none';

  });

}

function clearSaleFilter(){

  let month=
    document.getElementById('filterMonth');

  let from=
    document.getElementById('filterFrom');

  let to=
    document.getElementById('filterTo');

  if(month)month.value='';
  if(from)from.value='';
  if(to)to.value='';

  document.querySelectorAll('tr[data-sale-date]').forEach(row=>{
    row.style.display='';
  });

}

function newSale(){

  let f=[
    'full_name',
    'dni',
    'mobile',
    'fixed_phone',
    'email',
    'iban',
    'address',
    'postal_code',
    'population',
    'province',
    'cups_light',
    'cups_gas'
  ];

  shell(

    '<div class="container">'+

      '<h1>Nueva venta</h1>'+

      '<form class="panel form" onsubmit="saveSale(event)">'+

        f.map(k=>
          '<label>'+
            k.replaceAll('_',' ').toUpperCase()+
            '<input name="'+k+'" '+
            (k==='full_name'||k==='dni'?'required':'')+
            '>'+
          '</label>'
        ).join('')+

        '<label>COMPAÑÍA'+
          '<select name="company">'+
            ['ENDESA','REPSOL','NATURGY','NORDY']
              .map(x=>'<option>'+x+'</option>')
              .join('')+
          '</select>'+
        '</label>'+

        '<label>PRODUCTO'+
          '<select name="product">'+
            '<option>LUZ</option>'+
            '<option>GAS</option>'+
            '<option>LUZ + GAS</option>'+
          '</select>'+
        '</label>'+

        '<div class="wide">'+
          '<button>GUARDAR VENTA</button>'+
        '</div>'+

      '</form>'+

    '</div>',

    'sale'

  );
}

async function saveSale(e){

  e.preventDefault();

  let o=Object.fromEntries(new FormData(e.target));

  try{

    let x=await api(
      '/api/sales',
      {
        method:'POST',
        body:JSON.stringify(o)
      }
    );

    sale(x.id);

  }catch(x){

    alert(x.message);

  }
}

async function sale(id){

  let s=await api('/api/sales/'+id);

  let edit=state.me.role!=='COMERCIAL';

  let fields=[
    'full_name',
    'dni',
    'mobile',
    'fixed_phone',
    'email',
    'iban',
    'address',
    'postal_code',
    'population',
    'province',
    'cups_light',
    'cups_gas'
  ];

  shell(

    '<div class="container">'+

      '<div class="actions">'+
        '<h1>Venta #'+s.sale.id+'</h1>'+
        '<span class="status">'+s.sale.status+'</span>'+
      '</div>'+

      '<form class="panel form" onsubmit="updateSale(event,'+id+')">'+

        fields.map(k=>
          '<label>'+
            k.replaceAll('_',' ').toUpperCase()+
            '<input name="'+k+'" value="'+(s.sale[k]||'')+'" '+
            (edit?'':'readonly')+
            '>'+
          '</label>'
        ).join('')+

        '<label>COMPAÑÍA'+
          '<select name="company" '+(edit?'':'disabled')+'>'+
            ['ENDESA','REPSOL','NATURGY','NORDY']
              .map(x=>
                '<option '+
                (s.sale.company===x?'selected':'')+
                '>'+x+'</option>'
              ).join('')+
          '</select>'+
        '</label>'+

        '<label>PRODUCTO'+
          '<select name="product" '+(edit?'':'disabled')+'>'+
            ['LUZ','GAS','LUZ + GAS']
              .map(x=>
                '<option '+
                (s.sale.product===x?'selected':'')+
                '>'+x+'</option>'
              ).join('')+
          '</select>'+
        '</label>'+

        '<label>ESTADO'+
          '<select name="status" '+(edit?'':'disabled')+'>'+
            [
              'NUEVO',
              'PTE VALIDACIÓN',
              'EN ACTIVACIÓN',
              'ACTIVO',
              'KO',
              'BAJA',
              'CANCELADO'
            ].map(x=>
              '<option '+
              (s.sale.status===x?'selected':'')+
              '>'+x+'</option>'
            ).join('')+
          '</select>'+
        '</label>'+

        (edit?

          '<label class="wide">COMENTARIO'+
            '<textarea name="comment"></textarea>'+
          '</label>'+

          '<div class="wide">'+
            '<button>GUARDAR CAMBIOS</button>'+
          '</div>'

          :

          ''

        )+

      '</form>'+

      '<div class="grid">'+

        '<section class="panel">'+
          '<h2>Comentarios</h2>'+

          s.comments.map(x=>
            '<p>'+
              '<b>'+x.full_name+'</b> · '+x.created_at+
              '<br>'+
              x.comment+
            '</p>'
          ).join('')+

        '</section>'+

        '<section class="panel">'+
          '<h2>Historial</h2>'+

          s.history.map(x=>
            '<p>'+
              '<b>'+x.action+'</b> · '+x.created_at+
              '<br>'+
              x.details+
            '</p>'
          ).join('')+

        '</section>'+

      '</div>'+

    '</div>',

    'sales'

  );
}

async function updateSale(e,id){

  e.preventDefault();

  let o=Object.fromEntries(new FormData(e.target));

  try{

    await api(
      '/api/sales/'+id,
      {
        method:'PUT',
        body:JSON.stringify(o)
      }
    );

    sale(id);

  }catch(x){

    alert(x.message);

  }
}

async function users(){

  let d=await api('/api/users');

  shell(

    '<div class="container">'+

      '<h1>Usuarios</h1>'+

      '<div class="panel">'+

        '<h2>Agregar usuario</h2>'+

        '<form class="userform" onsubmit="createUser(event)">'+

          '<input name="full_name" placeholder="Nombre" required>'+
          '<input name="username" placeholder="Usuario" required>'+
          '<input name="password" type="password" placeholder="Contraseña" required>'+

          '<select name="role">'+
            '<option>COMERCIAL</option>'+
            '<option>BO</option>'+
            '<option>SUPERVISOR</option>'+
            '<option>JEFE</option>'+
            '<option>DIRECTOR</option>'+
            '<option>ADMIN</option>'+
          '</select>'+

          '<button>CREAR</button>'+

        '</form>'+

      '</div>'+

      '<div class="panel">'+

        '<table>'+

          '<thead>'+
            '<tr>'+
              '<th>Usuario</th>'+
              '<th>Nombre</th>'+
              '<th>Rol</th>'+
              '<th>Estado</th>'+
            '</tr>'+
          '</thead>'+

          '<tbody>'+

            d.map(x=>
              '<tr>'+
                '<td>'+x.username+'</td>'+
                '<td>'+x.full_name+'</td>'+
                '<td>'+x.role+'</td>'+
                '<td>'+
                  (x.active?'Activo':'Inactivo')+
                '</td>'+
              '</tr>'
            ).join('')+

          '</tbody>'+

        '</table>'+

      '</div>'+

    '</div>',

    'users'

  );
}

async function createUser(e){

  e.preventDefault();

  try{

    await api(
      '/api/users',
      {
        method:'POST',
        body:JSON.stringify(
          Object.fromEntries(new FormData(e.target))
        )
      }
    );

    users();

  }catch(x){

    alert(x.message);

  }
}

async function settings(){

  let d=await api('/api/settings');

  shell(

    '<div class="container">'+

      '<h1>Administración</h1>'+

      '<div class="panel">'+

        '<h2>Objetivo mensual</h2>'+

        '<form onsubmit="saveSettings(event)">'+

          '<input type="number" name="target" value="'+d.target+'">'+

          '<button>GUARDAR</button>'+

        '</form>'+

      '</div>'+

    '</div>',

    'settings'

  );
}

async function saveSettings(e){

  e.preventDefault();

  await api(
    '/api/settings',
    {
      method:'PUT',
      body:JSON.stringify(
        Object.fromEntries(new FormData(e.target))
      )
    }
  );

  settings();
}

async function logout(){

  await api(
    '/api/logout',
    {
      method:'POST'
    }
  );

  state.me=null;

  login();
}

login();

</script>
</body>
</html>`;

async function sha(text){
    const b=await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );

  return [...new Uint8Array(b)]
    .map(x=>x.toString(16).padStart(2,"0"))
    .join("");
}

function cookie(name,val,max=86400){
  return `${name}=${val}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${max}`;
}

async function getUser(req,env){

  const m=(req.headers.get("Cookie")||"")
    .match(/dathel_session=([^;]+)/);

  if(!m)return null;

  return await env.DB.prepare(
    "SELECT u.id,u.username,u.full_name,u.role,u.active " +
    "FROM users u JOIN sessions s ON s.user_id=u.id " +
    "WHERE s.token=? AND s.expires_at>? AND u.active=1"
  )
  .bind(m[1],Date.now())
  .first();
}

function ok(data,headers={}){
  return Response.json(data,{headers});
}

function fail(msg,code=400){
  return new Response(
    JSON.stringify({error:msg}),
    {
      status:code,
      headers:{
        "content-type":"application/json"
      }
    }
  );
}

const now=()=>new Date().toISOString();

export default {

  async fetch(req,env){

    const url=new URL(req.url);
    const path=url.pathname;

    if(req.method==="GET"&&path==="/"){
      return new Response(
        HTML,
        {
          headers:{
            "content-type":"text/html;charset=UTF-8"
          }
        }
      );
    }

    if(path==="/api/login"&&req.method==="POST"){

      const b=await req.json();

      const u=await env.DB.prepare(
        "SELECT * FROM users WHERE username=? AND active=1"
      )
      .bind(b.username)
      .first();

      if(
        !u ||
        u.password_hash!==(await sha(b.password))
      ){
        return fail(
          "Usuario o contraseña incorrectos",
          401
        );
      }

      const token=crypto.randomUUID();

      await env.DB.prepare(
        "INSERT INTO sessions(token,user_id,expires_at) VALUES(?,?,?)"
      )
      .bind(
        token,
        u.id,
        Date.now()+86400000
      )
      .run();

      return ok(
        {
          id:u.id,
          username:u.username,
          full_name:u.full_name,
          role:u.role
        },
        {
          "Set-Cookie":cookie(
            "dathel_session",
            token
          )
        }
      );
    }

    if(path==="/api/logout"&&req.method==="POST"){

      return ok(
        {ok:true},
        {
          "Set-Cookie":cookie(
            "dathel_session",
            "",
            0
          )
        }
      );
    }

    const me=await getUser(req,env);

    if(path==="/api/me"){
      return me
        ? ok(me)
        : fail("No autenticado",401);
    }

    if(!me){
      return fail("No autenticado",401);
    }

    if(path==="/api/dashboard"&&req.method==="GET"){

      let q=
        "SELECT s.*,u.full_name commercial_name " +
        "FROM sales s JOIN users u ON u.id=s.commercial_id";

      let args=[];

      if(me.role==="COMERCIAL"){
        q+=" WHERE s.commercial_id=?";
        args=[me.id];
      }

      q+=" ORDER BY s.id DESC";

      const sales=await env.DB
        .prepare(q)
        .bind(...args)
        .all();

      const a=sales.results;

      const total=a.length;

      const active=a.filter(
        x=>x.status==="ACTIVO"
      ).length;

      const pending=a.filter(
        x=>[
          "NUEVO",
          "PTE VALIDACIÓN",
          "EN ACTIVACIÓN"
        ].includes(x.status)
      ).length;

      const ko=a.filter(
        x=>x.status==="KO"
      ).length;

      const cancelled=a.filter(
        x=>[
          "BAJA",
          "CANCELADO"
        ].includes(x.status)
      ).length;

      const companies=[
        "ENDESA",
        "REPSOL",
        "NATURGY",
        "NORDY"
      ].map(name=>({
        name,
        total:a.filter(
          x=>x.company===name
        ).length,
        active:a.filter(
          x=>x.company===name &&
             x.status==="ACTIVO"
        ).length
      }));

      const us=await env.DB.prepare(
        "SELECT id,full_name FROM users " +
        "WHERE role='COMERCIAL' AND active=1"
      ).all();

      const ranking=us.results
        .map(u=>({
          name:u.full_name,
          total:a.filter(
            x=>x.commercial_id===u.id
          ).length,
          active:a.filter(
            x=>x.commercial_id===u.id &&
               x.status==="ACTIVO"
          ).length
        }))
        .sort(
          (x,y)=>y.total-x.total
        );

      return ok({
        total,
        active,
        pending,
        ko,
        cancelled,
        companies,
        ranking,
        sales:a
      });
    }

    if(path==="/api/sales"&&req.method==="POST"){

      if(me.role!=="COMERCIAL"){
        return fail(
          "Solo los comerciales pueden crear ventas",
          403
        );
      }

      const b=await req.json();
      const t=now();

      const r=await env.DB.prepare(`
        INSERT INTO sales(
          full_name,
          dni,
          mobile,
          fixed_phone,
          email,
          iban,
          address,
          postal_code,
          population,
          province,
          cups_light,
          cups_gas,
          company,
          product,
          status,
          commercial_id,
          created_at,
          updated_at
        )
        VALUES(
          ?,?,?,?,?,?,?,?,?,?,?,?,?,
          ?,'NUEVO',?,?,?,?
        )
      `)
      .bind(
        b.full_name,
        b.dni,
        b.mobile||"",
        b.fixed_phone||"",
        b.email||"",
        b.iban||"",
        b.address||"",
        b.postal_code||"",
        b.population||"",
        b.province||"",
        b.cups_light||"",
        b.cups_gas||"",
        b.company,
        b.product,
        me.id,
        t,
        t
      )
      .run();

      await env.DB.prepare(
        "INSERT INTO history(" +
        "sale_id,user_id,action,details,created_at" +
        ") VALUES(?,?,?,?,?)"
      )
      .bind(
        r.meta.last_row_id,
        me.id,
        "CREACIÓN",
        "Venta registrada.",
        t
      )
      .run();

      return ok({
        id:r.meta.last_row_id
      });
    }

    const sm=path.match(
      /^\/api\/sales\/(\d+)$/
    );

    if(sm){

      const id=Number(sm[1]);

      const s=await env.DB.prepare(
        "SELECT s.*,u.full_name commercial_name " +
        "FROM sales s JOIN users u " +
        "ON u.id=s.commercial_id " +
        "WHERE s.id=?"
      )
      .bind(id)
      .first();

      if(!s){
        return fail(
          "Venta no encontrada",
          404
        );
      }

      if(
        me.role==="COMERCIAL" &&
        s.commercial_id!==me.id
      ){
        return fail(
          "Sin permiso",
          403
        );
      }

      if(req.method==="GET"){

        const comments=await env.DB.prepare(
          "SELECT c.*,u.full_name " +
          "FROM comments c JOIN users u " +
          "ON u.id=c.user_id " +
          "WHERE sale_id=? ORDER BY c.id DESC"
        )
        .bind(id)
        .all();

        const history=await env.DB.prepare(
          "SELECT h.*,u.full_name " +
          "FROM history h JOIN users u " +
          "ON u.id=h.user_id " +
          "WHERE sale_id=? ORDER BY h.id DESC"
        )
        .bind(id)
        .all();

        return ok({
          sale:s,
          comments:comments.results,
          history:history.results
        });
      }

      if(req.method==="PUT"){

        if(me.role==="COMERCIAL"){
          return fail(
            "No puedes modificar una venta",
            403
          );
        }

        const b=await req.json();
        const t=now();

        await env.DB.prepare(`
          UPDATE sales SET
            full_name=?,
            dni=?,
            mobile=?,
            fixed_phone=?,
            email=?,
            iban=?,
            address=?,
            postal_code=?,
            population=?,
            province=?,
            cups_light=?,
            cups_gas=?,
            company=?,
            product=?,
            status=?,
            updated_at=?
          WHERE id=?
        `)
        .bind(
          b.full_name,
          b.dni,
          b.mobile,
          b.fixed_phone,
          b.email,
          b.iban,
          b.address,
          b.postal_code,
          b.population,
          b.province,
          b.cups_light,
          b.cups_gas,
          b.company,
          b.product,
          b.status,
          t,
          id
        )
        .run();

        await env.DB.prepare(
          "INSERT INTO history(" +
          "sale_id,user_id,action,details,created_at" +
          ") VALUES(?,?,?,?,?)"
        )
        .bind(
          id,
          me.id,
          "MODIFICACIÓN",
          `Actualizado por ${me.full_name}.`,
          t
        )
        .run();

        if(b.comment?.trim()){

          await env.DB.prepare(
            "INSERT INTO comments(" +
            "sale_id,user_id,comment,created_at" +
            ") VALUES(?,?,?,?)"
          )
          .bind(
            id,
            me.id,
            b.comment.trim(),
            t
          )
          .run();
        }

        return ok({ok:true});
      }
    }

    if(path==="/api/users"){

      if(
        ![
          "ADMIN",
          "DIRECTOR",
          "JEFE",
          "SUPERVISOR"
        ].includes(me.role)
      ){
        return fail(
          "Sin permiso",
          403
        );
      }

      if(req.method==="GET"){

        const x=await env.DB.prepare(
          "SELECT id,username,full_name,role,active " +
          "FROM users ORDER BY role,full_name"
        ).all();

        return ok(x.results);
      }

      if(req.method==="POST"){

        const b=await req.json();

        if(
          !b.full_name ||
          !b.username ||
          !b.password
        ){
          return fail(
            "Completa todos los campos"
          );
        }

        try{

          await env.DB.prepare(
            "INSERT INTO users(" +
            "username,full_name,password_hash," +
            "role,active,created_at" +
            ") VALUES(?,?,?,?,1,?)"
          )
          .bind(
            b.username,
            b.full_name,
            await sha(b.password),
            b.role,
            now()
          )
          .run();

          return ok({ok:true});

        }catch(e){

          return fail(
            "El usuario ya existe"
          );
        }
      }
    }

    if(path==="/api/settings"){

      if(me.role!=="ADMIN"){
        return fail(
          "Sin permiso",
          403
        );
      }

      if(req.method==="GET"){

        const x=await env.DB.prepare(
          "SELECT value FROM settings " +
          "WHERE key='monthly_target'"
        )
        .first();

        return ok({
          target:x?.value||0
        });
      }

      const b=await req.json();

      await env.DB.prepare(
        "INSERT INTO settings(key,value) " +
        "VALUES('monthly_target',?) " +
        "ON CONFLICT(key) DO UPDATE SET " +
        "value=excluded.value"
      )
      .bind(
        String(b.target||0)
      )
      .run();

      return ok({ok:true});
    }

    if(
      path==="/api/export" &&
      req.method==="GET"
    ){

      const x=await env.DB.prepare(
        "SELECT s.*,u.full_name commercial_name " +
        "FROM sales s JOIN users u " +
        "ON u.id=s.commercial_id " +
        "ORDER BY s.id DESC"
      ).all();

      let csv=
  "\uFEFFsep=;\r\n"+
  "ID;Cliente;DNI;Móvil;Teléfono fijo;"+
  "Email;IBAN;Dirección;Código postal;"+
  "Población;Provincia;CUPS luz;CUPS gas;"+
  "Compañía;Producto;Estado;Comercial;Creada\r\n";

for(const s of x.results){
  csv += [
    s.id,
    s.full_name,
    s.dni,
    s.mobile,
    s.fixed_phone,
    s.email,
    s.iban,
    s.address,
    s.postal_code,
    s.population,
    s.province,
    s.cups_light,
    s.cups_gas,
    s.company,
    s.product,
    s.status,
    s.commercial_name,
    s.created_at
  ]
  .map(
    v=>`"${String(v??"").replaceAll('"','""')}"`
  )
  .join(";")+"\r\n";
}

      return new Response(
        csv,
        {
          headers:{
            "content-type":
              "text/csv;charset=utf-8",

            "content-disposition":
              "attachment; filename=DATHEL_CRM_ventas.csv"
          }
        }
      );
    }

    return fail(
      "No encontrado",
      404
    );
  }
};
