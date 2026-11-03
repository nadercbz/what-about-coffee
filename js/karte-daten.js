/* Speisekarte What about coffee?
   Quelle: Fotos der drei Menütafeln im Laden (über Google), abgeschrieben am 01.11.2026.
   Einzige Stelle für Produkte und Preise. Die Website liest alles von hier.
   Preise in Euro inklusive MwSt. Schreibfehler der Tafel sind korrigiert (siehe 01_KARTE_ANALYSE.md). */
window.WAC_KARTE = {
  stand: '01.11.2026',
  bereiche: [
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
            { id: 'acai-bowl', name: 'Açaí Bowl', preise: [['klein', 5.9], ['groß', 7.9]] },
            { id: 'matcha-bowl', name: 'Matcha Bowl', preise: [['klein', 5.9], ['groß', 7.9]] }
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
          items: [{ name: 'Kuchen', zutaten: 'Wechselnde Tageskuchen, zum Beispiel Honey Cake. Frag uns!', preis: 4.9 }]
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
            { name: 'Trüffel & Parmesan', preis: 9.9 },
            { name: 'Roter Kaviar', preis: 13.9 },
            { name: 'Schwarzer Kaviar', preis: 24.9 }
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
