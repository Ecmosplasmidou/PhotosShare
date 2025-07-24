import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const slideAnimation = trigger('routeAnimations', [
  // Animation vers la droite (navigation vers l'avant)
  transition('* => *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),
    
    group([
      // Page sortante - glisse vers la gauche
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('300ms ease-in-out', 
          style({ transform: 'translateX(-100%)' })
        )
      ], { optional: true }),
      
      // Page entrante - vient de la droite
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms ease-in-out', 
          style({ transform: 'translateX(0%)' })
        )
      ], { optional: true })
    ])
  ]),

  // Animation spéciale pour le retour en arrière
  transition('detail => list', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      })
    ], { optional: true }),
    
    group([
      // Page sortante - glisse vers la droite (retour)
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('300ms ease-in-out', 
          style({ transform: 'translateX(100%)' })
        )
      ], { optional: true }),
      
      // Page entrante - vient de la gauche (retour)
      query(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('300ms ease-in-out', 
          style({ transform: 'translateX(0%)' })
        )
      ], { optional: true })
    ])
  ]),

  // Animation du voile bleu
  transition('* => *', [
    query(':enter', [
      style({
        position: 'relative',
        overflow: 'hidden'
      }),
      // Ajouter un pseudo-élément pour l'effet de voile
      animate('0ms', style({}))
    ], { optional: true })
  ])
]);

// Animation du voile bleu séparée
export const blueVeilAnimation = trigger('blueVeil', [
  transition(':enter', [
    style({
      transform: 'translateX(-100%)',
      opacity: 0
    }),
    animate('400ms ease-out', style({
      transform: 'translateX(0%)',
      opacity: 1
    }))
  ]),
  transition(':leave', [
    animate('400ms ease-in', style({
      transform: 'translateX(100%)',
      opacity: 0
    }))
  ])
]);
