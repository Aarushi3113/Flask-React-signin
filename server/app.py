from flask import Flask, render_template, request, url_for, redirect, session, jsonify
import pymongo
import bcrypt
import certifi
import sys
from flask_cors import CORS, cross_origin
import requests
session = requests.Session()
session.verify = False


app = Flask(__name__)
CORS(app)
#app.config['CORS_HEADERS'] = 'Content-Type'
# <client_credentials>
ca = certifi.where()
CONNECTION_STRING= "mongodb://newsbytes:sQ8hYWggAhkmRYD35ltNwfYwhmhxrBDBmHGzPPt041yTJv0nxOmXHnhU192qt8AEhDYXZM2NYn4rACDb5J2MpA==@newsbytes.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@newsbytes@"
# </client_credentials>

DB_NAME = "newsbytes"
COLLECTION_NAME = "users"


try:
    # <connect_client>
    client = pymongo.MongoClient(CONNECTION_STRING, tlsCAFile = ca)
    # </connect_client>

    try:
        client.server_info()  # validate connection string
    except (
        pymongo.errors.OperationFailure,
        pymongo.errors.ConnectionFailure,
        pymongo.errors.ExecutionTimeout,
    ) as err:
        sys.exit("Can't connect:" + str(err))
except Exception as err:
    sys.exit("Error:" + str(err))

def get_db(db_name = DB_NAME):
    db = client[db_name]
    if DB_NAME not in client.list_database_names():
        db.command({"customAction": "CreateDatabase", "offerThroughput": 400})
        print("Created db '{}' with shared throughput.\n".format(DB_NAME))
    else:
        print("Using database: '{}'.\n".format(DB_NAME))
    
    return db



#app.secret_key = "testing"
db = get_db(DB_NAME)
records = db[COLLECTION_NAME]

@app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response

'''
@app.route("/")
def main():
    return 'Aaru'
'''

@app.route("/register", methods = ["POST","GET"], strict_slashes=False)
@cross_origin()
def index():
    msg = {}
    if request.method == "POST":
        print('got a post request')
        print(request)
        req = request.get_json()

        name = req['name']
        email = req['email']

        password1 = req['password1']
        password2 = req['password2']

        preferences = req['preferences']

        #user_found = records.find_one({"name": user})
        #email_found = records.find_one({"email": email})

        #if user_found:
            #msg['e'] = 'There already is a user by that name'
        
        #if email_found:
            #msg['e'] = 'This email already exists'

        if password1 != password2:
            msg['e'] = 'Passwords should match'
        else:
            hashed = bcrypt.hashpw(password2.encode('utf-8'), bcrypt.gensalt())
            user_input = {'name': name, 'email': email, 'password': password2, 'preferences':preferences}
            records.insert_one(user_input)
            print(user_input)

        #user_data = records.find_one({"email": email})
        #new_email = user_data['email']
        msg['e'] = 'Welcome to NewsBytes'
    else:
        msg['e'] = 'Not a POST request'
    response= jsonify(msg)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response



@app.route("/login", methods = ["POST","GET"])
@cross_origin(origin='localhost',headers=['Content- Type','Authorization'])
#@crossdomain(origin='*')
def login():
    msg = {}
    if request.method == "POST":
        req = request.get_json()
        email = req['email']
        password = req['password']

        email_found = records.find_one({"email": email})
        if email_found:
            email_val = email_found['email']
            passwordcheck = email_found['password']
            
            if bcrypt.checkpw(password.encode('utf-8'), passwordcheck):
                session["email"] = email_val
                msg['e'] = "User Found!"
            else:
                msg['e'] = 'Wrong password'

        else:
            msg['e'] = 'Email not found'
    response= jsonify(msg)
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

if __name__ == "__main__":
    app.run(port = 5000, debug = True)

