### Run the Frontend

npm run dev

#### Run the Go Backend including connection to local Postgre DB
go run main.go

#### Run local Postgres DB

#### Run LLM_Bridge Flexbo 3x apps

### Check the LLM in llm_app.py if available in the local Ollama

### TO DO

extend database with syntethic data
Build RAG system based on DB


Code development notes

### Docker file
Builds your React/Vite app
Serves it with NGINX
Disables cache for index.html
Adds long-term cache for assets

#### Explanation of added nginx.conf file
| Line                                                              | Explanation                                                                |           |                                            |
| ----------------------------------------------------------------- | -------------------------------------------------------------------------- | --------- | ------------------------------------------ |
| `listen 80;`                                                      | Tells NGINX to listen on HTTP port 80                                      |           |                                            |
| `root /usr/share/nginx/html;`                                     | Serve files from this path                                                 |           |                                            |
| `index index.html;`                                               | Default page when accessing root path `/`                                  |           |                                            |
| `server_name _;`                                                  | Catch-all domain name                                                      |           |                                            |
| `location / { try_files ... }`                                    | For SPAs: try the actual path, else return `index.html`                    |           |                                            |
| `add_header Cache-Control "no-store";`                            | Prevents browser from caching `index.html`                                 |           |                                            |
| \`location \~\* .(js                                              | css                                                                        | ...) {}\` | Matches assets like JS, CSS, fonts, images |
| `add_header Cache-Control "public, max-age=31536000, immutable";` | Tells browser: "this file won't change for 1 year" — safe for hashed files |           |                                            |
