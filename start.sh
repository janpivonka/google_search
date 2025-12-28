docker compose -f docker-compose.yml up --build -d

echo "Čekám na spuštění serverů..."
sleep 5

powershell.exe start http://localhost:5173/
powershell.exe start http://localhost:3001/

echo "Produkční servery spuštěny!"
