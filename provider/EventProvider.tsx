import React, {
  createContext,
  Dispatch,
  FC,
  useContext,
  useState,
} from 'react';
import { SharedValue, useSharedValue } from 'react-native-reanimated';
import { IEvent } from '../services/types';

interface EventProvider {
  setEvents: Dispatch<IEvent[]>;
  events: IEvent[];
  setIsOpenCreateEventModal: Dispatch<boolean>;
  isOpenCreateEventModal: boolean;
  setIsOpenCreatePlace: Dispatch<boolean>;
  isOpenCreatePlace: boolean;
  formValues: IEvent;
  handleForm: (key: keyof IEvent, value: unknown) => void;
  progress: SharedValue<number>;
}

const EventMoked = [
  {
    id: 6,
    title: 'Free Your Funk : QUANTIC (3h dj set), Theo Terev, Soulist',
    desc: `Vendredi 2 Septembre, pour notre 20ème rentrée, nous aurons le plaisir de recevoir Quantic aussi bien connu pour ses djs sets en solo qu’ à la tête des groupes Ondatropica, the Quantic Soul Orchestra ou encore Quantic & his Combo Barbaro pour un dj set de 3 heures. A ses côtés, Theo Terev qui fait partie du collectif la Mamie's et Soulist.
  Une première date qui devrait parcourir un spectre musical à 360°, latin, soul, house, disco, afrobeat ou funk.`,
    coverUri:
      'https://scontent-mrs2-2.xx.fbcdn.net/v/t39.30808-6/295548507_7765180036886633_6447278391200178878_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=340051&_nc_ohc=kiwt-zmPW2QAX8qWiDS&_nc_ht=scontent-mrs2-2.xx&oh=00_AT-r8KmvmSmyK7ThmgGhmHnXuSf4FUAIZpjieXO4VjvONA&oe=62F7D9FC',
    photos: [],
    followers: [],
    endAt: new Date(),
    beginAt: new Date(),
    distance: 10,
    price: 0,
    userId: ['Free Your Funk', 'Quantic Music'],
    place: 'La Bellevilloise',
    type: [],
    formatted_address: '19 rue Boyer, Paris',
    place_id: '987ds89vfds987adc9',
    geocode: { lat: 48.867945, lng: 2.392217 },
  },
  {
    id: 7,
    title: 'Entrée Plat Disco - Food & Musique Festival',
    desc: `3 ans de vie ça se fête !!! Cadence, l'électron libre qui gravite entre gastronomie, oenologie et programmation musicale s'allie avec le Barboteur pour proposer 3 jours de fête au bord de l'eau autour de la cuisine et de la musique ! 🎉

  ⭐️QUOI ⭐️
  Le vendredi 26, samedi 27 et dimanche 28 août au Canal Barboteur sur le spot du Millénaire le long du canal Saint-Denis, se succèderont aux platines et aux fourneaux, sur le quai et sur le bateau, un plateau food et musique local et de saison !
  
  🍳 FOOD 🍳
  - Cadence Paris -
  Resto audio installé avenue Parmentier dans le 11ème depuis trois ans. Cadence, c'est une cuisine du marché fraîche et réconfortante, des vins triés sur le volet, et le tout en musique, en cadence ! Chaque samedi, les fameuses soirées Entrée Plat Disco accueillent derrière les platines des artistes et collectifs de la scène parisienne et européenne.
  www.cadencecadence.fr/
  www.instagram.com/cadence.paris/
  
  - Trâm Trâm -
  Cadence invite la cheffe Priscilla Trâm pour un takeover en plein air des cuisines du Baboteur.
  Surprenante et créative, la cuisine de Priscilla aka Trâm Trâm est un savant équilibre entre sa passion pour la gastronomie traditionnelle française et la mise à l'honneur de la cuisine vietnamienne de ses origines. Vous l'aviez peut-être croisée lors de ses précédentes résidences au Yard, BMK, la Parade, ou encore Bonne Aventure. C'est bientôt au Barboteur avec nous qu'elle continue sa tournée des potes pour vous envoyer du bon, du beau et du kiff dans l'assiette.
  www.instagram.com/tramtramskitchen/
  
  - Mekla -
  Cuisiner le vivant.
  https://www.instagram.com/mekla.paris/
  
  - Pantobaguette -
  Le bar restaurant bistronomique. Comptoir musical et culinaire engagé.
  https://www.pantobaguette.fr/
  https://www.instagram.com/pantobaguette/
  
  🍇 VINO 🍷
  - Pépin -
  Pépin est un projet de négoce détonnant lancé par le Domaine Achilée en Alsace.
  Leur but: rendre le vin naturel accessible à tous grâce à un travail de précision.
  Chaque cuvée est issue de vignes cultivées en Bio un peu partout en France, vendangées à la main, vinifiées sans intrants !
  Nous vous proposerons plusieurs réfs à la tireuse tout le weekend !
  www.instagram.com/pepin.vin/
  
  📀 MUSIQUE 📀
  - Antipasti (Paris, Cadence, Karagi)
  https://soundcloud.com/antipastiii
  - Belec (Paris, Association Fatale, BISOU, Bruits de la Passion, Dynam'hit)
  https://soundcloud.com/be_lec
  - Bigwax Records (Paris, Bigwax Records)
  https://www.instagram.com/bigwaxrecords/
  - Cadence Deejays (Paris, Cadence)
  https://soundcloud.com/decadence-paris
  - Crazy B (Paris, Birdy Nam Nam, Alliance Ethnik, Rapsonic, DMC France et World Champion)
  https://soundcloud.com/crazyb1
  - Divagation Soundsystem : Maybe Tonight + Lorem Ipsum (Paris, Maybe Tonight, Lorem Ipsum)
  https://soundcloud.com/maybe-tonight
  https://soundcloud.com/lorem-ipsum-yo
  - Frinda Di Lanco (Berlin, Avec Plaisir Records, Ciao Amore Baci)
  https://soundcloud.com/frinda_di_lanco
  - Georgie And the Vallones (Paris, Radio France)
  https://georgiethevallones.bandcamp.com/
  - Mercredi Records (Paris, Mercredi Records)
  https://soundcloud.com/mercredirecords
  - Mademoiselle Linda (Paris, Peacefull Diggin)
  https://soundcloud.com/mlle_elle
  - Morfine / live (Paris, nouvel album 'Blinding Nights' out 14/04/22)
  https://soundcloud.com/themorfine
  - Music For Tourist (Paris, Rinse France)
  https://soundcloud.com/chris-martinon
  - Richard Fribert (Copenhaguen, Quartier Groove, No Standards)
  https://soundcloud.com/richardfribert
  
  
  ✨ ANIMATIONS ✨
  - Durant les trois jours du festival, retrouvez un espace ludique avec des grands jeux en bois, pétanque, môlky, ping pong et plein d'autres surprises
  - Ateliers participatifs autour de la pratique artistique (TBA)
  
  
  _____ Infos Pratiques _____
  🚤 LE CANAL BARBOTEUR 🚤
  Spot du Millénaire
  21 Quai du Lot, 75019
  Vendredi 26 août (18h - 00h)
  Samedi 27 août (14h - 00h)
  Dimanche 28 août (12h - 22h)
  FREE ENTRANCE
  OPEN AIR
  
  UN ÉVÈNEMENT PRÉSENTÉ PAR
  Cadence Paris
  https://cadencecadence.fr/
  https://www.instagram.com/cadence.paris/
  
  Cet événement est soutenu par l'Été culturel de la Direction Régionale de Affaires Culturelles d’Île-de-France, et le festival Formes Olympiques de la mairie de Paris`,
    coverUri:
      'https://scontent-mrs2-2.xx.fbcdn.net/v/t39.30808-6/295045300_1971029919769490_1517562099791360665_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=340051&_nc_ohc=WKaAtKpkiBkAX_6FIKQ&_nc_ht=scontent-mrs2-2.xx&oh=00_AT9NtUtIaQrJhDLCbxigH7YUukzvo5n5aYIo4zwk9A4K3A&oe=62F852E6',
    photos: [],
    followers: [],
    endAt: new Date(),
    beginAt: new Date(),
    distance: 10,
    price: 0,
    userId: ['Cadence Paris', 'Trâm Trâm'],
    place: 'Quai du Lot, 75019 Paris, France',
    type: [],
    formatted_address: 'Quai du Lot, 75019 Paris, France',
    place_id: '987ds89vfds987adc9',
    geocode: { lat: 48.898154, lng: 2.383456 },
  },
  {
    id: 8,

    title: 'La Clairière : BOB SINCLAR ALL NIGHT LONG',
    desc: `🌱 La Clairière & Tree Of Life présentent 🌱
    🌳 La Clairière : BOB SINCLAR 🌳
    22h00 - 05h00
    Open up your heart, what do you feel?
    Nous sommes heureux d’accueillir Bob Sinclar pour son premier ALL NIGHT LONG à la Clairière ! 5h de house en approche, on est déjà bouillants ! Bob Sinclar is (back) in the house 🔥
    Inutile de vous présenter Boby, à la fois pionnier de la French Touch, producteur de tubes et entertainer de génie.
    La soirée s’annonce d'ores et déjà historique, magique & sold out !
    Aucune excuse, chope ton billet rapidos ici :
    🎫 Billetterie : https://bit.ly/3vjKXa4
    🍾 Tables : https://bit.ly/3z63LMy
    🌳 ACCÈS 🌳
    La Clairière - Carrefour de Longchamp -75116 - Paris
    🚌 Bus 244 (jusqu'à 0h30) - Arrêt : Carrefour de Longchamp
    🚖 FREENOW vous propose 2x -50% de réduction* pour venir mais aussi pour rentrer avec le code CLAIRIERE2022
    Lien vers l'app :
    https://bit.ly/3jlBpWR
    
    🔞 Établissement interdit aux mineurs (contrôle d'identité avec pièce d'identité valide et non présentée sur téléphone) `,
    coverUri:
      'https://scontent-mrs2-2.xx.fbcdn.net/v/t39.30808-6/296016910_2082693391929245_7098708941005040481_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=340051&_nc_ohc=EH_JKXDxmNoAX_RxGYJ&_nc_ht=scontent-mrs2-2.xx&oh=00_AT9YwF1yQ7ko0e0xrCD7u-1hlnpyIlJ_qYWu3oFCnxZ2Ew&oe=62F917DE',
    photos: [],
    followers: [],
    endAt: new Date(),
    beginAt: new Date(),
    distance: 10,
    price: 0,
    userId: ['Tree of Life Zig', 'La Clairière'],
    place: 'La Clairière',
    type: [],
    formatted_address: '1 Carr de Longchamp, 75016 Paris',
    place_id: '987ds89vfds987adc9',
    geocode: { lat: 48.864534, lng: 2.237357 },
  },
  {
    id: 9,

    title: 'La guinguette du jardin ~ Aksel ~ Open Air',
    desc: `Vendredi 2 Septembre, pour notre 20ème rentrée, nous aurons le plaisir de recevoir Quantic aussi bien connu pour ses djs sets en solo qu’ à la tête des groupes Ondatropica, the Quantic Soul Orchestra ou encore Quantic & his Combo Barbaro pour un dj set de 3 heures. A ses côtés, Theo Terev qui fait partie du collectif la Mamie's et Soulist.
  Une première date qui devrait parcourir un spectre musical à 360°, latin, soul, house, disco, afrobeat ou funk.`,
    coverUri:
      'https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-6/296154048_1522938371459145_3590926811595893727_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=340051&_nc_ohc=3dOirSxn8QcAX8EsCK1&_nc_ht=scontent-mrs2-1.xx&oh=00_AT-Dbx_CtOfA_Uq68a-NU0oqFJ-jaWV5m2JaF92jcjCumw&oe=62F98415',
    photos: [],
    followers: [],
    endAt: new Date(),
    beginAt: new Date(),
    distance: 10,
    price: 0,
    userId: ['Jardin21'],
    place: 'Jardin21',
    type: [],
    formatted_address: '12/A Rue Ella Fitzgerald, 75019 Paris',
    place_id: '987ds89vfds987adc9',
    geocode: { lat: 48.896242, lng: 2.396058 },
  },
  {
    id: 10,
    title: `F*** Me I'm Stagiaire - Ecole de Commerce Exigée - Summer Edition`,
    desc: `Après une première édition de sa célèbre soirée F*** Me I'M Stagiaire rassemblant près de 2000 personnes, on revient avec une nouvelle date le 26 août prochain ! 🌅🍓🏖️
    Pour rappel, ECE est un concept de soirée qui a pour but de réunir l'ensemble des étudiants d'écoles supérieures de commerce (et leurs amis extérieurs) en soirées à Paris.
    C’est l’occasion de retrouver ses potes de prépa, en stage à Paris comme vous, ou tout simplement vos potes d’écoles de commerce. Vous pouvez également venir avec vos amis « exté » qui sont les bienvenus. 🧡
    Mais ECE, c'est aussi entre 1000 et 2000 personnes chaque année, depuis plus de 10 ans, prêts à enflammer les pistes de danse pour le meilleur et pour le pire (surtout le pire), une dizaine d'écoles partenaires minimum, des litres d'alcool ingérés et une ambiance de folie ! 🍻
    📜 AU PROGRAMME :
    ► Bar à shots
    ► Bar à cocktails
    ► Douceurs sucrées offertes toute la soirée
    ► Petit déj' offert en fin de soirée
    DES PRIX DE CONSO IMBATTABLES :
    ► 5€ la conso / 10€ les 3 consos
    - Rhum Coca
    - Vodka Orange / Pomme
    - Gin Tonic
    - Rhum Orange
    - Whisky Coca
    ► Cocktails : 7€
    - Jaggerbomb
    - Moscow Mule
    - Vodka Redbull
    ► Bouteilles Hard : 100€
    ► Shots : 3€
    ► 5 shots : 10€
    🤝 PARTENARIATS
    Près de 20 écoles partenaires les années précédentes (HEC, TBS, EM Lyon, Kedge, ESCP, Neoma, Audencia, Skema, Edhec, GEM, ESSEC, etc.), combien cette année ?
    Si ton école fait partie de ces partenaires, suis attentivement les jeux concours à venir pour remporter à boire. Seuls les étudiants des écoles partenaires sont éligibles aux gains. Sinon, motive ton BDE à nous contacter. 😊
    Si tu fais partie d'un BDE et souhaites profiter de nos offres de partenariat, contacte nous dès maintenant en ajoutant ce profil et une fois l'invitation acceptée, tu peux nous envoyer un MP :
    ➡️ https://cutt.ly/vKUwtqU
    
    🔎 INFOS PRATIQUES
    RDV dès 23h au Carré Montparnasse, 34 rue du Départ.
    Métro : Montparnasse – Bienvenüe (4 - 6 - 12 - 13)
    Bus : Gare Montparnasse (28 - 58 - 82 - 88 - 89 - 91 - 92 - 94 - 96)
    Noctilien : Gare Montparnasse (N01 - N02 - N12 - N13 - N61 - N62 - N63 - N145)
    Station Vélib la plus proche : 33 Bd Edgar Quinet
    
    🎟️ PRÉVENTES :
    https://cutt.ly/wKUwa3T
    💦 Fresh Ticket : 10€ (réservé aux 100 premiers, accès à la soirée uniquement)
    🥥 Coconut Ticket : 15€ (accès à la soirée uniquement)
    🔥 Hot Ticket : 20€ (accès à la soirée + 1 consommation)
    Merci d'utiliser le mail de votre école pour prendre votre place !
    ☎ INFOLINE
    ► Diego Delamare
    FB : https://cutt.ly/vKUwtqU
    Mail : diego@placeminute.com `,
    coverUri:
      'https://scontent-mrs2-1.xx.fbcdn.net/v/t39.30808-6/296309437_2619937258150068_3287115858651136422_n.jpg?stp=dst-jpg_p960x960&_nc_cat=103&ccb=1-7&_nc_sid=340051&_nc_ohc=w2iV0kbQm5MAX_yyOhA&_nc_ht=scontent-mrs2-1.xx&oh=00_AT_W-jm7CgYm_NXmQQTkXTYp2hXcNtMNlYHlBuKZUboJAQ&oe=62F879BF',
    photos: [],
    followers: [],
    endAt: new Date(),
    beginAt: new Date(),
    distance: 10,
    price: 0,
    userId: ['Ecole de Commerce Exigée', 'Leana Bellier'],
    place: 'Carré Montparnasse',
    type: [],
    formatted_address: '12/A Rue Ella Fitzgerald, 75019 Paris',
    place_id: '987ds89vfds987adc9',
    geocode: { lat: 48.844128, lng: 2.323977 },
  },
];

export const EventContext = createContext({} as EventProvider);
export const EventProvider: FC = ({ children }) => {
  const progress = useSharedValue(0);

  const [events, setEvents] = useState<IEvent[]>(EventMoked);

  const [formValues, setFormValues] = useState<IEvent>({} as IEvent);

  const handleForm = (key: keyof IEvent, value: unknown) => {
    setFormValues({ ...formValues, [key]: value });
  };
  const [isOpenCreateEventModal, setIsOpenCreateEventModal] =
    useState<boolean>(false);
  const [isOpenCreatePlace, setIsOpenCreatePlace] = useState<boolean>(false);
  // const { location } = useMapContext();

  // useEffect(() => {
  //   (async () => {
  //     if (location) {
  //       try {
  //         const eventsFromServer = await axios.get(
  //           'http://192.168.1.33:3000/event/near',
  //           {
  //             params: {
  //               distance: RADIUS_BASE_IN_METRE * 10000,
  //               long: location.longitude,
  //               lat: location.latitude,
  //             },
  //           },
  //         );

  //         if (eventsFromServer) {
  //           setEvents(eventsFromServer.data);
  //         }
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //   })();
  // }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        setEvents,
        isOpenCreateEventModal,
        setIsOpenCreateEventModal,
        formValues,
        handleForm,
        isOpenCreatePlace,
        setIsOpenCreatePlace,
        progress,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEventsContext = () => useContext(EventContext);
