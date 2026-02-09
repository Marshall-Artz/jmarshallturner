import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-game-of-life',
  templateUrl: './game-of-life.component.html',
  styleUrl: './game-of-life.component.css'
})
export class GameOfLifeComponent implements OnDestroy {
  rows: number = window.innerWidth <= 1100 ? 15 : 15;
  cols: number = window.innerWidth <= 1100 ? 11 : 15;
  grid: boolean[][] = [];
  speed: number = 500; // Half a second in milliseconds
  
  isDrawing = false;
  drawMode: boolean | null = null;
  isRunning = false;
  intervalId: any;

  constructor() {
    this.initializeGrid();
  }

  ngOnDestroy() {
    this.stop();
  }

  // Grid initialization
  initializeGrid() {
    this.grid = Array.from({ length: this.rows }, () => Array(this.cols).fill(false));
  }

  // Mouse interactions
  onMouseDown(row: number, col: number) {
    this.isDrawing = true;
    this.drawMode = !this.grid[row][col];
    this.grid[row][col] = this.drawMode;
  }

  onMouseEnter(row: number, col: number) {
    if (this.isDrawing && this.drawMode !== null) {
      this.grid[row][col] = this.drawMode;
    }
  }

  onMouseUp() {
    this.isDrawing = false;
    this.drawMode = null;
  }

  // Game logic
  nextGeneration() {
    const newGrid = this.grid.map(arr => arr.slice());
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        const aliveNeighbors = this.countAliveNeighbors(row, col);
        if (this.grid[row][col]) {
          newGrid[row][col] = aliveNeighbors === 2 || aliveNeighbors === 3;
        } else {
          newGrid[row][col] = aliveNeighbors === 3;
        }
      }
    }
    this.grid = newGrid;
  }

  countAliveNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols) {
          if (this.grid[newRow][newCol]) count++;
        }
      }
    }
    return count;
  }

  // Controls
  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => this.nextGeneration(), this.speed);
  }

  stop() {
    this.isRunning = false;
    if (this.intervalId) clearInterval(this.intervalId);
  }

  stepForward() {
    this.nextGeneration();
  }

  clear() {
    this.stop();
    this.initializeGrid();
  }

  randomize() {
    this.grid = this.grid.map(row => row.map(() => Math.random() > 0.7));
  }
}