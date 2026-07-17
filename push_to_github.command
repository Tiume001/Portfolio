#!/bin/bash

# 1. Spostati nella cartella in cui si trova questo script
# (Fondamentale su Mac quando si esegue un file .command con doppio clic)
cd "$(dirname "$0")" || exit

echo "======================================"
echo "    AVVIO AGGIORNAMENTO PORTFOLIO     "
echo "======================================"
echo "Cartella progetto: $(pwd)"
echo ""

# 2. Controlla se ci sono effettivamente dei file modificati o nuovi
if [ -z "$(git status --porcelain)" ]; then 
  echo "✅ Nessuna modifica rilevata. Il codice è già sincronizzato!"
else
  # 3. Aggiungi tutti i file alla 'staging area'
  git add .
  
  # 4. Esegui il commit generando un messaggio automatico con la data e l'ora correnti
  TIMESTAMP=$(date +'%d-%m-%Y %H:%M:%S')
  git commit -m "Automated push: $TIMESTAMP"
  
  # 5. Invia (pusha) il codice al tuo repository su GitHub (ramo 'main')
  echo ""
  echo "Invio dei file su GitHub in corso..."
  git push origin main
  
  echo ""
  echo "🚀 Push completato con successo!"
fi

echo "======================================"
# 6. Questa riga impedisce che la finestra del terminale si chiuda all'istante
echo "Premi un tasto qualsiasi per chiudere questa finestra..."
read -n 1 -s
