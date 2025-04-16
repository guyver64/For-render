// Importez Express
import express from 'express';

// Créez l'application Express
const app = express();
const PORT = process.env.PORT || 3000; // Port fourni par Render ou 3000 par défaut

// Route pour /places
app.get('/places', async (req, res) => {
    const query = req.query.query;
    const location = req.query.location;
    const radius = req.query.radius;

    if (!query || !location || !radius) {
        return res.status(400).json({ error: 'Les paramètres query, location et radius sont requis.' });
    }

    // Exemple de réponse simulée
    res.json({
        message: `Recherche de lieux pour "${query}" à proximité de ${location} dans un rayon de ${radius} mètres.`,
    });
});

// Démarrez le serveur
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
