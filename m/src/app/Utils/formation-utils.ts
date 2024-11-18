// formation-utils.ts

import { Formation } from "../Interfaces/formation.model"

export function getDefaultFormation(): Formation {
  return {
    idFormation: 0,
    titre: '',
    prix: 0,
    totalmois: 0,
    totalheure: 0,
    description: '',
    image: '',
    idFormateur: 0,
    dateDebut: new Date(),
    icone: '',
    apropos: '',
    certificat: 0,
    attestation: 0,
    participants: [], 
    programme: [], 
    objectifs: []
  };
}
