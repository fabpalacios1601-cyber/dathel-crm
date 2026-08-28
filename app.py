from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from datetime import datetime
from pathlib import Path

APP_DIR = Path(__file__).resolve().parent
DB = APP_DIR / "dathel_crm.db"

app = Flask(__name__)
app.secret_key = "DATHEL-CRM-CHANGE-ME"

ROLES = ["COMERCIAL", "BO", "SUPERVISOR", "JEFE_OPERACIONES", "DIRECTOR_GENERAL"]
STATUSES = ["NUEVO", "PTE VALIDACION", "EN ACTIVACION", "KO", "ACTIVO", "BAJA", "CANCELADO"]
COMPANIES = ["ENDESA", "REPSOL", "NATURGY", "NORDY"]
PRODUCTS = ["LUZ", "GAS", "LUZ + GAS"]

def db():
    con = sqlite3.connect(DB)
    con.row_factory = sqlite3.Row
    return con

def init_db():
    con = db()
    con.executescript("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        password_hash TEXT NOT NULL,
        role TEXT NOT NULL,
        active INTEGER NOT NULL DEFAULT 1
    );
    CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        full_name TEXT NOT NULL,
        dni TEXT NOT NULL,
        mobile TEXT,
        fixed_phone TEXT,
        email TEXT,
        iban TEXT,
        address TEXT,
        postal_code TEXT,
        population TEXT,
        province TEXT,
        cups_light TEXT,
        cups_gas TEXT,
        company TEXT NOT NULL,
        product TEXT NOT NULL,
        status TEXT NOT NULL DEFAULT 'NUEVO',
        commercial_id INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        FOREIGN KEY(commercial_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sale_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        comment TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY(sale_id) REFERENCES sales(id),
        FOREIGN KEY(user_id) REFERENCES users(id)
    );
    """)
    demo_users = [
        ("director", "Director General", "Director123!", "DIRECTOR_GENERAL"),
        ("jefeop", "Jefe de Operaciones", "Jefe123!", "JEFE_OPERACIONES"),
        ("supervisor", "Supervisor Demo", "Super123!", "SUPERVISOR"),
        ("bo", "Back Office", "BO123!", "BO"),
        ("comercial1", "Comercial 1", "Comercial123!", "COMERCIAL"),
        ("comercial2", "Comercial 2", "Comercial123!", "COMERCIAL"),
        ("comercial3", "Comercial 3", "Comercial123!", "COMERCIAL"),
        ("comercial4", "Comercial 4", "Comercial123!", "COMERCIAL"),
        ("comercial5", "Comercial 5", "Comercial123!", "COMERCIAL"),
    ]
    for username, name, password, role in demo_users:
        if not con.execute("SELECT 1 FROM users WHERE username=?", (username,)).fetchone():
            con.execute(
                "INSERT INTO users(username,full_name,password_hash,role) VALUES(?,?,?,?)",
                (username, name, generate_password_hash(password), role)
            )
    con.commit()
    con.close()

def login_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        if "user_id" not in session:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return wrapper

def can_see_all(role):
    return role in ("BO", "SUPERVISOR", "JEFE_OPERACIONES", "DIRECTOR_GENERAL")

def current_user():
    if "user_id" not in session:
        return None
    con = db()
    u = con.execute("SELECT * FROM users WHERE id=?", (session["user_id"],)).fetchone()
    con.close()
    return u

@app.context_processor
def inject():
    return {"current_user": current_user(), "roles": ROLES, "statuses": STATUSES, "companies": COMPANIES, "products": PRODUCTS}

@app.route("/", methods=["GET"])
@login_required
def dashboard():
    u = current_user()
    con = db()
    if can_see_all(u["role"]):
        sales = con.execute("""
            SELECT s.*, u.full_name commercial_name
            FROM sales s JOIN users u ON u.id=s.commercial_id
            ORDER BY s.id DESC
        """).fetchall()
    else:
        sales = con.execute("""
            SELECT s.*, u.full_name commercial_name
            FROM sales s JOIN users u ON u.id=s.commercial_id
            WHERE s.commercial_id=?
            ORDER BY s.id DESC
        """, (u["id"],)).fetchall()

    total = len(sales)
    active = sum(s["status"] == "ACTIVO" for s in sales)
    pending = sum(s["status"] in ("NUEVO","PTE VALIDACION","EN ACTIVACION") for s in sales)
    ko = sum(s["status"] == "KO" for s in sales)
    cancelled = sum(s["status"] in ("BAJA","CANCELADO") for s in sales)
    con.close()
    return render_template("dashboard.html", sales=sales, total=total, active=active,
                           pending=pending, ko=ko, cancelled=cancelled)

@app.route("/login", methods=["GET","POST"])
def login():
    if request.method == "POST":
        username = request.form.get("username","").strip()
        password = request.form.get("password","")
        con = db()
        u = con.execute("SELECT * FROM users WHERE username=? AND active=1", (username,)).fetchone()
        con.close()
        if u and check_password_hash(u["password_hash"], password):
            session.clear()
            session["user_id"] = u["id"]
            return redirect(url_for("dashboard"))
        flash("Usuario o contraseña incorrectos.", "error")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

@app.route("/sales/new", methods=["GET","POST"])
@login_required
def new_sale():
    u = current_user()
    if u["role"] != "COMERCIAL":
        flash("Solo los comerciales pueden registrar ventas en esta versión.", "error")
        return redirect(url_for("dashboard"))
    if request.method == "POST":
        data = {k: request.form.get(k,"").strip() for k in [
            "full_name","dni","mobile","fixed_phone","email","iban","address",
            "postal_code","population","province","cups_light","cups_gas","company","product"
        ]}
        if not data["full_name"] or not data["dni"] or not data["company"] or not data["product"]:
            flash("Completa nombres, DNI, compañía y producto.", "error")
            return render_template("sale_form.html", data=data)
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        con = db()
        cur = con.execute("""
            INSERT INTO sales(full_name,dni,mobile,fixed_phone,email,iban,address,postal_code,
            population,province,cups_light,cups_gas,company,product,status,commercial_id,created_at,updated_at)
            VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,'NUEVO',?,?,?,?)
        """, tuple(data.values()) + (u["id"], now, now))
        sale_id = cur.lastrowid
        con.execute("INSERT INTO comments(sale_id,user_id,comment,created_at) VALUES(?,?,?,?)",
                    (sale_id, u["id"], "Venta registrada por el comercial.", now))
        con.commit()
        con.close()
        flash(f"Venta #{sale_id} creada correctamente.", "success")
        return redirect(url_for("sale_detail", sale_id=sale_id))
    return render_template("sale_form.html", data={})

@app.route("/sales/<int:sale_id>", methods=["GET","POST"])
@login_required
def sale_detail(sale_id):
    u = current_user()
    con = db()
    sale = con.execute("""
        SELECT s.*, u.full_name commercial_name FROM sales s
        JOIN users u ON u.id=s.commercial_id WHERE s.id=?
    """, (sale_id,)).fetchone()
    if not sale:
        con.close()
        return "Venta no encontrada", 404
    if u["role"] == "COMERCIAL" and sale["commercial_id"] != u["id"]:
        con.close()
        return "No tienes permiso para ver esta venta.", 403

    if request.method == "POST":
        if u["role"] not in ("BO","JEFE_OPERACIONES","DIRECTOR_GENERAL"):
            con.close()
            return "No tienes permiso para actualizar el estado.", 403
        new_status = request.form.get("status")
        comment = request.form.get("comment","").strip()
        if new_status not in STATUSES:
            con.close()
            return "Estado no válido", 400
        now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        con.execute("UPDATE sales SET status=?, updated_at=? WHERE id=?", (new_status, now, sale_id))
        if comment:
            con.execute("INSERT INTO comments(sale_id,user_id,comment,created_at) VALUES(?,?,?,?)",
                        (sale_id, u["id"], comment, now))
        else:
            con.execute("INSERT INTO comments(sale_id,user_id,comment,created_at) VALUES(?,?,?,?)",
                        (sale_id, u["id"], f"Estado cambiado a {new_status}.", now))
        con.commit()
        con.close()
        flash("Venta actualizada.", "success")
        return redirect(url_for("sale_detail", sale_id=sale_id))

    comments = con.execute("""
        SELECT c.*, u.full_name, u.role FROM comments c JOIN users u ON u.id=c.user_id
        WHERE c.sale_id=? ORDER BY c.id DESC
    """, (sale_id,)).fetchall()
    con.close()
    return render_template("sale_detail.html", sale=sale, comments=comments)

@app.route("/users")
@login_required
def users():
    u = current_user()
    if u["role"] not in ("DIRECTOR_GENERAL","JEFE_OPERACIONES"):
        return "No tienes permiso.", 403
    con = db()
    users = con.execute("SELECT id,username,full_name,role,active FROM users ORDER BY id").fetchall()
    con.close()
    return render_template("users.html", users=users)

@app.route("/search")
@login_required
def search():
    q = request.args.get("q","").strip()
    u = current_user()
    con = db()
    base = """
      SELECT s.*, u.full_name commercial_name FROM sales s
      JOIN users u ON u.id=s.commercial_id
      WHERE (s.full_name LIKE ? OR s.dni LIKE ? OR s.mobile LIKE ? OR CAST(s.id AS TEXT) LIKE ?)
    """
    params = [f"%{q}%"] * 4
    if not can_see_all(u["role"]):
        base += " AND s.commercial_id=?"
        params.append(u["id"])
    base += " ORDER BY s.id DESC"
    sales = con.execute(base, params).fetchall()
    con.close()
    return render_template("dashboard.html", sales=sales, total=len(sales),
                           active=sum(s["status"]=="ACTIVO" for s in sales),
                           pending=sum(s["status"] in ("NUEVO","PTE VALIDACION","EN ACTIVACION") for s in sales),
                           ko=sum(s["status"]=="KO" for s in sales),
                           cancelled=sum(s["status"] in ("BAJA","CANCELADO") for s in sales),
                           search=q)

if __name__ == "__main__":
    init_db()
    app.run(host="127.0.0.1", port=5000, debug=False)
