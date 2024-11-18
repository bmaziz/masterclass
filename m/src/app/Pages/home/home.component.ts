import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Typed from 'typed.js';
import { FormationCard1Component } from '../../Components/formation-card-1/formation-card-1.component';
import { RouterLink } from '@angular/router';
import { OverviewCardComponent } from '../../Components/overview-card/overview-card.component';
import { FeedbackCardComponent } from '../../Components/feedback-card/feedback-card.component';
import { HttpClient } from '@angular/common/http';
import { Formation } from '../../Interfaces/formation.model';

interface Feedback {
  name: string;
  picture: string;
  review: string;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormationCard1Component, RouterLink, OverviewCardComponent, FeedbackCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {
  dynamicTexts: string[] = ["Le Développement <strong>WEB</strong>", "Le Design Graphique", "Le Marketing Digital", "Le Montage Vidéo", "La Photographie"];
  feedbacks: Feedback[] = [
    {
      name: 'Ghofrane Matoussi',
      picture: 'https://master-class.tn/wp-content/uploads/2023/11/temoignage-ghofrane-matoussi-Master-Class-formation.webp',
      review: 'J\'ai jamais cru qu\'il y a encore des centres de formation en Tunisie qui offrent un tel service aussi professionnel et humain. Les personnes qui travaillent chez MasterClass sont des personnes douées de leur travail, ils travaillent avec beaucoup d\'enthousiasme et d\'amour. Sans oublier le rapport qualité-prix qui est hyper magnifique chez eux. Ainsi qu\'ils offrent des pauses-café...'
    },
    {
      name: 'Asma Gammoudi',
      picture: 'https://master-class.tn/wp-content/uploads/2023/11/Best-avis.webp',
      review: 'I am taking a graphic design training within Master Class, I can only say how beneficial it is for both personal projects and professional development. Amine is one of a kind trainer he is so passionate about his work and constantly making sure to interact with his students and give us insights, advice and even opportunities! If you ever want to invest in yourself Master Class is the place to be!'
    },
    {
      name: 'Ahmed Saeed',
      picture: 'https://master-class.tn/wp-content/uploads/2023/11/Ahmed-Saidi-temoignage-formation-master-class.webp',
      review: 'من أفضل مراكز التكوين المهني إن لم يكن الأفضل على الإطلاق. فريق محترف من المدربين في التصميم و المونتاج و الماركيتينغ و البرمجة كتطوير مواقع الويب الخ. يقفون معك ليس فحسب حتى تكتسب المعرفة و إنما تضعها في حيز التطبيق. أنصح بهذا المركز كل من يرغب في تكوين نفسه مهنيا لدى مدربين محترفين. ماستر كلاس أنتم في القمة, أتمنى في القريب العاجل أن تتوسعو في كل أرجاء تونس.'
    },
    {
      name: 'Zeineb Zaïem',
      picture: 'https://master-class.tn/wp-content/uploads/2023/11/temoignage-Master-Class-formation.webp',
      review: 'Je recommande vivement! Que ce soit pour le marketing digital ou le design graphique, ce furent des formations très instructives. Une ambiance de travail conviviale, un très bon contact humain et une écoute exceptionnelle de la part des formateurs. Un grand merci à Amine, formation riche tant sur le contenu que sur le plan humain.'
    },
    {
      name: 'Gedeon Lekouere',
      picture: 'https://master-class.tn/wp-content/uploads/2023/11/Meilleur-formation-pour-les-etrangers-en-tunisie-.webp',
      review: 'Master Class est plus qu\'un centre de formation, c\'est une famille pour moi. Au départ j\'étais très retissant d\'y aller pour me former. Aujourd\'hui, je n\'aimerais pas être très loin de ses belles personnes qui dirigent ce centre. Nul n\'est le côté humain que j\'adore particulièrement à Master Class, les formations sont de très bonnes qualités et c\'est juste formidable.'
    }
  ];

  formations: Formation[] = [];

  constructor( private http: HttpClient ) { }

  ngOnInit(): void {
    // Utilisez Typed.js dans le hook ngOnInit ou ngAfterViewInit
    const typed = new Typed("#animated-text", {
      strings: this.dynamicTexts,
      typeSpeed: 40,
      backDelay:1500,
      loop:true,
      smartBackspace:false
    });

    // Récupération des formations du  backend

    this.http.get<any>(`http://localhost:3000/formation/`).subscribe(data => {
        if (data.message == "Données de formation récupérées avec succès."        ) {
          this.formations = data.data;
          console.log(this.formations);
        } 
      },
      (error) => {
        console.log(error);
      });
  }



 
  
}
