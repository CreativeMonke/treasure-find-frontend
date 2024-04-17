const supportQuestions = [
  {
    question: "Cum accesez aplicația?",
    content: [
      {
        isHeader: true,
        text: "La deschiderea aplicației, vei fi redirecționat către pagina de start unde poți vedea o descriere scurtă a evenimentului, opțiuni de autentificare sau înregistrare, timpul rămas până la începerea evenimentului, numărul de locații disponibile și procentul de utilizatori înscriși",
      },
    ],
  },
  {
    question: "Cum mă înregistrez și mă autentific?",
    content: [
      {
        isHeader: true,
        text: "Pentru a participa la vânătoarea de comori, este necesar să ai un cont. Înregistrează-te folosind adresa de e-mail, numele, prenumele și orașul tău. Vei primi un cod de confirmare prin e-mail pentru a finaliza înregistrarea. Pentru autentificare, folosește emailul și parola pe care le-ai setat",
      },
    ],
  },
  {
    question: "Ce informații sunt afișate pe pagina principală?",
    content: [
      {
        isHeader: true,
        text: "În funcție de starea evenimentului, pagina principală îți va afișa diverse informați",
      },
      {
        isHeader: false,
        text: "Dacă evenimentul nu a început",
      },
      {
        isHeader: false,
        text: "Dacă s-a încheiat",
      },
      {
        isHeader: false,
        text: "Dacă nu ți-ai început vânătoarea",
      },
      {
        isHeader: false,
        text: "Dacă ai încheiat-o",
      },
      {
        isHeader: false,
        text: "Dacă permisiunea de locație nu este activată",
      },
    ],
  },
  {
    question: "Cum funcționează harta interactivă?",
    content: [
      {
        isHeader: true,
        text: "Harta îți arată locațiile incluse în vânătoarea de comori, marcate cu cercuri colorate. Fiecare culoare a cercului are semnificația sa:"
      },
      {
        isHeader: false,
        text: "Cercul gri: Indică faptul că nu ești suficient de aproape pentru a activa întrebarea."
      },
      {
        isHeader: false,
        text: "Cercul albastru: Indică proximitatea necesară pentru activarea întrebării."
      },
      {
        isHeader: false,
        text: "Cercul verde: Indică faptul că ai răspuns deja la întrebarea respectivă."
      },
    ],
  },
  {
    question: "Ce butoane sunt disponibile pe hartă?",
    content: [
      {
        isHeader: false,
        text: "Centrat pe locația curentă: Acest buton îți recentrează harta pe locația ta curentă."
      },
      {
        isHeader: false,
        text: "Încheiere vânătoare: Acest buton îți permite să închei participarea la vânătoarea de comori. Utilizarea acestui buton este permanentă."
      },
    ],
  },
  {
    question: "Ce pot găsi în meniul lateral?",
    content: [
      {
        isHeader: true,
        text: "Meniul lateral îți oferă acces la diverse funcționalități ale aplicației:"
      },
      {
        isHeader: false,
        text: "Pagina principală: Accesează informații generale și actualizări ale evenimentului."
      },
      {
        isHeader: false,
        text: "Lista locațiilor: Vizualizează toate locațiile importante pentru vânătoarea de comori."
      },
      {
        isHeader: false,
        text: "Răspunsurile tale: Revizuiește întrebările și răspunsurile tale anterioare."
      },
      {
        isHeader: false,
        text: "Pagina de suport: Obține ajutor și suport tehnic."
      },
      {
        isHeader: false,
        text: "Schimbarea limbii interfeței: Modifică limba în care este afișată aplicația."
      },
      {
        isHeader: false,
        text: "Detalii despre contul tău: Gestionează informațiile personale și setările contului."
      },
    ],
  },
  {
    question: "Cum sunt gestionate răspunsurile mele la întrebări?",
    content: [
      {
        isHeader: true,
        text: "Pe pagina 'Răspunsurile Mele', poți vedea și gestiona răspunsurile tale:"
      },
      {
        isHeader: false,
        text: "Un răspuns corect va fi marcat cu verde."
      },
      {
        isHeader: false,
        text: "Un răspuns greșit va fi marcat cu roșu."
      },
    ],
  },
  {
    question: "Ce trebuie să fac în caz de urgență?",
    content: [
      {
        isHeader: true,
        text: "În caz de urgență, urmează acești pași:"
      },
      {
        isHeader: false,
        text: "Adresează-te celui mai apropiat profesor însoțitor."
      },
    ],
  },
  {
    question: "Cum pot lăsa feedback după eveniment?",
    content: [
      {
        isHeader: true,
        text: "După încheierea evenimentului, feedback-ul poate fi lăsat folosind următorii pași:"
      },
      {
        isHeader: false,
        text: "Utilizează formularul Google Forms disponibil în secțiunea 'Acasă' după finalizarea evenimentului"
      },
    ],
  },
  {
    question: "Cum pot răspunde la întrebările din cadrul vânătorii de comori?",
    content: [
      {
        isHeader: false,
        text: "Activarea Întrebării: Dacă ești suficient de aproape de locație (cercul de pe hartă devine albastru), poți activa întrebarea făcând clic pe butonul care apare în modalul de întrebări. La activare, aplicația va verifica dacă există un răspuns anterior pentru acea locație. Dacă este cazul, vei vedea întrebarea și răspunsul tău anterior, altfel va începe un temporizator de 5 minute pentru a răspunde.",
      },
      {
        isHeader: false,
        text: "Răspunderea la Întrebare: Odată ce întrebarea este activată, poți introduce răspunsul tău în câmpul text disponibil. Asigură-te că răspunsul este complet și clar formulat înainte de a continua. Dacă temporizatorul de 5 minute expiră înainte de a trimite răspunsul, nu vei mai putea răspunde, iar răspunsul tău nu va fi înregistrat.",
      },
      {
        isHeader: false,
        text: "Trimiterea Răspunsului: După ce ai completat răspunsul, poți apăsa pe butonul de trimitere. Dacă răspunsul este valid și temporizatorul nu a expirat, răspunsul tău va fi înregistrat. Dacă există probleme cu răspunsul (de exemplu, este gol sau temporizatorul a expirat), vei fi notificat printr-un mesaj de eroare și vei avea posibilitatea de a încerca din nou, în limita timpului disponibil.",
      },
      {
        isHeader: false,
        text: "Feedback după Trimitere: În cazul în care răspunsul a fost actualizat cu succes, vei primi o confirmare. Dacă întâmpini probleme tehnice sau ai întrebări suplimentare legate de procesul de răspundere, poți accesa oricând pagina de suport sau contacta echipa tehnică prin email."
      },

    ],
  },
  {
    question: "Date de contact",
    content: [
      {
        isHeader: true,
        text: "Pentru întrebări sau suport, poți contacta echipa prin următoarele metode:"
      },
      {
        isHeader: false,
        text: "Email suport: treasure.find.oni2024@gmail.com"
      },
      {
        isHeader: false,
        text: "Email personal: rares.cristian.darabana@gmail.com"
      },
      {
        isHeader: true,
        text: "Mai multe informații: onigim2024.racovita.ro"
      },
    ],
  }
];
export default supportQuestions;
