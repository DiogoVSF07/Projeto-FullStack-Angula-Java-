import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-template',
  imports: [RouterOutlet, RouterLinkWithHref],
  templateUrl: './template.html',
  styleUrl: './template.scss',
})
export class Template {}
