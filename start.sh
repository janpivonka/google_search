docker compose up -d --build
sleep 5
powershell.exe start http://localhost:5173/
powershell.exe start http://localhost:3001/

