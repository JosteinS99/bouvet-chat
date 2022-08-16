# Oppgaven

1. Brukeren går inn på en nettside (domenet/hostingplattform er valgfritt, gjerne noe gratis, f.eks Firebase eller Github)
2. Brukeren blir møtt med en melding som sier “Velkommen til chatten”.
3. Brukeren får generert et tilfeldig navn fra SSBs navne-API. (https://www.ssb.no/statbank/table/10467/tableViewLayout1/)
  1. Fornavnet kan være enten et guttenavn eller jentenavn.
  2. Etternavnet er et tilfeldig fornavn, med “-sen” eller “-dottir” lagt til på slutten - avhengig av om det valgte navnet var et gutte- eller jentenavn.
  3. Hvis brukeren er misfornøyd med navnet sitt, kan brukeren trykke på en knapp og få tildelt et nytt brukernavn
  
4. Når brukeren er fornøyd med navnet, kan vedkommende trykke “Fortsett til chatten”, og blitt tatt til et chattevindu
  1. I chattevinduet kan brukere fra hele verden skrive til hverandre. Chatten skal oppdateres i sanntid, og skal til enhver tid vise de 10 siste     meldingene som ble skrevet.
  2. Brukernavnet til personen som skrev meldingen skal stå før hver melding
  3. Under chattevinduet skal det være et input-felt hvor brukeren selv kan skrive inn meldinger


• Det stilles ingen krav til estetikk, men det er et pluss hvis det ser OK ut. • Løsningen har ingen innlogging. Det stilles heller ingen krav til sikkerhet, men vi vil gjerne høre dine tanker om hvordan det kan gjøres sikkert. • Løsningen vil kreve en database som kan pushe oppdateringer til klienten i sanntid. Vi anbefaler Firebase Firestore til dette, men kandidaten står fritt til å velge en annen database/API-løsning med f.eks websockets. • Innleveringen skal inneholde en link til applikasjonen, samt en link til et åpent Github-repo hvor koden ligger. Vi bryr oss ikke om kvaliteten på commit-meldinger.

--------------------------------------------------------------------------------------------------------------------------------------------------------

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
