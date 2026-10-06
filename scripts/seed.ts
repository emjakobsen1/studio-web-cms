import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-05-15'})

function paragraphs(text: string) {
  return text
    .split(/\n\s*\n/)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => ({
      _type: 'block',
      style: 'normal',
      markDefs: [],
      children: [{_type: 'span', text: t}],
    }))
}

async function run() {
  // Note: no images are seeded here — the drummer adds his own photography
  // and cover art through Sanity Studio.

  console.log('Creating project…')
  await client.createOrReplace({
    _id: 'project-hifi-quartet',
    _type: 'project',
    title: 'HI FI Quartet',
    slug: {_type: 'slug', current: 'hi-fi-quartet'},
    order: 0,
    description:
      "Founded in 2022, HI FI Quartet's music draws on the European jazz scene — a meeting between strong melodies and creative formal structures, built to give each musician room to move individually within a clear collective direction.",
  })

  console.log('Creating release…')
  await client.createOrReplace({
    _id: 'release-sketches-from-the-black-box',
    _type: 'release',
    title: 'Sketches From The Black Box',
    slug: {_type: 'slug', current: 'sketches-from-the-black-box'},
    project: {_type: 'reference', _ref: 'project-hifi-quartet'},
    length: 'TBA',
    description:
      'The upcoming debut album invites the listener into a creative and deeply personal universe, where the music is shaped in the meeting between strong themes and collective improvisation — with room for both sensitive pieces and uniquely intense interplay.',
    personnel: ['Jesper Lørup — Drums, compositions'],
    featured: true,
  })

  console.log('Creating biography…')
  await client.createOrReplace({
    _id: 'biography',
    _type: 'biography',
    description: paragraphs(
      `Jesper Lørup (f. 1995) er en ung trommeslager og komponist, som er uddannet hhv. Danmark og Holland. Hans spil rummer et højt niveau af sensibilitet og lydhørhed, som medfører at han indgår i flere internationale projekter, med turnéer flere steder i Europa.

I 2022 dannede han bandet HI FI Quartet, hvor musikken er inspireret af den europæiske jazzscene, og er et møde mellem stærke melodier og kreative formstrukturer. Kompositionerne er skabt ud fra idéen om at give de medvirkende musikere en høj grad af kreativ frihed, så der gives plads til at hver musiker kan udfolde sig individuelt, samtidig med at musikken bevæger sig i en klar retning.

På det kommende debutalbum, Sketches From The Black Box, inviteres lytteren ind i et kreativt og dybt personligt univers, hvor musikken skabes i mødet mellem stærke temaer og kollektive improvisationer, med plads til både følsomme numre og unikt sammenspil med høj intensitet.`,
    ),
  })

  console.log('Creating press…')
  await client.createOrReplace({
    _id: 'press',
    _type: 'press',
    quotes: [
      {
        _key: 'placeholder-quote',
        _type: 'quote',
        quote: 'Add a quote from a review or press mention here.',
        source: 'Placeholder — edit in Studio',
      },
    ],
  })

  console.log('Creating contact…')
  await client.createOrReplace({
    _id: 'contact',
    _type: 'contact',
    email: 'booking@jesperlorup.com',
    socialLinks: [
      {_key: 'instagram', platform: 'instagram', url: 'https://instagram.com'},
      {_key: 'spotify', platform: 'spotify', url: 'https://open.spotify.com'},
      {_key: 'youtube', platform: 'youtube', url: 'https://youtube.com'},
    ],
  })

  console.log('Creating news post…')
  await client.createOrReplace({
    _id: 'news-welcome',
    _type: 'newsPost',
    title: 'Welcome to the new site',
    slug: {_type: 'slug', current: 'welcome-to-the-new-site'},
    publishedAt: new Date().toISOString(),
    mainText: paragraphs(
      'This is a placeholder news post. Edit or delete it in Sanity Studio, and add new posts here as they happen.',
    ),
  })

  console.log('Creating agenda item…')
  const placeholderShowDate = new Date()
  placeholderShowDate.setMonth(placeholderShowDate.getMonth() + 3)
  await client.createOrReplace({
    _id: 'event-placeholder',
    _type: 'event',
    date: placeholderShowDate.toISOString(),
    title: 'HI FI Quartet',
    location: 'Copenhagen, DK — venue TBA',
    link: 'https://example.com/tickets',
  })

  console.log('Done.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
