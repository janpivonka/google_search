docker compose -f docker-compose.prod.yml up -d --build

echo "Čekám na spuštění serverů..."
sleep 5

powershell.exe start http://localhost:80/
powershell.exe start http://localhost:3001/

echo "Produkční servery spuštěny!"
