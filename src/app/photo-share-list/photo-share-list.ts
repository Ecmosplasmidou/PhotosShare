import { Component, OnInit } from '@angular/core';
import { PhotoShare } from '../models/photoShare';
import { FaceSnapComponent } from '../face-snap/face-snap';
import { PhotoSharesService } from '../services/photo-shares.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-photo-share-list',
  imports: [FaceSnapComponent, RouterModule],
  templateUrl: './photo-share-list.html',
  styleUrl: './photo-share-list.scss'
})
export class PhotoShareList implements OnInit{
  faceSnaps: PhotoShare[] = [];

  constructor(private photoSharesService: PhotoSharesService) {}

  ngOnInit(): void {
  this.faceSnaps = this.photoSharesService.getFaceSnaps();  
  }
}

