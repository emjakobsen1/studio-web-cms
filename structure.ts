import type {StructureResolver} from 'sanity/structure'

const SINGLETONS = [
  {id: 'biography', title: 'Biography'},
  {id: 'press', title: 'Press'},
  {id: 'contact', title: 'Contact'},
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...SINGLETONS.map(({id, title}) =>
        S.listItem()
          .id(id)
          .title(title)
          .child(S.document().schemaType(id).documentId(id)),
      ),
      S.divider(),
      S.documentTypeListItem('project').title('Projects'),
      S.documentTypeListItem('release').title('Releases'),
      S.documentTypeListItem('newsPost').title('News'),
      S.documentTypeListItem('event').title('Agenda'),
    ])
