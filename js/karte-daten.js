/* Speisekarte What about coffee?
   Quelle: Fotos der vier Menütafeln im Laden von Nader (16.11.2026), auf der Tafel durchgestrichene
   Produkte sind bewusst nicht drin (Matcha Bowl, Roter und Schwarzer Kaviar, doppeltes Blaubeerkompott
   beim French Toast, ein Kaffee nach Flat White).
   Einzige Stelle für Produkte und Preise. Die Website liest alles von hier.
   Preise in Euro inklusive MwSt. Schreibfehler der Tafel sind korrigiert (siehe 01_KARTE_ANALYSE.md). */
window.WAC_KARTE = {
  stand: '16.11.2026',
  bereiche: [
    {
      id: 'coffee', wort: 'coffee?', titel: 'Kaffee & Drinks', farbe: '#8A5A32',
      bilder: ['c10_flat_white_oben', 'c1_iced_latte'],
      gruppen: [
        {
          name: 'Coffee',
          items: [
            { id: 'espresso', name: 'Espresso', preis: 2.9 },
            { name: 'Espresso Macchiato', preis: 2.9 },
            { name: 'Doppelter Espresso', preis: 3.5 },
            { name: 'Doppelter Espresso Macchiato', preis: 3.5 },
            { name: 'Caffè Crema', preise: [['klein', 2.9], ['groß', 3.6]] },
            { id: 'cappuccino', name: 'Cappuccino', preise: [['klein', 3.9], ['groß', 4.5]] },
            { name: 'Latte Macchiato', preis: 4.6 },
            { id: 'milchkaffee', name: 'Milchkaffee', preis: 4.5 },
            { id: 'flat-white', name: 'Flat White', preis: 4.5 }
          ]
        },
        {
          name: 'Iced Coffee',
          items: [
            { name: 'Iced Caffè', preis: 4.2 },
            { name: 'Iced Cappuccino', preis: 4.8 },
            { id: 'iced-latte', name: 'Iced Latte', preis: 4.8 },
            { name: 'Iced Karamell Latte', preis: 5.2 },
            { name: 'Iced Chai Latte', preis: 4.8 }
          ]
        },
        {
          name: 'Frappés', preis: 6.4,
          items: [{ name: 'Vanille Frappé' }, { name: 'Choco Frappé' }, { name: 'Karamell Frappé' }]
        },
        {
          name: 'Non Coffee',
          items: [
            { name: 'Chai Latte', preis: 4.9 },
            { name: 'Heiße Schokolade', preis: 4.6 },
            { name: 'Tee', zutaten: 'Verschiedene Sorten', preis: 3.9 }
          ]
        },
        {
          name: 'Matcha',
          items: [
            { name: 'Matcha Latte oder Iced Matcha Latte', preis: 4.7 },
            { name: 'Iced Strawberry Matcha', preis: 6.9 },
            { name: 'Iced Mango Matcha', preis: 6.9 },
            { name: 'Iced Blueberry Matcha', preis: 6.9 }
          ]
        },
        {
          name: 'Extras',
          items: [
            { name: 'Espresso Shot', preis: 1.2 },
            { name: 'Collagenpulver', preis: 2.5 },
            { name: 'Flavors', preis: 0.8 }
          ]
        }
      ]
    },
    {
      id: 'fresh', wort: 'fresh?', titel: 'Säfte & Smoothies', farbe: '#4F7A2A',
      bilder: ['m2_saft', 'm3_smoothie'],
      gruppen: [
        {
          name: 'Fresh Juices', info: '0,4 l', preis: 6.9,
          items: [
            { name: 'The Fresh', zutaten: '100 % Orange' },
            { name: 'The Green', zutaten: 'Apfel, Gurke, Sellerie, Ingwer, Zitrone' },
            { name: 'The Red', zutaten: 'Rote Beeren, Apfel, Rote Bete, Limette, Ingwer' },
            { name: 'The Glow', zutaten: 'Himbeere, Apfel, Zitrone, Minze' },
            { name: 'The Sun', zutaten: 'Orange, Apfel, Karotte, Ingwer, Honig' },
            { name: 'The Kiwi', zutaten: 'Gurke, Birne, Kiwi' },
            { name: 'The Berry', zutaten: 'Apfel, Banane, Erdbeere' }
          ]
        },
        {
          name: 'Smoothies', info: '0,4 l', preis: 8.9,
          items: [
            { name: 'The Peach', zutaten: 'Pfirsich, Banane, Kokosmilch, Datteln' },
            { name: 'The Mango', zutaten: 'Banane, Mango, Vanillejoghurt' },
            { name: 'The Velvet', zutaten: 'Erdbeere, Banane, Vanillejoghurt, Honig' },
            { name: 'The Piña', zutaten: 'Ananas, Kokosmilch, Kokosraspel' },
            { name: 'The Beanut', zutaten: 'Banane, Milch, Haferflocken, Erdnussbutter, Honig' }
          ],
          extras: [{ name: 'Proteinpulver', preis: 2.4 }]
        },
        {
          name: 'Softdrinks', preis: 3.0,
          items: [{ name: 'Wasser' }, { name: 'Eistee' }, { name: 'Cola' }]
        }
      ]
    },
    {
      id: 'sweet', wort: 'sweet?', titel: 'Croffles, Bowls & Frühstück', farbe: '#B4532E',
      bilder: ['m6_pancakes', 'm7_honey_cake'],
      gruppen: [
        {
          name: 'Aus dem Ofen & Waffeleisen',
          items: [
            { id: 'croissant', name: 'Croissant', preis: 2.9 },
            { id: 'croissant-gefuellt', name: 'Gefülltes Croissant', preis: 4.9 },
            { id: 'croffle', name: 'Croffle', zutaten: 'Halb Croissant, halb Waffel', preis: 6.9 }
          ]
        },
        {
          name: 'Bowls',
          items: [
            { id: 'acai-bowl', name: 'Açaí Bowl', preise: [['klein', 5.9], ['groß', 7.9]] }
          ]
        },
        {
          name: 'Im Becher',
          items: [
            { name: 'Eiweiß Shock', preis: 5.9 },
            { name: 'Overnight Oats', preis: 5.9, varianten: ['Banane, Erdnusscreme, Honig', 'Apfel, Zimt, Honig', 'Beeren, Honig'] },
            { name: 'Chiapudding', preis: 6.9, varianten: ['Erdbeerpüree, Kokoschips', 'Mangopüree, Mango, Kokosflocken'] }
          ]
        },
        {
          name: 'Warm & satt',
          items: [
            { name: 'Porridge', preis: 9.9, varianten: ['Erdbeeren, Blaubeeren, Himbeeren, Kokoschips', 'Apfel, Zimt, Walnüsse, Ahornsirup', 'Banane, Erdnussmus, Zimt, Granola', 'Schokogranola, Banane, Haselnüsse, Kakaonibs'] },
            { name: 'Pancakes', preis: 9.9, varianten: ['Ahornsirup, Butter', 'Banane, Blaubeere, Vanillesoße', 'Erdbeere, Banane, Nutella'] },
            { name: 'French Toast', preis: 9.9, extras: [
              { name: 'Blaubeerkompott mit Mascarponecreme', preis: 2.9 },
              { name: 'Nutella, Banane, Mascarponecreme, Ahornsirup, Zimt, Walnuss', preis: 3.9 }
            ] }
          ]
        },
        {
          name: 'Kuchen',
          items: [{ name: 'Kuchen', zutaten: 'Diverse Tageskuchen. Frag uns!', preis: 4.9 }]
        }
      ]
    },
    {
      id: 'salty', wort: 'salty?', titel: 'Rührei & Brote', farbe: '#7A5426',
      bilder: ['m4_ruehrei', 'm5_avocado_brot'],
      gruppen: [
        {
          name: 'Rührei auf knusprigem Bauernbrot', info: 'natur', preis: 7.9,
          extras: [
            { name: 'Schnittlauch', preis: 0.9 },
            { name: 'Ricotta oder Ziegenkäse & getrocknete Tomaten', preis: 2.9 },
            { name: 'Avocado & Tomaten', preis: 5.9 },
            { name: 'Feta, Spinat & Tomaten', preis: 5.9 },
            { name: 'Bresaola & Parmesan', preis: 5.9 },
            { name: 'Lachs & Schmand', preis: 6.9 },
            { name: 'Trüffel & Parmesan', preis: 9.9 }
          ]
        },
        {
          name: 'Brote',
          items: [
            { name: 'Frischkäse, Avocado, Tomate, rote Zwiebel', preis: 10.9 },
            { name: 'Tomate, Mozzarella, Pesto', preis: 10.9 },
            { name: 'Blue Cheese, Birne, Honig, Walnuss', preis: 10.9 },
            { name: 'Hähnchen, Mozzarella, Pesto, Rucola', preis: 13.9 },
            { name: 'Thunfischcreme, rote Zwiebeln, Schnittlauch, Sprossen', preis: 13.9 },
            { name: 'Lachs, Avocado, Frischkäse, Honig Dill, Rucola', preis: 14.9 }
          ],
          extras: [{ name: 'mit Rührei', preis: 4.9 }]
        }
      ]
    }
  ],
  hinweise: [
    'Allergene & Zusatzstoffe: Infos bekommst du jederzeit bei unserem Team.',
    'Viele Gerichte machen wir auch vegetarisch oder vegan. Sprich uns einfach an.',
    'Alle Preise in Euro inklusive der gesetzlichen Mehrwertsteuer.'
  ]
};
