import { Routes } from '@angular/router';
import { PhotoShareList } from './photo-share-list/photo-share-list';
import { LandingPage } from './landing-page/landing-page';
import { SingleFaceSnapComponent } from './single-face-snap/single-face-snap';
import { NewFaceSnapComponent } from './new-face-snap/new-face-snap';
import { LoginComponent } from './login/login';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path : 'login', component : LoginComponent },
    { path : 'create', redirectTo: '/facesnaps/new', pathMatch: 'full' },
    { path : 'facesnaps/new', component : NewFaceSnapComponent, canActivate: [AuthGuard] },
    { path : 'facesnaps/:id', component : SingleFaceSnapComponent, canActivate: [AuthGuard] },
    { path : 'facesnaps', component : PhotoShareList },
    { path: '', component : LandingPage },
];
