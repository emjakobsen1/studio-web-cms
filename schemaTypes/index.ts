import {socialLink} from './objects/socialLink'
import {project} from './project'
import {release} from './release'
import {newsPost} from './newsPost'
import {event} from './event'
import {hero} from './hero'
import {biography} from './biography'
import {press} from './press'
import {contact} from './contact'

export const schemaTypes = [
  // objects
  socialLink,
  // singletons
  hero,
  biography,
  press,
  contact,
  // collections
  project,
  release,
  newsPost,
  event,
]
