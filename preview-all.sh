#!/bin/bash
# preview-all.sh - Pornește toate 3 aplicațiile în modul dev

echo "🚀 Pornesc preview pentru toate modulele..."
echo ""

cd /var/www/rotiserie/apps/landing
echo "📱 Landing (Customer) - http://localhost:5173"
npm run dev &

cd /var/www/rotiserie/apps/store-v2
echo "🍳 Store (KDS) - http://localhost:5174"
npm run dev -- --port 5174 &

cd /var/www/rotiserie/apps/admin
echo "⚙️ Admin - http://localhost:5175"
npm run dev -- --port 5175 &

echo ""
echo "✅ Toate 3 rulează! Deschide:"
echo "   Customer: http://localhost:5173"
echo "   Store:    http://localhost:5174"
echo "   Admin:    http://localhost:5175"
echo ""
echo "Apasă Ctrl+C pentru a opri toate"
wait