import { Component } from '@angular/core';
import { ChannelsService } from '../../services/channels.service';

@Component({
  selector: 'app-channels',
  standalone: true,
  imports: [],
  templateUrl: './channels.component.html',
  styleUrl: './channels.component.scss'
})
export class ChannelsComponent {
  constructor(
    private channels: ChannelsService
  ) {}
}
