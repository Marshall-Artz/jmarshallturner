import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrl: './github.component.css'
})
export class GithubComponent implements OnInit {

  ngOnInit(): void {
    if (typeof window != undefined)
      window.location.href = 'https://github.com/Marshall-Artz';
  }
}
