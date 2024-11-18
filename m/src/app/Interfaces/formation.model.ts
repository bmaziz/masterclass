// formation.model.ts

export interface Formation {
    idFormation: number;
    titre: string;
    prix: number;
    totalmois: number;
    totalheure: number;
    description: string;
    image: string;
    idFormateur: number;
    dateDebut: Date;
    icone: string;
    apropos: string;
    certificat: number;
    attestation: number;
    participants: any[];
    programme: any[];
    objectifs: any[];
}
